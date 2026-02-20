import api from "@/lib/axios";

export interface RecordingRequest {
  id: number;
  vocalist_id: number;
  kalam_id: number;
  lyric_title: string;
  lyric_writer: string | null;
  lyric_language: string | null;
  lyric_category: string | null;
  status: 'pending_review' | 'under_review' | 'approved' | 'rejected' | 'completed';
  admin_comments: string | null;
  created_at: string;
  updated_at: string;
  whatsapp_number: string | null;
  submitter_name: string | null;
  submitter_email: string | null;
}

export interface StudioRecordingRequest extends RecordingRequest {
  preferred_session_date: string;
  preferred_time_block: string;
  estimated_studio_duration: string;
  performance_direction: string;
}

export interface RemoteRecordingRequest extends RecordingRequest {
  recording_environment: string;
  target_submission_date: string;
  interpretation_notes: string;
}

// Studio Requests
export const getAllStudioRequests = () => {
  return api.get<{ requests: StudioRecordingRequest[] }>("/recording-requests/admin/studio-requests", {
    headers: {
      requiresAuth: true,
    },
  });
};

export const updateStudioRequestStatus = (requestId: number, status: string, adminComments?: string) => {
  return api.put<{ message: string; request: StudioRecordingRequest }>(
    `/recording-requests/admin/studio-requests/${requestId}/status`,
    { status, admin_comments: adminComments },
    {
      headers: {
        requiresAuth: true,
      },
    }
  );
};

// Remote Requests
export const getAllRemoteRequests = () => {
  return api.get<{ requests: RemoteRecordingRequest[] }>("/recording-requests/admin/remote-requests", {
    headers: {
      requiresAuth: true,
    },
  });
};

export const updateRemoteRequestStatus = (requestId: number, status: string, adminComments?: string) => {
  return api.put<{ message: string; request: RemoteRecordingRequest }>(
    `/recording-requests/admin/remote-requests/${requestId}/status`,
    { status, admin_comments: adminComments },
    {
      headers: {
        requiresAuth: true,
      },
    }
  );
};
