'use client'
import React, { useState, useEffect } from 'react';
import { getAllBlogs, updateBlogStatus } from '@/services/admin';

interface Blog {
  id: number;
  user_id: number;
  title: string;
  role: string;
  city: string;
  country: string;
  date: string;
  category: string;
  excerpt: string;
  content: string;
  tags: string[];
  status: string;
  author: string;
}

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        console.log("[v0] Fetching blogs...");
        const response = await getAllBlogs();
        console.log("[v0] Blogs response:", response.data);
        setBlogs(Array.isArray(response.data) ? response.data : []);
        setFilteredBlogs(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("[v0] Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const filtered = blogs.filter(blog =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredBlogs(filtered);
  }, [searchQuery, blogs]);

  const toggleRow = (id: number) => {
    setExpandedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const handleStatusUpdate = async (post_id: number, status: string) => {
    try {
      await updateBlogStatus(post_id, { status });
      setBlogs(blogs.map(blog =>
        blog.id === post_id ? { ...blog, status } : blog
      ));
      setFilteredBlogs(filteredBlogs.map(blog =>
        blog.id === post_id ? { ...blog, status } : blog
      ));
      alert(`Post status updated to ${status}`);
    } catch (err) {
      alert('Failed to update post status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-emerald-100 text-emerald-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-emerald-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading Blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Admin Blog Dashboard</h1>
        <p className="text-slate-600 mt-2 text-sm sm:text-base">Manage all blog posts</p>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search by title, author, location, category, content, or tags..."
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
                  <p className={`text-sm sm:text-base font-medium ${getStatusColor(blog.status)} px-2 py-1 rounded`}>
                    {blog.status}
                  </p>
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
                      <p className="text-xs text-slate-600 font-medium">Blog Information</p>
                      <p className="text-slate-800">
                        <strong>Title:</strong> {blog.title}
                      </p>
                      <p className="text-slate-800">
                        <strong>Author:</strong> {blog.author}
                      </p>
                      <p className="text-slate-800">
                        <strong>Location:</strong> {blog.city && blog.country ? `${blog.city}, ${blog.country}` : "Not specified"}
                      </p>
                      <p className="text-slate-800">
                        <strong>Date:</strong> {blog.date}
                      </p>
                      <p className="text-slate-800">
                        <strong>Category:</strong> {blog.category}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 font-medium">Content Details</p>
                      <p className="text-slate-800">
                        <strong>Content:</strong> {blog.content || "Not specified"}
                      </p>
                      <p className="text-slate-800">
                        <strong>Tags:</strong> {blog.tags.join(', ') || "Not specified"}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-600 font-medium">Status</p>
                      <p className={`text-slate-800 ${getStatusColor(blog.status)} px-2 py-1 rounded inline-block`}>
                        <strong>Status:</strong> {blog.status}
                      </p>
                    </div>
                    {blog.status.toLowerCase() === 'pending' && (
                      <div>
                        <p className="text-xs text-slate-600 font-medium">Actions</p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleStatusUpdate(blog.id, 'approved')}
                            className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(blog.id, 'rejected')}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    )}
                    
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-800 text-lg">No blog posts found</div>
        </div>
      )}
    </div>
  );
}