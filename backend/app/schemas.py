from pydantic import BaseModel
from typing import List, Optional, Any
from datetime import datetime

class QuizRequest(BaseModel):
    url: str

class QuizResponse(BaseModel):
    id: int
    url: str
    title: str
    summary: str
    sections: List[str]
    key_entities: Any
    quiz: List[Any]
    related_topics: List[str]
    created_at: Optional[datetime]

    class Config:
        from_attributes = True

class HistoryItem(BaseModel):
    id: int
    url: str
    title: str
    created_at: Optional[datetime]

    class Config:
        from_attributes = True