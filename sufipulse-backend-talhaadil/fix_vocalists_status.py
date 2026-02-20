#!/usr/bin/env python3
"""
Fix for missing status column in vocalists table
This script adds the status column if it doesn't exist.
"""

import os
import sys
from dotenv import load_dotenv
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

def main():
    print("=" * 70)
    print("FIXING VOCALISTS TABLE - ADDING STATUS COLUMN")
    print("=" * 70)

    # Load environment
    load_dotenv(override=True)
    DATABASE_URL = os.getenv("DATABASE_URL")

    if not DATABASE_URL:
        print("[ERROR] DATABASE_URL not found in .env")
        sys.exit(1)

    print(f"\nDatabase: {DATABASE_URL.split('@')[1].split('?')[0] if '@' in DATABASE_URL else 'N/A'}")

    # Connect
    try:
        print("\nConnecting to database...")
        conn = psycopg2.connect(DATABASE_URL)
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursor = conn.cursor()
        print("[OK] Connected successfully!")
    except Exception as e:
        print(f"[ERROR] Connection failed: {e}")
        sys.exit(1)

    # Check if status column exists
    print("\nChecking if status column exists in vocalists table...")
    cursor.execute("""
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'vocalists' 
        AND column_name = 'status';
    """)
    
    result = cursor.fetchone()
    
    if result:
        print("[INFO] Column 'status' already exists in vocalists table.")
    else:
        print("[INFO] Column 'status' does not exist. Adding it now...")
        
        # Add status column
        try:
            cursor.execute("""
                ALTER TABLE public.vocalists 
                ADD COLUMN status character varying(50) DEFAULT 'pending'::character varying;
            """)
            print("[OK] Added status column with DEFAULT 'pending'")
        except Exception as e:
            print(f"[WARN] Could not add status column: {e}")
        
        # Add status check constraint
        try:
            cursor.execute("""
                ALTER TABLE public.vocalists 
                ADD CONSTRAINT vocalists_status_check 
                CHECK (((status)::text = ANY ((ARRAY[
                    'pending'::character varying, 
                    'approved'::character varying, 
                    'rejected'::character varying
                ])::text[])));
            """)
            print("[OK] Added vocalists_status_check constraint")
        except Exception as e:
            print(f"[WARN] Could not add status check constraint: {e}")
    
    # Verify the column exists now
    print("\nVerifying vocalists table structure...")
    cursor.execute("""
        SELECT column_name, data_type, column_default
        FROM information_schema.columns
        WHERE table_schema = 'public' 
        AND table_name = 'vocalists'
        ORDER BY ordinal_position;
    """)
    
    columns = cursor.fetchall()
    print(f"\nColumns in vocalists table ({len(columns)}):")
    for col in columns:
        default_info = f" DEFAULT {col[2]}" if col[2] else ""
        print(f"  - {col[0]}: {col[1]}{default_info}")
    
    # Check if status column is in the list
    status_exists = any(col[0] == 'status' for col in columns)
    
    cursor.close()
    conn.close()

    print("\n" + "=" * 70)
    if status_exists:
        print("SUCCESS! The 'status' column has been added to the vocalists table.")
        print("You can now register as a vocalist without errors.")
    else:
        print("WARNING: The 'status' column may already exist or there was an issue.")
        print("Please check the database manually if problems persist.")
    print("=" * 70)

if __name__ == "__main__":
    main()
