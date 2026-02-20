-- Fix for missing status column in vocalists table
-- This script adds the status column if it doesn't exist

-- Add status column to vocalists table if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'vocalists' 
        AND column_name = 'status'
    ) THEN
        ALTER TABLE public.vocalists 
        ADD COLUMN status character varying(50) DEFAULT 'pending'::character varying;
        
        -- Add the status check constraint
        ALTER TABLE public.vocalists 
        ADD CONSTRAINT vocalists_status_check 
        CHECK (((status)::text = ANY ((ARRAY[
            'pending'::character varying, 
            'approved'::character varying, 
            'rejected'::character varying
        ])::text[])));
        
        RAISE NOTICE 'Added status column to vocalists table';
    ELSE
        RAISE NOTICE 'Column status already exists in vocalists table';
    END IF;
END $$;

-- Verify the column exists
SELECT column_name, data_type, character_maximum_length, column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'vocalists'
ORDER BY ordinal_position;
