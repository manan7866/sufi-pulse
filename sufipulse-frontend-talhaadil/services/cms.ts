import api from "@/lib/axios";

// =========================
// Public APIs - Get Page Data
// =========================

export const getPageData = (pageSlug: string) => {
  return api.get(`/cms/page/${pageSlug}`);
};

export const getAllPages = () => {
  return api.get("/cms/pages");
};

// =========================
// Admin APIs - Page Management
// =========================

export const adminGetAllPages = () => {
  return api.get("/cms/admin/pages", {
    headers: {
      requiresAuth: true,
    },
  });
};

export const adminCreatePage = (pageData: any) => {
  return api.post("/cms/admin/pages", pageData, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const adminUpdatePage = (pageId: number, pageData: any) => {
  return api.put(`/cms/admin/pages/${pageId}`, pageData, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const adminDeletePage = (pageId: number) => {
  return api.delete(`/cms/admin/pages/${pageId}`, {
    headers: {
      requiresAuth: true,
    },
  });
};

// =========================
// Admin APIs - Stats Management
// =========================

export const adminGetPageStats = (pageId: number) => {
  return api.get(`/cms/admin/pages/${pageId}/stats`, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const adminGetStat = (statId: number) => {
  return api.get(`/cms/admin/stats/${statId}`, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const adminCreateStat = (pageId: number, statData: any) => {
  return api.post(`/cms/admin/pages/${pageId}/stats`, statData, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const adminUpdateStat = (statId: number, statData: any) => {
  return api.put(`/cms/admin/stats/${statId}`, statData, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const adminDeleteStat = (statId: number) => {
  return api.delete(`/cms/admin/stats/${statId}`, {
    headers: {
      requiresAuth: true,
    },
  });
};

// =========================
// Admin APIs - Values Management
// =========================

export const adminGetPageValues = (pageId: number) => {
  return api.get(`/cms/admin/pages/${pageId}/values`, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const adminCreateValue = (pageId: number, valueData: any) => {
  return api.post(`/cms/admin/pages/${pageId}/values`, valueData, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const adminUpdateValue = (valueId: number, valueData: any) => {
  return api.put(`/cms/admin/values/${valueId}`, valueData, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const adminDeleteValue = (valueId: number) => {
  return api.delete(`/cms/admin/values/${valueId}`, {
    headers: {
      requiresAuth: true,
    },
  });
};

// =========================
// Admin APIs - Team Management
// =========================

export const adminGetPageTeam = (pageId: number) => {
  return api.get(`/cms/admin/pages/${pageId}/team`, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const adminCreateTeamMember = (pageId: number, memberData: any) => {
  return api.post(`/cms/admin/pages/${pageId}/team`, memberData, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const adminUpdateTeamMember = (memberId: number, memberData: any) => {
  return api.put(`/cms/admin/team/${memberId}`, memberData, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const adminDeleteTeamMember = (memberId: number) => {
  return api.delete(`/cms/admin/team/${memberId}`, {
    headers: {
      requiresAuth: true,
    },
  });
};

// =========================
// Admin APIs - Timeline Management
// =========================

export const adminGetPageTimeline = (pageId: number) => {
  return api.get(`/cms/admin/pages/${pageId}/timeline`, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const adminCreateTimelineItem = (pageId: number, timelineData: any) => {
  return api.post(`/cms/admin/pages/${pageId}/timeline`, timelineData, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const adminUpdateTimelineItem = (timelineId: number, timelineData: any) => {
  return api.put(`/cms/admin/timeline/${timelineId}`, timelineData, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const adminDeleteTimelineItem = (timelineId: number) => {
  return api.delete(`/cms/admin/timeline/${timelineId}`, {
    headers: {
      requiresAuth: true,
    },
  });
};

// =========================
// Admin APIs - Testimonials Management
// =========================

export const adminGetPageTestimonials = (pageId: number) => {
  return api.get(`/cms/admin/pages/${pageId}/testimonials`, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const adminCreateTestimonial = (pageId: number, testimonialData: any) => {
  return api.post(`/cms/admin/pages/${pageId}/testimonials`, testimonialData, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const adminUpdateTestimonial = (testimonialId: number, testimonialData: any) => {
  return api.put(`/cms/admin/testimonials/${testimonialId}`, testimonialData, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const adminDeleteTestimonial = (testimonialId: number) => {
  return api.delete(`/cms/admin/testimonials/${testimonialId}`, {
    headers: {
      requiresAuth: true,
    },
  });
};

// =========================
// Admin APIs - Hubs Management
// =========================

export const adminGetPageHubs = (pageId: number) => {
  return api.get(`/cms/admin/pages/${pageId}/hubs`, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const adminCreateHub = (pageId: number, hubData: any) => {
  return api.post(`/cms/admin/pages/${pageId}/hubs`, hubData, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const adminUpdateHub = (hubId: number, hubData: any) => {
  return api.put(`/cms/admin/hubs/${hubId}`, hubData, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const adminDeleteHub = (hubId: number) => {
  return api.delete(`/cms/admin/hubs/${hubId}`, {
    headers: {
      requiresAuth: true,
    },
  });
};
