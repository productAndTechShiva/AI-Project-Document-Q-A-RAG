# app/services/rag_service.py

from app.services.embedding_service import (
    generate_embedding
)

from app.services.vector_service import (
    search_chunks
)

from app.services.llm_service import (
    ask_llm
)


def answer_question(
    question: str
):
    """
    Full RAG pipeline.
    """

    query_embedding = generate_embedding(
        question
    )

    results = search_chunks(
        query_embedding
    )

    documents = results["documents"][0]

    context = "\n\n".join(
        documents
    )

    prompt = f"""
You are a helpful document question answering assistant.

Rules:

1. Answer only from the provided context.
2. Do not use outside knowledge.
3. If the answer is not found, say:
   "I could not find that information in the document."
4. Keep answers concise.

Context:
{context}

Question:
{question}

Answer:
"""

    answer = ask_llm(prompt)

    # return {
    #     "answer": answer,
    #     "context": documents
    # }

    return {
    "question": question,
    "retrieved_chunks": len(documents),
    "context": documents,
    "answer": answer
}