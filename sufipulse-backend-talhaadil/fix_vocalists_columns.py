#!/usr/bin/env python3
"""
Fix for missing columns in vocalists table
This script adds the required columns for the vocalist profile feature.
"""

import os
import sys
from dotenv import load_dotenv
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

def main():
    print("=" * 70)
    print("FIXING VOCALISTS TABLE - ADDING MISSING COLUMNS")
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

    # List of required columns and their types
    required_columns = {
        'vocal_range': 'character varying(100)',
        'languages': 'text[]',
        'sample_title': 'character varying(255)',
        'audio_sample_url': 'text',
        'sample_description': 'text',
        'experience_background': 'text',
        'portfolio': 'text',
        'availability': 'text'
    }

    # Check which columns exist
    print("\nChecking existing columns in vocalists table...")
    cursor.execute("""
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'vocalists'
        ORDER BY column_name;
    """)
    
    existing_columns = [row[0] for row in cursor.fetchall()]
    print(f"Existing columns: {', '.join(existing_columns)}")

    # Add missing columns
    print("\nAdding missing columns...")
    for col_name, col_type in required_columns.items():
        if col_name not in existing_columns:
            try:
                if col_type == 'text[]':
                    cursor.execute(f"""
                        ALTER TABLE public.vocalists 
                        ADD COLUMN {col_name} {col_type} DEFAULT '{{}}'::text[];
                    """)
                else:
                    cursor.execute(f"""
                        ALTER TABLE public.vocalists 
                        ADD COLUMN {col_name} {col_type};
                    """)
                print(f"  [OK] Added column '{col_name}' ({col_type})")
            except Exception as e:
                print(f"  [WARN] Could not add column '{col_name}': {e}")
        else:
            print(f"  [SKIP] Column '{col_name}' already exists")

    # Verify the final structure
    print("\nVerifying final vocalists table structure...")
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

    # Check if all required columns exist
    final_column_names = [col[0] for col in columns]
    all_required_exist = all(col in final_column_names for col in required_columns.keys())

    cursor.close()
    conn.close()

    print("\n" + "=" * 70)
    if all_required_exist:
        print("SUCCESS! All required columns have been added to the vocalists table.")
        print("You can now submit vocalist profiles without errors.")
    else:
        print("WARNING: Some columns may be missing. Please check the database manually.")
    print("=" * 70)

if __name__ == "__main__":
    main()
