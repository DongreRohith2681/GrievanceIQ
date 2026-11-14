from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.utils.security import verify_access_token


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    user_id = verify_access_token(token)

    current_user = db.query(User).filter(
        User.id == int(user_id)
    ).first()

    if not current_user:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    if not current_user.is_active:
        raise HTTPException(
            status_code=403,
            detail="Account is inactive"
        )

    return current_user