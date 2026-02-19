#!/usr/bin/env python3
"""
Apply All Schema Files to Neon Database
This script reads all SQL schema files and applies them to the database.
"""

import os
import sys
from dotenv import load_dotenv
import psycopg2
from psycopg2 import sql
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

def execute_sql_file(cursor, sql_file_path):
    """Execute an SQL file, handling errors gracefully."""
    if not os.path.exists(sql_file_path):
        print(f"  [SKIP] File not found: {sql_file_path}")
        return 0, 0, 0
    
    print(f"  Reading {sql_file_path}...")
    
    with open(sql_file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove pg_dump specific commands
    content = content.replace('\\restrict 5ttVqsUbIbgqcnv9tMxPEgnEXWPHGatKDINVe5nZcaKSMtgB2Xg9dKbjv2C4bBE', '')
    content = content.replace('\\restrict', '')
    
    # Split by semicolons but handle $$ blocks
    statements = []
    current_statement = []
    in_dollar_block = False
    
    for line in content.split('\n'):
        current_statement.append(line)
        
        if '$$' in line:
            in_dollar_block = not in_dollar_block
        
        if not in_dollar_block and line.strip().endswith(';'):
            stmt = '\n'.join(current_statement).strip()
            if stmt and not stmt.startswith('--'):
                statements.append(stmt)
            current_statement = []
    
    # Add any remaining statement
    if current_statement:
        stmt = '\n'.join(current_statement).strip()
        if stmt and not stmt.startswith('--'):
            statements.append(stmt)
    
    success = 0
    skipped = 0
    errors = 0
    
    for i, stmt in enumerate(statements):
        if not stmt or stmt.startswith('--'):
            continue
            
        try:
            # Skip SET commands
            if stmt.startswith('SET ') or stmt.startswith('SELECT pg_catalog'):
                continue
                
            cursor.execute(stmt)
            success += 1
        except psycopg2.errors.DuplicateTable:
            skipped += 1
        except psycopg2.errors.DuplicateObject:
            skipped += 1
        except psycopg2.errors.UndefinedTable:
            # Might be a dependency issue
            errors += 1
            print(f"    [WARN] Statement {i}: Undefined table (dependency issue)")
        except psycopg2.errors.UndefinedObject:
            errors += 1
        except Exception as e:
            errors += 1
            if len(stmt) > 100:
                print(f"    [ERROR] Statement {i}: {str(e)[:100]}")
            else:
                print(f"    [ERROR] Statement {i}: {e}")
    
    return success, skipped, errors

def main():
    print("=" * 70)
    print("APPLYING SCHEMA TO NEON DATABASE")
    print("=" * 70)
    
    # Load environment
    load_dotenv()
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
    
    # List of SQL files to execute
    sql_files = [
        'schema.sql',
        'create_recording_tables.sql',
        'create_youtube_videos_table.sql',
        'sql/recording_requests_schema.sql',
        'sql/cms_pages_schema.sql',
    ]
    
    total_success = 0
    total_skipped = 0
    total_errors = 0
    
    # Execute each file
    for sql_file in sql_files:
        print(f"\nProcessing: {sql_file}")
        success, skipped, errors = execute_sql_file(cursor, sql_file)
        total_success += success
        total_skipped += skipped
        total_errors += errors
        print(f"  Result: {success} executed, {skipped} skipped, {errors} errors")
    
    # Commit any pending transactions
    try:
        conn.commit()
    except:
        pass
    
    # Summary
    print("\n" + "=" * 70)
    print("SCHEMA APPLICATION SUMMARY")
    print("=" * 70)
    print(f"Total statements executed: {total_success}")
    print(f"Total statements skipped (already exist): {total_skipped}")
    print(f"Total errors: {total_errors}")
    
    # Show existing tables
    print("\nVerifying tables...")
    cursor.execute("""
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        ORDER BY table_name;
    """)
    tables = cursor.fetchall()
    
    print(f"\nTables in database ({len(tables)}):")
    for table in tables:
        print(f"  ✓ {table[0]}")
    
    cursor.close()
    conn.close()
    
    print("\n" + "=" * 70)
    if total_errors == 0:
        print("SUCCESS! Database schema applied successfully!")
    else:
        print(f"COMPLETED WITH {total_errors} ERRORS")
        print("Check the errors above. Some tables may have dependency issues.")
    print("=" * 70)

if __name__ == "__main__":
    main()
