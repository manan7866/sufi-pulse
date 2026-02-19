#!/usr/bin/env python3
"""
Setup Neon Database Script
This script creates all necessary tables in the new Neon database.
"""

import os
import sys
from dotenv import load_dotenv
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

def get_db_connection():
    """Create and return a database connection."""
    load_dotenv(dotenv_path='.env')
    
    database_url = os.getenv("DATABASE_URL")
    
    if not database_url:
        print("[ERROR] DATABASE_URL is not set in your .env file")
        sys.exit(1)
    
    # Parse the database URL to handle sslmode
    import re
    # Pattern to match postgresql URLs with query parameters
    pg_pattern = r'^postgresql://([^:]+):([^@]+)@([^:/]+)(?::(\d+))?/([^?]+)(?:\?(.*))?$'
    match = re.match(pg_pattern, database_url)
    
    if not match:
        print("[ERROR] Invalid DATABASE_URL format")
        print("Expected format: postgresql://username:password@host:port/database")
        sys.exit(1)
    
    username, password, host, port, database, query_params = match.groups()
    port = port or '5432'
    
    # Parse query parameters for sslmode
    sslmode = 'require'
    if query_params:
        for param in query_params.split('&'):
            if '=' in param:
                key, value = param.split('=', 1)
                if key == 'sslmode':
                    sslmode = value
    
    print(f"Host: {host}")
    print(f"Port: {port}")
    print(f"Database: {database}")
    print(f"Username: {username}")
    print(f"SSL Mode: {sslmode}")
    print()
    
    # Connect to the database
    conn = psycopg2.connect(
        host=host,
        port=port,
        database=database,
        user=username,
        password=password,
        sslmode=sslmode
    )
    
    return conn

def create_tables():
    """Create all necessary tables in the database."""
    print("=" * 60)
    print("SETTING UP NEON DATABASE")
    print("=" * 60)
    print()
    
    conn = None
    try:
        conn = get_db_connection()
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursor = conn.cursor()
        print("[OK] Connected to database successfully!")
        print()
        
        # Read and execute schema files
        schema_files = [
            'schema.sql',
            'create_recording_tables.sql',
            'create_youtube_videos_table.sql',
        ]
        
        for schema_file in schema_files:
            print(f"Processing {schema_file}...")
            if not os.path.exists(schema_file):
                print(f"[WARNING] {schema_file} not found, skipping...")
                continue
            
            with open(schema_file, 'r', encoding='utf-8') as f:
                sql_content = f.read()
            
            # Split into statements and execute
            statements = sql_content.split(';')
            success_count = 0
            skip_count = 0
            error_count = 0
            
            for statement in statements:
                statement = statement.strip()
                if statement and not statement.startswith('--'):
                    try:
                        cursor.execute(statement)
                        success_count += 1
                    except psycopg2.errors.DuplicateTable:
                        skip_count += 1
                    except psycopg2.errors.DuplicateObject:
                        skip_count += 1
                    except psycopg2.errors.UndefinedTable:
                        # Might be dependency issue, try again later
                        error_count += 1
                    except psycopg2.Error as e:
                        error_count += 1
                        print(f"[ERROR] {statement[:100]}...: {str(e)[:100]}")
                    except Exception as e:
                        error_count += 1
                        print(f"[ERROR] {statement[:100]}...: {str(e)[:100]}")
            
            print(f"[OK] {schema_file}: {success_count} statements executed, {skip_count} skipped, {error_count} errors")
        
        # Create additional CMS tables if not already in schema.sql
        print("\nCreating CMS tables...")
        cms_tables_sql = """
        -- CMS Pages Management System
        CREATE TABLE IF NOT EXISTS cms_pages (
            id SERIAL PRIMARY KEY,
            page_name VARCHAR(100) UNIQUE NOT NULL,
            page_title VARCHAR(255) NOT NULL,
            page_slug VARCHAR(100) UNIQUE NOT NULL,
            meta_description TEXT,
            meta_keywords TEXT,
            hero_title VARCHAR(500),
            hero_subtitle TEXT,
            hero_quote TEXT,
            hero_quote_author VARCHAR(255),
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE IF NOT EXISTS cms_page_stats (
            id SERIAL PRIMARY KEY,
            page_id INT REFERENCES cms_pages(id) ON DELETE CASCADE,
            stat_number VARCHAR(50) NOT NULL,
            stat_label VARCHAR(100) NOT NULL,
            stat_description TEXT,
            stat_icon VARCHAR(100),
            stat_order INT DEFAULT 0,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE IF NOT EXISTS cms_page_values (
            id SERIAL PRIMARY KEY,
            page_id INT REFERENCES cms_pages(id) ON DELETE CASCADE,
            value_title VARCHAR(255) NOT NULL,
            value_description TEXT,
            value_icon VARCHAR(100),
            value_color VARCHAR(50) DEFAULT 'emerald',
            value_order INT DEFAULT 0,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE IF NOT EXISTS cms_page_team (
            id SERIAL PRIMARY KEY,
            page_id INT REFERENCES cms_pages(id) ON DELETE CASCADE,
            member_name VARCHAR(255) NOT NULL,
            member_role VARCHAR(255),
            member_organization VARCHAR(255),
            member_bio TEXT,
            member_image_url TEXT,
            is_featured BOOLEAN DEFAULT FALSE,
            member_order INT DEFAULT 0,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE IF NOT EXISTS cms_page_timeline (
            id SERIAL PRIMARY KEY,
            page_id INT REFERENCES cms_pages(id) ON DELETE CASCADE,
            timeline_year VARCHAR(50) NOT NULL,
            timeline_title VARCHAR(255) NOT NULL,
            timeline_description TEXT,
            timeline_order INT DEFAULT 0,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE IF NOT EXISTS cms_page_testimonials (
            id SERIAL PRIMARY KEY,
            page_id INT REFERENCES cms_pages(id) ON DELETE CASCADE,
            testimonial_name VARCHAR(255) NOT NULL,
            testimonial_location VARCHAR(255),
            testimonial_role VARCHAR(255),
            testimonial_quote TEXT NOT NULL,
            testimonial_image_url TEXT,
            testimonial_order INT DEFAULT 0,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE IF NOT EXISTS cms_page_sections (
            id SERIAL PRIMARY KEY,
            page_id INT REFERENCES cms_pages(id) ON DELETE CASCADE,
            section_name VARCHAR(100) NOT NULL,
            section_type VARCHAR(50) NOT NULL,
            section_title VARCHAR(255),
            section_subtitle TEXT,
            section_content TEXT,
            section_order INT DEFAULT 0,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE IF NOT EXISTS cms_page_section_items (
            id SERIAL PRIMARY KEY,
            section_id INT REFERENCES cms_page_sections(id) ON DELETE CASCADE,
            item_title VARCHAR(255) NOT NULL,
            item_subtitle VARCHAR(255),
            item_description TEXT,
            item_icon VARCHAR(100),
            item_field VARCHAR(100),
            item_order INT DEFAULT 0,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE IF NOT EXISTS cms_page_achievements (
            id SERIAL PRIMARY KEY,
            page_id INT REFERENCES cms_pages(id) ON DELETE CASCADE,
            category_name VARCHAR(255) NOT NULL,
            achievement_items JSONB,
            category_order INT DEFAULT 0,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE IF NOT EXISTS cms_page_hubs (
            id SERIAL PRIMARY KEY,
            page_id INT REFERENCES cms_pages(id) ON DELETE CASCADE,
            hub_title VARCHAR(255) NOT NULL,
            hub_details TEXT,
            hub_description TEXT,
            hub_icon VARCHAR(100),
            hub_order INT DEFAULT 0,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        
        -- Create indexes
        CREATE INDEX IF NOT EXISTS idx_cms_pages_slug ON cms_pages(page_slug);
        CREATE INDEX IF NOT EXISTS idx_cms_page_stats_page_id ON cms_page_stats(page_id);
        CREATE INDEX IF NOT EXISTS idx_cms_page_values_page_id ON cms_page_values(page_id);
        CREATE INDEX IF NOT EXISTS idx_cms_page_team_page_id ON cms_page_team(page_id);
        CREATE INDEX IF NOT EXISTS idx_cms_page_timeline_page_id ON cms_page_timeline(page_id);
        CREATE INDEX IF NOT EXISTS idx_cms_page_testimonials_page_id ON cms_page_testimonials(page_id);
        CREATE INDEX IF NOT EXISTS idx_cms_page_sections_page_id ON cms_page_sections(page_id);
        CREATE INDEX IF NOT EXISTS idx_cms_page_section_items_section_id ON cms_page_section_items(section_id);
        CREATE INDEX IF NOT EXISTS idx_cms_page_achievements_page_id ON cms_page_achievements(page_id);
        CREATE INDEX IF NOT EXISTS idx_cms_page_hubs_page_id ON cms_page_hubs(page_id);
        """
        
        cursor.execute(cms_tables_sql)
        print("[OK] CMS tables created successfully!")
        
        # Create recording request tables
        print("\nCreating recording request tables...")
        recording_tables_sql = """
        -- Studio Recording Requests
        CREATE TABLE IF NOT EXISTS studio_recording_requests (
            id SERIAL PRIMARY KEY,
            vocalist_id INT REFERENCES vocalists(id) ON DELETE CASCADE,
            kalam_id INT REFERENCES kalams(id) ON DELETE CASCADE,
            lyric_title VARCHAR(255) NOT NULL,
            lyric_writer VARCHAR(255),
            lyric_language VARCHAR(100),
            lyric_category VARCHAR(100),
            preferred_session_date DATE NOT NULL,
            preferred_time_block VARCHAR(50) NOT NULL CHECK (preferred_time_block IN ('Morning', 'Afternoon', 'Evening')),
            estimated_studio_duration VARCHAR(50) NOT NULL CHECK (estimated_studio_duration IN ('1 Hour', '2 Hours', 'Half Day', 'Full Day')),
            performance_direction TEXT NOT NULL,
            reference_upload_url TEXT,
            reference_file_type VARCHAR(50),
            reference_file_size INT,
            availability_confirmed BOOLEAN DEFAULT FALSE,
            studio_policies_agreed BOOLEAN DEFAULT FALSE,
            status VARCHAR(50) CHECK (status IN ('pending_review', 'approved', 'rejected', 'completed')) DEFAULT 'pending_review',
            admin_comments TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(vocalist_id, kalam_id)
        );
        
        -- Remote Recording Requests
        CREATE TABLE IF NOT EXISTS remote_recording_requests_new (
            id SERIAL PRIMARY KEY,
            vocalist_id INT REFERENCES vocalists(id) ON DELETE CASCADE,
            kalam_id INT REFERENCES kalams(id) ON DELETE CASCADE,
            lyric_title VARCHAR(255) NOT NULL,
            lyric_writer VARCHAR(255),
            lyric_language VARCHAR(100),
            lyric_category VARCHAR(100),
            recording_environment VARCHAR(100) NOT NULL CHECK (recording_environment IN ('Professional Studio', 'Condenser Mic Setup', 'USB Microphone', 'Mobile Setup')),
            target_submission_date DATE NOT NULL,
            interpretation_notes TEXT NOT NULL,
            sample_upload_url TEXT,
            sample_file_type VARCHAR(50),
            sample_file_size INT,
            original_recording_confirmed BOOLEAN DEFAULT FALSE,
            remote_production_standards_agreed BOOLEAN DEFAULT FALSE,
            status VARCHAR(50) CHECK (status IN ('under_review', 'approved', 'rejected', 'completed')) DEFAULT 'under_review',
            admin_comments TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(vocalist_id, kalam_id)
        );
        
        -- Indexes for recording requests
        CREATE INDEX IF NOT EXISTS idx_studio_recording_vocalist_id ON studio_recording_requests(vocalist_id);
        CREATE INDEX IF NOT EXISTS idx_studio_recording_kalam_id ON studio_recording_requests(kalam_id);
        CREATE INDEX IF NOT EXISTS idx_studio_recording_status ON studio_recording_requests(status);
        CREATE INDEX IF NOT EXISTS idx_studio_recording_created_at ON studio_recording_requests(created_at);
        CREATE INDEX IF NOT EXISTS idx_remote_recording_new_vocalist_id ON remote_recording_requests_new(vocalist_id);
        CREATE INDEX IF NOT EXISTS idx_remote_recording_new_kalam_id ON remote_recording_requests_new(kalam_id);
        CREATE INDEX IF NOT EXISTS idx_remote_recording_new_status ON remote_recording_requests_new(status);
        CREATE INDEX IF NOT EXISTS idx_remote_recording_new_created_at ON remote_recording_requests_new(created_at);
        """
        
        cursor.execute(recording_tables_sql)
        print("[OK] Recording request tables created successfully!")
        
        # Create helper functions
        print("\nCreating helper functions...")
        helper_functions_sql = """
        -- Function to get complete CMS page data
        CREATE OR REPLACE FUNCTION get_cms_page_data(p_page_slug VARCHAR)
        RETURNS TABLE (
            page_id INT,
            page_name VARCHAR,
            page_title VARCHAR,
            page_slug VARCHAR,
            meta_description TEXT,
            meta_keywords TEXT,
            hero_title VARCHAR,
            hero_subtitle TEXT,
            hero_quote TEXT,
            hero_quote_author VARCHAR,
            stats JSONB,
            "values" JSONB,
            team JSONB,
            timeline JSONB,
            testimonials JSONB,
            sections JSONB,
            hubs JSONB
        ) AS $$
        BEGIN
            RETURN QUERY
            SELECT
                cp.id as page_id,
                cp.page_name,
                cp.page_title,
                cp.page_slug,
                cp.meta_description,
                cp.meta_keywords,
                cp.hero_title,
                cp.hero_subtitle,
                cp.hero_quote,
                cp.hero_quote_author,
                (
                    SELECT COALESCE(
                        jsonb_agg(
                            jsonb_build_object(
                                'stat_number', stat_number,
                                'stat_label', stat_label,
                                'stat_description', stat_description,
                                'stat_icon', stat_icon,
                                'stat_order', stat_order
                            ) ORDER BY stat_order
                        ),
                        '[]'::jsonb
                    )
                    FROM cms_page_stats cps_stats
                    WHERE cps_stats.page_id = cp.id AND cps_stats.is_active = TRUE
                ) as stats,
                (
                    SELECT COALESCE(
                        jsonb_agg(
                            jsonb_build_object(
                                'value_title', value_title,
                                'value_description', value_description,
                                'value_icon', value_icon,
                                'value_color', value_color,
                                'value_order', value_order
                            ) ORDER BY value_order
                        ),
                        '[]'::jsonb
                    )
                    FROM cms_page_values cps_values
                    WHERE cps_values.page_id = cp.id AND cps_values.is_active = TRUE
                ) as "values",
                (
                    SELECT COALESCE(
                        jsonb_agg(
                            jsonb_build_object(
                                'member_name', member_name,
                                'member_role', member_role,
                                'member_organization', member_organization,
                                'member_bio', member_bio,
                                'member_image_url', member_image_url,
                                'is_featured', is_featured,
                                'member_order', member_order
                            ) ORDER BY member_order
                        ),
                        '[]'::jsonb
                    )
                    FROM cms_page_team cps_team
                    WHERE cps_team.page_id = cp.id AND cps_team.is_active = TRUE
                ) as team,
                (
                    SELECT COALESCE(
                        jsonb_agg(
                            jsonb_build_object(
                                'timeline_year', timeline_year,
                                'timeline_title', timeline_title,
                                'timeline_description', timeline_description,
                                'timeline_order', timeline_order
                            ) ORDER BY timeline_order
                        ),
                        '[]'::jsonb
                    )
                    FROM cms_page_timeline cps_timeline
                    WHERE cps_timeline.page_id = cp.id AND cps_timeline.is_active = TRUE
                ) as timeline,
                (
                    SELECT COALESCE(
                        jsonb_agg(
                            jsonb_build_object(
                                'testimonial_name', testimonial_name,
                                'testimonial_location', testimonial_location,
                                'testimonial_role', testimonial_role,
                                'testimonial_quote', testimonial_quote,
                                'testimonial_image_url', testimonial_image_url,
                                'testimonial_order', testimonial_order
                            ) ORDER BY testimonial_order
                        ),
                        '[]'::jsonb
                    )
                    FROM cms_page_testimonials cps_testimonials
                    WHERE cps_testimonials.page_id = cp.id AND cps_testimonials.is_active = TRUE
                ) as testimonials,
                (
                    SELECT COALESCE(
                        jsonb_agg(
                            jsonb_build_object(
                                'section_name', section_name,
                                'section_type', section_type,
                                'section_title', section_title,
                                'section_subtitle', section_subtitle,
                                'section_content', section_content,
                                'section_order', section_order,
                                'items', (
                                    SELECT COALESCE(
                                        jsonb_agg(
                                            jsonb_build_object(
                                                'item_title', item_title,
                                                'item_subtitle', item_subtitle,
                                                'item_description', item_description,
                                                'item_icon', item_icon,
                                                'item_field', item_field,
                                                'item_order', item_order
                                            ) ORDER BY item_order
                                        ),
                                        '[]'::jsonb
                                    )
                                    FROM cms_page_section_items
                                    WHERE section_id = cps.id AND is_active = TRUE
                                )
                            ) ORDER BY section_order
                        ),
                        '[]'::jsonb
                    )
                    FROM cms_page_sections cps
                    WHERE cps.page_id = cp.id AND cps.is_active = TRUE
                ) as sections,
                (
                    SELECT COALESCE(
                        jsonb_agg(
                            jsonb_build_object(
                                'hub_title', hub_title,
                                'hub_details', hub_details,
                                'hub_description', hub_description,
                                'hub_icon', hub_icon,
                                'hub_order', hub_order
                            ) ORDER BY hub_order
                        ),
                        '[]'::jsonb
                    )
                    FROM cms_page_hubs cps_hubs
                    WHERE cps_hubs.page_id = cp.id AND cps_hubs.is_active = TRUE
                ) as hubs
            FROM cms_pages cp
            WHERE cp.page_slug = p_page_slug AND cp.is_active = TRUE;
        END;
        $$ LANGUAGE plpgsql;
        """
        
        cursor.execute(helper_functions_sql)
        print("[OK] Helper functions created successfully!")
        
        # Insert seed data for CMS pages
        print("\nInserting CMS seed data...")
        seed_data_sql = """
        -- Clear existing data (optional, comment out if you want to keep existing data)
        -- TRUNCATE cms_pages, cms_page_stats, cms_page_values, cms_page_team, 
        -- cms_page_timeline, cms_page_testimonials, cms_page_sections, 
        -- cms_page_section_items, cms_page_achievements, cms_page_hubs CASCADE;
        
        -- Home Page
        INSERT INTO cms_pages (page_name, page_title, page_slug, meta_description, meta_keywords, hero_title, hero_subtitle, hero_quote, hero_quote_author)
        VALUES (
            'Home',
            'SufiPulse - Global Sufi Music Platform',
            'home',
            'SufiPulse is a global platform for Sufi music collaboration, connecting writers and vocalists worldwide to create sacred kalam.',
            'sufi music, kalam, spiritual music, qawwali, sufism, global platform',
            'Global Sufi Collaboration Studio',
            'From Kashmir''s sacred valleys to the global ummah submit your Sufi kalam. Let the world hear its pulse.',
            'We don''t sell divine lyrics. We amplify them.',
            'SufiPulse Promise'
        ) ON CONFLICT (page_slug) DO NOTHING;
        
        -- Home Page Stats
        INSERT INTO cms_page_stats (page_id, stat_number, stat_label, stat_description, stat_icon, stat_order)
        SELECT 
            id, '300+', 'Sacred Collaborations', 'Divine kalam brought to life', 'Heart', 1
        FROM cms_pages WHERE page_slug = 'home'
        ON CONFLICT DO NOTHING;
        
        -- About Page
        INSERT INTO cms_pages (page_name, page_title, page_slug, meta_description, meta_keywords, hero_title, hero_subtitle)
        VALUES (
            'About',
            'About SufiPulse - Our Story',
            'about',
            'Learn about SufiPulse mission to preserve and promote Sufi music through global collaboration.',
            'about sufiPulse, our mission, sufi music platform, spiritual collaboration',
            'Our Sacred Mission',
            'Serving the divine through the preservation, production, and global sharing of sacred Sufi kalam'
        ) ON CONFLICT (page_slug) DO NOTHING;
        
        -- Contact Page
        INSERT INTO cms_pages (page_name, page_title, page_slug, meta_description, meta_keywords, hero_title, hero_subtitle, hero_quote)
        VALUES (
            'Contact',
            'Contact SufiPulse - Connect With Us',
            'contact',
            'Get in touch with SufiPulse for writer submissions, vocalist applications, or partnership inquiries.',
            'contact sufiPulse, submit kalam, join vocalist pool, partnership',
            'Connect With Our Sacred Community',
            'Ready to share your divine Sufi kalam or collaborate with our global spiritual community?',
            'Every connection is a bridge between hearts seeking the Divine'
        ) ON CONFLICT (page_slug) DO NOTHING;
        
        -- Gallery Page
        INSERT INTO cms_pages (page_name, page_title, page_slug, meta_description, meta_keywords, hero_title, hero_subtitle)
        VALUES (
            'Gallery',
            'Gallery - Sacred Kalam Videos',
            'gallery',
            'Watch our collection of sacred Sufi kalam videos from our global community of writers and vocalists.',
            'sufi videos, kalam gallery, sufi music, spiritual songs, qawwali videos',
            'Sacred Kalam Gallery',
            'Experience the divine fusion of sacred poetry and spiritual voices'
        ) ON CONFLICT (page_slug) DO NOTHING;
        """
        
        cursor.execute(seed_data_sql)
        print("[OK] Seed data inserted successfully!")
        
        print("\n" + "=" * 60)
        print("DATABASE SETUP COMPLETE!")
        print("=" * 60)
        print("\nTables created:")
        print("  ✓ Core tables (users, vocalists, kalams, etc.)")
        print("  ✓ CMS tables (cms_pages, cms_page_stats, etc.)")
        print("  ✓ Recording request tables (studio_recording_requests, remote_recording_requests_new)")
        print("  ✓ YouTube videos table")
        print("  ✓ Blog tables (bloggers, blog_submissions)")
        print("  ✓ Guest posts tables")
        print("  ✓ Kalam submissions tables")
        print("\nFunctions created:")
        print("  ✓ get_cms_page_data()")
        print("\nIndexes created:")
        print("  ✓ All necessary indexes for performance")
        print("\nSeed data inserted:")
        print("  ✓ Home page")
        print("  ✓ About page")
        print("  ✓ Contact page")
        print("  ✓ Gallery page")
        print("\nNext steps:")
        print("  1. Run: python main.py")
        print("  2. Test the API endpoints")
        
        return True
        
    except psycopg2.Error as e:
        print(f"\n[ERROR] Database error: {e}")
        if conn:
            conn.rollback()
        return False
    except Exception as e:
        print(f"\n[ERROR] Unexpected error: {e}")
        if conn:
            conn.rollback()
        return False
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    success = create_tables()
    if not success:
        print("\nDatabase setup failed!")
        sys.exit(1)
