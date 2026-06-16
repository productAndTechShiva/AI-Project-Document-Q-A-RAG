from fastapi import FastAPI
from fastapi import UploadFile
from fastapi import File
from fastapi.middleware.cors import CORSMiddleware

from app.schemas.chat import ChatRequest
from app.services.llm_service import ask_llm
from app.services.file_service import save_uploaded_file
from app.services.pdf_service import extract_text_from_pdf
from app.services.chunking_service import chunk_text
from app.services.embedding_service import generate_embedding
from app.services.embedding_service import generate_embeddings
from app.services.vector_service import store_chunks
from app.services.vector_service import (
    get_document_count
)
from app.services.vector_service import (
    search_chunks
)

from app.services.rag_service import (
    answer_question
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Document QA RAG API Running"
    }


@app.post("/test-llm")
def test_llm(request: ChatRequest):
    answer = ask_llm(request.prompt)

    return {
        "response": answer
    }


@app.post("/upload")
def upload_pdf(
    file: UploadFile = File(...)
):
    file_path = save_uploaded_file(file)

    return {
        "success": True,
        "filename": file.filename,
        "path": file_path
    }


@app.post("/extract-text")
def extract_text(file: UploadFile = File(...)):
    file_path = save_uploaded_file(file)

    text = extract_text_from_pdf(file_path)

    return {
        "filename": file.filename,
        "characters": len(text),
        "preview": text[:1000]
    }


@app.post("/chunk")
def chunk_document(
    file: UploadFile = File(...)
):
    file_path = save_uploaded_file(file)

    text = extract_text_from_pdf(
        file_path
    )

    chunks = chunk_text(text)

    return {
        "filename": file.filename,
        "total_characters": len(text),
        "total_chunks": len(chunks),
        "chunk_lengths": [
            len(c)
            for c in chunks[:5]
        ],
        "first_chunk": (
            chunks[0]
            if chunks
            else ""
        )
    }


@app.post("/embedding-test")
def embedding_test(
    request: ChatRequest
):
    embedding = generate_embedding(
        request.prompt
    )

    return {
        "text": request.prompt,
        "vector_size": len(embedding),
        "sample_values": embedding[:5]
    }


@app.post("/chunk-embeddings")
def chunk_embeddings(
    file: UploadFile = File(...)
):
    file_path = save_uploaded_file(file)

    text = extract_text_from_pdf(
        file_path
    )

    chunks = chunk_text(text)

    first_chunk = chunks[0]

    embedding = generate_embedding(
        first_chunk
    )

    return {
        "total_chunks": len(chunks),
        "first_chunk_length": len(first_chunk),
        "embedding_dimension": len(
            embedding
        )
    }



@app.post("/store-document")
def store_document(
    file: UploadFile = File(...)
):
    file_path = save_uploaded_file(
        file
    )

    text = extract_text_from_pdf(
        file_path
    )

    chunks = chunk_text(text)

    embeddings = generate_embeddings(
        chunks
    )

    store_chunks(
        chunks,
        embeddings
    )

    return {
        "success": True,
        "filename": file.filename,
        "chunks_stored": len(chunks)
    }


@app.get("/vector-count")
def vector_count():
    return {
        "stored_chunks":
        get_document_count()
    }



@app.post("/search")
def search_document(
    request: ChatRequest
):
    query_embedding = generate_embedding(
        request.prompt
    )

    results = search_chunks(
        query_embedding
    )

    return {
        "question": request.prompt,
        "documents": results["documents"][0],
        "distances": results["distances"][0]
    }



@app.post("/search-pretty")
def search_pretty(
    request: ChatRequest
):
    query_embedding = generate_embedding(
        request.prompt
    )

    results = search_chunks(
        query_embedding
    )

    documents = results["documents"][0]
    distances = results["distances"][0]

    matches = []

    for doc, distance in zip(
        documents,
        distances
    ):
        matches.append(
            {
                "distance": distance,
                "content": doc
            }
        )

    return {
        "question": request.prompt,
        "matches": matches
    }


# RAG Endpoint - AI Layer
@app.post("/ask")
def ask_document(
    request: ChatRequest
):
    result = answer_question(
        request.prompt
    )

    return result