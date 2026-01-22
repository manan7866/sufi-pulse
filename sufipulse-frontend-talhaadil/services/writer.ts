import api from "@/lib/axios";

export const getKalamsByWriter = () => {
  return api.get(`/kalams/writer/my-kalams`, {
    headers: {
      requiresAuth: true,
    },
  });
};


export const getKalamDetails = (kalamId: string) => {
  return api.get(`/kalams/${kalamId}`, {
    headers: {
      requiresAuth: true,
    },
  });
}





// ✅ Writer Response for Kalam Submission
export const getWriterResponse = (
  id: number,
  sub_id: number,
  data: {
    user_approval_status: string; // e.g. "approved" | "rejected" | "pending"
    writer_comments: string;
  }
) => {
  return api.post(`/kalams/${id}/submissions/${sub_id}/writer-response`, data, {
    headers: {
      requiresAuth: true,
    },
  });
};


// ✅ Create Kalam
export const createKalam = (data: {
  title: string;
  language: string;
  theme: string;
  kalam_text: string;
  description: string;
  sufi_influence: string;
  musical_preference: string;
  writer_comments: string;
}) => {
  return api.post(`/kalams/`, data, {
    headers: {
      requiresAuth: true,
    },
  });
};

// ✅ Update Kalam
export const updateKalam = (
  id: number,
  data: {
    title: string;
    language: string;
    theme: string;
    kalam_text: string;
    description: string;
    sufi_influence: string;
    musical_preference: string;
  }
) => {
  return api.put(`/kalams/${id}`, data, {
    headers: {
      requiresAuth: true,
    },
  });
};


export const submitWriterProfile = (data: {
  writing_styles: string[];
  languages: string[];
  sample_title: string;
  experience_background: string;
  portfolio: string;
  availability: string;
}) => {
  return api.post(`/writers/submit`, data, {
    headers: {
      requiresAuth: true,
    },
  });
};
 

export const checkWriterRegistration = () => {
  return api.get(`/writers/is-registered`, {
    headers: {
      requiresAuth: true,
    },
  });
};


export const getWriterProfile = (writer_id: number) => {
  return api.get(`/writers/get/${writer_id}`, {
    headers: {
      requiresAuth: true,
    },
  });
};
