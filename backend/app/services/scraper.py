import logging
from typing import List
from .reddit_scraper import RedditScraper
from .google_maps_scraper import GoogleMapsScraper

logger = logging.getLogger(__name__)

class ReviewScraper:
    def __init__(self):
        self.sources = {
            'google_maps': GoogleMapsScraper(),
            'reddit': RedditScraper()
        }

    async def scrape_city_restaurants(self, city: str, max_places: int = 100) -> List[dict]:
        category = "restaurant"
        reviews = []
        # Google Maps (sync)
        try:
            gmaps_reviews = self.sources['google_maps'].scrape(city, category, max_places=max_places)
            reviews.extend(gmaps_reviews)
        except Exception as e:
            logger.error(f"Error scraping google_maps: {e}")
        # Reddit (async)
        try:
            reddit_reviews = await self.sources['reddit'].scrape(city, category)
            reviews.extend(reddit_reviews)
        except Exception as e:
            logger.error(f"Error scraping reddit: {e}")
        return reviews
