import api from "@/lib/axios";

// ========================================
// STUDIO RECORDING REQUEST (IN-PERSON)
// ========================================

export interface ApprovedLyric {
  id: number;
  title: string;
  language: string;
  category: string;
  writer_name: string;
  kalam_text: string;
  description: string;
  posted_by?: string;
  location?: string;
  posted_date?: string;
  youtube_link?: string | null;
}

export interface StudioRecordingRequest {
  kalam_id: number;
  preferred_session_date: string; // YYYY-MM-DD
  preferred_time_block: 'Morning' | 'Afternoon' | 'Evening';
  estimated_studio_duration: '1 Hour' | '2 Hours' | 'Half Day' | 'Full Day';
  performance_direction: string;
  availability_confirmed: boolean;
  studio_policies_agreed: boolean;
}

export interface StudioRecordingRequestResponse {
  id: number;
  vocalist_id: number;
  kalam_id: number;
  lyric_title: string;
  lyric_writer: string | null;
  lyric_language: string | null;
  lyric_category: string | null;
  preferred_session_date: string;
  preferred_time_block: string;
  estimated_studio_duration: string;
  performance_direction: string;
  reference_upload_url: string | null;
  status: 'pending_review' | 'approved' | 'rejected' | 'completed';
  created_at: string;
  updated_at: string;
}

/**
 * Get all approved and unassigned lyrics for vocalist
 */
export const getApprovedLyrics = () => {
  return api.get<{ lyrics: ApprovedLyric[] }>("/recording-requests/approved-lyrics", {
    headers: {
      requiresAuth: true,
    },
  });
};

/**
 * Get lyric preview by ID
 */
export const getLyricPreview = (kalamId: number) => {
  return api.get<ApprovedLyric>(`/recording-requests/lyrics/${kalamId}`, {
    headers: {
      requiresAuth: true,
    },
  });
};

/**
 * Create a new studio recording request
 */
export const createStudioRecordingRequest = (data: StudioRecordingRequest) => {
  return api.post<StudioRecordingRequestResponse>("/recording-requests/studio", data, {
    headers: {
      requiresAuth: true,
    },
  });
};

/**
 * Get all studio recording requests for current vocalist
 */
export const getMyStudioRequests = () => {
  return api.get<{ requests: StudioRecordingRequestResponse[] }>("/recording-requests/studio/my-requests", {
    headers: {
      requiresAuth: true,
    },
  });
};

// ========================================
// REMOTE RECORDING REQUEST
// ========================================

export interface RemoteRecordingRequest {
  kalam_id: number;
  recording_environment: 'Professional Studio' | 'Condenser Mic Setup' | 'USB Microphone' | 'Mobile Setup';
  target_submission_date: string; // YYYY-MM-DD
  interpretation_notes: string;
  original_recording_confirmed: boolean;
  remote_production_standards_agreed: boolean;
}

export interface RemoteRecordingRequestResponse {
  id: number;
  vocalist_id: number;
  kalam_id: number;
  lyric_title: string;
  lyric_writer: string | null;
  lyric_language: string | null;
  lyric_category: string | null;
  recording_environment: string;
  target_submission_date: string;
  interpretation_notes: string;
  sample_upload_url: string | null;
  status: 'under_review' | 'approved' | 'rejected' | 'completed';
  created_at: string;
  updated_at: string;
}

/**
 * Create a new remote recording request
 */
export const createRemoteRecordingRequest = (data: RemoteRecordingRequest) => {
  return api.post<RemoteRecordingRequestResponse>("/recording-requests/remote", data, {
    headers: {
      requiresAuth: true,
    },
  });
};

/**
 * Get all remote recording requests for current vocalist
 */
export const getMyRemoteRequests = () => {
  return api.get<{ requests: RemoteRecordingRequestResponse[] }>("/recording-requests/remote/my-requests", {
    headers: {
      requiresAuth: true,
    },
  });
};

// ========================================
// COMMON UTILITIES
// ========================================

/**
 * Check if any recording request exists for a lyric
 */
export const checkRecordingRequestExists = (kalamId: number) => {
  return api.get<{ exists: boolean; request_type: 'studio' | 'remote' | null }>(
    `/recording-requests/check-exists/${kalamId}`,
    {
      headers: {
        requiresAuth: true,
      },
    }
  );
};
