from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.repositories.user_repository import user_repository
from app.schemas.auth import UserRegister, UserLogin, Token
from app.core.security import verify_password, get_password_hash, create_access_token, create_refresh_token, decode_token

class AuthService:
    def register_user(self, db: Session, user_in: UserRegister) -> Token:
        existing_user = user_repository.get_by_email(db, user_in.email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email address already registered."
            )
            
        hashed_pwd = get_password_hash(user_in.password)
        new_user_dict = {
            "email": user_in.email,
            "hashed_password": hashed_pwd,
            "full_name": user_in.full_name,
            "role": user_in.role or "farmer",
            "state": user_in.state or "Odisha",
            "district": user_in.district or "Khordha",
            "is_active": True
        }
        
        user = user_repository.create(db, new_user_dict)
        access_token = create_access_token(user.id, role=user.role)
        refresh_token = create_refresh_token(user.id)
        
        return Token(
            access_token=access_token,
            refresh_token=refresh_token,
            role=user.role,
            user_id=user.id,
            full_name=user.full_name
        )

    def login_user(self, db: Session, login_in: UserLogin) -> Token:
        user = user_repository.get_by_email(db, login_in.email)
        if not user or not verify_password(login_in.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials."
            )
            
        access_token = create_access_token(user.id, role=user.role)
        refresh_token = create_refresh_token(user.id)
        
        return Token(
            access_token=access_token,
            refresh_token=refresh_token,
            role=user.role,
            user_id=user.id,
            full_name=user.full_name
        )

    def refresh_access_token(self, db: Session, refresh_token_str: str) -> Token:
        payload = decode_token(refresh_token_str)
        if not payload or payload.get("type") != "refresh":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired refresh token."
            )
            
        user_id = int(payload.get("sub"))
        user = user_repository.get(db, user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found.")
            
        access_token = create_access_token(user.id, role=user.role)
        new_refresh = create_refresh_token(user.id)
        
        return Token(
            access_token=access_token,
            refresh_token=new_refresh,
            role=user.role,
            user_id=user.id,
            full_name=user.full_name
        )

auth_service = AuthService()
