from fastapi import APIRouter
from app.schemas.system import AssistantRequest, AssistantResponse
from app.services.assistant_service import assistant_service

router = APIRouter()

@router.post("/chat", response_model=AssistantResponse)
def chat_with_assistant(req: AssistantRequest):
    """Context-aware AI farming assistant answering questions using LangChain and RAG knowledge base."""
    return assistant_service.answer_farming_question(req.question, req.context)
