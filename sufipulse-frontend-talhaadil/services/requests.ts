import api from "@/lib/axios";

// ✅ Create Studio Visit Request
export const createStudioVisitRequest = (data: {
  vocalist_id: number;
  kalam_id: number;
  name: string;
  email: string;
  organization: string;
  contact_number: string;
  preferred_date: string; // format: YYYY-MM-DD
  preferred_time: string;
  purpose: string;
  number_of_visitors: number;
  additional_details: string;
  special_requests: string;
}) => {
  return api.post(`/requests/studio-visit-request`, data, {
    headers: {
      requiresAuth: true,
    },
  });
};

// ✅ Get Studio Visit Requests By Vocalist
export const getStudioVisitRequestsByVocalist = () => {
  return api.get(`/requests/studio-visit-requests/vocalist`, {
    headers: {
      requiresAuth: true,
    },
  });
};

// ✅ Create Remote Recording Request
export const createRemoteRecordingRequest = (data: {
  vocalist_id: number;
  kalam_id: number;
  name: string;
  email: string;
  city: string;
  country: string;
  time_zone: string;
  role: string;
  project_type: string;
  recording_equipment: string;
  internet_speed: string;
  preferred_software: string;
  availability: string;
  recording_experience: string;
  technical_setup: string;
  additional_details: string;
}) => {
  return api.post(`/requests/remote-recording-request`, data, {
    headers: {
      requiresAuth: true,
    },
  });
};

// ✅ Get Remote Recording Requests By Vocalist
export const getRemoteRecordingRequestsByVocalist = () => {
  return api.get(`/requests/remote-recording-requests/vocalist`, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const checkRequestExists = (vocalist_id: string, kalam_id: string) => {
  return api.get(`/requests/check-request-exists/${vocalist_id}/${kalam_id}`, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const getAllStudioVisitRequests = () => {
  return api.get("/requests/studio-visit-requests", {
    headers: {
      requiresAuth: true,
    },
  });
};

export const getAllRemoteRecordingRequests = () => {
  return api.get("/requests/remote-recording-requests", {
    headers: {
      requiresAuth: true,
    },
  });
};

export const updateStudioVisitRequestStatus = (requestId: number, status: string, adminComments?: string) => {
  return api.put(`/requests/studio-visit-requests/${requestId}/status`, 
    { status, admin_comments: adminComments },
    {
      headers: {
        requiresAuth: true,
      },
    }
  );
};

export const updateRemoteRecordingRequestStatus = (requestId: number, status: string, adminComments?: string) => {
  return api.put(`/requests/remote-recording-requests/${requestId}/status`, 
    { status, admin_comments: adminComments },
    {
      headers: {
        requiresAuth: true,
      },
    }
  );
};


export const createPartnershipProposal = (data: {
  full_name: string;
  email: string;
  organization_name: string;
  role_title: string;
  organization_type: string;
  partnership_type: string;
  website: string;
  proposal_text: string;
  proposed_timeline: string;
  resources: string;
  goals: string;
  sacred_alignment: boolean;
}) => {
  return api.post("/public/", data, {
    headers: {
      requiresAuth: false, // since it's public
    },
  });
};



export const getPostedKalams = (skipValue:number, limit:number) => {
  console.log("Fetching posted kalams with skip:", skipValue, "and limit:", limit);
  return api.get("/public/postedkalams", {
    params: {
      skip: skipValue,   // default
      limit: limit,  // default
    },
    headers: {
      requiresAuth: false, // since it's public
    },
  });
};


export const getGuestPosts = (params: { skip?: number; limit?: number } = {}) => {
  return api.get("/public/posts", {
    params: {
      skip: params.skip ?? 0,
      limit: params.limit ?? 10,
    },
    headers: {
      requiresAuth: false,
    },
  });
};

export const getApprovedBlogs = (params: { skip?: number; limit?: number; category?: string; search?: string } = {}) => {
  return api.get("/public/blogs", {
    params: {
      skip: params.skip ?? 0,
      limit: params.limit ?? 6,
      category: params.category,
      search: params.search,
    },
    headers: {
      requiresAuth: false,
    },
  });
};

export const getBlogById = (blogId: number) => {
  return api.get(`/public/blogs/${blogId}`, {
    headers: {
      requiresAuth: false,
    },
  });
};
