import api from "@/lib/axios";

export const getAllVocalists = () => {
  return api.get("/admin/vocalists", {
    headers: {
      requiresAuth: true,
    },
  });
};

export const getAllWriters = () => {
  return api.get("/admin/writers", {
    headers: {
      requiresAuth: true,
    },
  });
};

export const getAllBloggers = () => {
  return api.get("/admin/bloggers", {
    headers: {
      requiresAuth: true,
    },
  });
};

export const getKalamsByWriter = (userId: number) => {
  return api.get(`/admin/kalams/writer/${userId}`, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const getAllKalams = () => {
  return api.get("/admin/kalams", {
    headers: {
      requiresAuth: true,
    },
  });
};
export const getUser = (id: string) => {
  return api.get(`/admin/user/${id}`, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const postYoutubeLink = (
  kalamId: number,
  data: { youtube_link: string }
) => {
  return api.post(`/kalams/${kalamId}/post-youtube-link`, data, {
    headers: {
      requiresAuth: true,
    },
  });
};

export const updateSubmissionStatus = (
  kalamId: number,
  submissionId: number,
  data: { new_status: string; comments: string }
) => {
  return api.post(
    `/kalams/${kalamId}/submissions/${submissionId}/update-status`,
    data,
    {
      headers: {
        requiresAuth: true,
      },
    }
  );
};

export const assignVocalist = (
  kalamId: number,
  data: { vocalist_id: number }
) => {
  return api.post(`/kalams/${kalamId}/assign-vocalist`, data, {
    headers: {
      requiresAuth: true,
    },
  });
};


export const getAllPartnershipProposals = async () => {
    return api.get("/admin/parnterships", {
      headers: { requiresAuth: true },
    });
  };


  export const getAllBlogs = () => {
    return api.get("/admin/admin/all-blogs", {
      headers: {
        requiresAuth: true,
      },
    });
  };
  

  export const updateBlogStatus = (post_id: number, data: { status: string }) => {
    return api.put(`/admin/${post_id}/blog-status`, data, {
      headers: {
        requiresAuth: true,
      },
    });
  };

export const getAllBlogSubmissions = () => {
  return api.get("/admin/blog-submissions", {
    headers: {
      requiresAuth: true,
    },
  });
};
  



export const getAllWritersForPublic = async (skip = 0, limit = 10) => {
  return api.get("/public/writers", {
    params: { skip, limit },
  });
};
