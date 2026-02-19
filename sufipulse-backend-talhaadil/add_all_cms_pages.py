#!/usr/bin/env python3
"""
Add All 20 CMS Pages with Complete Data
This script inserts all 20 CMS pages with their stats, values, team, testimonials, sections, and hubs
"""

import os
import sys
from dotenv import load_dotenv
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

def get_page_id(cursor, page_slug):
    """Get page ID by slug"""
    cursor.execute("SELECT id FROM cms_pages WHERE page_slug = %s", (page_slug,))
    result = cursor.fetchone()
    return result[0] if result else None

def main():
    print("=" * 70)
    print("ADDING ALL 20 CMS PAGES WITH COMPLETE DATA")
    print("=" * 70)
    
    # Load environment
    load_dotenv()
    DATABASE_URL = os.getenv("DATABASE_URL")
    
    if not DATABASE_URL:
        print("[ERROR] DATABASE_URL not found in .env")
        sys.exit(1)
    
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
    
    # Additional CMS pages (beyond the initial 4)
    print("\n" + "=" * 70)
    print("INSERTING ADDITIONAL CMS PAGES")
    print("=" * 70)
    
    additional_pages = [
        # 5. Our Mission (may already exist)
        {
            'page_name': 'Our Mission',
            'page_title': 'Our Mission - SufiPulse Vision',
            'page_slug': 'our-mission',
            'meta_description': 'Discover the three sacred vows that guide SufiPulse',
            'meta_keywords': 'sufiPulse mission, vision, spiritual service, sufi music preservation',
            'hero_title': 'Our Mission',
            'hero_subtitle': 'Our mission is rooted in three sacred vows',
            'hero_quote': 'Our mission is rooted in three sacred vows',
        },
        # 6. Who We Are
        {
            'page_name': 'Who We Are',
            'page_title': 'Who We Are - SufiPulse Team',
            'page_slug': 'who-we-are',
            'meta_description': 'Meet the visionaries and organizations behind SufiPulse',
            'meta_keywords': 'sufiPulse team, founders, organizations, sufi music leaders',
            'hero_title': 'Who We Are',
            'hero_subtitle': 'SufiPulse is a spiritually-driven, non-commercial Sufi music production platform',
            'hero_quote': 'We are not a label. We are a legacy.',
        },
        # 7. Founder
        {
            'page_name': 'Founder',
            'page_title': 'Dr. Zarf-e-Noori - SufiPulse Founder',
            'page_slug': 'founder',
            'meta_description': 'Learn about Dr. Zarf-e-Noori, the visionary founder of SufiPulse Global',
            'meta_keywords': 'Dr. Zarf-e-Noori, sufiPulse founder, sufi music visionary, kashmiri lyricist',
            'hero_title': 'Dr. Zarf-e-Noori',
            'hero_subtitle': 'Founder & Visionary of SufiPulse - Bridging the sacred valleys of Kashmir with the global spiritual community',
        },
        # 8. Acknowledgments
        {
            'page_name': 'Acknowledgments',
            'page_title': 'Acknowledgments - SufiPulse',
            'page_slug': 'acknowledgments',
            'meta_description': 'Acknowledging all contributors to the SufiPulse mission.',
            'meta_keywords': 'acknowledgments, contributors, community, thanks',
            'hero_title': 'Acknowledgments',
            'hero_subtitle': 'Recognizing all those who contribute to our sacred mission',
        },
        # 9. Ethical Policy
        {
            'page_name': 'Ethical Policy',
            'page_title': 'Ethical Policy - SufiPulse',
            'page_slug': 'ethical-policy',
            'meta_description': 'Our ethical guidelines and principles for serving the sacred.',
            'meta_keywords': 'ethics, policy, guidelines, principles',
            'hero_title': 'Ethical Policy',
            'hero_subtitle': 'Our commitment to integrity and spiritual authenticity',
        },
        # 10. How It Works
        {
            'page_name': 'How It Works',
            'page_title': 'How It Works - SufiPulse',
            'page_slug': 'how-it-works',
            'meta_description': 'Learn how SufiPulse works from submission to publication.',
            'meta_keywords': 'how it works, process, steps, guide',
            'hero_title': 'How It Works',
            'hero_subtitle': 'From kalam submission to global publication - your journey explained',
        },
        # 11. Partnership
        {
            'page_name': 'Partnership',
            'page_title': 'Partnership - SufiPulse',
            'page_slug': 'partnership',
            'meta_description': 'Partnership opportunities with SufiPulse.',
            'meta_keywords': 'partnership, collaboration, alliance',
            'hero_title': 'Partnership',
            'hero_subtitle': 'Join us in amplifying the divine pulse globally',
        },
        # 12. Guest Blogs
        {
            'page_name': 'Guest Blogs',
            'page_title': 'Guest Blogs - SufiPulse',
            'page_slug': 'guest-blogs',
            'meta_description': 'Guest blog posts from our community.',
            'meta_keywords': 'guest blogs, articles, community posts',
            'hero_title': 'Guest Blogs',
            'hero_subtitle': 'Voices from our global Sufi community',
        },
        # 13. Music Style Selection
        {
            'page_name': 'Music Style Selection',
            'page_title': 'Music Style Selection - SufiPulse',
            'page_slug': 'music-style-selection',
            'meta_description': 'Choose your musical style for kalam adaptation.',
            'meta_keywords': 'music style, selection, musical styles',
            'hero_title': 'Music Style Selection',
            'hero_subtitle': 'Find the perfect musical arrangement for your kalam',
        },
        # 14. Kalam Library
        {
            'page_name': 'Kalam Library',
            'page_title': 'Kalam Library - SufiPulse',
            'page_slug': 'kalam-library',
            'meta_description': 'Browse our library of kalam.',
            'meta_keywords': 'kalam library, browse kalam, kalam collection',
            'hero_title': 'Kalam Library',
            'hero_subtitle': 'Explore our collection of sacred Sufi poetry',
        },
        # 15. Writer FAQs
        {
            'page_name': 'Writer FAQs',
            'page_title': 'Writer FAQs - SufiPulse',
            'page_slug': 'writer-faqs',
            'meta_description': 'Frequently asked questions for writers.',
            'meta_keywords': 'writer faqs, FAQs, questions, answers',
            'hero_title': 'Writer FAQs',
            'hero_subtitle': 'Common questions from our writer community',
        },
        # 16. Studio
        {
            'page_name': 'Studio',
            'page_title': 'Studio - SufiPulse',
            'page_slug': 'studio',
            'meta_description': 'SufiPulse recording studio.',
            'meta_keywords': 'studio, recording studio, sufi studio',
            'hero_title': 'Recording Studio',
            'hero_subtitle': 'World-class facilities for sacred music production',
        },
        # 17. Studio Engineers
        {
            'page_name': 'Studio Engineers',
            'page_title': 'Studio Engineers - SufiPulse',
            'page_slug': 'studio-engineers',
            'meta_description': 'Meet our studio engineering team.',
            'meta_keywords': 'studio engineers, audio engineers, team',
            'hero_title': 'Studio Engineers',
            'hero_subtitle': 'Expert engineers dedicated to sacred sound',
        },
        # 18. Sufi Science Center
        {
            'page_name': 'Sufi Science Center',
            'page_title': 'Sufi Science Center - SufiPulse',
            'page_slug': 'sufi-science-center',
            'meta_description': 'Sufi Science Center research and education.',
            'meta_keywords': 'sufi science center, research, education',
            'hero_title': 'Sufi Science Center',
            'hero_subtitle': 'Bridging ancient wisdom with modern understanding',
        },
        # 19. Sufi Music Theory
        {
            'page_name': 'Sufi Music Theory',
            'page_title': 'Sufi Music Theory - SufiPulse',
            'page_slug': 'sufi-music-theory',
            'meta_description': 'Learn about Sufi music theory.',
            'meta_keywords': 'sufi music theory, music theory, sufi music',
            'hero_title': 'Sufi Music Theory',
            'hero_subtitle': 'Understanding the spiritual science of sacred music',
        },
        # 20. Vocalist How It Works
        {
            'page_name': 'Vocalist How It Works',
            'page_title': 'Vocalist How It Works - SufiPulse',
            'page_slug': 'vocalist-how-it-works',
            'meta_description': 'How the vocalist journey works.',
            'meta_keywords': 'vocalist how it works, vocalist process, vocalist guide',
            'hero_title': 'Vocalist Journey',
            'hero_subtitle': 'Your path from application to global stage',
        },
    ]
    
    pages_added = 0
    for page_data in additional_pages:
        try:
            cursor.execute("""
                INSERT INTO cms_pages (
                    page_name, page_title, page_slug, 
                    meta_description, meta_keywords,
                    hero_title, hero_subtitle, hero_quote
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (page_slug) DO NOTHING
            """, (
                page_data['page_name'],
                page_data['page_title'],
                page_data['page_slug'],
                page_data['meta_description'],
                page_data['meta_keywords'],
                page_data['hero_title'],
                page_data['hero_subtitle'],
                page_data.get('hero_quote', None)
            ))
            pages_added += 1
            print(f"[OK] Added: {page_data['page_name']} ({page_data['page_slug']})")
        except Exception as e:
            print(f"[ERROR] Adding {page_data['page_name']}: {e}")
    
    print(f"\nPages added: {pages_added}")
    
    # Now add detailed content for key pages
    print("\n" + "=" * 70)
    print("ADDING DETAILED PAGE CONTENT")
    print("=" * 70)
    
    # Our Mission - Values
    page_id = get_page_id(cursor, 'our-mission')
    if page_id:
        try:
            cursor.execute("""
                INSERT INTO cms_page_values (page_id, value_title, value_description, value_icon, value_color, value_order)
                VALUES (%s, %s, %s, %s, %s, %s)
                ON CONFLICT DO NOTHING
            """, (page_id, 'To Serve the Divine Word', 
                  'We do not monetize, modify, or exploit kalam. We protect its essence and amplify its reach.',
                  'Heart', 'emerald', 1))
            
            cursor.execute("""
                INSERT INTO cms_page_values (page_id, value_title, value_description, value_icon, value_color, value_order)
                VALUES (%s, %s, %s, %s, %s, %s)
                ON CONFLICT DO NOTHING
            """, (page_id, 'Unity Through Sound',
                  'From Kashmir to Los Angeles, from Cairo to Kuala Lumpur we believe every soul carrying divine lyrics deserves a global stage.',
                  'Globe', 'emerald', 2))
            
            cursor.execute("""
                INSERT INTO cms_page_values (page_id, value_title, value_description, value_icon, value_color, value_order)
                VALUES (%s, %s, %s, %s, %s, %s)
                ON CONFLICT DO NOTHING
            """, (page_id, 'To Produce With Purity',
                  'No marketing agenda. No monetization. No fame game. Just sincere production powered by sincerity, silence, and surrender.',
                  'Shield', 'emerald', 3))
            print("[OK] Our Mission - Values added")
        except Exception as e:
            print(f"[ERROR] Our Mission values: {e}")
    
    # Who We Are - Values and Stats
    page_id = get_page_id(cursor, 'who-we-are')
    if page_id:
        try:
            cursor.execute("""
                INSERT INTO cms_page_values (page_id, value_title, value_description, value_icon, value_order)
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT DO NOTHING
            """, (page_id, 'Serve the Divine Word',
                  'We do not monetize, modify, or exploit kalam. We protect its essence and amplify its reach.',
                  'Heart', 1))
            
            cursor.execute("""
                INSERT INTO cms_page_values (page_id, value_title, value_description, value_icon, value_order)
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT DO NOTHING
            """, (page_id, 'Unite Ummah via Sound',
                  'From Kashmir to Los Angeles, from Cairo to Kuala Lumpur every soul carrying divine lyrics deserves a global stage.',
                  'Globe', 2))
            
            cursor.execute("""
                INSERT INTO cms_page_values (page_id, value_title, value_description, value_icon, value_order)
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT DO NOTHING
            """, (page_id, 'Produce With Purity',
                  'No marketing agenda. No monetization. No fame game. Just sincere production powered by sincerity, silence, and surrender.',
                  'Shield', 3))
            print("[OK] Who We Are - Values added")
        except Exception as e:
            print(f"[ERROR] Who We Are values: {e}")
    
    # Founder - Sections and Items
    page_id = get_page_id(cursor, 'founder')
    if page_id:
        try:
            # Add Creative Roles section
            cursor.execute("""
                INSERT INTO cms_page_sections (page_id, section_name, section_type, section_title, section_subtitle, section_order)
                VALUES (%s, %s, %s, %s, %s, %s)
                ON CONFLICT DO NOTHING
            """, (page_id, 'Creative Roles', 'roles', 'Creative Leadership', 
                  'Dr. Zarf-e-Noori\'s multifaceted creative roles', 1))
            
            section_id = cursor.execute("SELECT id FROM cms_page_sections WHERE page_id = %s AND section_name = %s", (page_id, 'Creative Roles'))
            section_result = cursor.fetchone()
            if section_result:
                section_id = section_result[0]
                
                # Add section items
                roles = [
                    ('Writer', 'Crafting sacred Sufi poetry with deep spiritual insight', 'PenTool', 1),
                    ('Lyricist', 'Creating divine verses that resonate with the soul', 'Music', 2),
                    ('Composer', 'Harmonizing words with melodies for spiritual elevation', 'Mic', 3),
                    ('Creative Director', 'Guiding SufiPulse\'s artistic vision and mission', 'Users', 4),
                ]
                
                for role_name, role_desc, role_icon, role_order in roles:
                    cursor.execute("""
                        INSERT INTO cms_page_section_items (section_id, item_title, item_description, item_icon, item_order)
                        VALUES (%s, %s, %s, %s, %s)
                        ON CONFLICT DO NOTHING
                    """, (section_id, role_name, role_desc, role_icon, role_order))
            
            print("[OK] Founder - Creative Roles added")
        except Exception as e:
            print(f"[ERROR] Founder sections: {e}")
    
    # How It Works - Stats
    page_id = get_page_id(cursor, 'how-it-works')
    if page_id:
        try:
            cursor.execute("""
                INSERT INTO cms_page_stats (page_id, stat_number, stat_label, stat_description, stat_icon, stat_order)
                VALUES (%s, %s, %s, %s, %s, %s)
                ON CONFLICT DO NOTHING
            """, (page_id, '4', 'Simple Steps', 'From submission to publication', 'List', 1))
            
            cursor.execute("""
                INSERT INTO cms_page_stats (page_id, stat_number, stat_label, stat_description, stat_icon, stat_order)
                VALUES (%s, %s, %s, %s, %s, %s)
                ON CONFLICT DO NOTHING
            """, (page_id, '100%', 'Free Service', 'No cost to writers ever', 'Heart', 2))
            print("[OK] How It Works - Stats added")
        except Exception as e:
            print(f"[ERROR] How It Works stats: {e}")
    
    # Contact - Hubs (may already exist)
    page_id = get_page_id(cursor, 'contact')
    if page_id:
        try:
            cursor.execute("""
                INSERT INTO cms_page_hubs (page_id, hub_title, hub_details, hub_description, hub_icon, hub_order)
                VALUES (%s, %s, %s, %s, %s, %s)
                ON CONFLICT DO NOTHING
            """, (page_id, 'Global Creative Hub', 'SufiPulse Studio, Virginia, USA', 
                  'Our main creative center', 'MapPin', 1))
            
            cursor.execute("""
                INSERT INTO cms_page_hubs (page_id, hub_title, hub_details, hub_description, hub_icon, hub_order)
                VALUES (%s, %s, %s, %s, %s, %s)
                ON CONFLICT DO NOTHING
            """, (page_id, 'Spiritual Heritage Hub', 
                  'SufiPulse – Kashmir, Srinagar, Jammu & Kashmir, India', 
                  'Rooted in spiritual tradition', 'MapPin', 2))
            
            cursor.execute("""
                INSERT INTO cms_page_hubs (page_id, hub_title, hub_details, hub_description, hub_icon, hub_order)
                VALUES (%s, %s, %s, %s, %s, %s)
                ON CONFLICT DO NOTHING
            """, (page_id, 'Email Us', 'connect@sufipulse.com', 
                  'Connect with us globally', 'Mail', 3))
            print("[OK] Contact - Hubs added")
        except Exception as e:
            print(f"[ERROR] Contact hubs: {e}")
    
    # Home - Stats (may already exist)
    page_id = get_page_id(cursor, 'home')
    if page_id:
        try:
            cursor.execute("""
                INSERT INTO cms_page_stats (page_id, stat_number, stat_label, stat_description, stat_icon, stat_order)
                VALUES (%s, %s, %s, %s, %s, %s)
                ON CONFLICT DO NOTHING
            """, (page_id, '300+', 'Sacred Collaborations', 'Divine kalam brought to life', 'Heart', 1))
            
            cursor.execute("""
                INSERT INTO cms_page_stats (page_id, stat_number, stat_label, stat_description, stat_icon, stat_order)
                VALUES (%s, %s, %s, %s, %s, %s)
                ON CONFLICT DO NOTHING
            """, (page_id, '43+', 'Countries Represented', 'Global spiritual community', 'Globe', 2))
            
            cursor.execute("""
                INSERT INTO cms_page_stats (page_id, stat_number, stat_label, stat_description, stat_icon, stat_order)
                VALUES (%s, %s, %s, %s, %s, %s)
                ON CONFLICT DO NOTHING
            """, (page_id, '150+', 'Divine Kalam Created', 'Sacred productions', 'Music', 3))
            print("[OK] Home - Stats added")
        except Exception as e:
            print(f"[ERROR] Home stats: {e}")
    
    # About - Values, Team, Timeline, Stats
    page_id = get_page_id(cursor, 'about')
    if page_id:
        try:
            # Values
            values = [
                ('Spiritual Integrity', 'Every project is approached with deep reverence for the sacred nature of Sufi poetry and spiritual expression.', 'Heart', 1),
                ('Global Unity', 'Bridging cultures and languages through the universal language of divine love and spiritual awakening.', 'Globe', 2),
                ('Non-Commercial Service', 'We serve the sacred, not profit. All our services are provided freely to uplift the spiritual community.', 'Shield', 3),
                ('Excellence in Craft', 'Combining technical mastery with spiritual sensitivity to create productions worthy of the divine message.', 'Award', 4),
            ]
            
            for value_title, value_desc, value_icon, value_order in values:
                cursor.execute("""
                    INSERT INTO cms_page_values (page_id, value_title, value_description, value_icon, value_order)
                    VALUES (%s, %s, %s, %s, %s)
                    ON CONFLICT DO NOTHING
                """, (page_id, value_title, value_desc, value_icon, value_order))
            
            # Team
            team_members = [
                ('Dr. Zarf-e-Noori', 'Founder & Visionary', 'SufiPulse Global',
                 'Kashmiri-American visionary bridging ancient Sufi wisdom with modern innovation.',
                 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=200', True, 1),
                ('Dr. Amara Kumar', 'Spiritual Director', 'Dr. Kumar Foundation',
                 'Renowned scholar of comparative mysticism and founder of the Dr. Kumar Foundation.',
                 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200', False, 2),
            ]
            
            for member_name, member_role, member_org, member_bio, member_image, is_featured, member_order in team_members:
                cursor.execute("""
                    INSERT INTO cms_page_team (page_id, member_name, member_role, member_organization, member_bio, member_image_url, is_featured, member_order)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                    ON CONFLICT DO NOTHING
                """, (page_id, member_name, member_role, member_org, member_bio, member_image, is_featured, member_order))
            
            # Timeline
            timeline_events = [
                ('2022', 'Vision Conceived', 'Dr. Zarf-e-Noori envisions a global platform for Sufi collaboration'),
                ('2023', 'Foundation Established', 'SufiPulse launched as a joint initiative'),
                ('2024', 'Global Expansion', 'Connected writers and vocalists from 50+ countries'),
                ('2025', 'Digital Platform Launch', 'Launched comprehensive online platform'),
            ]
            
            for timeline_year, timeline_title, timeline_desc, timeline_order in [(t[0], t[1], t[2], i+1) for i, t in enumerate(timeline_events)]:
                cursor.execute("""
                    INSERT INTO cms_page_timeline (page_id, timeline_year, timeline_title, timeline_description, timeline_order)
                    VALUES (%s, %s, %s, %s, %s)
                    ON CONFLICT DO NOTHING
                """, (page_id, timeline_year, timeline_title, timeline_desc, timeline_order))
            
            print("[OK] About - Values, Team, Timeline added")
        except Exception as e:
            print(f"[ERROR] About content: {e}")
    
    # Gallery - Stats
    page_id = get_page_id(cursor, 'gallery')
    if page_id:
        try:
            cursor.execute("""
                INSERT INTO cms_page_stats (page_id, stat_number, stat_label, stat_description, stat_icon, stat_order)
                VALUES (%s, %s, %s, %s, %s, %s)
                ON CONFLICT DO NOTHING
            """, (page_id, '0', 'Sacred Videos', 'Our complete collection', 'Play', 1))
            
            cursor.execute("""
                INSERT INTO cms_page_stats (page_id, stat_number, stat_label, stat_description, stat_icon, stat_order)
                VALUES (%s, %s, %s, %s, %s, %s)
                ON CONFLICT DO NOTHING
            """, (page_id, '17+', 'Languages', 'Multilingual content', 'Globe', 2))
            print("[OK] Gallery - Stats added")
        except Exception as e:
            print(f"[ERROR] Gallery stats: {e}")
    
    # Final verification
    print("\n" + "=" * 70)
    print("FINAL VERIFICATION")
    print("=" * 70)
    
    cursor.execute("""
        SELECT page_slug, page_name 
        FROM cms_pages 
        ORDER BY id
    """)
    all_pages = cursor.fetchall()
    
    print(f"\nTotal CMS Pages: {len(all_pages)}")
    print("\nAll Pages:")
    for page in all_pages:
        print(f"  - {page[1]} ({page[0]})")
    
    cursor.execute("""
        SELECT 
            (SELECT COUNT(*) FROM cms_pages) as pages,
            (SELECT COUNT(*) FROM cms_page_stats) as stats,
            (SELECT COUNT(*) FROM cms_page_values) as values,
            (SELECT COUNT(*) FROM cms_page_team) as team,
            (SELECT COUNT(*) FROM cms_page_timeline) as timeline,
            (SELECT COUNT(*) FROM cms_page_testimonials) as testimonials,
            (SELECT COUNT(*) FROM cms_page_sections) as sections,
            (SELECT COUNT(*) FROM cms_page_section_items) as section_items,
            (SELECT COUNT(*) FROM cms_page_hubs) as hubs
    """)
    counts = cursor.fetchone()
    
    print(f"\nContent Summary:")
    print(f"  - Pages: {counts[0]}")
    print(f"  - Stats: {counts[1]}")
    print(f"  - Values: {counts[2]}")
    print(f"  - Team Members: {counts[3]}")
    print(f"  - Timeline Events: {counts[4]}")
    print(f"  - Testimonials: {counts[5]}")
    print(f"  - Sections: {counts[6]}")
    print(f"  - Section Items: {counts[7]}")
    print(f"  - Hubs: {counts[8]}")
    
    cursor.close()
    conn.close()
    
    print("\n" + "=" * 70)
    print("CMS DATA SETUP COMPLETE!")
    print("=" * 70)

if __name__ == "__main__":
    main()
