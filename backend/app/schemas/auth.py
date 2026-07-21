from pydantic import BaseModel, EmailStr
from typing import Optional

class UserRegister(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    role: Optional[str] = "farmer"
    state: Optional[str] = "Odisha"
    district: Optional[str] = "Khordha"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    role: str
    user_id: int
    full_name: str

class RefreshTokenRequest(BaseModel):
    refresh_token: str

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    role: str
    state: Optional[str]
    district: Optional[str]
    is_active: bool

    class Config:
        from_attributes = True
