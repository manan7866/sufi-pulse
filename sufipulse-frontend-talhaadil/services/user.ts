import api from "@/lib/axios";


export const createBlog = (data: {
    title: string
    role: string
    city: string
    country: string
    category: string
    excerpt: string
    content: string
    tags: string[]
  }) => {
    return api.post(`/user/create-blog`, data, {
      headers: {
        requiresAuth: true,
      },
    })
  }
  

  export const getGuestBlogs = () => {
    return api.get(`/user/guest-blogs`, {
      headers: {
        requiresAuth: true,
      },
    })
  }
  