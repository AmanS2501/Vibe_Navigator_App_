from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain_chroma import Chroma 
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_groq import ChatGroq
import os
import warnings


warnings.filterwarnings("ignore", category=DeprecationWarning)

class VibeAgent:
    def __init__(self, persist_directory: str = "chroma_db"):
        try:
            self.llm = ChatGroq(
                groq_api_key=os.getenv("GROQ_API_KEY"),
                model_name="mixtral-8x7b-32768"
            )
            print("[INFO] ChatGroq LLM initialized successfully.")
        except Exception as e:
            print(f"[ERROR] Failed to initialize ChatGroq: {e}")
            self.llm = None
            
        try:
            self.embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
            print("[INFO] HuggingFace embeddings initialized successfully.")
        except Exception as e:
            print(f"[ERROR] Failed to initialize embeddings: {e}")
            self.embeddings = None
            
        try:
            self.vectorstore = Chroma(
                collection_name="reviews",
                embedding_function=self.embeddings,
                persist_directory=persist_directory
            )
            print("[INFO] Chroma vectorstore initialized successfully.")
        except Exception as e:
            print(f"[ERROR] Failed to initialize vectorstore: {e}")
            self.vectorstore = None
            
        try:
            self.memory = ConversationBufferMemory(
                memory_key="chat_history", 
                return_messages=True
            )
            print("[INFO] Conversation memory initialized successfully.")
        except Exception as e:
            print(f"[ERROR] Failed to initialize memory: {e}")
            self.memory = None
            
        # Only create chain if all components are available
        if all([self.llm, self.vectorstore, self.memory]):
            try:
                self.chain = ConversationalRetrievalChain.from_llm(
                    llm=self.llm,
                    retriever=self.vectorstore.as_retriever(),
                    memory=self.memory,
                    return_source_documents=True
                )
                print("[INFO] ConversationalRetrievalChain initialized successfully.")
            except Exception as e:
                print(f"[ERROR] Failed to initialize chain: {e}")
                self.chain = None
        else:
            self.chain = None
            print("[WARNING] Chain not initialized due to missing components.")

    def chat(self, user_message: str) -> str:
        if not self.chain:
            return "Sorry, the AI agent is not properly initialized. Please check the configuration."
            
        try:
            result = self.chain({"question": user_message})
            answer = result["answer"]
            sources = result.get("source_documents", [])
            
            if sources:
                citations = "\n".join([f"- {doc.page_content[:100]}..." for doc in sources])
                return f"{answer}\n\nCitations:\n{citations}"
            else:
                return answer
                
        except Exception as e:
            print(f"[ERROR] Chat failed: {e}")
            return f"Sorry, I encountered an error: {str(e)}"