# services/google_maps_scraper.py

import os
import logging
import requests
from datetime import datetime
from typing import List
from .base import Review
from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger(__name__)

class GoogleMapsScraper:
    def __init__(self):
        self.api_key = os.getenv("GOOGLE_PLACES_API_KEY")
        if not self.api_key:
            raise ValueError("Missing GOOGLE_PLACES_API_KEY in environment variables.")

    def get_place_ids(self, city: str, category: str = "restaurant", max_places: int = 100) -> List[str]:
        """Get place_ids for restaurants in the city using Places API Text Search."""
        place_ids = []
        url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
        params = {
            "query": f"{category}s in {city}",
            "type": category,
            "key": self.api_key,
            "language": "en"
        }
        while len(place_ids) < max_places and url:
            resp = requests.get(url, params=params)
            data = resp.json()
            for result in data.get("results", []):
                place_ids.append(result["place_id"])
                if len(place_ids) >= max_places:
                    break
            # Handle pagination
            next_page_token = data.get("next_page_token")
            if next_page_token and len(place_ids) < max_places:
                import time
                time.sleep(2)  # Google requires a short delay before using next_page_token
                params = {
                    "pagetoken": next_page_token,
                    "key": self.api_key
                }
                url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
            else:
                break
        return place_ids

    def get_place_details_and_reviews(self, place_id: str, city: str, category: str) -> List[dict]:
        """Get detailed info and reviews for a single place."""
        url = "https://maps.googleapis.com/maps/api/place/details/json"
        params = {
            "place_id": place_id,
            "fields": "name,formatted_address,url,reviews",
            "key": self.api_key,
            "language": "en"
        }
        resp = requests.get(url, params=params)
        data = resp.json()
        result = data.get("result", {})
        reviews = []
        location_name = result.get("name")
        address = result.get("formatted_address")
        source_url = result.get("url")
        for r in result.get("reviews", []):
            try:
                review = Review(
                    id=f"gmap_{place_id}_{r.get('author_name','')}_{r.get('time',0)}",
                    location_name=location_name,
                    city=city,
                    category=category,
                    text=r.get("text", ""),
                    rating=float(r.get("rating", 0)),
                    author=r.get("author_name"),
                    date=datetime.fromtimestamp(r.get("time")),
                    source="google_maps",
                    source_url=source_url,
                    helpful_count=r.get("rating", 0)
                ).dict()
                # Only add reviews with substantial text
                if review["text"] and len(review["text"]) > 20:
                    reviews.append(review)
            except Exception as e:
                logger.error(f"Error parsing review for place_id={place_id}: {e}")
        return reviews

    def scrape(self, city: str, category: str = "restaurant", max_places: int = 100) -> List[dict]:
        """Get reviews for all restaurants in the city."""
        all_reviews = []
        place_ids = self.get_place_ids(city, category, max_places)
        logger.info(f"Found {len(place_ids)} places in {city}")
        for place_id in place_ids:
            reviews = self.get_place_details_and_reviews(place_id, city, category)
            all_reviews.extend(reviews)
        return all_reviews
