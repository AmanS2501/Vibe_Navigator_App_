import os
import logging
from datetime import datetime
from typing import List
import asyncpraw
from .base import Review

logger = logging.getLogger(__name__)

class RedditScraper:
    def __init__(self):
        self.client_id = os.getenv("REDDIT_CLIENT_ID")
        self.client_secret = os.getenv("REDDIT_CLIENT_SECRET")
        self.user_agent = "vibe-navigator-scraper/0.1"
        if not self.client_id or not self.client_secret:
            raise ValueError("Missing Reddit client ID or secret in environment variables.")
        self.reddit = asyncpraw.Reddit(
            client_id=self.client_id,
            client_secret=self.client_secret,
            user_agent=self.user_agent
        )

    async def scrape(self, city: str, category: str = "restaurants", max_posts: int = 100) -> List[dict]:
        """
        Scrape Reddit for posts and comments mentioning restaurants in the given city.
        Returns a list of review dicts.
        """
        query = f"{city} {category}"
        subreddit_list = [
            "restaurants", "food", "travel", "AskReddit", "FoodPorn", "india", "CityPorn"
        ]
        reviews = []
        for subreddit_name in subreddit_list:
            try:
                subreddit = await self.reddit.subreddit(subreddit_name)
                async for submission in subreddit.search(query, sort="new", limit=max_posts):
                    # Skip posts without substantial text
                    if submission.selftext and len(submission.selftext) > 30:
                        reviews.append(
                            Review(
                                id=f"reddit_{submission.id}",
                                location_name=submission.title,
                                city=city,
                                category=category,
                                text=submission.selftext,
                                rating=None,
                                author=str(submission.author),
                                date=datetime.utcfromtimestamp(submission.created_utc),
                                source="reddit",
                                source_url=f"https://reddit.com{submission.permalink}",
                                helpful_count=submission.score
                            ).dict()
                        )
                    # Fetch top-level comments as reviews
                    await submission.load()
                    comments = submission.comments
                    await comments.replace_more(limit=0)
                    for comment in comments.list()[:10]:  # Collect more comments per post if desired
                        if hasattr(comment, "body") and comment.body and len(comment.body) > 30:
                            reviews.append(
                                Review(
                                    id=f"reddit_comment_{comment.id}",
                                    location_name=submission.title,
                                    city=city,
                                    category=category,
                                    text=comment.body,
                                    rating=None,
                                    author=str(comment.author),
                                    date=datetime.utcfromtimestamp(comment.created_utc),
                                    source="reddit",
                                    source_url=f"https://reddit.com{comment.permalink}",
                                    helpful_count=comment.score
                                ).dict()
                            )
            except Exception as e:
                logger.error(f"Error scraping subreddit {subreddit_name}: {e}")
        return reviews

    async def close(self):
        await self.reddit.close()
