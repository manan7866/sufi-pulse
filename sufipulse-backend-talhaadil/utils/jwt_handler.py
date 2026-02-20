from datetime import datetime, timedelta
from jose import JWTError, jwt
import os
from dotenv import load_dotenv
from datetime import timezone
from fastapi import Depends, HTTPException, Header
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
security = HTTPBearer()

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env.local'))

SECRET_KEY = os.getenv('JWT_SECRET', 'your_default')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60
REFRESH_TOKEN_EXPIRE_DAYS = 7

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def create_refresh_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

from fastapi import Depends, HTTPException, status

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token payload")

    return user_id


def get_current_user_optional(authorization: str | None = Header(None)) -> int | None:
    """
    Optional authentication - returns user_id if valid token provided, None otherwise.
    This allows endpoints to work for both authenticated and non-authenticated users.
    """
    if not authorization:
        return None
    
    # Extract token from "Bearer <token>" format
    try:
        # Handle both "Bearer token" and direct token
        token = authorization
        if authorization.startswith("Bearer "):
            token = authorization.split(" ")[1]
        
        print(f"Extracting token: {token[:20]}...")
        payload = verify_token(token)
        print(f"Token payload: {payload}")
        
        if payload:
            user_id = payload.get("sub")
            if user_id:
                print(f"User ID extracted: {user_id}")
                return int(user_id)
    except Exception as e:
        print(f"Error in get_current_user_optional: {e}")
        import traceback
        traceback.print_exc()
        pass
    
    return None
