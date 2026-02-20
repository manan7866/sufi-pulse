"""
Simple script to apply blog engagement schema
Run this from the sufipulse-backend-talhaadil directory:
    python apply_blog_engagement_schema.py
"""

import psycopg2
from dotenv import load_dotenv
import os
import sys

# Set UTF-8 encoding for Windows console
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

load_dotenv()

# Database configuration
DB_CONFIG = {
    'dbname': os.getenv('DB_NAME', 'sufipulse'),
    'user': os.getenv('DB_USER', 'postgres'),
    'password': os.getenv('DB_PASSWORD', 'postgres'),
    'host': os.getenv('DB_HOST', 'localhost'),
    'port': os.getenv('DB_PORT', '5432'),
}

def main():
    print("=" * 60)
    print("BLOG ENGAGEMENT SCHEMA SETUP")
    print("=" * 60)
    print(f"\nConnecting to database: {DB_CONFIG['dbname']}@{DB_CONFIG['host']}")
    
    try:
        # Connect to database
        conn = psycopg2.connect(**DB_CONFIG)
        conn.autocommit = False
        cursor = conn.cursor()
        
        print("[OK] Database connected successfully!")
        
        # Read schema file
        print("\nReading schema file...")
        with open('sql/blog_engagement_schema.sql', 'r', encoding='utf-8') as f:
            schema_sql = f.read()
        
        # Execute schema
        print("Applying schema to database...")
        cursor.execute(schema_sql)
        
        print("[OK] Schema applied successfully!")
        
        # Commit changes
        conn.commit()
        print("[OK] Changes committed to database")
        
        print("\n" + "=" * 60)
        print("BLOG ENGAGEMENT SCHEMA SETUP COMPLETE!")
        print("=" * 60)
        print("\nTables created:")
        print("   - blog_views")
        print("   - blog_likes")
        print("   - blog_comments")
        print("   - blog_shares")
        print("\nColumns added to blog_submissions:")
        print("   - view_count")
        print("   - like_count")
        print("   - comment_count")
        print("\nYou can now use the blog engagement features!")
        print("=" * 60)
        
    except psycopg2.OperationalError as e:
        print(f"\n[ERROR] Database connection failed: {e}")
        print("\nMake sure:")
        print("   1. PostgreSQL is running")
        print("   2. Database credentials in .env.local are correct")
        print("   3. The database exists")
        return 1
    except FileNotFoundError as e:
        print(f"\n[ERROR] Schema file not found: {e}")
        print("\nMake sure you're running this from the sufipulse-backend-talhaadil directory")
        return 1
    except Exception as e:
        print(f"\n[ERROR] Error: {e}")
        if conn:
            conn.rollback()
            print("Changes rolled back")
        return 1
    finally:
        if conn:
            conn.close()
            print("\nDatabase connection closed")
    
    return 0

if __name__ == "__main__":
    exit(main())
