import os
from dotenv import load_dotenv
import psycopg2
from psycopg2.extras import DictCursor

# Load environment variables from .env file
load_dotenv()

print("DATABASE_URL:", os.getenv("DATABASE_URL"))
class DBConnection:
    """
    Manages a single global DB connection using psycopg (PostgreSQL).
    """
    _connection = None

    @classmethod
    def get_connection(cls):
        if cls._connection is None or cls._connection.closed:
            try:
                database_url = os.getenv("DATABASE_URL")
                print("Attempting to connect with DATABASE_URL:", database_url)
                cls._connection = psycopg2.connect(
                    database_url,
                    cursor_factory=DictCursor
                )
                print("Database connected.")
            except psycopg2.Error as e:
                print("Error connecting to database:", e)
                raise e
        return cls._connection

    @classmethod
    def get_cursor(cls):
        return cls.get_connection().cursor()

    @classmethod
    def close_connection(cls):
        if cls._connection and not cls._connection.closed:
            cls._connection.close()
            print("Database connection closed.")
            cls._connection = None
