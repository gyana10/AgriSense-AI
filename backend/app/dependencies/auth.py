from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.core.security import decode_token
from app.repositories.user_repository import user_repository
from app.models.user import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    payload = decode_token(token)
    if not payload or payload.get("type") != "access":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user_id = int(payload.get("sub"))
    user = user_repository.get(db, user_id)
    if not user or not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive or non-existent user")
    return user

def require_role(allowed_roles: list):
    def role_checker(current_user: User = Depends(get_current_user)):
        if current_user.role not in allowed_roles and not current_user.is_superuser:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Operation not permitted for role '{current_user.role}'."
            )
        return current_user
    return role_checker
