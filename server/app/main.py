from fastapi import FastAPI
from sqlalchemy import text

from app.database import engine

app = FastAPI(
    title="CivicFix API",
    description="Smart Civic Complaint Management System",
    version="1.0.0"
)


@app.get("/")
def home():
    return {
        "message": "Welcome to CivicFix API"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


@app.get("/db-test")
def database_test():

    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "message": "PostgreSQL connected successfully!",
            "status": "healthy"
        }

    except Exception as e:
        return {
            "message": "Database connection failed",
            "error": str(e)
        }