# Contact Form Email Setup

## ✅ Implementation Complete

The contact form now uses **Resend** with the template `contact-form-notification` to send confirmation emails.

### Changes Made:

#### 1. Backend Endpoint (`api/public.py`)
- Added `POST /public/contact` endpoint
- Uses `send_template_email()` from `utils/otp.py`
- Sends confirmation email to user with template `contact-form-notification`
- Sends notification email to admin at `contact@sufipulse.com`
- Template variables: `name`, `email`, `subject`, `message`

#### 2. Frontend Contact Form (`components/pages/Contact.tsx`)
- Updated to call backend endpoint instead of Next.js API route
- Uses `NEXT_PUBLIC_BASE_URL` to connect to backend
- Proper error handling and success messages

### Setup Required:

#### Step 1: Create Backend `.env` File

Create a file at `E:\sufiPulse\sufipulse-backend-talhaadil\.env` with:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/sufipulse
JWT_SECRET=your_jwt_secret_here
RESEND_API_KEY=your_resend_api_key_here
FROM_EMAIL=your_verified_sender_email
```

**Important:**
- `RESEND_API_KEY`: Get from https://resend.com/api-keys
- `FROM_EMAIL`: Must be a verified domain in Resend (e.g., `contact@mail.sufipulse.com` or `onboarding@resend.dev` for testing)

#### Step 2: Verify Resend Template

Make sure you have created the template `contact-form-notification` in your Resend dashboard with these variables:
- `{{name}}` - User's name
- `{{email}}` - User's email
- `{{subject}}` - Message subject
- `{{message}}` - Message content

#### Step 3: Restart Backend

After creating the `.env` file:

```bash
cd E:\sufiPulse\sufipulse-backend-talhaadil
# Stop current server (Ctrl+C)
python main.py
```

### How It Works:

1. User fills contact form at `/contact`
2. Frontend sends POST to `http://localhost:8000/public/contact`
3. Backend validates the form data
4. Backend sends confirmation email to user using Resend template
5. Backend sends notification email to admin
6. User sees success message

### Testing:

1. Go to `/contact`
2. Fill in the form:
   - Name: Your name
   - Email: Your email
   - Subject: Test inquiry
   - Message: Test message
3. Click "Send Message"
4. You should receive a confirmation email
5. Admin should receive a notification email

### Troubleshooting:

**If emails are not sending:**
1. Check backend console for error messages
2. Verify `RESEND_API_KEY` is correct
3. Verify `FROM_EMAIL` is a verified sender in Resend
4. Check that template ID `contact-form-notification` exists in Resend

**Common Errors:**
- `403 Forbidden`: Check JWT token (not needed for this endpoint - it's public)
- `500 Internal Server Error`: Check backend console for details
- Email not received: Check spam folder, verify Resend setup

### Email Template Variables:

The `contact-form-notification` template should use these variables:

```html
<!-- Example template HTML -->
<h1>Thank you, {{name}}!</h1>
<p>We received your message about: {{subject}}</p>
<p>Your email: {{email}}</p>
<p>Message: {{message}}</p>
```

### Success Response:

```json
{
  "message": "Message sent successfully! We will get back to you soon.",
  "status": "success"
}
```

### Error Response:

```json
{
  "detail": "All fields are required"
}
```
