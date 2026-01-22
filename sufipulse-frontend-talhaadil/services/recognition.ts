import api from "@/lib/axios";


export const getAllSpecialRecognitions = () => {
  return api.get(`/public/special-recognitions/all`, {
    headers: {
      requiresAuth: false,
    },
  });
};

// Delete a special recognition
export const deleteSpecialRecognition = (recognition_id: number) => {
  return api.delete(`/admin/special-recognitions/${recognition_id}`, {
    headers: {
      requiresAuth: true,
    },
  });
};

// Create a new special recognition
export const createSpecialRecognition = (data: {
  title: string;
  subtitle: string;
  description: string;
  achievement: string;
}) => {
  return api.post(`/admin/special-recognitions`, data, {
    headers: {
      requiresAuth: true,
    },
  });
};
