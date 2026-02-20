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

// ==================== BLOG ENGAGEMENT SERVICES ====================

/**
 * Record a blog view (called when page loads)
 * Prevents duplicate views from same user/IP
 */
export const recordBlogView = (blogId: number) => {
  return api.post(`/public/blogs/${blogId}/view`, {}, {
    headers: {
      requiresAuth: true,
    },
  });
};

/**
 * Toggle like on a blog post
 * Returns current like status and count
 */
export const toggleBlogLike = (blogId: number) => {
  return api.post(`/public/blogs/${blogId}/like`, {}, {
    headers: {
      requiresAuth: true,
    },
  });
};

/**
 * Check if current user has liked a blog
 */
export const getBlogLikeStatus = (blogId: number) => {
  return api.get(`/public/blogs/${blogId}/like/status`, {
    headers: {
      requiresAuth: true,
    },
  });
};

/**
 * Add a comment to a blog post
 */
export const addBlogComment = (blogId: number, data: {
  comment_text: string;
  commenter_name?: string;
  commenter_email?: string;
  parent_id?: number;
}) => {
  return api.post(`/public/blogs/${blogId}/comment`, data, {
    headers: {
      requiresAuth: true,  // Changed to true to send auth token
    },
  });
};

/**
 * Get all approved comments for a blog post
 */
export const getBlogComments = (blogId: number, skip?: number, limit?: number) => {
  return api.get(`/public/blogs/${blogId}/comments`, {
    params: {
      skip: skip ?? 0,
      limit: limit ?? 5,
    },
    headers: {
      requiresAuth: false,
    },
  });
};

/**
 * Record a blog share event
 */
export const recordBlogShare = (blogId: number, platform: string) => {
  return api.post(`/public/blogs/${blogId}/share`, {
    platform: platform,
  }, {
    headers: {
      requiresAuth: true,
    },
  });
};

/**
 * Get comprehensive engagement statistics for a blog
 */
export const getBlogEngagementStats = (blogId: number) => {
  return api.get(`/public/blogs/${blogId}/engagement`, {
    headers: {
      requiresAuth: false,
    },
  });
};
