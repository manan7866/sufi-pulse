-- Blog Engagement Schema
-- Tables for tracking blog views, likes, comments, and shares

-- Blog Views Table
-- Tracks unique views by user_id or IP address to prevent duplicate counting
CREATE TABLE IF NOT EXISTS public.blog_views (
    id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    blog_id INTEGER NOT NULL,
    user_id INTEGER,
    ip_address VARCHAR(45),
    user_agent TEXT,
    viewed_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT blog_views_blog_id_fkey FOREIGN KEY (blog_id) 
        REFERENCES public.blog_submissions(id) ON DELETE CASCADE,
    CONSTRAINT blog_views_user_id_fkey FOREIGN KEY (user_id) 
        REFERENCES public.users(id) ON DELETE SET NULL,
    CONSTRAINT blog_views_unique_view UNIQUE (blog_id, user_id, ip_address)
);

-- Blog Likes Table
-- Allows users to like blog posts (one like per user per blog)
CREATE TABLE IF NOT EXISTS public.blog_likes (
    id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    blog_id INTEGER NOT NULL,
    user_id INTEGER,
    ip_address VARCHAR(45),
    liked_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT blog_likes_blog_id_fkey FOREIGN KEY (blog_id) 
        REFERENCES public.blog_submissions(id) ON DELETE CASCADE,
    CONSTRAINT blog_likes_user_id_fkey FOREIGN KEY (user_id) 
        REFERENCES public.users(id) ON DELETE SET NULL,
    CONSTRAINT blog_likes_unique_like UNIQUE (blog_id, user_id, ip_address)
);

-- Blog Comments Table
-- Stores user comments on blog posts
CREATE TABLE IF NOT EXISTS public.blog_comments (
    id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    blog_id INTEGER NOT NULL,
    user_id INTEGER,
    commenter_name VARCHAR(255),
    commenter_email VARCHAR(255),
    comment_text TEXT NOT NULL,
    parent_id INTEGER,
    is_approved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT blog_comments_blog_id_fkey FOREIGN KEY (blog_id) 
        REFERENCES public.blog_submissions(id) ON DELETE CASCADE,
    CONSTRAINT blog_comments_user_id_fkey FOREIGN KEY (user_id) 
        REFERENCES public.users(id) ON DELETE SET NULL,
    CONSTRAINT blog_comments_parent_id_fkey FOREIGN KEY (parent_id) 
        REFERENCES public.blog_comments(id) ON DELETE CASCADE,
    CONSTRAINT blog_comments_check_commenter CHECK (
        (user_id IS NOT NULL) OR (commenter_name IS NOT NULL AND commenter_email IS NOT NULL)
    )
);

-- Blog Shares Table
-- Tracks when blogs are shared via different platforms
CREATE TABLE IF NOT EXISTS public.blog_shares (
    id INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    blog_id INTEGER NOT NULL,
    user_id INTEGER,
    ip_address VARCHAR(45),
    share_platform VARCHAR(50) NOT NULL,
    shared_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT blog_shares_blog_id_fkey FOREIGN KEY (blog_id) 
        REFERENCES public.blog_submissions(id) ON DELETE CASCADE,
    CONSTRAINT blog_shares_user_id_fkey FOREIGN KEY (user_id) 
        REFERENCES public.users(id) ON DELETE SET NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_blog_views_blog_id ON public.blog_views(blog_id);
CREATE INDEX IF NOT EXISTS idx_blog_views_user_id ON public.blog_views(user_id);
CREATE INDEX IF NOT EXISTS idx_blog_views_ip_address ON public.blog_views(ip_address);
CREATE INDEX IF NOT EXISTS idx_blog_views_viewed_at ON public.blog_views(viewed_at);

CREATE INDEX IF NOT EXISTS idx_blog_likes_blog_id ON public.blog_likes(blog_id);
CREATE INDEX IF NOT EXISTS idx_blog_likes_user_id ON public.blog_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_blog_likes_ip_address ON public.blog_likes(ip_address);

CREATE INDEX IF NOT EXISTS idx_blog_comments_blog_id ON public.blog_comments(blog_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_user_id ON public.blog_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_parent_id ON public.blog_comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_created_at ON public.blog_comments(created_at);

CREATE INDEX IF NOT EXISTS idx_blog_shares_blog_id ON public.blog_shares(blog_id);
CREATE INDEX IF NOT EXISTS idx_blog_shares_platform ON public.blog_shares(share_platform);

-- Add view_count, like_count, comment_count columns to blog_submissions for quick access
ALTER TABLE public.blog_submissions 
ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS like_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS comment_count INTEGER DEFAULT 0;

-- Create indexes on the new columns for sorting/filtering
CREATE INDEX IF NOT EXISTS idx_blog_submissions_view_count ON public.blog_submissions(view_count DESC);
CREATE INDEX IF NOT EXISTS idx_blog_submissions_like_count ON public.blog_submissions(like_count DESC);
CREATE INDEX IF NOT EXISTS idx_blog_submissions_comment_count ON public.blog_submissions(comment_count DESC);

-- Comments for documentation
COMMENT ON TABLE public.blog_views IS 'Tracks unique blog post views by user or IP address';
COMMENT ON TABLE public.blog_likes IS 'Stores user likes for blog posts';
COMMENT ON TABLE public.blog_comments IS 'Stores comments on blog posts with optional threading';
COMMENT ON TABLE public.blog_shares IS 'Tracks blog post shares across different platforms';
COMMENT ON COLUMN public.blog_submissions.view_count IS 'Cached count of total views';
COMMENT ON COLUMN public.blog_submissions.like_count IS 'Cached count of total likes';
COMMENT ON COLUMN public.blog_submissions.comment_count IS 'Cached count of approved comments';
