from typing import Optional
from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.affiliate import Affiliate
from app.schemas.affiliate import AffiliateCreate, AffiliateUpdate

class CRUDAffiliate(CRUDBase[Affiliate, AffiliateCreate, AffiliateUpdate]):
    def get_by_cedula(self, db: Session, cedula: str) -> Optional[Affiliate]:
        return db.query(Affiliate).filter(Affiliate.cedula == cedula).first()

affiliate = CRUDAffiliate(Affiliate)