from fastapi import APIRouter, HTTPException, Query, Request, Depends, Header
from pydantic import BaseModel
from typing import List, Optional
from db.connection import DBConnection
from datetime import datetime
from sql.combinedQueries import Queries
from utils.otp import send_template_email
from utils.jwt_handler import get_current_user_optional

router = APIRouter(prefix="/public", tags=["Public"])

class PartnershipProposalCreate(BaseModel):
    full_name: str
    email: str
    organization_name: str
    role_title: str
    organization_type: Optional[str]
    partnership_type: Optional[str]
    website: Optional[str]
    proposal_text: str
    proposed_timeline: Optional[str]
    resources: Optional[str]
    goals: Optional[str]
    sacred_alignment: Optional[bool] = True

class PartnershipProposalResponse(BaseModel):
    id: int
    full_name: str
    email: str
    organization_name: str
    role_title: str
    organization_type: Optional[str]
    partnership_type: Optional[str]
    website: Optional[str]
    proposal_text: str
    proposed_timeline: Optional[str]
    resources: Optional[str]
    goals: Optional[str]
    sacred_alignment: bool
    created_at: str

@router.post("/", response_model=PartnershipProposalResponse)
def create_partnership_proposal(
    data: PartnershipProposalCreate,

):
    with DBConnection.get_db_connection() as conn:
        db = Queries(conn)

        query = """
        INSERT INTO partnership_proposals (
            full_name, email, organization_name, role_title, organization_type,
            partnership_type, website, proposal_text, proposed_timeline,
            resources, goals, sacred_alignment
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING *
        """
        with conn.cursor() as cur:
            cur.execute(query, (
                data.full_name,
                data.email,
                data.organization_name,
                data.role_title,
                data.organization_type,
                data.partnership_type,
                data.website,
                data.proposal_text,
                data.proposed_timeline,
                data.resources,
                data.goals,
                data.sacred_alignment
            ))
            proposal = cur.fetchone()
            conn.commit()

        # Send collaboration proposal received email
        try:
            from utils.otp import send_collaboration_proposal_email
            send_collaboration_proposal_email(data.email)
        except Exception as e:
            print(f"Failed to send collaboration proposal email: {e}")
            # Don't fail the request if email fails, just log the error

        return PartnershipProposalResponse(
            id=proposal[0],
            full_name=proposal[1],
            email=proposal[2],
            organization_name=proposal[3],
            role_title=proposal[4],
            organization_type=proposal[5],
            partnership_type=proposal[6],
            website=proposal[7],
            proposal_text=proposal[8],
            proposed_timeline=proposal[9],
            resources=proposal[10],
            goals=proposal[11],
            sacred_alignment=proposal[12],
            created_at=str(proposal[13])
        )





@router.get("/postedkalams", response_model=List[dict])
def get_posted_kalams(
    skip: int = Query(0, ge=0),  # how many to skip
    limit: int = Query(4, ge=1),  # how many to fetch
):
    conn = DBConnection.get_connection()
    db = Queries(conn)
   
    return db.fetch_posted_kalams(skip, limit)




@router.get("/vocalists", response_model=List[dict])
def get_vocalists(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1),
):
    conn = DBConnection.get_connection()
    db = Queries(conn)
    return db.fetch_vocalists(skip, limit)





@router.get("/posts", response_model=List[dict])
def get_guest_posts_paginated(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1),
):
    conn = DBConnection.get_connection()
    db = Queries(conn)
    
    try:
        return db.fetch_paginated_guest_posts(skip, limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))







@router.get("/writers", response_model=List[dict])
def get_writers(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1),
):
    conn = DBConnection.get_connection()
    db = Queries(conn)
    return db.fetch_writers(skip, limit)





@router.get("/special-recognitions/all", response_model=List[dict])
def get_all_special_recognitions():
    conn = DBConnection.get_connection()
    db = Queries(conn)

    try:
        return db.fetch_all_special_recognitions()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/blogs", response_model=List[dict])
def get_approved_blogs(
    skip: int = Query(0, ge=0),
    limit: int = Query(6, ge=1),
    category: Optional[str] = None,
    search: Optional[str] = None
):
    conn = DBConnection.get_connection()
    db = Queries(conn)

    try:
        # Fetch only approved and posted blogs
        blogs = db.fetch_approved_blogs(skip, limit, category, search)
        return blogs
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/blogs/{blog_id}")
def get_blog_by_id(blog_id: int):
    conn = DBConnection.get_connection()
    db = Queries(conn)

    try:
        blog = db.fetch_blog_by_id(blog_id)
        if not blog:
            raise HTTPException(status_code=404, detail="Blog post not found")
        return blog
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


class ContactFormSubmit(BaseModel):
    name: str
    email: str
    subject: str
    message: str


@router.post("/contact")
def submit_contact_form(data: ContactFormSubmit):
    """
    Submit contact form and send confirmation email using Resend template
    """
    try:
        # Validate input
        if not data.name or not data.email or not data.subject or not data.message:
            raise HTTPException(status_code=400, detail="All fields are required")
        
        # Send confirmation email to user using template
        try:
            send_template_email(
                to_email=data.email,
                template_id="contact-form-notification",
                subject="Thank You for Contacting SufiPulse",
                variables={
                    "name": data.name,
                    "email": data.email,
                    "subject": data.subject,
                    "message": data.message
                }
            )
        except Exception as email_error:
            print(f"Failed to send confirmation email: {email_error}")
            # Don't fail the request if email fails, just log the error
        
        # Send notification email to admin
        try:
            send_template_email(
                to_email="contact@sufipulse.com",
                template_id="contact-form-notification",
                subject=f"New Contact Form: {data.subject}",
                variables={
                    "name": data.name,
                    "email": data.email,
                    "subject": data.subject,
                    "message": data.message
                }
            )
        except Exception as admin_email_error:
            print(f"Failed to send admin notification: {admin_email_error}")
        
        return {
            "message": "Message sent successfully! We will get back to you soon.",
            "status": "success"
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in contact form: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


# ==================== BLOG ENGAGEMENT ENDPOINTS ====================

class BlogViewRequest(BaseModel):
    blog_id: int

class BlogLikeRequest(BaseModel):
    blog_id: int

class BlogCommentRequest(BaseModel):
    comment_text: str
    commenter_name: Optional[str] = None
    commenter_email: Optional[str] = None
    parent_id: Optional[int] = None

class BlogShareRequest(BaseModel):
    platform: str  # 'whatsapp', 'facebook', 'twitter', 'linkedin', 'email', etc.


def get_client_ip(request: Request) -> str:
    """Extract client IP address from request headers"""
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


@router.post("/blogs/{blog_id}/view")
def record_blog_view(
    blog_id: int,
    request: Request,
    user_id: Optional[int] = Depends(get_current_user_optional)
):
    """
    Record a blog view. Uses user_id if authenticated, otherwise uses IP address.
    Prevents duplicate views from same user/IP.
    """
    conn = DBConnection.get_connection()
    db = Queries(conn)

    try:
        # Check if blog exists
        blog = db.fetch_blog_by_id(blog_id)
        if not blog:
            raise HTTPException(status_code=404, detail="Blog post not found")

        # Get client IP for unique view tracking
        ip_address = get_client_ip(request)
        user_agent = request.headers.get("user-agent", "")

        # Record the view (returns True if unique view was counted)
        is_unique = db.record_blog_view(
            blog_id=blog_id,
            user_id=user_id,
            ip_address=ip_address,
            user_agent=user_agent
        )

        # Get updated blog data with new view count
        updated_blog = db.fetch_blog_by_id(blog_id)

        return {
            "message": "View recorded",
            "is_unique_view": is_unique,
            "views": updated_blog.get('view_count', 0) if updated_blog else 0
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error recording blog view: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/blogs/{blog_id}/like")
def toggle_blog_like(
    blog_id: int,
    request: Request,
    user_id: Optional[int] = Depends(get_current_user_optional)
):
    """
    Toggle like on a blog post. Returns current like status and count.
    If user already liked, it removes the like (unlike).
    """
    conn = DBConnection.get_connection()
    db = Queries(conn)

    try:
        # Check if blog exists
        blog = db.fetch_blog_by_id(blog_id)
        if not blog:
            raise HTTPException(status_code=404, detail="Blog post not found")

        # Get client IP for non-authenticated users
        ip_address = get_client_ip(request)

        # Toggle the like and get result
        result = db.record_blog_like(
            blog_id=blog_id,
            user_id=user_id,
            ip_address=ip_address
        )

        # Get updated blog data with new like count
        updated_blog = db.fetch_blog_by_id(blog_id)

        return {
            "message": "Like toggled successfully",
            "liked": result['liked'],
            "likes": updated_blog.get('like_count', 0) if updated_blog else 0
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error toggling blog like: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/blogs/{blog_id}/like/status")
def get_blog_like_status(
    blog_id: int,
    request: Request,
    user_id: Optional[int] = Depends(get_current_user_optional)
):
    """Check if the current user has liked a blog post"""
    conn = DBConnection.get_connection()
    db = Queries(conn)

    try:
        ip_address = get_client_ip(request)

        is_liked = db.is_user_liked_blog(
            blog_id=blog_id,
            user_id=user_id,
            ip_address=ip_address
        )

        return {"liked": is_liked}
    except Exception as e:
        print(f"Error checking like status: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/blogs/{blog_id}/comment")
def add_blog_comment(
    blog_id: int,
    data: BlogCommentRequest,
    request: Request,
    user_id: Optional[int] = Depends(get_current_user_optional)
):
    """
    Add a comment to a blog post.
    If user is authenticated, uses their info from database. Otherwise requires name and email.
    """
    conn = DBConnection.get_connection()
    db = Queries(conn)

    try:
        print(f"\n=== COMMENT REQUEST ===")
        print(f"Blog ID: {blog_id}")
        print(f"User ID from token: {user_id}")
        print(f"Request headers: {dict(request.headers)}")
        print(f"Comment data: {data}")
        print(f"======================\n")

        # Validate input
        if not data.comment_text or not data.comment_text.strip():
            raise HTTPException(status_code=400, detail="Comment text is required")

        if len(data.comment_text) > 2000:
            raise HTTPException(status_code=400, detail="Comment must be less than 2000 characters")

        # Check if blog exists
        blog = db.fetch_blog_by_id(blog_id)
        if not blog:
            raise HTTPException(status_code=404, detail="Blog post not found")

        # Initialize commenter info
        commenter_name = None
        commenter_email = None

        if user_id:
            # User is authenticated - ALWAYS fetch their info from database
            print(f"Fetching user info for user_id: {user_id}")
            user_query = "SELECT name, email FROM users WHERE id = %s"
            with conn.cursor() as cur:
                cur.execute(user_query, (user_id,))
                user_result = cur.fetchone()
                print(f"User query result: {user_result}")
                if user_result:
                    commenter_name = user_result[0]
                    commenter_email = user_result[1]
                    print(f"User found: {commenter_name} ({commenter_email})")
                else:
                    raise HTTPException(status_code=404, detail="User not found")
        else:
            print("No user_id found - treating as guest user")
            # User is not authenticated - require name and email
            if not data.commenter_name or not data.commenter_email:
                raise HTTPException(
                    status_code=400,
                    detail="Name and email are required for non-authenticated users"
                )
            commenter_name = data.commenter_name
            commenter_email = data.commenter_email

        # Check if replying to a parent comment
        parent_id = data.parent_id
        if parent_id:
            # Verify parent comment exists and belongs to the same blog
            parent_comment_query = "SELECT id, blog_id FROM blog_comments WHERE id = %s"
            with conn.cursor() as cur:
                cur.execute(parent_comment_query, (parent_id,))
                parent_comment = cur.fetchone()
                if not parent_comment or parent_comment[1] != blog_id:
                    raise HTTPException(status_code=404, detail="Parent comment not found")

        # Add the comment
        print(f"Adding comment with: user_id={user_id}, name={commenter_name}, email={commenter_email}")
        comment_id = db.add_blog_comment(
            blog_id=blog_id,
            comment_text=data.comment_text,
            user_id=user_id,
            commenter_name=commenter_name,
            commenter_email=commenter_email,
            parent_id=parent_id
        )

        if not comment_id:
            raise HTTPException(status_code=500, detail="Failed to add comment")

        # Get the created comment
        comments = db.get_blog_comments(blog_id)
        created_comment = next((c for c in comments if c['id'] == comment_id), None)

        return {
            "message": "Comment added successfully",
            "comment_id": comment_id,
            "comment": created_comment
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error adding blog comment: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/blogs/{blog_id}/comments")
def get_blog_comments(blog_id: int):
    """Get all approved comments for a blog post"""
    conn = DBConnection.get_connection()
    db = Queries(conn)

    try:
        # Check if blog exists
        blog = db.fetch_blog_by_id(blog_id)
        if not blog:
            raise HTTPException(status_code=404, detail="Blog post not found")

        comments = db.get_blog_comments(blog_id, only_approved=True)

        return {
            "blog_id": blog_id,
            "total_comments": len(comments),
            "comments": comments
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error fetching blog comments: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/blogs/{blog_id}/share")
def record_blog_share(
    blog_id: int,
    data: BlogShareRequest,
    request: Request,
    user_id: Optional[int] = Depends(get_current_user_optional)
):
    """Record a blog share event for analytics"""
    conn = DBConnection.get_connection()
    db = Queries(conn)

    try:
        # Check if blog exists
        blog = db.fetch_blog_by_id(blog_id)
        if not blog:
            raise HTTPException(status_code=404, detail="Blog post not found")

        # Validate platform
        allowed_platforms = ['whatsapp', 'facebook', 'twitter', 'linkedin', 'email', 'copy-link', 'other']
        if data.platform.lower() not in allowed_platforms:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid platform. Allowed: {', '.join(allowed_platforms)}"
            )

        # Get client IP
        ip_address = get_client_ip(request)

        # Record the share
        success = db.record_blog_share(
            blog_id=blog_id,
            platform=data.platform.lower(),
            user_id=user_id,
            ip_address=ip_address
        )

        if not success:
            raise HTTPException(status_code=500, detail="Failed to record share")

        return {
            "message": "Share recorded successfully",
            "platform": data.platform.lower()
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error recording blog share: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/blogs/{blog_id}/engagement")
def get_blog_engagement_stats(blog_id: int):
    """Get comprehensive engagement statistics for a blog post"""
    conn = DBConnection.get_connection()
    db = Queries(conn)

    try:
        # Check if blog exists
        blog = db.fetch_blog_by_id(blog_id)
        if not blog:
            raise HTTPException(status_code=404, detail="Blog post not found")

        # Get engagement stats
        stats = db.get_blog_engagement_stats(blog_id)
        share_stats = db.get_blog_share_stats(blog_id)

        return {
            "blog_id": blog_id,
            "views": stats.get('total_views', 0) if stats else 0,
            "likes": stats.get('total_likes', 0) if stats else 0,
            "comments": stats.get('total_comments', 0) if stats else 0,
            "shares": stats.get('total_shares', 0) if stats else 0,
            "share_breakdown": share_stats or {}
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error fetching engagement stats: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))