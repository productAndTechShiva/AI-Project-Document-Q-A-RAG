import chromadb
import uuid

client = chromadb.PersistentClient(
    path="./chroma_storage"
)

def get_collection():
    return client.get_or_create_collection(
        name="documents"
    )


def store_chunks(
    chunks: list[str],
    embeddings: list[list[float]]
):
    collection = get_collection()

    ids = [
        str(uuid.uuid4())
        for _ in chunks
    ]

    collection.add(
        ids=ids,
        documents=chunks,
        embeddings=embeddings
    )


def get_document_count():
    collection = get_collection()

    return collection.count()


def search_chunks(
    query_embedding: list[float],
    n_results: int = 3
):
    collection = get_collection()

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results
    )

    return results