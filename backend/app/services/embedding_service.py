# app/services/embedding_service.py

import ollama

from app.config import EMBEDDING_MODEL


def generate_embedding(text: str) -> list[float]:
    """
    Generate embedding vector for text.
    """

    if not text.strip():
        raise ValueError("Text cannot be empty")

    response = ollama.embeddings(
        model=EMBEDDING_MODEL,
        prompt=text
    )

    return response["embedding"]


def generate_embeddings(
    chunks: list[str]
) -> list[list[float]]:
    """
    Generate embeddings for all chunks.
    """

    embeddings = []

    for chunk in chunks:
        embedding = generate_embedding(
            chunk
        )

        embeddings.append(
            embedding
        )

    return embeddings