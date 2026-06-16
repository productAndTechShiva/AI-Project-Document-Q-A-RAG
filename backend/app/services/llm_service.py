# app/services/llm_service.py

import ollama

from app.config import LLM_MODEL


def ask_llm(prompt: str) -> str:
    """
    Send a prompt to Llama and return the response.
    """

    response = ollama.chat(
        model=LLM_MODEL,
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
    )

    return response["message"]["content"]