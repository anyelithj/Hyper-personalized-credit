from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.session import get_db
from app.crud.crud_user import user as crud_user
from app.schemas.user import User, UserCreate

router = APIRouter()

@router.post("/", response_model=User)
def crear_usuario(datos: UserCreate, db: Session = Depends(get_db)):
    existente = crud_user.get_by_email(db, email=datos.email)
    if existente:
        raise HTTPException(status_code=400, detail="Ya existe un usuario con ese correo")
    return crud_user.create(db, obj_in=datos)

@router.get("/me", response_model=User)
def obtener_usuario_actual(current_user=Depends(get_current_user)):
    return current_user