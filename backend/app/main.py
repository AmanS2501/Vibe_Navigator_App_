from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import router

app = FastAPI(
    title="Vibe Navigator API",
    description="Backend for Vibe Navigator AI engine",
    version="1.0.0"
)

app.include_router(router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
