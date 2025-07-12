# services/rag_service.py

from typing import List, Dict, Any
from embedding import EmbeddingService
from vector_db import VectorDB

class RAGService:
    def __init__(self):
        self.embedding_service = EmbeddingService()
        self.vector_db = VectorDB()

    def retrieve_relevant_reviews(self, query: str, limit: int = 10) -> List[Dict[str, Any]]:
        query_embedding = self.embedding_service.generate_embeddings([query])[0]
        return self.vector_db.similarity_search(query_embedding, n_results=limit)
