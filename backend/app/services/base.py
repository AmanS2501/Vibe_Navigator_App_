from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from dotenv import load_dotenv
load_dotenv()

class Review(BaseModel):
    id: str
    location_name: str
    city: str
    category: str
    text: str
    rating: Optional[float]
    author: Optional[str]
    date: datetime
    source: str
    source_url: str
    helpful_count: int = 0
