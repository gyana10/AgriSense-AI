# Architecture & Software Engineering - AgriSense AI

AgriSense AI adheres strictly to Clean Architecture, SOLID Principles, and decoupled component design.

```
                    ┌─────────────────────────┐
                    │  React + Vite Frontend  │
                    └────────────┬────────────┘
                                 │ HTTP (JWT Bearer)
                    ┌────────────▼────────────┐
                    │ FastAPI API Router (/v1)│
                    └────────────┬────────────┘
                                 │
           ┌─────────────────────┼─────────────────────┐
           │                     │                     │
┌──────────▼──────────┐ ┌────────▼──────────┐ ┌────────▼──────────┐
│ Service Layer       │ │ ML Model Loaders  │ │ Repository Layer  │
│ (Business Logic)    │ │ (CatBoost, YOLO)  │ │ (SQLAlchemy DAL)  │
└─────────────────────┘ └───────────────────┘ └────────┬──────────┘
                                                       │
                                              ┌────────▼──────────┐
                                              │ SQLite / Postgres │
                                              └───────────────────┘
```

## Software Principles Applied
1. **Single Responsibility (SRP)**: Endpoints only handle HTTP transport. Business logic is strictly contained inside `app/services/`. Data operations are strictly handled by `app/repositories/`.
2. **Open/Closed Principle (OCP)**: Machine learning models inherit from common abstraction layers in `ai_models/common/`. New algorithms (e.g. LightGBM, CatBoost) can be plugged in without mutating consumer code.
3. **Dependency Inversion (DIP)**: FastAPI Dependency Injection injects database sessions and current user context into service methods.
