from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Any
from engine import run_full_pipeline

router = APIRouter()

class VibeRequest(BaseModel):
    user_message: str
    category: str
    vibe_tags: List[str]
    chat_history: List[Any]

@router.post("/get_vibe")
async def get_vibe(data: VibeRequest):
    vibe_cards, agent_answer = await run_full_pipeline(
        data.user_message, data.category, data.vibe_tags, data.chat_history
    )
    return {"vibe_cards": vibe_cards, "agent_answer": agent_answer}
