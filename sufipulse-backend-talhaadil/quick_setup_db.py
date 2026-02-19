#!/usr/bin/env python3
"""
Quick Setup Script for Neon Database
Creates all necessary tables using the DATABASE_URL
"""

import os
import sys
from dotenv import load_dotenv
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

def setup_database():
    """Setup the database with all tables."""
    print("=" * 60)
    print("NEON DATABASE SETUP")
    print("=" * 60)
    
    # Load environment variables
    load_dotenv(dotenv_path='.env')
    
    database_url = os.getenv("DATABASE_URL")
    
    if not database_url:
        print("[ERROR] DATABASE_URL is not set in your .env file")
        sys.exit(1)
    
    print(f"Using DATABASE_URL: {database_url[:50]}...")
    print()
    
    # Connect to the database
    try:
        conn = psycopg2.connect(database_url)
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursor = conn.cursor()
        print("[OK] Connected to database successfully!")
    except Exception as e:
        print(f"[ERROR] Could not connect to database: {str(e)}")
        sys.exit(1)
    
    # Read and execute SQL files
    sql_files = [
        'schema.sql',
        'create_recording_tables.sql',
        'create_youtube_videos_table.sql',
    ]
    
    for sql_file in sql_files:
        if not os.path.exists(sql_file):
            print(f"[WARNING] {sql_file} not found, skipping...")
            continue
            
        print(f"\nExecuting {sql_file}...")
        
        try:
            with open(sql_file, 'r', encoding='utf-8') as f:
                sql_content = f.read()
            
            # Execute the entire file
            cursor.execute(sql_content)
            print(f"[OK] {sql_file} executed successfully!")
            
        except psycopg2.errors.DuplicateTable as e:
            print(f"[INFO] Tables already exist in {sql_file}")
        except psycopg2.errors.DuplicateObject as e:
            print(f"[INFO] Objects already exist in {sql_file}")
        except Exception as e:
            print(f"[ERROR] Failed to execute {sql_file}: {str(e)[:200]}")
    
    print("\n" + "=" * 60)
    print("DATABASE SETUP COMPLETE!")
    print("=" * 60)
    
    cursor.close()
    conn.close()

if __name__ == "__main__":
    setup_database()
