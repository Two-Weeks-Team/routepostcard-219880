from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from typing import List, Optional
from models import SessionLocal, Postcard, Item
from ai_service import call_inference

router = APIRouter()

# Dependency that yields a DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --------------------
#   Plan endpoint
# --------------------
class PlanRequest(BaseModel):
    query: str = Field(..., description="City brief supplied by the user")
    preferences: Optional[str] = Field(None, description="Optional weather/mood preferences")

class PlanResponse(BaseModel):
    summary: str
    items: List[dict]
    score: Optional[float] = None

@router.post("/plan", response_model=PlanResponse)
async def generate_plan(req: PlanRequest, db: SessionLocal = Depends(get_db)):
    system_msg = {"role": "system", "content": "You generate a concise JSON travel itinerary based on a city brief and user preferences. Return keys: summary (string), items (list of {title, description, day}), score (float optional)."}
    user_msg = {"role": "user", "content": f"Brief: {req.query}\nPreferences: {req.preferences or 'none'}"}
    ai_result = await call_inference([system_msg, user_msg])
    summary = ai_result.get("summary", "")
    items = ai_result.get("items", [])
    score = ai_result.get("score")
    # Persist the postcard and its items
    postcard = Postcard(city=req.query, brief=req.query, summary=summary, data=ai_result)
    db.add(postcard)
    db.flush()  # assign ID
    for itm in items:
        title = itm.get("title", "Untitled")
        description = itm.get("description", "")
        day = itm.get("day")
        item = Item(postcard_id=postcard.id, title=title, description=description, day=day)
        db.add(item)
    db.commit()
    db.refresh(postcard)
    return PlanResponse(summary=summary, items=items, score=score)

# --------------------
#   Insights endpoint
# --------------------
class InsightsRequest(BaseModel):
    selection: str = Field(..., description="User‑selected item or theme")
    context: Optional[str] = Field(None, description="Additional context for the insight request")

class InsightsResponse(BaseModel):
    insights: List[str]
    next_actions: List[str]
    highlights: List[str]

@router.post("/insights", response_model=InsightsResponse)
async def get_insights(req: InsightsRequest, db: SessionLocal = Depends(get_db)):
    system_msg = {"role": "system", "content": "Provide structured insights, suggested next actions, and highlights based on a selection and optional context. Return keys: insights, next_actions, highlights (all lists of strings)."}
    user_msg = {"role": "user", "content": f"Selection: {req.selection}\nContext: {req.context or 'none'}"}
    ai_result = await call_inference([system_msg, user_msg])
    insights = ai_result.get("insights", [])
    next_actions = ai_result.get("next_actions", [])
    highlights = ai_result.get("highlights", [])
    return InsightsResponse(insights=insights, next_actions=next_actions, highlights=highlights)
