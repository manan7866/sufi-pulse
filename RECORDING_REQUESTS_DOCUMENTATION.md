# Recording Request System Documentation

## Overview

This document describes the new **Recording Request System** implemented for SufiPulse. The system allows vocalists to submit requests for recording approved lyrics through two different modalities:

1. **Studio Recording Request (In-Person)** - For vocalists who want to record at the SufiPulse Studio
2. **Remote Recording Request** - For vocalists who want to record remotely from their own setup

---

## System Architecture

### Backend (FastAPI)

#### New API Routes

All recording request endpoints are under `/recording-requests/`:

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/approved-lyrics` | Get all approved and unassigned lyrics for vocalist | ✅ |
| GET | `/lyrics/{kalam_id}` | Get detailed lyric information for preview | ✅ |
| POST | `/studio` | Create a new studio recording request | ✅ |
| GET | `/studio/my-requests` | Get all studio requests for current vocalist | ✅ |
| POST | `/remote` | Create a new remote recording request | ✅ |
| GET | `/remote/my-requests` | Get all remote requests for current vocalist | ✅ |
| GET | `/check-exists/{kalam_id}` | Check if request exists for a lyric | ✅ |

#### Database Schema

Two new tables have been created:

**1. `studio_recording_requests`**
- Stores in-person studio session requests
- Fields include:
  - Lyric selection (title, writer, language, category)
  - Session scheduling (date, time block, duration)
  - Artistic preparation (performance direction, reference upload)
  - Confirmations (availability, studio policies)
  - Status tracking (pending_review, approved, rejected, completed)

**2. `remote_recording_requests_new`**
- Stores remote recording requests
- Fields include:
  - Lyric selection (title, writer, language, category)
  - Technical setup (recording environment, target date)
  - Performance plan (interpretation notes, sample upload)
  - Professional declarations (original recording, standards agreed)
  - Status tracking (under_review, approved, rejected, completed)

#### Key Features

- **Lyric Validation**: Only approved and unassigned lyrics can be selected
- **Date Validation**: Requested dates cannot be in the past
- **Duplicate Prevention**: One request per lyric per vocalist
- **Status Workflow**: Clear status progression from submission to completion

---

### Frontend (Next.js)

#### New Pages

1. **Studio Recording Request**
   - Route: `/vocalist/studio-recording`
   - Component: `StudioRecordingRequestPage.tsx`
   - Form: `StudioRecordingRequestForm.tsx`
   - List: `MyStudioRequestsList.tsx`

2. **Remote Recording Request**
   - Route: `/vocalist/remote-recording`
   - Component: `RemoteRecordingRequestPage.tsx`
   - Form: `RemoteRecordingRequestForm.tsx`
   - List: `MyRemoteRequestsList.tsx`

#### Form Structure

**Studio Recording Request Form:**

1. **Lyric Selection**
   - Dropdown of approved + unassigned lyrics
   - Shows: Title, Writer, Language, Category
   - Preview button for full lyric details

2. **Session Scheduling**
   - Preferred Session Date (calendar picker)
   - Preferred Time Block (Morning/Afternoon/Evening)
   - Estimated Studio Duration (1 Hour/2 Hours/Half Day/Full Day)

3. **Artistic Preparation**
   - Performance Direction (textarea)
   - Reference Upload (optional, MP3/WAV, max 10MB)

4. **Confirmation**
   - Availability confirmation checkbox
   - Studio policies agreement checkbox

**Remote Recording Request Form:**

1. **Lyric Selection**
   - Same as studio form

2. **Technical Setup**
   - Recording Environment (Professional Studio/Condenser Mic/USB Mic/Mobile)
   - Target Submission Date

3. **Performance Plan**
   - Interpretation Notes (textarea)
   - Sample Upload (optional, MP3/WAV, max 10MB)

4. **Professional Declaration**
   - Original recording confirmation
   - Remote production standards agreement

---

## User Workflow

### For Vocalists

1. **Access Recording Requests**
   - Navigate to sidebar → "Studio Recording" or "Remote Recording"

2. **Select Lyric**
   - Choose from dropdown of approved and unassigned lyrics
   - Preview lyric details before selecting

3. **Fill Request Form**
   - Complete all required fields
   - Upload reference/sample (optional)
   - Confirm declarations

4. **Submit Request**
   - Studio: Status → "Pending Review"
   - Remote: Status → "Under Review"

5. **View Requests**
   - Switch to "My Requests" tab
   - See all submitted requests with status

### After Admin Approval

When admin approves a recording request:

1. **Project Creation**
   - New project is created in the system

2. **Lyric Assignment**
   - Lyric status → "Assigned"
   - Lyric removed from vocalist listing
   - Assigned to the requesting vocalist

3. **Dashboard Update**
   - Project appears in "My Active Projects"
   - Vocalist can track progress

---

## Database Setup

### Prerequisites

- PostgreSQL database running
- Python 3.8+ installed
- Required packages: `psycopg2`, `python-dotenv`

### Installation Steps

1. **Apply Schema Updates**

```bash
cd sufipulse-backend-talhaadil
python apply_recording_requests_schema.py
```

This will:
- Create `studio_recording_requests` table
- Create `remote_recording_requests_new` table
- Create necessary indexes
- Create helper functions

2. **Verify Tables**

```sql
-- Check studio recording requests table
SELECT * FROM studio_recording_requests LIMIT 5;

-- Check remote recording requests table
SELECT * FROM remote_recording_requests_new LIMIT 5;

-- Check approved lyrics function
SELECT * FROM get_approved_unassigned_kalams();
```

---

## API Usage Examples

### Get Approved Lyrics

```typescript
import { getApprovedLyrics } from '@/services/recordingRequests';

const response = await getApprovedLyrics();
console.log(response.data.lyrics);
// [
//   {
//     id: 1,
//     title: "Ishq-e-Haqiqi",
//     language: "Urdu",
//     category: "Qawwali",
//     writer_name: "Amina Rahman",
//     kalam_text: "...",
//     description: "..."
//   }
// ]
```

### Create Studio Recording Request

```typescript
import { createStudioRecordingRequest } from '@/services/recordingRequests';

const requestData = {
  kalam_id: 1,
  preferred_session_date: "2025-03-15",
  preferred_time_block: "Morning",
  estimated_studio_duration: "2 Hours",
  performance_direction: "I envision a soulful, emotive delivery with emphasis on...",
  availability_confirmed: true,
  studio_policies_agreed: true,
};

const response = await createStudioRecordingRequest(requestData);
console.log(response.data);
// { id: 1, status: "pending_review", ... }
```

### Create Remote Recording Request

```typescript
import { createRemoteRecordingRequest } from '@/services/recordingRequests';

const requestData = {
  kalam_id: 2,
  recording_environment: "Professional Studio",
  target_submission_date: "2025-03-20",
  interpretation_notes: "My approach will focus on the spiritual essence with...",
  original_recording_confirmed: true,
  remote_production_standards_agreed: true,
};

const response = await createRemoteRecordingRequest(requestData);
console.log(response.data);
// { id: 2, status: "under_review", ... }
```

---

## Color Design

The forms match the SufiPulse project color scheme:

- **Primary**: Emerald Green (`#10b981` / `emerald-600`)
- **Secondary**: Slate Dark (`#1e293b` / `slate-800`)
- **Background**: White (`#ffffff`)
- **Accent**: Amber for warnings (`#f59e0b` / `amber-500`)

### Form Headers

- **Studio Recording**: Gradient from Slate-900 to Emerald-900
- **Remote Recording**: Gradient from Emerald-900 to Slate-900

### Status Badges

- **Pending Review/Under Review**: Amber (`bg-amber-100 text-amber-700`)
- **Approved**: Emerald (`bg-emerald-100 text-emerald-700`)
- **Rejected**: Red (`bg-red-100 text-red-700`)
- **Completed**: Blue (`bg-blue-100 text-blue-700`)

---

## Validation Rules

### Backend Validation

1. **User Role Check**
   - Only users with `role: "vocalist"` can create requests
   - Must have completed vocalist profile

2. **Lyric Validation**
   - Lyric must exist
   - Status must be `complete_approved` or `final_approved`
   - Vocalist approval status must be `approved`
   - Lyric must not be assigned to another vocalist

3. **Date Validation**
   - Requested dates cannot be in the past

4. **Duplicate Check**
   - Only one request per lyric per vocalist
   - Checks both studio and remote requests

### Frontend Validation

1. **Required Fields**
   - All marked fields must be filled
   - Minimum character counts for text areas (20 chars)

2. **Date Validation**
   - Date picker restricts to future dates only

3. **Checkbox Confirmation**
   - Both confirmation checkboxes must be checked

4. **File Upload**
   - Only MP3 and WAV formats accepted
   - Maximum file size: 10MB

---

## Error Handling

### Common Error Messages

| Error | Message | Solution |
|-------|---------|----------|
| No Profile | "Vocalist profile not found" | Complete vocalist profile first |
| Lyric Not Approved | "This lyric is not yet approved" | Wait for admin approval |
| Lyric Assigned | "Already assigned to another vocalist" | Choose a different lyric |
| Duplicate Request | "Already submitted a request for this lyric" | Check your existing requests |
| Past Date | "Date cannot be in the past" | Select a future date |
| Invalid File | "Only MP3 and WAV files allowed" | Upload correct format |
| File Too Large | "File size exceeds 10MB limit" | Compress or use smaller file |

---

## Testing

### Manual Testing Checklist

#### Studio Recording Request

- [ ] Can access form from sidebar
- [ ] Approved lyrics load in dropdown
- [ ] Lyric preview works correctly
- [ ] Form validation prevents empty submissions
- [ ] Date picker restricts to future dates
- [ ] Time block selection works
- [ ] Duration selection works
- [ ] Performance direction requires minimum 20 chars
- [ ] Confirmation checkboxes are required
- [ ] Submit creates request with "pending_review" status
- [ ] Request appears in "My Requests" list
- [ ] Cannot submit duplicate request for same lyric

#### Remote Recording Request

- [ ] Can access form from sidebar
- [ ] Approved lyrics load in dropdown
- [ ] Recording environment selection works
- [ ] Target date validation works
- [ ] Interpretation notes requires minimum 20 chars
- [ ] Professional declaration checkboxes required
- [ ] Submit creates request with "under_review" status
- [ ] Request appears in "My Requests" list

---

## Future Enhancements

### Planned Features

1. **File Upload Integration**
   - Actual file upload to cloud storage
   - URL storage in database

2. **Email Notifications**
   - Confirmation email on submission
   - Status update notifications
   - Admin approval notifications

3. **Admin Dashboard**
   - Review and approve/reject requests
   - Filter by status, date, vocalist
   - Bulk actions

4. **Calendar Integration**
   - Studio availability calendar
   - Real-time slot booking
   - Conflict detection

5. **Analytics**
   - Request statistics
   - Vocalist activity tracking
   - Studio utilization metrics

---

## Support

For issues or questions:

- **Technical Issues**: Check backend logs for API errors
- **Database Issues**: Verify schema updates applied correctly
- **Frontend Issues**: Check browser console for errors

### Contact

- Email: support@sufipulse.com
- Documentation: `/docs` directory

---

## Version History

### v1.0.0 (February 2025)

- Initial release
- Studio Recording Request form
- Remote Recording Request form
- Database schema
- API endpoints
- Frontend integration

---

**Last Updated**: February 16, 2025
**Author**: SufiPulse Development Team
