#!/usr/bin/env python3
"""
Add Admin User to Database
This script adds an admin user with the specified credentials to your database.
"""

import os
from dotenv import load_dotenv
import psycopg2
import hashlib
import bcrypt

def hash_password(password):
    """Hash the password using bcrypt (standard for password security)."""
    # Convert password to bytes if it's not already
    if isinstance(password, str):
        password = password.encode('utf-8')
    
    # Generate salt and hash the password
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password, salt)
    
    return hashed.decode('utf-8')

def add_admin_user():
    """Add admin user to the database."""
    # Load environment variables
    load_dotenv(override=True)
    
    database_url = os.getenv("DATABASE_URL")
    
    if not database_url:
        print("[ERROR] DATABASE_URL is not set in your .env file")
        return False
    
    # Parse the database URL
    import re
    pg_pattern = r'^postgresql://([^:]+):([^@]+)@([^:]+):(\d+)/(.+)$'
    match = re.match(pg_pattern, database_url)
    
    if not match:
        print("[ERROR] Invalid DATABASE_URL format")
        return False
    
    username, password, host, port, database = match.groups()
    
    # Email and password to insert
    admin_email = "admin@sufipulse.com"
    plain_password = "Fayazkhan7861$"
    
    # Hash the password
    hashed_password = hash_password(plain_password)
    print(f"Email: {admin_email}")
    print(f"Plain Password: {plain_password}")
    print(f"Hashed Password: {hashed_password}")
    
    try:
        # Connect to the database
        conn = psycopg2.connect(
            host=host,
            port=port,
            database=database,
            user=username,
            password=password
        )
        cur = conn.cursor()
        
        # Check if user already exists
        cur.execute("SELECT id, email FROM users WHERE email = %s", (admin_email,))
        existing_user = cur.fetchone()
        
        if existing_user:
            print(f"[WARNING] User with email {admin_email} already exists (ID: {existing_user[0]})")
            update_choice = input("Do you want to update the password for this user? (y/n): ")
            if update_choice.lower() == 'y':
                # Update the existing user's password
                cur.execute("""
                    UPDATE users 
                    SET password_hash = %s, role = 'admin', name = 'Admin User'
                    WHERE email = %s
                """, (hashed_password, admin_email))
                conn.commit()
                print(f"[SUCCESS] Updated password for existing admin user {admin_email}")
            else:
                print("Skipped adding/updating admin user.")
        else:
            # Insert new admin user
            cur.execute("""
                INSERT INTO users (email, name, password_hash, role, is_registered)
                VALUES (%s, %s, %s, %s, %s)
            """, (admin_email, 'Admin User', hashed_password, 'admin', True))
            
            conn.commit()
            print(f"[SUCCESS] Admin user {admin_email} added to the database!")
        
        # Verify the user was added/updated
        cur.execute("SELECT id, email, name, role FROM users WHERE email = %s", (admin_email,))
        user = cur.fetchone()
        
        if user:
            print(f"Verified user in database - ID: {user[0]}, Email: {user[1]}, Name: {user[2]}, Role: {user[3]}")
        
        cur.close()
        conn.close()
        
        return True
        
    except Exception as e:
        print(f"[ERROR] Could not add admin user: {str(e)}")
        return False

if __name__ == "__main__":
    print("Adding admin user to database...")
    
    # Check if bcrypt is available
    try:
        import bcrypt
    except ImportError:
        print("[ERROR] bcrypt module is not installed.")
        print("Please install it using: pip install bcrypt")
        exit(1)
    
    success = add_admin_user()
    if success:
        print("\nAdmin user setup completed!")
    else:
        print("\nAdmin user setup failed!")