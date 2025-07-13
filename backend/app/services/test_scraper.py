import asyncio
import json
from datetime import datetime
from .scraper import ReviewScraper

def serialize_datetimes(obj):
    if isinstance(obj, list):
        return [serialize_datetimes(item) for item in obj]
    elif isinstance(obj, dict):
        return {k: (v.isoformat() if isinstance(v, datetime) else serialize_datetimes(v)) for k, v in obj.items()}
    else:
        return obj

async def main(place_name):
    city = place_name
    scraper = ReviewScraper()
    print(f"Scraping restaurants and reviews for {city}... This may take a while.")
    reviews = await scraper.scrape_city_restaurants(city, max_places=100)

    filename = f"restaurant_reviews_{city.replace(' ', '_').lower()}.json"
    serializable_reviews = serialize_datetimes(reviews)
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(serializable_reviews, f, ensure_ascii=False, indent=2)

    print(f"\nFound {len(reviews)} reviews for restaurants in {city}.\n")
    for review in serializable_reviews[:5]:
        print("-----")
        print(f"Location: {review['location_name']}")
        print(f"Source: {review['source']}")
        print(f"Author: {review['author']}")
        print(f"Date: {review['date']}")
        print(f"Text: {review['text'][:200]}...")
        print(f"URL: {review['source_url']}")
        print("-----\n")

    # Properly close Reddit client if it exists
    if hasattr(scraper.sources['reddit'], 'close'):
        await scraper.sources['reddit'].close()

if __name__ == "__main__":
    asyncio.run(main())
