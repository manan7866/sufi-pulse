-- Add whatsapp_number column to studio_recording_requests
ALTER TABLE studio_recording_requests 
ADD COLUMN IF NOT EXISTS whatsapp_number VARCHAR(50);

-- Add whatsapp_number column to remote_recording_requests_new
ALTER TABLE remote_recording_requests_new 
ADD COLUMN whatsapp_number VARCHAR(50);

-- Add submitter info columns to studio_recording_requests
ALTER TABLE studio_recording_requests 
ADD COLUMN IF NOT EXISTS submitter_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS submitter_email VARCHAR(255);

-- Add submitter info columns to remote_recording_requests_new
ALTER TABLE remote_recording_requests_new 
ADD COLUMN IF NOT EXISTS submitter_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS submitter_email VARCHAR(255);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_studio_whatsapp ON studio_recording_requests(whatsapp_number);
CREATE INDEX IF NOT EXISTS idx_remote_whatsapp ON remote_recording_requests_new(whatsapp_number);
