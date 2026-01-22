import api from "@/lib/axios";

export const createNotification = (data: {
    title: string
    message: string
    target_type: string
    target_user_ids: number[]
  }) => {
    return api.post(`/notifications/`, data, {
      headers: {
        requiresAuth: true,
      },
    })
  }
  

  export const getUserNotifications = () => {
    return api.get("/notifications/user/", {
      headers: {
        requiresAuth: true,
      },
    })
  }
  

  export const markNotificationAsRead = (
    notificationId: number,
    userId: number
  ) => {
    return api.post(`/notifications/${notificationId}/read/${userId}`, null, {
      headers: {
        requiresAuth: true,
      },
    })
  }
  