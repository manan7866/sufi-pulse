#!/usr/bin/env python3
"""Create missing tables in the new database"""

from dotenv import load_dotenv
import os
import psycopg2

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
conn = psycopg2.connect(DATABASE_URL)
conn.autocommit = True
cur = conn.cursor()

# Create notifications table
print("Creating notifications table...")
cur.execute("""
    CREATE TABLE IF NOT EXISTS notifications (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        target_type VARCHAR(50) NOT NULL,
        target_user_ids INTEGER[] DEFAULT '{}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT notifications_target_type_check 
            CHECK (target_type IN ('all', 'writers', 'vocalists', 'specific'))
    )
""")

# Create user_notifications table
print("Creating user_notifications table...")
cur.execute("""
    CREATE TABLE IF NOT EXISTS user_notifications (
        id SERIAL PRIMARY KEY,
        notification_id INTEGER REFERENCES notifications(id) ON DELETE CASCADE,
        user_id INTEGER NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
""")

# Create indexes
print("Creating indexes...")
cur.execute("CREATE INDEX IF NOT EXISTS idx_user_notifications_user_id ON user_notifications(user_id)")
cur.execute("CREATE INDEX IF NOT EXISTS idx_user_notifications_notification_id ON user_notifications(notification_id)")
cur.execute("CREATE INDEX IF NOT EXISTS idx_notifications_target_type ON notifications(target_type)")

# Create partnership_proposals table
print("Creating partnership_proposals table...")
cur.execute("""
    CREATE TABLE IF NOT EXISTS partnership_proposals (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        organization_name VARCHAR(255) NOT NULL,
        role_title VARCHAR(255) NOT NULL,
        organization_type VARCHAR(100),
        partnership_type VARCHAR(100),
        message TEXT NOT NULL,
        expected_outcomes TEXT,
        proposed_start_date DATE,
        collaboration_duration VARCHAR(100),
        location_preference VARCHAR(255),
        availability_schedule TEXT,
        social_media_links TEXT,
        website_url TEXT,
        portfolio_links TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
""")

# Create videos table (for legacy support)
print("Creating videos table...")
cur.execute("""
    CREATE TABLE IF NOT EXISTS videos (
        id VARCHAR(50) PRIMARY KEY,
        title TEXT,
        writer TEXT,
        vocalist TEXT,
        thumbnail TEXT,
        views TEXT,
        duration TEXT
    )
""")

print("\nAll missing tables created successfully!")
print("\nTables created:")
print("  - notifications")
print("  - user_notifications")
print("  - partnership_proposals")
print("  - videos")

cur.close()
conn.close()
