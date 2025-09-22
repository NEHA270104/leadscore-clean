# server/db.py
from google.cloud.sql.connector import Connector
import sqlalchemy

# Initialize connector
connector = Connector()

def getconn():
    conn = connector.connect(
        "your-project:your-region:your-instance",  # e.g. "myproject:us-central1:leadscore-db"
        "pg8000",
        user="your-db-user",
        password="your-db-password",
        db="your-db-name"
    )
    return conn

# SQLAlchemy engine (used everywhere in your backend)
engine = sqlalchemy.create_engine(
    "postgresql+pg8000://",
    creator=getconn,
)
