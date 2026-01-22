"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getGuestBlogs } from "@/services/user"

// Define the expected structure of a guest blog
interface GuestBlog {
  id: number
  title: string
  author: string
  email: string
  category: string
  status: string
  created_at: string
  updated_at: string
  content: string
  excerpt: string
}

export default function GuestBlogsPage() {
  const [blogs, setBlogs] = useState<GuestBlog[]>([])
  const [filteredBlogs, setFilteredBlogs] = useState<GuestBlog[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedRows, setExpandedRows] = useState<number[]>([])
  const router = useRouter()

  // Fetch guest blogs on mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        console.log("[GuestBlogs] Fetching guest blogs...")
        const response = await getGuestBlogs()
        console.log("[GuestBlogs] Response:", response.data)
        setBlogs(Array.isArray(response.data) ? response.data : [])
        setFilteredBlogs(Array.isArray(response.data) ? response.data : [])
      } catch (error) {
        console.error("[GuestBlogs] Error fetching blogs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  // Filter blogs based on search query
  useEffect(() => {
    const filtered = blogs.filter(blog =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredBlogs(filtered)
  }, [searchQuery, blogs])

  // Toggle expanded row
  const toggleRow = (id: number) => {
    setExpandedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    )
  }

  // Determine status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "published":
        return "bg-emerald-100 text-emerald-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "draft":
        return "bg-blue-100 text-blue-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  // Handle navigation to blog post page
  const handlePostBlog = () => {
    router.push("/vocalist/Blogpost")
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-emerald-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading Guest Blogs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Guest Blogs</h1>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">Manage all guest blog submissions</p>
          </div>
          <button
            onClick={handlePostBlog}
            className="bg-emerald-900 text-white px-4 py-2 rounded-md hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-900 transition duration-200"
          >
            Post Blog
          </button>
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search by title, author, email, category, or status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-900 text-slate-800 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Blogs Table */}
      <div className="space-y-4">
        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg shadow-sm border border-slate-200"
          >
            <div
              className="flex items-center justify-between p-4 sm:p-6 cursor-pointer hover:bg-slate-50"
              onClick={() => toggleRow(blog.id)}
            >
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-slate-600">Title</p>
                  <p className="text-sm sm:text-base text-slate-800 font-medium">{blog.title}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600">Author</p>
                  <p className="text-sm sm:text-base text-slate-800">{blog.author}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600">Category</p>
                  <p className="text-sm sm:text-base text-slate-800">{blog.category}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600">Status</p>
                  <span className={`text-sm sm:text-base px-2 py-1 rounded ${getStatusColor(blog.status)}`}>
                    {blog.status}
                  </span>
                </div>
              </div>
              <div>
                <button
                  className="text-emerald-900 hover:text-emerald-700 focus:outline-none"
                  onClick={() => toggleRow(blog.id)}
                >
                  {expandedRows.includes(blog.id) ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            {expandedRows.includes(blog.id) && (
              <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-600 font-medium">Author Details</p>
                      <p className="text-slate-800">
                        <strong>Author:</strong> {blog.author}
                      </p>
                      
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 font-medium">Blog Details</p>
                      <p className="text-slate-800">
                        <strong>Title:</strong> {blog.title}
                      </p>
                      <p className="text-slate-800">
                        <strong>Category:</strong> {blog.category}
                      </p>
                      <p className="text-slate-800">
                        <strong>Status:</strong> {blog.status}
                      </p>
                      <p className="text-slate-800">
                        <strong>Excerpt:</strong> {blog.excerpt || "No excerpt provided"}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-600 font-medium">Content</p>
                      <p className="text-slate-800">
                        {blog.content.length > 200
                          ? `${blog.content.substring(0, 200)}...`
                          : blog.content || "No content provided"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 font-medium">Timestamps</p>
                      <p className="text-slate-800">
                        <strong>Created:</strong> {blog.date}
                      </p>
                     
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-800 text-lg">No guest blogs found</div>
        </div>
      )}
    </div>
  )
}