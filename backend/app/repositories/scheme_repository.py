from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.scheme import Scheme, SchemeBookmark
from app.repositories.base import BaseRepository

class SchemeRepository(BaseRepository[Scheme]):
    def __init__(self):
        super().__init__(Scheme)

    def search_schemes(self, db: Session, query: str = None, category: str = None) -> List[Scheme]:
        q = db.query(Scheme)
        if category and category != "All":
            q = q.filter(Scheme.category == category)
        if query:
            q = q.filter(
                (Scheme.title.ilike(f"%{query}%")) |
                (Scheme.short_description.ilike(f"%{query}%"))
            )
        return q.all()

scheme_repo = SchemeRepository()
