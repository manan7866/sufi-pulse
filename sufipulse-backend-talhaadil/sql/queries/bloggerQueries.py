import json
from psycopg2.extras import RealDictCursor
from typing import List, Optional


class BloggerQueries:
    def __init__(self, conn):
        self.conn = conn

    def get_blogger_by_user_id(self, user_id: int):
        query = """
            SELECT
                b.*,
                u.country,
                u.city
            FROM bloggers b
            JOIN users u ON b.user_id = u.id
            WHERE b.user_id = %s;
        """
        with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, (user_id,))
            return cur.fetchone()

    def create_blogger_profile(self, user_id, author_name, author_image_url, short_bio,
                               location, website_url, social_links, publish_pseudonym,
                               original_work_confirmation, publishing_rights_granted,
                               discourse_policy_agreed):
        query = """
        INSERT INTO bloggers (
            user_id, author_name, author_image_url, short_bio,
            location, website_url, social_links, publish_pseudonym,
            original_work_confirmation, publishing_rights_granted, discourse_policy_agreed
        )
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        RETURNING *;
        """
        # Convert social_links to JSON string if it's a dict
        social_links_json = json.dumps(social_links) if isinstance(social_links, dict) else json.dumps({})
        
        with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, (
                user_id, author_name, author_image_url, short_bio,
                location, website_url, social_links_json, publish_pseudonym,
                original_work_confirmation, publishing_rights_granted, discourse_policy_agreed
            ))
            self.conn.commit()
            return cur.fetchone()

    def update_blogger_profile(self, user_id, author_name=None, author_image_url=None,
                               short_bio=None, location=None, website_url=None,
                               social_links=None, publish_pseudonym=None,
                               original_work_confirmation=None, publishing_rights_granted=None,
                               discourse_policy_agreed=None):
        fields = {
            "author_name": author_name,
            "author_image_url": author_image_url,
            "short_bio": short_bio,
            "location": location,
            "website_url": website_url,
            "social_links": social_links,
            "publish_pseudonym": publish_pseudonym,
            "original_work_confirmation": original_work_confirmation,
            "publishing_rights_granted": publishing_rights_granted,
            "discourse_policy_agreed": discourse_policy_agreed
        }

        set_clauses = []
        values = []

        for key, value in fields.items():
            if value is not None:
                set_clauses.append(f"{key} = %s")
                # Handle social_links which is a dict - convert to JSON string
                if key == "social_links" and isinstance(value, dict):
                    values.append(json.dumps(value))
                else:
                    values.append(value)

        if not set_clauses:
            return None  # Nothing to update

        set_clause_str = ", ".join(set_clauses) + ", updated_at = CURRENT_TIMESTAMP"
        values.append(user_id)

        query = f"""
            UPDATE bloggers
            SET {set_clause_str}
            WHERE user_id = %s
            RETURNING *;
        """

        with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, values)
            self.conn.commit()
            return cur.fetchone()

    def is_blogger_registered(self, user_id: int):
        query = """
        SELECT b.id
        FROM bloggers b
        JOIN users u ON u.id = b.user_id
        WHERE b.user_id = %s AND u.role = 'blogger';
        """
        with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, (user_id,))
            return cur.fetchone()

    def update_blogger_status(self, user_id: int, status: str):
        """Update blogger status (approved/rejected)"""
        query = """
        UPDATE bloggers
        SET status = %s, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = %s
        RETURNING *;
        """
        with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, (status, user_id))
            self.conn.commit()
            return cur.fetchone()

    def create_blog_submission(self, title: str, excerpt: str, featured_image_url: str, content: str,
                               category: str, tags: List[str], language: str,
                               user_id: int, editor_notes: str = None, scheduled_publish_date = None,
                               seo_meta_title: str = None, seo_meta_description: str = None):
        query = """
        INSERT INTO blog_submissions (
            title, excerpt, featured_image_url, content, category, tags, language, user_id, status,
            editor_notes, scheduled_publish_date, seo_meta_title, seo_meta_description
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, 'pending', %s, %s, %s, %s)
        RETURNING id;
        """
        with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, (
                title, excerpt, featured_image_url, content, category, tags, language, user_id,
                editor_notes, scheduled_publish_date, seo_meta_title, seo_meta_description
            ))
            self.conn.commit()
            result = cur.fetchone()
            return result['id'] if result else None

    def get_blog_submissions_by_user_id(self, user_id: int):
        query = """
            SELECT *
            FROM blog_submissions
            WHERE user_id = %s
            ORDER BY created_at DESC;
        """
        with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, (user_id,))
            return cur.fetchall()

    def get_blog_submission_by_id(self, blog_id: int):
        query = """
            SELECT *
            FROM blog_submissions
            WHERE id = %s;
        """
        with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, (blog_id,))
            return cur.fetchone()

    def update_blog_submission_status(self, blog_id: int, status: str, admin_comments: str = None):
        query = """
            UPDATE blog_submissions
            SET status = %s, admin_comments = %s, updated_at = CURRENT_TIMESTAMP
            WHERE id = %s
            RETURNING *;
        """
        with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, (status, admin_comments, blog_id))
            self.conn.commit()
            return cur.fetchone()

    def update_blog_submission(self, blog_id: int, title: str = None, excerpt: str = None,
                              featured_image_url: str = None, content: str = None,
                              category: str = None, tags: List[str] = None, language: str = None,
                              editor_notes: str = None, scheduled_publish_date = None,
                              seo_meta_title: str = None, seo_meta_description: str = None):
        fields = {
            "title": title,
            "excerpt": excerpt,
            "featured_image_url": featured_image_url,
            "content": content,
            "category": category,
            "tags": tags,
            "language": language,
            "editor_notes": editor_notes,
            "scheduled_publish_date": scheduled_publish_date,
            "seo_meta_title": seo_meta_title,
            "seo_meta_description": seo_meta_description
        }

        set_clauses = []
        values = []

        for key, value in fields.items():
            if value is not None:
                set_clauses.append(f"{key} = %s")
                values.append(value)

        if not set_clauses:
            return None  # Nothing to update

        set_clause_str = ", ".join(set_clauses) + ", updated_at = CURRENT_TIMESTAMP"
        values.append(blog_id)

        query = f"""
            UPDATE blog_submissions
            SET {set_clause_str}
            WHERE id = %s
            RETURNING *;
        """

        with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, values)
            self.conn.commit()
            return cur.fetchone()

    def fetch_blog_submissions(self, skip: int, limit: int) -> List[dict]:
        query = """
            SELECT
                bs.*,
                u.name AS user_name,
                u.email AS user_email
            FROM blog_submissions bs
            JOIN users u ON bs.user_id = u.id
            ORDER BY bs.created_at DESC
            OFFSET %s
            LIMIT %s;
        """
        with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, (skip, limit))
            blogs = cur.fetchall()
            return blogs

    def get_blog_submissions_count(self) -> int:
        query = """
            SELECT COUNT(*) as count
            FROM blog_submissions;
        """
        with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query)
            result = cur.fetchone()
            return result['count'] if result else 0

    def fetch_approved_blogs(self, skip: int = 0, limit: int = 6, category: str = None, search: str = None) -> List[dict]:
        query = """
            SELECT
                bs.*,
                u.name AS author_name,
                u.email AS author_email,
                b.author_name AS blogger_name,
                b.author_image_url,
                b.short_bio
            FROM blog_submissions bs
            JOIN users u ON bs.user_id = u.id
            LEFT JOIN bloggers b ON bs.user_id = b.user_id
            WHERE bs.status IN ('approved', 'posted')
        """

        params = []

        if category:
            query += " AND LOWER(bs.category) = LOWER(%s)"
            params.append(category)

        if search:
            query += " AND (bs.title ILIKE %s OR bs.excerpt ILIKE %s OR bs.content ILIKE %s)"
            search_param = f"%{search}%"
            params.extend([search_param, search_param, search_param])

        query += " ORDER BY bs.created_at DESC OFFSET %s LIMIT %s"
        params.extend([skip, limit])

        with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, params)
            return cur.fetchall()

    def fetch_blog_by_id(self, blog_id: int) -> dict:
        """Fetch a single blog post by ID"""
        query = """
            SELECT
                bs.*,
                u.name AS author_name,
                u.email AS author_email,
                b.author_name AS blogger_name,
                b.author_image_url,
                b.short_bio,
                b.location AS blogger_location,
                b.website_url AS blogger_website
            FROM blog_submissions bs
            JOIN users u ON bs.user_id = u.id
            LEFT JOIN bloggers b ON bs.user_id = b.user_id
            WHERE bs.id = %s AND bs.status IN ('approved', 'posted')
        """

        with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, (blog_id,))
            return cur.fetchone()

    # ==================== BLOG ENGAGEMENT QUERIES ====================

    def record_blog_view(self, blog_id: int, user_id: int = None, ip_address: str = None, user_agent: str = None) -> bool:
        """
        Record a blog view. Returns True if view was counted (unique), False if duplicate.
        Uses ON CONFLICT to handle unique constraint violations gracefully.
        """
        query = """
            INSERT INTO blog_views (blog_id, user_id, ip_address, user_agent)
            VALUES (%s, %s, %s, %s)
            ON CONFLICT (blog_id, user_id, ip_address) DO NOTHING
            RETURNING id;
        """
        with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, (blog_id, user_id, ip_address, user_agent))
            result = cur.fetchone()
            if result:
                # Update the cached view count
                self._update_blog_count(blog_id, 'view_count')
                return True
            return False

    def record_blog_like(self, blog_id: int, user_id: int = None, ip_address: str = None) -> dict:
        """
        Record or remove a blog like (toggle functionality).
        Returns dict with 'liked' status and 'like_id'.
        """
        with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
            # Check if like already exists
            cur.execute("""
                SELECT id FROM blog_likes 
                WHERE blog_id = %s AND (user_id = %s OR (user_id IS NULL AND ip_address = %s))
            """, (blog_id, user_id, ip_address))
            existing_like = cur.fetchone()

            if existing_like:
                # Unlike - remove the like
                cur.execute("DELETE FROM blog_likes WHERE id = %s RETURNING id", (existing_like['id'],))
                self._update_blog_count(blog_id, 'like_count', decrement=True)
                self.conn.commit()
                return {'liked': False, 'like_id': None}
            else:
                # Like - add the like
                cur.execute("""
                    INSERT INTO blog_likes (blog_id, user_id, ip_address)
                    VALUES (%s, %s, %s)
                    RETURNING id
                """, (blog_id, user_id, ip_address))
                like_result = cur.fetchone()
                self._update_blog_count(blog_id, 'like_count')
                self.conn.commit()
                return {'liked': True, 'like_id': like_result['id']}

    def is_user_liked_blog(self, blog_id: int, user_id: int = None, ip_address: str = None) -> bool:
        """Check if a user/IP has already liked a blog"""
        query = """
            SELECT EXISTS(
                SELECT 1 FROM blog_likes 
                WHERE blog_id = %s AND (user_id = %s OR (user_id IS NULL AND ip_address = %s))
            ) as liked
        """
        with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, (blog_id, user_id, ip_address))
            result = cur.fetchone()
            return result['liked'] if result else False

    def add_blog_comment(self, blog_id: int, comment_text: str, user_id: int = None, 
                        commenter_name: str = None, commenter_email: str = None, 
                        parent_id: int = None) -> int:
        """Add a comment to a blog post. Returns comment ID."""
        query = """
            INSERT INTO blog_comments (blog_id, user_id, commenter_name, commenter_email, comment_text, parent_id)
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING id;
        """
        with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, (blog_id, user_id, commenter_name, commenter_email, comment_text, parent_id))
            result = cur.fetchone()
            if result:
                # Update the cached comment count
                self._update_blog_count(blog_id, 'comment_count')
                self.conn.commit()
                return result['id']
            return None

    def get_blog_comments(self, blog_id: int, only_approved: bool = True) -> list:
        """Get all comments for a blog post (optionally only approved ones)"""
        query = """
            SELECT 
                bc.*,
                u.name as user_name,
                u.email as user_email
            FROM blog_comments bc
            LEFT JOIN users u ON bc.user_id = u.id
            WHERE bc.blog_id = %s AND bc.parent_id IS NULL
            """ + ("AND bc.is_approved = TRUE " if only_approved else "") + """
            ORDER BY bc.created_at DESC
        """
        with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, (blog_id,))
            comments = cur.fetchall()
            
            # Get replies for each comment
            for comment in comments:
                comment['replies'] = self._get_comment_replies(comment['id'], only_approved)
            
            return comments

    def _get_comment_replies(self, parent_id: int, only_approved: bool = True) -> list:
        """Get replies to a specific comment"""
        query = """
            SELECT 
                bc.*,
                u.name as user_name,
                u.email as user_email
            FROM blog_comments bc
            LEFT JOIN users u ON bc.user_id = u.id
            WHERE bc.parent_id = %s
            """ + ("AND bc.is_approved = TRUE " if only_approved else "") + """
            ORDER BY bc.created_at ASC
        """
        with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, (parent_id,))
            return cur.fetchall()

    def approve_comment(self, comment_id: int) -> bool:
        """Approve a comment"""
        query = """
            UPDATE blog_comments 
            SET is_approved = TRUE, updated_at = CURRENT_TIMESTAMP
            WHERE id = %s
            RETURNING id
        """
        with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, (comment_id,))
            result = cur.fetchone()
            if result:
                # Get the blog_id to update comment count
                cur.execute("SELECT blog_id FROM blog_comments WHERE id = %s", (comment_id,))
                blog_result = cur.fetchone()
                if blog_result:
                    self._update_blog_count(blog_result['blog_id'], 'comment_count')
                self.conn.commit()
                return True
            return False

    def delete_comment(self, comment_id: int) -> bool:
        """Delete a comment"""
        query = """
            DELETE FROM blog_comments 
            WHERE id = %s
            RETURNING blog_id
        """
        with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, (comment_id,))
            result = cur.fetchone()
            if result:
                self._update_blog_count(result['blog_id'], 'comment_count', decrement=True)
                self.conn.commit()
                return True
            return False

    def record_blog_share(self, blog_id: int, platform: str, user_id: int = None, ip_address: str = None) -> bool:
        """Record a blog share event"""
        query = """
            INSERT INTO blog_shares (blog_id, user_id, ip_address, share_platform)
            VALUES (%s, %s, %s, %s)
            RETURNING id
        """
        with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, (blog_id, user_id, ip_address, platform))
            result = cur.fetchone()
            self.conn.commit()
            return result is not None

    def get_blog_engagement_stats(self, blog_id: int) -> dict:
        """Get comprehensive engagement statistics for a blog"""
        query = """
            SELECT 
                (SELECT COUNT(*) FROM blog_views WHERE blog_id = %s) as total_views,
                (SELECT COUNT(*) FROM blog_likes WHERE blog_id = %s) as total_likes,
                (SELECT COUNT(*) FROM blog_comments WHERE blog_id = %s AND is_approved = TRUE) as total_comments,
                (SELECT COUNT(*) FROM blog_shares WHERE blog_id = %s) as total_shares
        """
        with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, (blog_id, blog_id, blog_id, blog_id))
            return cur.fetchone()

    def get_blog_share_stats(self, blog_id: int) -> dict:
        """Get share statistics broken down by platform"""
        query = """
            SELECT share_platform, COUNT(*) as share_count
            FROM blog_shares
            WHERE blog_id = %s
            GROUP BY share_platform
        """
        with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, (blog_id,))
            results = cur.fetchall()
            return {row['share_platform']: row['share_count'] for row in results}

    def _update_blog_count(self, blog_id: int, count_type: str, decrement: bool = False):
        """
        Helper method to update cached count in blog_submissions table.
        count_type: 'view_count', 'like_count', or 'comment_count'
        """
        # Determine the source table and column based on count_type
        table_map = {
            'view_count': ('blog_views', 'id'),
            'like_count': ('blog_likes', 'id'),
            'comment_count': ('blog_comments', 'id')
        }
        
        if count_type not in table_map:
            return
        
        source_table, source_col = table_map[count_type]
        
        # For comments, only count approved ones
        if count_type == 'comment_count':
            count_query = f"SELECT COUNT(*) as count FROM {source_table} WHERE blog_id = %s AND is_approved = TRUE"
        else:
            count_query = f"SELECT COUNT(*) as count FROM {source_table} WHERE blog_id = %s"
        
        with self.conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(count_query, (blog_id,))
            result = cur.fetchone()
            new_count = result['count'] if result else 0
            
            # Update the blog_submissions table
            update_query = f"""
                UPDATE blog_submissions 
                SET {count_type} = %s, updated_at = CURRENT_TIMESTAMP
                WHERE id = %s
            """
            cur.execute(update_query, (new_count, blog_id))