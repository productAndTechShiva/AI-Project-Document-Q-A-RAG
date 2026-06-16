# app/schemas/chat.py

from pydantic import BaseModel


class ChatRequest(BaseModel):
    prompt: str