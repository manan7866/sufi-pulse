// services/blogger.ts
import api from "@/lib/axios";

export const submitBloggerProfile = (data: any) => {
  return api.post(`/bloggers/submit-profile`, data, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const getBloggerProfile = (userId: number) => {
  return api.get(`/bloggers/get/${userId}`, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const checkBloggerRegistration = () => {
  return api.get(`/bloggers/is-registered`, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const getMyBlogSubmissions = () => {
  return api.get(`/bloggers/my-blogs`, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const getBlogSubmissionById = (blogId: number) => {
  return api.get(`/bloggers/blog/${blogId}`, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const submitBlogPost = (data: any) => {
  return api.post(`/bloggers/submit-blog`, data, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const approveOrRejectBlog = (blogId: number, data: any) => {
  return api.post(`/bloggers/blog/${blogId}/approval`, data, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const updateBlogPost = (blogId: number, data: any) => {
  return api.put(`/bloggers/blog/${blogId}`, data, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const uploadBlogImage = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  return api.post(`/bloggers/upload-image`, formData, {
    headers: {
      requiresAuth: true,
      'Content-Type': 'multipart/form-data',
    },
  });
};