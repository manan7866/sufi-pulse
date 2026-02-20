#!/usr/bin/env python3
"""
Fix for vocalists table - Drop old unused columns
The table has old columns that conflict with the expected schema.
"""

import os
import sys
from dotenv import load_dotenv
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

def main():
    print("=" * 70)
    print("FIXING VOCALISTS TABLE - DROPPING OLD UNUSED COLUMNS")
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

    # Old columns that need to be dropped (not in the expected schema)
    old_columns = [
        'name', 'email', 'phone', 'location', 'country', 
        'specialization', 'experience_level', 'available_for_recording', 
        'profile_image_url', 'social_links'
    ]

    # Get current columns
    print("\nChecking current columns in vocalists table...")
    cursor.execute("""
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'vocalists'
        ORDER BY column_name;
    """)
    
    current_columns = [row[0] for row in cursor.fetchall()]
    print(f"Current columns: {', '.join(current_columns)}")

    # Drop old columns
    print("\nDropping old unused columns...")
    for col_name in old_columns:
        if col_name in current_columns:
            try:
                cursor.execute(f"""
                    ALTER TABLE public.vocalists 
                    DROP COLUMN {col_name};
                """)
                print(f"  [OK] Dropped column '{col_name}'")
            except Exception as e:
                print(f"  [WARN] Could not drop column '{col_name}': {e}")
        else:
            print(f"  [SKIP] Column '{col_name}' does not exist")

    # Verify the final structure
    print("\nVerifying final vocalists table structure...")
    cursor.execute("""
        SELECT column_name, data_type, column_default, is_nullable
        FROM information_schema.columns
        WHERE table_schema = 'public' 
        AND table_name = 'vocalists'
        ORDER BY ordinal_position;
    """)
    
    columns = cursor.fetchall()
    print(f"\nColumns in vocalists table ({len(columns)}):")
    for col in columns:
        nullable = "NULL" if col[3] == "YES" else "NOT NULL"
        default_info = f" DEFAULT {col[2]}" if col[2] else ""
        print(f"  - {col[0]}: {col[1]} ({nullable}){default_info}")

    # Expected columns
    expected_columns = [
        'id', 'user_id', 'vocal_range', 'languages', 'sample_title',
        'audio_sample_url', 'sample_description', 'experience_background',
        'portfolio', 'availability', 'status', 'created_at', 'updated_at'
    ]
    
    final_column_names = [col[0] for col in columns]
    all_expected_exist = all(col in final_column_names for col in expected_columns)
    no_old_columns = all(col not in final_column_names for col in old_columns)

    cursor.close()
    conn.close()

    print("\n" + "=" * 70)
    if all_expected_exist and no_old_columns:
        print("SUCCESS! The vocalists table now matches the expected schema.")
        print("You can now submit vocalist profiles without errors.")
    else:
        print("WARNING: Table structure may still have issues.")
        print(f"  All expected columns exist: {all_expected_exist}")
        print(f"  No old columns remain: {no_old_columns}")
    print("=" * 70)

if __name__ == "__main__":
    main()
