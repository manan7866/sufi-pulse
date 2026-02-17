# SufiPulse Database Setup Guide

This guide provides complete instructions for setting up the SufiPulse database from scratch.

## Prerequisites

- PostgreSQL 15 or higher
- Python 3.10 or higher
- Required Python packages: `psycopg2-binary`, `python-dotenv`

## Database Setup Steps

### 1. Create Database and User

```sql
-- Connect to PostgreSQL as superuser
psql -U postgres

-- Create database
CREATE DATABASE sufi_pulse_db;

-- Create user (optional, if you want a dedicated user)
CREATE USER sufi_pulse_user WITH PASSWORD 'sufi_pulse_password';
GRANT ALL PRIVILEGES ON DATABASE sufi_pulse_db TO sufi_pulse_user;
```

### 2. Apply Schema

Run the schema file to create all tables:

```bash
# Using psql
psql -U sufi_pulse_user -d sufi_pulse_db -f schema.sql

# Or connect and run manually
psql -U sufi_pulse_user -d sufi_pulse_db
\i schema.sql
```

### 3. Database Tables Overview

The following tables will be created:

#### Core Tables

1. **users** - User accounts and authentication
   - Roles: writer, vocalist, blogger, admin, sub-admin
   - Stores: email, name, password_hash, role, country, city, OTP

2. **bloggers** - Blogger profiles
   - Stores: author_name, author_image_url, short_bio, location, website_url, social_links
   - Declaration fields for rights and policies

3. **writers** - Writer profiles
   - Stores: writing_styles, languages, sample_title, experience_background, portfolio, availability

4. **vocalists** - Vocalist profiles
   - Stores: vocal_range, languages, sample_title, audio_sample_url, sample_description, experience_background, portfolio, availability, status

5. **blog_submissions** - Blog posts
   - Stores: title, excerpt, content, category, tags, language, featured_image_url
   - Status: pending, review, approved, revision, rejected, posted
   - SEO fields: seo_meta_title, seo_meta_description
   - Admin fields: admin_comments, editor_notes, scheduled_publish_date

6. **kalams** - Kalam (poetry) submissions
   - Stores: title, language, theme, kalam_text, description, sufi_influence, musical_preference
   - Links to writer_id and vocalist_id

7. **kalam_submissions** - Kalam submission workflow
   - Status tracking through approval process
   - User and vocalist approval statuses

#### Request Tables

8. **studio_visit_requests** - Studio visit booking requests
   - Stores: vocalist_id, kalam_id, name, email, organization, contact_number, preferred_date, purpose, number_of_visitors

9. **remote_recording_requests** - Remote recording session requests
   - Stores: vocalist_id, kalam_id, name, email, city, country, time_zone, role, recording_equipment, internet_speed

#### Content Management Tables

10. **notifications** - System notifications
    - target_type: all, writers, vocalists, bloggers, specific
    - Stores: title, message, target_user_ids

11. **notification_reads** - Notification read tracking
    - Tracks which users have read which notifications

12. **partnership_proposals** - Partnership inquiries
    - Stores: full_name, email, organization_name, role_title, partnership_type, proposal_text, goals

13. **guest_posts** - Guest blog posts (legacy system)
    - Stores: user_id, title, content, excerpt, category, tags, status

14. **videos** - Video content cache
    - Stores: YouTube video information

15. **special_recognitions** - Special recognition awards
    - Stores: title, subtitle, description, achievement

### 4. Create Admin User

After schema is applied, create an admin user:

```sql
-- Insert admin user
INSERT INTO users (email, name, password_hash, role, country, city, is_registered)
VALUES (
    'admin@sufipulse.com',
    'Admin User',
    '$argon2id$v=19$m=65536,t=3,p=4$YOUR_HASHED_PASSWORD',
    'admin',
    'Pakistan',
    'Karachi',
    TRUE
);
```

**Note**: Use the `fix_admin_password.py` or similar script to generate proper argon2 password hash.

### 5. Update Database Constraints

The blog_submissions table uses specific status values. If you need to modify them:

```sql
-- Drop old constraint
ALTER TABLE blog_submissions DROP CONSTRAINT IF EXISTS blog_submissions_status_check;

-- Add new constraint with updated status values
ALTER TABLE blog_submissions 
ADD CONSTRAINT blog_submissions_status_check 
CHECK (status IN ('pending', 'review', 'approved', 'revision', 'rejected', 'posted'));
```

### 6. Environment Configuration

Create a `.env` file in the backend directory:

```env
DATABASE_URL=postgresql://sufi_pulse_user:sufi_pulse_password@localhost:5432/sufi_pulse_db
DB_HOST=localhost
DB_NAME=sufi_pulse_db
DB_USER=sufi_pulse_user
DB_PASSWORD=sufi_pulse_password
DB_PORT=5432

SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

FRONTEND_URL=http://localhost:3000

# Email Configuration (optional)
EMAIL_USER=your_email@example.com
EMAIL_PASSWORD=your_email_password

# YouTube API (optional)
YOUTUBE_API_KEY=your_youtube_api_key
```

### 7. Verify Installation

Run the verification script:

```bash
cd sufiPulse-backend-talhaadil
python verify_db_setup.py
```

Or manually verify:

```sql
-- Check all tables exist
\dt

-- Check users table
SELECT COUNT(*) FROM users;

-- Check blog_submissions table
SELECT COUNT(*) FROM blog_submissions;

-- Check constraints
SELECT conname, pg_get_constraintdef(oid) 
FROM pg_constraint 
WHERE conrelid = 'blog_submissions'::regclass AND contype = 'c';
```

### 8. Running Migration Scripts

If updating an existing database:

```bash
# Add new columns to blog_submissions
python add_blog_columns.py

# Update status values
python update_blog_status.py

# Apply schema updates
python apply_schema_updates.py
```

### 9. Common Issues and Solutions

#### Issue: Constraint violation on blog_submissions
```sql
-- Fix: Update status values to match new constraint
UPDATE blog_submissions SET status = 'pending' WHERE status = 'draft';
UPDATE blog_submissions SET status = 'pending' WHERE status = 'submitted';
UPDATE blog_submissions SET status = 'revision' WHERE status = 'changes_requested';
UPDATE blog_submissions SET status = 'approved' WHERE status IN ('admin_approved', 'final_approved', 'complete_approved');
UPDATE blog_submissions SET status = 'rejected' WHERE status = 'admin_rejected';
```

#### Issue: Missing indexes
```sql
-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_submissions_user_id ON blog_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_blog_submissions_status ON blog_submissions(status);
CREATE INDEX IF NOT EXISTS idx_blog_submissions_category ON blog_submissions(category);
CREATE INDEX IF NOT EXISTS idx_blog_submissions_language ON blog_submissions(language);
CREATE INDEX IF NOT EXISTS idx_blog_submissions_created_at ON blog_submissions(created_at);
```

#### Issue: Permission errors
```sql
-- Grant all privileges to user
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO sufi_pulse_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO sufi_pulse_user;
```

### 10. Backup and Restore

#### Backup
```bash
# Backup entire database
pg_dump -U sufi_pulse_user sufi_pulse_db > backup_$(date +%Y%m%d).sql

# Backup specific tables
pg_dump -U sufi_pulse_user -t blog_submissions -t bloggers sufi_pulse_db > blogs_backup.sql
```

#### Restore
```bash
# Restore from backup
psql -U sufi_pulse_user -d sufi_pulse_db < backup_20260216.sql

# Restore specific tables
psql -U sufi_pulse_user -d sufi_pulse_db < blogs_backup.sql
```

### 11. Testing the Setup

After setup, test the following:

1. **User Registration**: Register as blogger, writer, vocalist
2. **Blog Submission**: Create and submit a blog post
3. **Admin Approval**: Admin changes blog status
4. **Notifications**: Verify notifications are created on status changes
5. **Public View**: Check that only approved/posted blogs appear on guest-blogs page

### 12. Sample Data (Optional)

Insert sample data for testing:

```sql
-- Sample blogger user
INSERT INTO users (email, name, password_hash, role, country, city, is_registered)
VALUES ('blogger@test.com', 'Test Blogger', '$argon2id$...', 'blogger', 'Pakistan', 'Lahore', TRUE);

-- Sample blogger profile
INSERT INTO bloggers (user_id, author_name, short_bio, publish_pseudonym, original_work_confirmation, publishing_rights_granted, discourse_policy_agreed)
VALUES (1, 'Test Blogger', 'A passionate writer about Sufi poetry and spirituality.', FALSE, TRUE, TRUE, TRUE);

-- Sample blog post
INSERT INTO blog_submissions (title, excerpt, content, category, tags, language, user_id, status)
VALUES (
    'The Beauty of Sufi Poetry',
    'An exploration of the mystical dimensions in Sufi poetry...',
    '<p>Full content here...</p>',
    'Sufi Poetry',
    ARRAY['sufism', 'poetry', 'spirituality'],
    'English',
    1,
    'approved'
);
```

## Quick Start Commands

```bash
# 1. Create database
createdb -U postgres sufi_pulse_db

# 2. Apply schema
psql -U postgres -d sufi_pulse_db -f schema.sql

# 3. Run setup scripts
cd sufiPulse-backend-talhaadil
python apply_schema_updates.py
python add_blog_columns.py
python update_blog_status.py

# 4. Start backend
python run_local.py

# 5. Start frontend (in another terminal)
cd ../sufipulse-frontend-talhaadil
npm run dev
```

## Support

For issues or questions:
- Check the `FIXES_SUMMARY.md` for common issues
- Review `DB_SETUP_COMPLETE.md` for setup details
- Check backend logs for database connection errors
- Verify PostgreSQL is running: `pg_isready -h localhost -p 5432`
