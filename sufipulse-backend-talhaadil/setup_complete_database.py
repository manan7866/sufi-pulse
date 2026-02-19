#!/usr/bin/env python3
"""
Complete Database Setup for SufiPulse
Creates all necessary tables in the correct order
"""

import os
import sys
from dotenv import load_dotenv
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

def main():
    print("=" * 70)
    print("SUFIPULSE DATABASE SETUP - NEON")
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
    
    # Define all tables in order of dependencies
    tables_sql = [
        # 1. Users table (base table)
        """
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255),
            phone VARCHAR(50),
            is_active BOOLEAN DEFAULT TRUE,
            is_admin BOOLEAN DEFAULT FALSE,
            is_verified BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
        """,
        
        # 2. Vocalists table
        """
        CREATE TABLE IF NOT EXISTS vocalists (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            phone VARCHAR(50),
            location VARCHAR(255),
            country VARCHAR(100),
            specialization VARCHAR(255),
            experience_level VARCHAR(50),
            available_for_recording BOOLEAN DEFAULT FALSE,
            profile_image_url TEXT,
            social_links JSONB DEFAULT '{}',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_vocalists_user_id ON vocalists(user_id);
        CREATE INDEX IF NOT EXISTS idx_vocalists_email ON vocalists(email);
        """,
        
        # 3. Kalams table
        """
        CREATE TABLE IF NOT EXISTS kalams (
            id SERIAL PRIMARY KEY,
            writer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            vocalist_id INTEGER REFERENCES vocalists(id) ON DELETE SET NULL,
            title VARCHAR(255) NOT NULL,
            language VARCHAR(100),
            theme VARCHAR(100),
            kalam_text TEXT,
            description TEXT,
            status VARCHAR(50) DEFAULT 'draft',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_kalams_writer_id ON kalams(writer_id);
        CREATE INDEX IF NOT EXISTS idx_kalams_vocalist_id ON kalams(vocalist_id);
        CREATE INDEX IF NOT EXISTS idx_kalams_status ON kalams(status);
        """,
        
        # 4. Kalam Submissions table
        """
        CREATE TABLE IF NOT EXISTS kalam_submissions (
            id SERIAL PRIMARY KEY,
            kalam_id INTEGER REFERENCES kalams(id) ON DELETE CASCADE,
            status VARCHAR(50) DEFAULT 'draft',
            user_approval_status VARCHAR(50) DEFAULT 'pending',
            vocalist_approval_status VARCHAR(50) DEFAULT 'pending',
            admin_comments TEXT,
            writer_comments TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT kalam_submissions_status_check CHECK (
                status IN ('draft', 'submitted', 'changes_requested', 'admin_approved', 
                          'admin_rejected', 'final_approved', 'complete_approved', 'posted')
            ),
            CONSTRAINT kalam_submissions_user_approval_status_check CHECK (
                user_approval_status IN ('pending', 'approved', 'rejected')
            ),
            CONSTRAINT kalam_submissions_vocalist_approval_status_check CHECK (
                vocalist_approval_status IN ('pending', 'approved', 'rejected')
            )
        );
        CREATE INDEX IF NOT EXISTS idx_kalam_submissions_kalam_id ON kalam_submissions(kalam_id);
        CREATE INDEX IF NOT EXISTS idx_kalam_submissions_status ON kalam_submissions(status);
        """,
        
        # 5. Bloggers table
        """
        CREATE TABLE IF NOT EXISTS bloggers (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            author_name VARCHAR(255),
            author_image_url TEXT,
            short_bio TEXT,
            location VARCHAR(255),
            website_url TEXT,
            social_links JSONB DEFAULT '{}',
            publish_pseudonym BOOLEAN DEFAULT FALSE,
            original_work_confirmation BOOLEAN DEFAULT FALSE,
            publishing_rights_granted BOOLEAN DEFAULT FALSE,
            discourse_policy_agreed BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_bloggers_user_id ON bloggers(user_id);
        """,
        
        # 6. Blog Submissions table
        """
        CREATE TABLE IF NOT EXISTS blog_submissions (
            id SERIAL PRIMARY KEY,
            title VARCHAR(120) NOT NULL,
            excerpt TEXT,
            featured_image_url TEXT,
            content TEXT NOT NULL,
            user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
            status VARCHAR(50) DEFAULT 'draft',
            admin_comments TEXT,
            editor_notes TEXT,
            scheduled_publish_date TIMESTAMP,
            seo_meta_title VARCHAR(255),
            seo_meta_description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            category VARCHAR(100),
            tags TEXT[] DEFAULT '{}',
            language VARCHAR(50),
            CONSTRAINT blog_submissions_status_check CHECK (
                status IN ('pending', 'review', 'approved', 'revision', 'rejected', 'posted')
            )
        );
        CREATE INDEX IF NOT EXISTS idx_blog_submissions_user_id ON blog_submissions(user_id);
        CREATE INDEX IF NOT EXISTS idx_blog_submissions_status ON blog_submissions(status);
        """,
        
        # 7. Guest Posts table
        """
        CREATE TABLE IF NOT EXISTS guest_posts (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            date DATE NOT NULL,
            role TEXT,
            city TEXT,
            country TEXT,
            status TEXT DEFAULT 'pending' NOT NULL,
            category TEXT,
            excerpt TEXT,
            content TEXT,
            tags TEXT[],
            title TEXT NOT NULL
        );
        CREATE INDEX IF NOT EXISTS idx_guest_posts_user_id ON guest_posts(user_id);
        CREATE INDEX IF NOT EXISTS idx_guest_posts_status ON guest_posts(status);
        """,
        
        # 8. CMS Pages table
        """
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
        CREATE INDEX IF NOT EXISTS idx_cms_pages_slug ON cms_pages(page_slug);
        """,
        
        # 9. CMS Page Stats table
        """
        CREATE TABLE IF NOT EXISTS cms_page_stats (
            id SERIAL PRIMARY KEY,
            page_id INTEGER REFERENCES cms_pages(id) ON DELETE CASCADE,
            stat_number VARCHAR(50) NOT NULL,
            stat_label VARCHAR(100) NOT NULL,
            stat_description TEXT,
            stat_icon VARCHAR(100),
            stat_order INTEGER DEFAULT 0,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_cms_page_stats_page_id ON cms_page_stats(page_id);
        """,
        
        # 10. CMS Page Values table
        """
        CREATE TABLE IF NOT EXISTS cms_page_values (
            id SERIAL PRIMARY KEY,
            page_id INTEGER REFERENCES cms_pages(id) ON DELETE CASCADE,
            value_title VARCHAR(255) NOT NULL,
            value_description TEXT,
            value_icon VARCHAR(100),
            value_color VARCHAR(50) DEFAULT 'emerald',
            value_order INTEGER DEFAULT 0,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_cms_page_values_page_id ON cms_page_values(page_id);
        """,
        
        # 11. CMS Page Team table
        """
        CREATE TABLE IF NOT EXISTS cms_page_team (
            id SERIAL PRIMARY KEY,
            page_id INTEGER REFERENCES cms_pages(id) ON DELETE CASCADE,
            member_name VARCHAR(255) NOT NULL,
            member_role VARCHAR(255),
            member_organization VARCHAR(255),
            member_bio TEXT,
            member_image_url TEXT,
            is_featured BOOLEAN DEFAULT FALSE,
            member_order INTEGER DEFAULT 0,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_cms_page_team_page_id ON cms_page_team(page_id);
        """,
        
        # 12. CMS Page Timeline table
        """
        CREATE TABLE IF NOT EXISTS cms_page_timeline (
            id SERIAL PRIMARY KEY,
            page_id INTEGER REFERENCES cms_pages(id) ON DELETE CASCADE,
            timeline_year VARCHAR(50) NOT NULL,
            timeline_title VARCHAR(255) NOT NULL,
            timeline_description TEXT,
            timeline_order INTEGER DEFAULT 0,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_cms_page_timeline_page_id ON cms_page_timeline(page_id);
        """,
        
        # 13. CMS Page Testimonials table
        """
        CREATE TABLE IF NOT EXISTS cms_page_testimonials (
            id SERIAL PRIMARY KEY,
            page_id INTEGER REFERENCES cms_pages(id) ON DELETE CASCADE,
            testimonial_name VARCHAR(255) NOT NULL,
            testimonial_location VARCHAR(255),
            testimonial_role VARCHAR(255),
            testimonial_quote TEXT NOT NULL,
            testimonial_image_url TEXT,
            testimonial_order INTEGER DEFAULT 0,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_cms_page_testimonials_page_id ON cms_page_testimonials(page_id);
        """,
        
        # 14. CMS Page Sections table
        """
        CREATE TABLE IF NOT EXISTS cms_page_sections (
            id SERIAL PRIMARY KEY,
            page_id INTEGER REFERENCES cms_pages(id) ON DELETE CASCADE,
            section_name VARCHAR(100) NOT NULL,
            section_type VARCHAR(50) NOT NULL,
            section_title VARCHAR(255),
            section_subtitle TEXT,
            section_content TEXT,
            section_order INTEGER DEFAULT 0,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_cms_page_sections_page_id ON cms_page_sections(page_id);
        """,
        
        # 15. CMS Page Section Items table
        """
        CREATE TABLE IF NOT EXISTS cms_page_section_items (
            id SERIAL PRIMARY KEY,
            section_id INTEGER REFERENCES cms_page_sections(id) ON DELETE CASCADE,
            item_title VARCHAR(255) NOT NULL,
            item_subtitle VARCHAR(255),
            item_description TEXT,
            item_icon VARCHAR(100),
            item_field VARCHAR(100),
            item_order INTEGER DEFAULT 0,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_cms_page_section_items_section_id ON cms_page_section_items(section_id);
        """,
        
        # 16. CMS Page Achievements table
        """
        CREATE TABLE IF NOT EXISTS cms_page_achievements (
            id SERIAL PRIMARY KEY,
            page_id INTEGER REFERENCES cms_pages(id) ON DELETE CASCADE,
            category_name VARCHAR(255) NOT NULL,
            achievement_items JSONB,
            category_order INTEGER DEFAULT 0,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_cms_page_achievements_page_id ON cms_page_achievements(page_id);
        """,
        
        # 17. CMS Page Hubs table
        """
        CREATE TABLE IF NOT EXISTS cms_page_hubs (
            id SERIAL PRIMARY KEY,
            page_id INTEGER REFERENCES cms_pages(id) ON DELETE CASCADE,
            hub_title VARCHAR(255) NOT NULL,
            hub_details TEXT,
            hub_description TEXT,
            hub_icon VARCHAR(100),
            hub_order INTEGER DEFAULT 0,
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_cms_page_hubs_page_id ON cms_page_hubs(page_id);
        """,
        
        # 18. Studio Recording Requests table
        """
        CREATE TABLE IF NOT EXISTS studio_recording_requests (
            id SERIAL PRIMARY KEY,
            vocalist_id INTEGER REFERENCES vocalists(id) ON DELETE CASCADE,
            kalam_id INTEGER REFERENCES kalams(id) ON DELETE CASCADE,
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
            reference_file_size INTEGER,
            availability_confirmed BOOLEAN DEFAULT FALSE,
            studio_policies_agreed BOOLEAN DEFAULT FALSE,
            status VARCHAR(50) CHECK (status IN ('pending_review', 'approved', 'rejected', 'completed')) DEFAULT 'pending_review',
            admin_comments TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(vocalist_id, kalam_id)
        );
        CREATE INDEX IF NOT EXISTS idx_studio_recording_vocalist_id ON studio_recording_requests(vocalist_id);
        CREATE INDEX IF NOT EXISTS idx_studio_recording_kalam_id ON studio_recording_requests(kalam_id);
        CREATE INDEX IF NOT EXISTS idx_studio_recording_status ON studio_recording_requests(status);
        CREATE INDEX IF NOT EXISTS idx_studio_recording_created_at ON studio_recording_requests(created_at);
        """,
        
        # 19. Remote Recording Requests table
        """
        CREATE TABLE IF NOT EXISTS remote_recording_requests_new (
            id SERIAL PRIMARY KEY,
            vocalist_id INTEGER REFERENCES vocalists(id) ON DELETE CASCADE,
            kalam_id INTEGER REFERENCES kalams(id) ON DELETE CASCADE,
            lyric_title VARCHAR(255) NOT NULL,
            lyric_writer VARCHAR(255),
            lyric_language VARCHAR(100),
            lyric_category VARCHAR(100),
            recording_environment VARCHAR(100) NOT NULL CHECK (recording_environment IN ('Professional Studio', 'Condenser Mic Setup', 'USB Microphone', 'Mobile Setup')),
            target_submission_date DATE NOT NULL,
            interpretation_notes TEXT NOT NULL,
            sample_upload_url TEXT,
            sample_file_type VARCHAR(50),
            sample_file_size INTEGER,
            original_recording_confirmed BOOLEAN DEFAULT FALSE,
            remote_production_standards_agreed BOOLEAN DEFAULT FALSE,
            status VARCHAR(50) CHECK (status IN ('under_review', 'approved', 'rejected', 'completed')) DEFAULT 'under_review',
            admin_comments TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(vocalist_id, kalam_id)
        );
        CREATE INDEX IF NOT EXISTS idx_remote_recording_new_vocalist_id ON remote_recording_requests_new(vocalist_id);
        CREATE INDEX IF NOT EXISTS idx_remote_recording_new_kalam_id ON remote_recording_requests_new(kalam_id);
        CREATE INDEX IF NOT EXISTS idx_remote_recording_new_status ON remote_recording_requests_new(status);
        CREATE INDEX IF NOT EXISTS idx_remote_recording_new_created_at ON remote_recording_requests_new(created_at);
        """,
        
        # 20. YouTube Videos table
        """
        CREATE TABLE IF NOT EXISTS youtube_videos (
            id VARCHAR(50) PRIMARY KEY,
            title VARCHAR(500) NOT NULL,
            writer VARCHAR(255),
            vocalist VARCHAR(255),
            thumbnail VARCHAR(500),
            views VARCHAR(50),
            duration VARCHAR(20),
            uploaded_at TIMESTAMP WITH TIME ZONE,
            tags TEXT[] DEFAULT '{}',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_youtube_videos_uploaded_at ON youtube_videos(uploaded_at DESC);
        CREATE INDEX IF NOT EXISTS idx_youtube_videos_title ON youtube_videos(title);
        """,
    ]
    
    # Execute table creation
    print("\n" + "=" * 70)
    print("CREATING TABLES")
    print("=" * 70)
    
    for i, sql in enumerate(tables_sql, 1):
        try:
            cursor.execute(sql)
            print(f"[{i:2d}/20] Table created successfully")
        except Exception as e:
            print(f"[{i:2d}/20] ERROR: {str(e)[:100]}")
    
    # Create helper function for CMS pages
    print("\n" + "=" * 70)
    print("CREATING HELPER FUNCTIONS")
    print("=" * 70)
    
    try:
        cursor.execute("""
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
                    SELECT COALESCE(jsonb_agg(jsonb_build_object(
                        'stat_number', stat_number,
                        'stat_label', stat_label,
                        'stat_description', stat_description,
                        'stat_icon', stat_icon,
                        'stat_order', stat_order
                    ) ORDER BY stat_order), '[]'::jsonb)
                    FROM cms_page_stats cps_stats
                    WHERE cps_stats.page_id = cp.id AND cps_stats.is_active = TRUE
                ) as stats,
                (
                    SELECT COALESCE(jsonb_agg(jsonb_build_object(
                        'value_title', value_title,
                        'value_description', value_description,
                        'value_icon', value_icon,
                        'value_color', value_color,
                        'value_order', value_order
                    ) ORDER BY value_order), '[]'::jsonb)
                    FROM cms_page_values cps_values
                    WHERE cps_values.page_id = cp.id AND cps_values.is_active = TRUE
                ) as "values",
                (
                    SELECT COALESCE(jsonb_agg(jsonb_build_object(
                        'member_name', member_name,
                        'member_role', member_role,
                        'member_organization', member_organization,
                        'member_bio', member_bio,
                        'member_image_url', member_image_url,
                        'is_featured', is_featured,
                        'member_order', member_order
                    ) ORDER BY member_order), '[]'::jsonb)
                    FROM cms_page_team cps_team
                    WHERE cps_team.page_id = cp.id AND cps_team.is_active = TRUE
                ) as team,
                (
                    SELECT COALESCE(jsonb_agg(jsonb_build_object(
                        'timeline_year', timeline_year,
                        'timeline_title', timeline_title,
                        'timeline_description', timeline_description,
                        'timeline_order', timeline_order
                    ) ORDER BY timeline_order), '[]'::jsonb)
                    FROM cms_page_timeline cps_timeline
                    WHERE cps_timeline.page_id = cp.id AND cps_timeline.is_active = TRUE
                ) as timeline,
                (
                    SELECT COALESCE(jsonb_agg(jsonb_build_object(
                        'testimonial_name', testimonial_name,
                        'testimonial_location', testimonial_location,
                        'testimonial_role', testimonial_role,
                        'testimonial_quote', testimonial_quote,
                        'testimonial_image_url', testimonial_image_url,
                        'testimonial_order', testimonial_order
                    ) ORDER BY testimonial_order), '[]'::jsonb)
                    FROM cms_page_testimonials cps_testimonials
                    WHERE cps_testimonials.page_id = cp.id AND cps_testimonials.is_active = TRUE
                ) as testimonials,
                (
                    SELECT COALESCE(jsonb_agg(jsonb_build_object(
                        'section_name', section_name,
                        'section_type', section_type,
                        'section_title', section_title,
                        'section_subtitle', section_subtitle,
                        'section_content', section_content,
                        'section_order', section_order,
                        'items', (
                            SELECT COALESCE(jsonb_agg(jsonb_build_object(
                                'item_title', item_title,
                                'item_subtitle', item_subtitle,
                                'item_description', item_description,
                                'item_icon', item_icon,
                                'item_field', item_field,
                                'item_order', item_order
                            ) ORDER BY item_order), '[]'::jsonb)
                            FROM cms_page_section_items
                            WHERE section_id = cps.id AND is_active = TRUE
                        )
                    ) ORDER BY section_order), '[]'::jsonb)
                    FROM cms_page_sections cps
                    WHERE cps.page_id = cp.id AND cps.is_active = TRUE
                ) as sections,
                (
                    SELECT COALESCE(jsonb_agg(jsonb_build_object(
                        'hub_title', hub_title,
                        'hub_details', hub_details,
                        'hub_description', hub_description,
                        'hub_icon', hub_icon,
                        'hub_order', hub_order
                    ) ORDER BY hub_order), '[]'::jsonb)
                    FROM cms_page_hubs cps_hubs
                    WHERE cps_hubs.page_id = cp.id AND cps_hubs.is_active = TRUE
                ) as hubs
            FROM cms_pages cp
            WHERE cp.page_slug = p_page_slug AND cp.is_active = TRUE;
        END;
        $$ LANGUAGE plpgsql;
        """)
        print("[OK] get_cms_page_data() function created")
    except Exception as e:
        print(f"[ERROR] Creating function: {e}")
    
    # Insert seed data for CMS pages
    print("\n" + "=" * 70)
    print("INSERTING SEED DATA")
    print("=" * 70)
    
    seed_data = [
        # Home Page
        """
        INSERT INTO cms_pages (page_name, page_title, page_slug, meta_description, meta_keywords, hero_title, hero_subtitle, hero_quote, hero_quote_author)
        VALUES ('Home', 'SufiPulse - Global Sufi Music Platform', 'home', 
                'SufiPulse is a global platform for Sufi music collaboration', 
                'sufi music, kalam, spiritual music, qawwali, sufism, global platform',
                'Global Sufi Collaboration Studio',
                'From Kashmir''s sacred valleys to the global ummah submit your Sufi kalam',
                'We don''t sell divine lyrics. We amplify them.',
                'SufiPulse Promise')
        ON CONFLICT (page_slug) DO NOTHING;
        """,
        # About Page
        """
        INSERT INTO cms_pages (page_name, page_title, page_slug, meta_description, meta_keywords, hero_title, hero_subtitle)
        VALUES ('About', 'About SufiPulse - Our Story', 'about',
                'Learn about SufiPulse mission to preserve and promote Sufi music',
                'about sufiPulse, our mission, sufi music platform, spiritual collaboration',
                'Our Sacred Mission',
                'Serving the divine through the preservation, production, and global sharing of sacred Sufi kalam')
        ON CONFLICT (page_slug) DO NOTHING;
        """,
        # Contact Page
        """
        INSERT INTO cms_pages (page_name, page_title, page_slug, meta_description, meta_keywords, hero_title, hero_subtitle, hero_quote)
        VALUES ('Contact', 'Contact SufiPulse - Connect With Us', 'contact',
                'Get in touch with SufiPulse for writer submissions, vocalist applications',
                'contact sufiPulse, submit kalam, join vocalist pool, partnership',
                'Connect With Our Sacred Community',
                'Ready to share your divine Sufi kalam or collaborate with our global spiritual community?',
                'Every connection is a bridge between hearts seeking the Divine')
        ON CONFLICT (page_slug) DO NOTHING;
        """,
        # Gallery Page
        """
        INSERT INTO cms_pages (page_name, page_title, page_slug, meta_description, meta_keywords, hero_title, hero_subtitle)
        VALUES ('Gallery', 'Gallery - Sacred Kalam Videos', 'gallery',
                'Watch our collection of sacred Sufi kalam videos',
                'sufi videos, kalam gallery, sufi music, spiritual songs, qawwali videos',
                'Sacred Kalam Gallery',
                'Experience the divine fusion of sacred poetry and spiritual voices')
        ON CONFLICT (page_slug) DO NOTHING;
        """,
    ]
    
    for sql in seed_data:
        try:
            cursor.execute(sql)
            print("[OK] Seed data inserted")
        except Exception as e:
            print(f"[ERROR] Inserting seed data: {e}")
    
    # Verify tables
    print("\n" + "=" * 70)
    print("VERIFYING TABLES")
    print("=" * 70)
    
    cursor.execute("""
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        ORDER BY table_name;
    """)
    tables = cursor.fetchall()
    
    print(f"\nTables created ({len(tables)}):")
    for table in tables:
        print(f"  ✓ {table[0]}")
    
    cursor.close()
    conn.close()
    
    print("\n" + "=" * 70)
    print("DATABASE SETUP COMPLETE!")
    print("=" * 70)
    print("\nNext steps:")
    print("  1. Run: python main.py")
    print("  2. Test the API endpoints")
    print("=" * 70)

if __name__ == "__main__":
    main()
