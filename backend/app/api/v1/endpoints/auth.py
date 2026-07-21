from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.auth import UserRegister, UserLogin, Token, RefreshTokenRequest, UserResponse
from app.services.auth_service import auth_service
from app.dependencies.auth import get_current_user
from app.models.user import User

router = APIRouter()

@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
def register(user_in: UserRegister, db: Session = Depends(get_db)):
    """Registers a new user (Farmer, Agronomist, Researcher, Admin) and returns JWT tokens."""
    return auth_service.register_user(db, user_in)

@router.post("/login", response_model=Token)
def login(login_in: UserLogin, db: Session = Depends(get_db)):
    """Authenticates user credentials and returns JWT access & refresh tokens."""
    return auth_service.login_user(db, login_in)

@router.post("/refresh", response_model=Token)
def refresh_token(req: RefreshTokenRequest, db: Session = Depends(get_db)):
    """Generates a new access token using a valid refresh token."""
    return auth_service.refresh_access_token(db, req.refresh_token)

@router.get("/me", response_model=UserResponse)
def get_user_profile(current_user: User = Depends(get_current_user)):
    """Returns the authenticated user's profile."""
    return current_user
