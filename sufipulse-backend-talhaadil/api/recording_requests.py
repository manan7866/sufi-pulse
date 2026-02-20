from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import date, datetime
from db.connection import DBConnection
from sql.combinedQueries import Queries
from utils.jwt_handler import get_current_user
from psycopg2.extras import RealDictCursor
import os
import uuid

router = APIRouter(
    prefix="/recording-requests",
    tags=["Recording Requests"],
    dependencies=[Depends(get_current_user)]
)

# ========================================
# PYDANTIC MODELS
# ========================================

class StudioRecordingRequestCreate(BaseModel):
    """Model for creating a studio recording request"""
    kalam_id: int
    preferred_session_date: date
    preferred_time_block: str = Field(..., description="Morning, Afternoon, or Evening")
    estimated_studio_duration: str = Field(..., description="1 Hour, 2 Hours, Half Day, or Full Day")
    performance_direction: str
    availability_confirmed: bool = False
    studio_policies_agreed: bool = False
    whatsapp_number: str = Field(..., description="WhatsApp contact number")

class StudioRecordingRequestResponse(BaseModel):
    """Model for studio recording request response"""
    id: int
    vocalist_id: int
    kalam_id: int
    lyric_title: str
    lyric_writer: Optional[str]
    lyric_language: Optional[str]
    lyric_category: Optional[str]
    preferred_session_date: date
    preferred_time_block: str
    estimated_studio_duration: str
    performance_direction: str
    reference_upload_url: Optional[str]
    whatsapp_number: Optional[str]
    submitter_name: Optional[str]
    submitter_email: Optional[str]
    status: str
    created_at: datetime
    updated_at: datetime

class RemoteRecordingRequestCreate(BaseModel):
    """Model for creating a remote recording request"""
    kalam_id: int
    recording_environment: str = Field(..., description="Professional Studio, Condenser Mic Setup, USB Microphone, or Mobile Setup")
    target_submission_date: date
    interpretation_notes: str
    original_recording_confirmed: bool = False
    remote_production_standards_agreed: bool = False
    whatsapp_number: str = Field(..., description="WhatsApp contact number")

class RemoteRecordingRequestResponse(BaseModel):
    """Model for remote recording request response"""
    id: int
    vocalist_id: int
    kalam_id: int
    lyric_title: str
    lyric_writer: Optional[str]
    lyric_language: Optional[str]
    lyric_category: Optional[str]
    recording_environment: str
    target_submission_date: date
    interpretation_notes: str
    sample_upload_url: Optional[str]
    whatsapp_number: Optional[str]
    submitter_name: Optional[str]
    submitter_email: Optional[str]
    status: str
    created_at: datetime
    updated_at: datetime

class LyricInfo(BaseModel):
    """Model for lyric information"""
    id: int
    title: str
    language: str
    theme: str
    kalam_text: str
    description: str
    writer_name: str
    status: str
    vocalist_approval_status: str

# ========================================
# HELPER FUNCTIONS
# ========================================

def get_lyric_details(db: Queries, kalam_id: int) -> dict:
    """Fetch lyric details from database"""
    kalam = db.get_kalam_by_id(kalam_id)
    if not kalam:
        raise HTTPException(status_code=404, detail="Lyric not found")
    
    # Get writer name
    writer = db.get_user_by_id(kalam['writer_id'])
    writer_name = writer['name'] if writer else "Unknown"
    
    # Get submission status
    submission = db.get_kalam_submission_by_kalam_id(kalam_id)
    
    return {
        'id': kalam['id'],
        'title': kalam['title'],
        'language': kalam['language'],
        'theme': kalam['theme'],  # This serves as category
        'kalam_text': kalam['kalam_text'],
        'description': kalam['description'],
        'writer_name': writer_name,
        'status': submission['status'] if submission else 'draft',
        'vocalist_approval_status': submission['vocalist_approval_status'] if submission else 'pending'
    }

def get_kalam_details(db: Queries, kalam_id: int) -> dict:
    """Fetch kalam details from database"""
    kalam = db.get_kalam_by_id(kalam_id)
    if not kalam:
        raise HTTPException(status_code=404, detail="Kalam not found")

    # Get writer name
    writer = db.get_user_by_id(kalam['writer_id'])
    writer_name = writer['name'] if writer else "Unknown"

    # Get submission status
    submission = db.get_kalam_submission_by_kalam_id(kalam_id)

    return {
        'id': kalam['id'],
        'title': kalam['title'],
        'language': kalam['language'],
        'theme': kalam['theme'],  # This serves as category
        'kalam_text': kalam['kalam_text'],
        'description': kalam['description'],
        'writer_name': writer_name,
        'status': submission['status'] if submission else 'draft',
        'vocalist_approval_status': submission['vocalist_approval_status'] if submission else 'pending'
    }

def validate_kalam_for_request(conn, kalam_id: int, user_id: int) -> dict:
    """Validate that the kalam is approved and available"""
    db = Queries(conn)
    kalam = get_kalam_details(db, kalam_id)

    # Check if kalam is approved (final_approved or complete_approved)
    if kalam['status'] not in ['final_approved', 'complete_approved', 'posted']:
        raise HTTPException(
            status_code=400,
            detail="This kalam is not yet approved. Only approved kalams (final_approved or complete_approved) can be used for recording requests."
        )

    # Check if the current user is a vocalist
    vocalist = db.get_vocalist_by_user_id(user_id)
    if not vocalist:
        raise HTTPException(
            status_code=403,
            detail="Only vocalists can create recording requests."
        )

    # If kalam is already assigned to a vocalist, check if it's this user
    kalam_data = db.get_kalam_by_id(kalam_id)
    if kalam_data.get('vocalist_id') is not None:
        vocalist_check = db.get_vocalist_by_user_id(user_id)
        if kalam_data['vocalist_id'] != vocalist_check['id']:
            # Kalam is assigned to another vocalist
            raise HTTPException(
                status_code=403,
                detail="This kalam is already assigned to another vocalist."
            )

    return kalam

async def upload_reference_file(file: UploadFile, kalam_id: int, request_type: str) -> Optional[str]:
    """Upload reference file and return URL"""
    if not file:
        return None
    
    # Validate file type
    allowed_audio_types = ["audio/mpeg", "audio/wav", "audio/x-wav"]
    if file.content_type not in allowed_audio_types:
        raise HTTPException(
            status_code=400,
            detail="Invalid file type. Only MP3 and WAV files are allowed."
        )
    
    # Validate file size (max 10MB)
    file_size = 0
    content = await file.read()
    file_size = len(content)
    if file_size > 10 * 1024 * 1024:  # 10MB
        raise HTTPException(
            status_code=400,
            detail="File size exceeds 10MB limit."
        )
    
    # Create upload directory if it doesn't exist
    upload_dir = f"uploads/recording_requests/{request_type}"
    os.makedirs(upload_dir, exist_ok=True)
    
    # Generate unique filename
    file_extension = file.filename.split(".")[-1] if "." in file.filename else "wav"
    unique_filename = f"{uuid.uuid4()}_{kalam_id}.{file_extension}"
    file_path = os.path.join(upload_dir, unique_filename)
    
    # Save file
    with open(file_path, "wb") as f:
        f.write(content)
    
    # Return URL (in production, this would be a CDN URL)
    return f"/{file_path}"

# ========================================
# API ENDPOINTS
# ========================================

@router.get("/approved-lyrics")
def get_approved_lyrics(user_id: int = Depends(get_current_user)):
    """
    Get all approved kalams from writers for recording requests
    Only shows kalams that are:
    - complete_approved (vocalist has approved and ready for recording)
    - Assigned to the current vocalist
    - Includes writer info
    """
    conn = DBConnection.get_connection()
    db = Queries(conn)

    # Get current user info
    user = db.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user['role'] != 'vocalist':
        raise HTTPException(status_code=403, detail="Only vocalists can access this endpoint")

    # Get vocalist profile
    vocalist = db.get_vocalist_by_user_id(user_id)
    if not vocalist:
        raise HTTPException(status_code=400, detail="Vocalist profile not found. Please complete your profile first.")

    # Fetch approved kalams from kalam_submissions
    try:
        print(f"🔍 Fetching approved kalams for vocalist {user_id}...")
        kalams = db.fetch_approved_kalams_for_vocalist(skip=0, limit=100)
        print(f"✅ Found {len(kalams)} kalams (final_approved or complete_approved)")
        
        approved_lyrics = []
        for kalam in kalams:
            # Get writer info - use writer_name from kalam data directly
            approved_lyrics.append({
                'id': kalam['id'],
                'title': kalam['title'],
                'language': kalam.get('language', 'Unknown'),
                'category': kalam.get('category', 'General'),
                'writer_name': kalam.get('writer_name', 'Unknown'),
                'kalam_text': kalam.get('kalam_text', ''),
                'description': kalam.get('description', ''),
                'posted_by': kalam.get('writer_name', 'Writer'),
                'location': 'Not specified',
                'posted_date': kalam.get('created_at', '').isoformat() if kalam.get('created_at') else None,
                'youtube_link': None,  # Kalams don't have YouTube links yet
                'status': kalam.get('status', 'final_approved'),
                'vocalist_approval_status': kalam.get('vocalist_approval_status', 'pending')
            })

        return {"lyrics": approved_lyrics}

    except Exception as e:
        print(f"❌ Error fetching kalams: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching kalams: {str(e)}")

@router.get("/lyrics/{kalam_id}")
def get_lyric_preview(kalam_id: int, user_id: int = Depends(get_current_user)):
    """Get detailed lyric information for preview"""
    conn = DBConnection.get_connection()
    db = Queries(conn)
    
    user = db.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    lyric = get_lyric_details(db, kalam_id)
    return lyric

@router.post("/studio", response_model=StudioRecordingRequestResponse)
def create_studio_recording_request(
    request: StudioRecordingRequestCreate,
    user_id: int = Depends(get_current_user)
):
    """
    Create a new studio recording request (In-Person)

    This endpoint:
    1. Validates the kalam is approved and unassigned
    2. Checks if a request already exists for this kalam
    3. Creates the studio recording request
    4. Returns the created request
    """
    conn = DBConnection.get_connection()
    db = Queries(conn)

    # Get user and vocalist info
    user = db.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user['role'] != 'vocalist':
        raise HTTPException(status_code=403, detail="Only vocalists can create recording requests")

    vocalist = db.get_vocalist_by_user_id(user_id)
    if not vocalist:
        raise HTTPException(status_code=400, detail="Vocalist profile not found")

    # Validate kalam
    kalam = validate_kalam_for_request(conn, request.kalam_id, user_id)

    # Check if request already exists
    existing_query = """
        SELECT * FROM studio_recording_requests
        WHERE vocalist_id = %s AND kalam_id = %s
    """
    with conn.cursor() as cur:
        cur.execute(existing_query, (vocalist['id'], request.kalam_id))
        if cur.fetchone():
            raise HTTPException(
                status_code=400,
                detail="You have already submitted a studio recording request for this kalam."
            )

    # Get user info
    user = db.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    submitter_name = user.get('name', '')
    submitter_email = user.get('email', '')

    # Validate date (cannot be in the past)
    if request.preferred_session_date < date.today():
        raise HTTPException(
            status_code=400,
            detail="Preferred session date cannot be in the past."
        )

    # Create the request
    insert_query = """
        INSERT INTO studio_recording_requests (
            vocalist_id, kalam_id,
            lyric_title, lyric_writer, lyric_language, lyric_category,
            preferred_session_date, preferred_time_block,
            estimated_studio_duration, performance_direction,
            availability_confirmed, studio_policies_agreed,
            whatsapp_number, submitter_name, submitter_email,
            status, created_at, updated_at
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING *;
    """

    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute(insert_query, (
            vocalist['id'],
            request.kalam_id,
            kalam['title'],
            kalam['writer_name'],
            kalam['language'],
            kalam['theme'],
            request.preferred_session_date,
            request.preferred_time_block,
            request.estimated_studio_duration,
            request.performance_direction,
            request.availability_confirmed,
            request.studio_policies_agreed,
            request.whatsapp_number,
            submitter_name,
            submitter_email,
            'pending_review',
            datetime.now(),
            datetime.now()
        ))

        result = cur.fetchone()
        conn.commit()

    return StudioRecordingRequestResponse(
        id=result['id'],
        vocalist_id=result['vocalist_id'],
        kalam_id=result['kalam_id'],
        lyric_title=result['lyric_title'],
        lyric_writer=result['lyric_writer'],
        lyric_language=result['lyric_language'],
        lyric_category=result['lyric_category'],
        preferred_session_date=result['preferred_session_date'],
        preferred_time_block=result['preferred_time_block'],
        estimated_studio_duration=result['estimated_studio_duration'],
        performance_direction=result['performance_direction'],
        reference_upload_url=result.get('reference_upload_url'),
        whatsapp_number=result.get('whatsapp_number'),
        submitter_name=result.get('submitter_name'),
        submitter_email=result.get('submitter_email'),
        status=result['status'],
        created_at=result['created_at'],
        updated_at=result['updated_at']
    )

@router.post("/remote", response_model=RemoteRecordingRequestResponse)
def create_remote_recording_request(
    request: RemoteRecordingRequestCreate,
    user_id: int = Depends(get_current_user)
):
    """
    Create a new remote recording request

    This endpoint:
    1. Validates the kalam is approved and unassigned
    2. Checks if a request already exists for this kalam
    3. Creates the remote recording request
    4. Returns the created request
    """
    conn = DBConnection.get_connection()
    db = Queries(conn)

    # Get user and vocalist info
    user = db.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user['role'] != 'vocalist':
        raise HTTPException(status_code=403, detail="Only vocalists can create recording requests")

    vocalist = db.get_vocalist_by_user_id(user_id)
    if not vocalist:
        raise HTTPException(status_code=400, detail="Vocalist profile not found")

    # Validate kalam
    kalam = validate_kalam_for_request(conn, request.kalam_id, user_id)

    # Check if request already exists
    existing_query = """
        SELECT * FROM remote_recording_requests_new
        WHERE vocalist_id = %s AND kalam_id = %s
    """
    with conn.cursor() as cur:
        cur.execute(existing_query, (vocalist['id'], request.kalam_id))
        if cur.fetchone():
            raise HTTPException(
                status_code=400,
                detail="You have already submitted a remote recording request for this kalam."
            )

    # Get user info
    user = db.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    submitter_name = user.get('name', '')
    submitter_email = user.get('email', '')

    # Validate date (cannot be in the past)
    if request.target_submission_date < date.today():
        raise HTTPException(
            status_code=400,
            detail="Target submission date cannot be in the past."
        )

    # Create the request
    insert_query = """
        INSERT INTO remote_recording_requests_new (
            vocalist_id, kalam_id,
            lyric_title, lyric_writer, lyric_language, lyric_category,
            recording_environment, target_submission_date,
            interpretation_notes,
            original_recording_confirmed, remote_production_standards_agreed,
            whatsapp_number, submitter_name, submitter_email,
            status, created_at, updated_at
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING *;
    """

    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute(insert_query, (
            vocalist['id'],
            request.kalam_id,
            kalam['title'],
            kalam['writer_name'],
            kalam['language'],
            kalam['theme'],
            request.recording_environment,
            request.target_submission_date,
            request.interpretation_notes,
            request.original_recording_confirmed,
            request.remote_production_standards_agreed,
            request.whatsapp_number,
            submitter_name,
            submitter_email,
            'under_review',
            datetime.now(),
            datetime.now()
        ))

        result = cur.fetchone()
        conn.commit()

    return RemoteRecordingRequestResponse(
        id=result['id'],
        vocalist_id=result['vocalist_id'],
        kalam_id=result['kalam_id'],
        lyric_title=result['lyric_title'],
        lyric_writer=result['lyric_writer'],
        lyric_language=result['lyric_language'],
        lyric_category=result['lyric_category'],
        recording_environment=result['recording_environment'],
        target_submission_date=result['target_submission_date'],
        interpretation_notes=result['interpretation_notes'],
        sample_upload_url=result.get('sample_upload_url'),
        whatsapp_number=result.get('whatsapp_number'),
        submitter_name=result.get('submitter_name'),
        submitter_email=result.get('submitter_email'),
        status=result['status'],
        created_at=result['created_at'],
        updated_at=result['updated_at']
    )

@router.get("/studio/my-requests")
def get_my_studio_requests(user_id: int = Depends(get_current_user)):
    """Get all studio recording requests for the current vocalist"""
    conn = DBConnection.get_connection()
    db = Queries(conn)
    
    user = db.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user['role'] != 'vocalist':
        raise HTTPException(status_code=403, detail="Only vocalists can access this endpoint")
    
    vocalist = db.get_vocalist_by_user_id(user_id)
    if not vocalist:
        raise HTTPException(status_code=400, detail="Vocalist profile not found")
    
    query = """
        SELECT * FROM studio_recording_requests
        WHERE vocalist_id = %s
        ORDER BY created_at DESC
    """

    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute(query, (vocalist['id'],))
        requests = cur.fetchall()

    return {"requests": requests}

@router.get("/remote/my-requests")
def get_my_remote_requests(user_id: int = Depends(get_current_user)):
    """Get all remote recording requests for the current vocalist"""
    conn = DBConnection.get_connection()
    db = Queries(conn)
    
    user = db.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user['role'] != 'vocalist':
        raise HTTPException(status_code=403, detail="Only vocalists can access this endpoint")
    
    vocalist = db.get_vocalist_by_user_id(user_id)
    if not vocalist:
        raise HTTPException(status_code=400, detail="Vocalist profile not found")
    
    query = """
        SELECT * FROM remote_recording_requests_new
        WHERE vocalist_id = %s
        ORDER BY created_at DESC
    """

    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute(query, (vocalist['id'],))
        requests = cur.fetchall()

    return {"requests": requests}

@router.get("/check-exists/{kalam_id}")
def check_request_exists(kalam_id: int, user_id: int = Depends(get_current_user)):
    """Check if any recording request exists for this lyric"""
    conn = DBConnection.get_connection()
    db = Queries(conn)

    vocalist = db.get_vocalist_by_user_id(user_id)
    if not vocalist:
        return {"exists": False, "request_type": None}

    # Check studio request
    studio_query = """
        SELECT * FROM studio_recording_requests
        WHERE vocalist_id = %s AND kalam_id = %s
    """

    # Check remote request
    remote_query = """
        SELECT * FROM remote_recording_requests_new
        WHERE vocalist_id = %s AND kalam_id = %s
    """

    with conn.cursor() as cur:
        cur.execute(studio_query, (vocalist['id'], kalam_id))
        if cur.fetchone():
            return {"exists": True, "request_type": "studio"}

        cur.execute(remote_query, (vocalist['id'], kalam_id))
        if cur.fetchone():
            return {"exists": True, "request_type": "remote"}

    return {"exists": False, "request_type": None}


# ========================================
# ADMIN ENDPOINTS
# ========================================

class AdminUpdateRequestStatus(BaseModel):
    """Model for admin to update request status"""
    status: str  # 'approved', 'rejected', 'completed'
    admin_comments: Optional[str] = None

@router.get("/admin/studio-requests")
def get_all_studio_requests(user_id: int = Depends(get_current_user)):
    """Get all studio recording requests (Admin only)"""
    conn = DBConnection.get_connection()
    db = Queries(conn)
    
    user = db.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user['role'] not in ['admin', 'sub-admin']:
        raise HTTPException(status_code=403, detail="Only admins can access this endpoint")
    
    query = """
        SELECT * FROM studio_recording_requests
        ORDER BY created_at DESC
    """
    
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute(query)
        requests = cur.fetchall()
    
    return {"requests": requests}

@router.get("/admin/remote-requests")
def get_all_remote_requests(user_id: int = Depends(get_current_user)):
    """Get all remote recording requests (Admin only)"""
    conn = DBConnection.get_connection()
    db = Queries(conn)
    
    user = db.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user['role'] not in ['admin', 'sub-admin']:
        raise HTTPException(status_code=403, detail="Only admins can access this endpoint")
    
    query = """
        SELECT * FROM remote_recording_requests_new
        ORDER BY created_at DESC
    """
    
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute(query)
        requests = cur.fetchall()
    
    return {"requests": requests}

@router.put("/admin/studio-requests/{request_id}/status")
def update_studio_request_status(
    request_id: int,
    data: AdminUpdateRequestStatus,
    user_id: int = Depends(get_current_user)
):
    """Update studio recording request status (Admin only)"""
    conn = DBConnection.get_connection()
    db = Queries(conn)
    
    user = db.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user['role'] not in ['admin', 'sub-admin']:
        raise HTTPException(status_code=403, detail="Only admins can update request status")
    
    # Get the request
    get_query = """
        SELECT * FROM studio_recording_requests
        WHERE id = %s
    """
    
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute(get_query, (request_id,))
        request = cur.fetchone()
    
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")
    
    # Update status
    update_query = """
        UPDATE studio_recording_requests
        SET status = %s, admin_comments = %s, updated_at = CURRENT_TIMESTAMP
        WHERE id = %s
        RETURNING *;
    """
    
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute(update_query, (data.status, data.admin_comments, request_id))
        result = cur.fetchone()
        conn.commit()
    
    # If approved, update the blog assignment
    if data.status == 'approved':
        try:
            # You can add logic here to mark blog as assigned
            pass
        except Exception as e:
            print(f"Warning: Could not update blog assignment: {e}")
    
    # Send email notification
    try:
        from utils.otp import send_recording_request_status_email
        send_recording_request_status_email(
            email=request.get('lyric_writer', ''),
            request_type='studio',
            status=data.status,
            title=result['lyric_title']
        )
    except Exception as e:
        print(f"Failed to send email notification: {e}")
    
    return {"message": f"Studio request {data.status}", "request": result}

@router.put("/admin/remote-requests/{request_id}/status")
def update_remote_request_status(
    request_id: int,
    data: AdminUpdateRequestStatus,
    user_id: int = Depends(get_current_user)
):
    """Update remote recording request status (Admin only)"""
    conn = DBConnection.get_connection()
    db = Queries(conn)
    
    user = db.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user['role'] not in ['admin', 'sub-admin']:
        raise HTTPException(status_code=403, detail="Only admins can update request status")
    
    # Get the request
    get_query = """
        SELECT * FROM remote_recording_requests_new
        WHERE id = %s
    """
    
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute(get_query, (request_id,))
        request = cur.fetchone()
    
    if not request:
        raise HTTPException(status_code=404, detail="Request not found")
    
    # Update status
    update_query = """
        UPDATE remote_recording_requests_new
        SET status = %s, admin_comments = %s, updated_at = CURRENT_TIMESTAMP
        WHERE id = %s
        RETURNING *;
    """
    
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute(update_query, (data.status, data.admin_comments, request_id))
        result = cur.fetchone()
        conn.commit()
    
    # If approved, update the blog assignment
    if data.status == 'approved':
        try:
            # You can add logic here to mark blog as assigned
            pass
        except Exception as e:
            print(f"Warning: Could not update blog assignment: {e}")
    
    # Send email notification
    try:
        from utils.otp import send_recording_request_status_email
        send_recording_request_status_email(
            email=request.get('lyric_writer', ''),
            request_type='remote',
            status=data.status,
            title=result['lyric_title']
        )
    except Exception as e:
        print(f"Failed to send email notification: {e}")
    
    return {"message": f"Remote request {data.status}", "request": result}
