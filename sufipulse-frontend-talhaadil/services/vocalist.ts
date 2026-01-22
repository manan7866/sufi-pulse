import api from "@/lib/axios";

export const vocalistSubmitKalam = (data: {
    vocal_range: string;
    languages: string[];
    sample_title: string;
    audio_sample_url: string;
    sample_description: string;
    experience_background: string;
    portfolio: string;
    availability: string;
  }) => {
    return api.post(`/vocalists/submit`, data, {
      headers: {
        requiresAuth: true,
      },
    });
  };
  
 // ✅ Get Vocalist Profile
export const getVocalistProfile = (vocalist_id: number) => {
  return api.get(`/vocalists/get/${vocalist_id}`, {
    headers: {
      requiresAuth: true,
    },
  });
};

// ✅ Check Vocalist Registration
export const checkVocalistRegistration = () => {
  return api.get(`/vocalists/is-registered`, {
    headers: {
      requiresAuth: true,
    },
  });
};

// ✅ Get Kalams By Vocalist
export const getKalamsByVocalist = () => {
  return api.get(`/vocalists/kalams`, {
    headers: {
      requiresAuth: true,
    },
  });
};

// ✅ Approve Or Reject Kalam
export const approveOrRejectKalam = (
  kalam_id: number,
  data: {
    status: string;   // e.g. "approved" | "rejected"
    comments?: string;
  }

) => {
  console.log(kalam_id,data)
  return api.post(`/vocalists/kalam/${kalam_id}/approval`, data, {
    headers: {
      requiresAuth: true,
    },
  });
};
