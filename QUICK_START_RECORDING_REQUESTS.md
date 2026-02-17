# Recording Request System - Quick Start Guide

## 🚀 Quick Setup (5 Minutes)

Follow these steps to set up the new Recording Request System:

---

## Step 1: Database Setup

### Run Schema Migration

```bash
# Navigate to backend directory
cd E:\sufiPulse\sufipulse-backend-talhaadil

# Apply the new schema
python apply_recording_requests_schema.py
```

**Expected Output:**
```
🔄 Applying recording requests schema updates...
📝 Executing SQL script...
✅ Schema updates applied successfully!

📊 Created tables:
   - studio_recording_requests
   - remote_recording_requests_new

🎉 Recording requests schema setup complete!
```

### Verify Tables (Optional)

```bash
# Connect to your database
psql -U postgres -d sufipulse

# Check tables
\dt studio_recording_requests
\dt remote_recording_requests_new
```

---

## Step 2: Backend Setup

### Update Main.py (Already Done ✅)

The new router has been added to `main.py`:

```python
from api import ..., recording_requests_router

app.include_router(recording_requests_router)
```

### Start Backend Server

```bash
# Run the backend
python main.py

# Or if using uvicorn directly
uvicorn main:app --reload --port 8000
```

### Verify API Endpoints

Open browser and go to: `http://localhost:8000/docs`

Look for the **"Recording Requests"** section with these endpoints:
- `GET /recording-requests/approved-lyrics`
- `POST /recording-requests/studio`
- `POST /recording-requests/remote`
- etc.

---

## Step 3: Frontend Setup

### Install Dependencies (if needed)

```bash
cd E:\sufiPulse\sufipulse-frontend-talhaadil
npm install
```

### Start Frontend

```bash
npm run dev
```

### Access the Forms

Open your browser (the app will be running on `http://localhost:3000` during development, or your deployed domain in production)

1. **Login as a Vocalist**
   - Use your vocalist credentials

2. **Navigate to Recording Requests**
   - Sidebar → "Studio Recording" or "Remote Recording"
   - Routes: `/vocalist/recording-requests/studio` or `/vocalist/recording-requests/remote`

---

## 📋 Testing the System

### Test Scenario 1: Create Studio Recording Request

1. Go to `/vocalist/recording-requests/studio`
2. Select an approved lyric from dropdown
3. Click "Preview" to see lyric details
4. Fill in:
   - Preferred session date (future date)
   - Time block (Morning/Afternoon/Evening)
   - Duration (1 Hour/2 Hours/Half Day/Full Day)
   - Performance direction (min 20 characters)
5. Check both confirmation boxes
6. Click "Submit Studio Recording Request"
7. Verify success message appears
8. Switch to "My Requests" tab to see submission

### Test Scenario 2: Create Remote Recording Request

1. Go to `/vocalist/recording-requests/remote`
2. Select an approved lyric from dropdown
3. Fill in:
   - Recording environment
   - Target submission date
   - Interpretation notes (min 20 characters)
4. Check both declaration boxes
5. Click "Submit Remote Recording Request"
6. Verify success message appears
7. Switch to "My Requests" tab to see submission

---

## 🔍 Troubleshooting

### Issue: "Vocalist profile not found"

**Solution:**
- Complete your vocalist profile first
- Go to `/vocalist/profile` and submit your profile

### Issue: "No approved lyrics available"

**Solution:**
- Lyrics need to go through approval workflow first:
  1. Writer submits kalam
  2. Admin approves (status: final_approved)
  3. Vocalist accepts (vocalist_approval_status: approved)
  4. Lyric appears in dropdown

### Issue: "Table does not exist"

**Solution:**
```bash
# Re-run the schema migration
python apply_recording_requests_schema.py
```

### Issue: "API endpoint not found (404)"

**Solution:**
- Ensure backend server is running
- Check `main.py` includes the recording_requests_router
- Restart the backend server

---

## 📊 Database Queries

### View All Studio Requests

```sql
SELECT 
    id,
    lyric_title,
    lyric_writer,
    preferred_session_date,
    preferred_time_block,
    status,
    created_at
FROM studio_recording_requests
ORDER BY created_at DESC;
```

### View All Remote Requests

```sql
SELECT 
    id,
    lyric_title,
    recording_environment,
    target_submission_date,
    status,
    created_at
FROM remote_recording_requests_new
ORDER BY created_at DESC;
```

### Get Approved Lyrics for Testing

```sql
SELECT * FROM get_approved_unassigned_kalams();
```

### Insert Test Data (Optional)

```sql
-- Insert a test studio request
INSERT INTO studio_recording_requests (
    vocalist_id, kalam_id,
    lyric_title, lyric_writer, lyric_language, lyric_category,
    preferred_session_date, preferred_time_block,
    estimated_studio_duration, performance_direction,
    availability_confirmed, studio_policies_agreed,
    status, created_at, updated_at
) VALUES (
    1, 1,
    'Test Lyric', 'Test Writer', 'Urdu', 'Qawwali',
    '2025-03-15', 'Morning',
    '2 Hours', 'Test performance direction',
    true, true,
    'pending_review', NOW(), NOW()
);
```

---

## 🎨 UI Preview

### Studio Recording Request Form

```
┌─────────────────────────────────────────┐
│ 🎤 Studio Recording Request             │
│    In-Person Session at SufiPulse      │
├─────────────────────────────────────────┤
│ 1. Lyric Selection                      │
│    [Dropdown: Approved Lyrics ▼] [Preview]│
│                                         │
│ 2. Session Scheduling                   │
│    Date: [📅 Select Date]               │
│    Time: ☐ Morning ☐ Afternoon ☐ Evening│
│    Duration: [1H] [2H] [Half] [Full]   │
│                                         │
│ 3. Artistic Preparation                 │
│    [Textarea: Performance Direction...] │
│    [Upload Reference (Optional)]        │
│                                         │
│ 4. Confirmation                         │
│    ☐ I confirm my availability          │
│    ☐ I agree to studio policies         │
│                                         │
│    [Submit Studio Recording Request]    │
└─────────────────────────────────────────┘
```

### Remote Recording Request Form

```
┌─────────────────────────────────────────┐
│ 📶 Remote Recording Request             │
│    Remote Production                   │
├─────────────────────────────────────────┤
│ 1. Lyric Selection                      │
│    [Dropdown: Approved Lyrics ▼] [Preview]│
│                                         │
│ 2. Technical Setup                      │
│    Environment: [Professional Studio]   │
│                 [Condenser Mic]         │
│                 [USB Mic] [Mobile]      │
│    Date: [📅 Select Date]               │
│                                         │
│ 3. Performance Plan                     │
│    [Textarea: Interpretation Notes...]  │
│    [Upload Sample (Optional)]           │
│                                         │
│ 4. Professional Declaration             │
│    ☐ Original recording confirmed       │
│    ☐ Agreed to production standards     │
│                                         │
│    [Submit Remote Recording Request]    │
└─────────────────────────────────────────┘
```

---

## 📝 File Structure

### Backend Files Created

```
sufipulse-backend-talhaadil/
├── api/
│   ├── __init__.py (updated)
│   └── recording_requests.py (new)
├── sql/
│   ├── recording_requests_schema.sql (new)
│   └── queries/
│       └── studioQueries.py (updated)
├── apply_recording_requests_schema.py (new)
└── main.py (updated)
```

### Frontend Files Created

```
sufipulse-frontend-talhaadil/
├── app/
│   ├── (vocalist)/
│   │   ├── studio-recording/
│   │   │   └── page.tsx (new)
│   │   └── remote-recording/
│   │       └── page.tsx (new)
│   └── (dashboards)/
│       └── vocalist-dashboard/
│           ├── studio-recording/
│           │   └── page.tsx (new)
│           └── remote-recording/
│               └── page.tsx (new)
├── components/
│   └── pages/
│       ├── StudioRecordingRequestForm.tsx (new)
│       ├── RemoteRecordingRequestForm.tsx (new)
│       ├── StudioRecordingRequestPage.tsx (new)
│       ├── RemoteRecordingRequestPage.tsx (new)
│       ├── MyStudioRequestsList.tsx (new)
│       └── MyRemoteRequestsList.tsx (new)
├── services/
│   └── recordingRequests.ts (new)
└── components/
    └── Layouts/
        └── VocalistLayout.tsx (updated)
```

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Database tables created successfully
- [ ] Backend API endpoints accessible at `/docs`
- [ ] Frontend pages load without errors
- [ ] Navigation appears in vocalist sidebar
- [ ] Can access studio recording form
- [ ] Can access remote recording form
- [ ] Approved lyrics load in dropdown (if any exist)
- [ ] Form validation works
- [ ] Can submit requests (if test data exists)
- [ ] Requests appear in "My Requests" list

---

## 🎯 Next Steps

1. **Test with Real Data**
   - Create test vocalist account
   - Submit test kalam through approval workflow
   - Test recording request submission

2. **Admin Integration**
   - Build admin dashboard for reviewing requests
   - Implement approval/rejection workflow
   - Add email notifications

3. **Production Deployment**
   - Update environment variables
   - Configure file upload storage (AWS S3, etc.)
   - Set up production database

---

## 📞 Support

Need help? Check:
- Full Documentation: `RECORDING_REQUESTS_DOCUMENTATION.md`
- API Docs: `http://localhost:8000/docs`
- Backend Logs: Check console for errors
- Frontend Logs: Check browser console

---

**Happy Coding! 🎉**
