# Blog Engagement Feature Implementation

## Overview
This implementation adds complete blog engagement functionality to the SufiPulse guest blogs feature, including:
- **View Tracking**: Unique view counting using user ID (authenticated) or IP address (guests)
- **Like System**: Toggle like/unlike functionality with real-time count updates
- **Comment System**: Nested comments with replies, moderation support
- **Share Tracking**: Analytics for WhatsApp and Facebook shares

## Database Schema

### Tables Created

Run the following script to apply the schema:
```bash
cd sufipulse-backend-talhaadil
python apply_blog_engagement_schema.py
```

#### 1. `blog_views`
- Tracks unique blog views
- Prevents duplicate counting from same user/IP
- Columns: `id`, `blog_id`, `user_id`, `ip_address`, `user_agent`, `viewed_at`
- Unique constraint: `(blog_id, user_id, ip_address)`

#### 2. `blog_likes`
- Stores user likes for blog posts
- Supports toggle (like/unlike) functionality
- Columns: `id`, `blog_id`, `user_id`, `ip_address`, `liked_at`
- Unique constraint: `(blog_id, user_id, ip_address)`

#### 3. `blog_comments`
- Stores comments with threading support (replies)
- Includes moderation (is_approved flag)
- Columns: `id`, `blog_id`, `user_id`, `commenter_name`, `commenter_email`, `comment_text`, `parent_id`, `is_approved`, `created_at`, `updated_at`
- Foreign key to parent comment for threading

#### 4. `blog_shares`
- Tracks share events by platform
- Columns: `id`, `blog_id`, `user_id`, `ip_address`, `share_platform`, `shared_at`

#### 5. `blog_submissions` (Modified)
Added columns for cached counts:
- `view_count` (default: 0)
- `like_count` (default: 0)
- `comment_count` (default: 0)

## Backend API Endpoints

All endpoints are in `api/public.py` under the `/public` router.

### View Tracking
```http
POST /public/blogs/{blog_id}/view
```
- Records a unique view
- Uses user ID if authenticated, otherwise IP address
- Returns: `{ "message": "View recorded", "is_unique_view": boolean, "views": number }`

### Like System
```http
POST /public/blogs/{blog_id}/like
```
- Toggles like status (like/unlike)
- Returns: `{ "message": "Like toggled successfully", "liked": boolean, "likes": number }`

```http
GET /public/blogs/{blog_id}/like/status
```
- Checks if current user has liked the blog
- Returns: `{ "liked": boolean }`

### Comment System
```http
POST /public/blogs/{blog_id}/comment
```
- Adds a comment or reply
- Body:
```json
{
  "comment_text": "string (required)",
  "commenter_name": "string (required for guests)",
  "commenter_email": "string (required for guests)",
  "parent_id": "number (optional, for replies)"
}
```
- Returns: `{ "message": "Comment added successfully", "comment_id": number, "comment": object }`

```http
GET /public/blogs/{blog_id}/comments
```
- Gets all approved comments with replies
- Returns: `{ "blog_id": number, "total_comments": number, "comments": array }`

### Share Tracking
```http
POST /public/blogs/{blog_id}/share
```
- Records a share event
- Body: `{ "blog_id": number, "platform": "whatsapp|facebook|twitter|linkedin|email|copy-link|other" }`
- Returns: `{ "message": "Share recorded successfully", "platform": string }`

### Engagement Statistics
```http
GET /public/blogs/{blog_id}/engagement
```
- Gets comprehensive engagement stats
- Returns: `{ "blog_id": number, "views": number, "likes": number, "comments": number, "shares": number, "share_breakdown": object }`

## Frontend Implementation

### Services (`services/requests.ts`)
Added engagement functions:
- `recordBlogView(blogId)`
- `toggleBlogLike(blogId)`
- `getBlogLikeStatus(blogId)`
- `addBlogComment(blogId, data)`
- `getBlogComments(blogId)`
- `recordBlogShare(blogId, platform)`
- `getBlogEngagementStats(blogId)`

### Blog Detail Page (`app/reflection/guest-blogs/[id]/page.tsx`)

#### Features Implemented:

1. **Automatic View Tracking**
   - View recorded on page load
   - Prevents duplicate views from same user/IP

2. **Like Button**
   - Toggle functionality (like/unlike)
   - Visual feedback (filled heart when liked)
   - Real-time count updates
   - Toast notifications

3. **Comment System**
   - Comment form with name/email fields for guests
   - Nested replies support
   - Real-time comment list updates
   - Form validation
   - Loading states during submission
   - Success/error toast notifications

4. **Share Buttons**
   - WhatsApp share button (green)
   - Facebook share button (blue)
   - Share events tracked in database
   - Opens share dialog in new window

5. **Engagement Stats Bar**
   - Views count (with Eye icon)
   - Likes count (interactive button with Heart icon)
   - Comments count (with MessageCircle icon)
   - Share buttons integrated in same row

## Testing Instructions

### 1. Apply Database Schema
```bash
cd sufipulse-backend-talhaadil
python apply_blog_engagement_schema.py
```

### 2. Start Backend Server
```bash
cd sufipulse-backend-talhaadil
python main.py
# or
python run_local.py
```

### 3. Start Frontend Development Server
```bash
cd sufipulse-frontend-talhaadil
npm run dev
```

### 4. Test Features

#### Test View Tracking:
1. Open a blog post: `http://localhost:3000/reflection/guest-blogs/{id}`
2. Check console for view recording
3. Refresh page multiple times - view count should only increase once per unique visitor

#### Test Like System:
1. Click the like button (heart icon)
2. Verify like count increases and heart fills
3. Click again to unlike
4. Verify like count decreases and heart becomes outline

#### Test Comment System:
1. Fill in name, email, and comment
2. Click "Post Comment"
3. Verify comment appears in the list
4. Click "Reply" on a comment
5. Add a reply and verify it appears nested under parent comment

#### Test Share Functionality:
1. Click WhatsApp share button
2. Verify WhatsApp share dialog opens
3. Click Facebook share button
4. Verify Facebook share dialog opens
5. Check database `blog_shares` table for recorded shares

### 5. API Testing (Optional)

Using curl or Postman:

```bash
# Record a view
curl -X POST http://localhost:8000/public/blogs/1/view

# Toggle like
curl -X POST http://localhost:8000/public/blogs/1/like

# Get like status
curl http://localhost:8000/public/blogs/1/like/status

# Add a comment (guest user)
curl -X POST http://localhost:8000/public/blogs/1/comment \
  -H "Content-Type: application/json" \
  -d '{
    "comment_text": "Great article!",
    "commenter_name": "John Doe",
    "commenter_email": "john@example.com"
  }'

# Get comments
curl http://localhost:8000/public/blogs/1/comments

# Record a share
curl -X POST http://localhost:8000/public/blogs/1/share \
  -H "Content-Type: application/json" \
  -d '{
    "blog_id": 1,
    "platform": "whatsapp"
  }'

# Get engagement stats
curl http://localhost:8000/public/blogs/1/engagement
```

## Key Features

### Unique View Tracking
- Uses combination of `user_id` (if authenticated) and `ip_address`
- Prevents duplicate counting with ON CONFLICT clause
- Cached count in `blog_submissions` table for performance

### Authentication Handling
- Authenticated users: tracked by user_id
- Guest users: tracked by IP address
- Comments require name/email for guests

### Comment Moderation
- Comments have `is_approved` flag (default: true)
- Can be extended for admin moderation
- Nested replies supported via `parent_id`

### Performance Optimization
- Cached counts in `blog_submissions` table
- Indexes on frequently queried columns
- Efficient aggregation queries

## Database Queries Location
All blog engagement queries are in:
`sufipulse-backend-talhaadil/sql/queries/bloggerQueries.py`

Key methods:
- `record_blog_view()`
- `record_blog_like()`
- `is_user_liked_blog()`
- `add_blog_comment()`
- `get_blog_comments()`
- `record_blog_share()`
- `get_blog_engagement_stats()`
- `get_blog_share_stats()`
- `_update_blog_count()` (helper)

## Files Modified/Created

### Backend:
1. `sql/blog_engagement_schema.sql` (NEW)
2. `apply_blog_engagement_schema.py` (NEW)
3. `sql/queries/bloggerQueries.py` (MODIFIED)
4. `api/public.py` (MODIFIED)

### Frontend:
1. `services/requests.ts` (MODIFIED)
2. `app/reflection/guest-blogs/[id]/page.tsx` (MODIFIED)

## Future Enhancements

1. **Comment Moderation Panel**: Admin interface to approve/reject comments
2. **Comment Likes**: Allow users to like comments
3. **Share Count Display**: Show share counts by platform
4. **Email Notifications**: Notify authors of new comments
5. **Spam Protection**: Rate limiting and CAPTCHA for comments
6. **Rich Text Comments**: Markdown or rich text editor for comments
7. **Comment Editing**: Allow users to edit their comments
8. **User Profiles**: Link to commenter profiles for registered users

## Troubleshooting

### Views not incrementing:
- Check `blog_views` table for unique constraint
- Verify IP address extraction is working
- Check browser console for errors

### Likes not working:
- Verify database connection
- Check `blog_likes` table exists
- Ensure API endpoint is reachable

### Comments not appearing:
- Check `blog_comments` table
- Verify `is_approved` flag is true
- Check API response for errors

### Share buttons not opening:
- Check popup blocker settings
- Verify share URLs are correctly formatted
- Check browser console for errors

## Support
For issues or questions, check the implementation files or review the API endpoint documentation above.
