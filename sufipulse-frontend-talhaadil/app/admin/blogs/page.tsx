'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { getAllBlogSubmissions } from '@/services/admin';
import { approveOrRejectBlog } from '@/services/blogger';

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  language: string;
  user_id: number;
  user_name: string;
  user_email: string;
  status: string;
  admin_comments: string;
  editor_notes: string;
  scheduled_publish_date: string;
  seo_meta_title: string;
  seo_meta_description: string;
  created_at: string;
  updated_at: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<string>('');
  const [adminComment, setAdminComment] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const filtered = blogs.filter(blog =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.user_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBlogs(filtered);
  }, [searchQuery, blogs]);

  const fetchBlogs = async () => {
    try {
      const response = await getAllBlogSubmissions();
      if (response.status === 200) {
        const data = response.data;
        setBlogs(data.blogs || []);
        setFilteredBlogs(data.blogs || []);
      } else {
        toast.error('Failed to fetch blog submissions');
      }
    } catch (error) {
      console.error('Error fetching blog submissions:', error);
      toast.error('An error occurred while fetching blog submissions');
    } finally {
      setLoading(false);
    }
  };

  const handleSetStatus = (blog: Blog) => {
    setSelectedBlog(blog);
    setNewStatus(blog.status);
    setAdminComment('');
    setStatusModalOpen(true);
  };

  const submitStatusChange = async () => {
    if (!selectedBlog || !newStatus) return;

    try {
      const response = await approveOrRejectBlog(selectedBlog.id, {
        status: newStatus,
        admin_comments: adminComment
      });

      if (response.status === 200) {
        toast.success(`Blog status updated to ${newStatus}`);
        setStatusModalOpen(false);
        fetchBlogs();
      } else {
        const errorData = response.data;
        toast.error(errorData.message || 'Failed to update blog status');
      }
    } catch (error) {
      console.error('Error updating blog status:', error);
      toast.error('An error occurred while updating the blog status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'review':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'revision':
        return 'bg-orange-100 text-orange-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'posted':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-emerald-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading blog submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Blog Submissions</h1>
        <p className="text-slate-600 mt-2 text-sm sm:text-base">Manage all blog submissions from bloggers</p>
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by title, author, category, or status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-900 text-slate-800 placeholder-slate-400"
          />
          <div className="flex gap-2">
            <span className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
              Total: {blogs.length}
            </span>
            <span className="px-3 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-medium">
              Pending: {blogs.filter(b => b.status === 'submitted').length}
            </span>
          </div>
        </div>
      </div>

      {/* Blogs Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-sm border border-slate-200">
          <thead>
            <tr className="bg-slate-50 text-slate-800 text-sm sm:text-base">
              <th className="py-3 px-4 sm:px-6 text-left font-semibold">Title</th>
              <th className="py-3 px-4 sm:px-6 text-left font-semibold">Author</th>
              <th className="py-3 px-4 sm:px-6 text-left font-semibold">Category</th>
              <th className="py-3 px-4 sm:px-6 text-left font-semibold">Language</th>
              <th className="py-3 px-4 sm:px-6 text-left font-semibold">Status</th>
              <th className="py-3 px-4 sm:px-6 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-600">
                  {searchQuery ? "No blog submissions found matching your search" : "No blog submissions found"}
                </td>
              </tr>
            ) : (
              filteredBlogs.map((blog) => (
                <tr key={blog.id} className="border-t border-slate-200 hover:bg-slate-50">
                  <td className="py-3 px-4 sm:px-6">
                    <div className="text-sm font-medium text-slate-800">{blog.title}</div>
                    <div className="text-xs text-slate-500 mt-1">{blog.excerpt?.substring(0, 80)}...</div>
                  </td>
                  <td className="py-3 px-4 sm:px-6">
                    <div className="text-sm text-slate-800">{blog.user_name}</div>
                    <div className="text-xs text-slate-500">{blog.user_email}</div>
                  </td>
                  <td className="py-3 px-4 sm:px-6 text-sm text-slate-600">{blog.category || 'N/A'}</td>
                  <td className="py-3 px-4 sm:px-6 text-sm text-slate-600">{blog.language || 'N/A'}</td>
                  <td className="py-3 px-4 sm:px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(blog.status)}`}>
                      {blog.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 sm:px-6 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSetStatus(blog)}
                        className="text-indigo-900 hover:text-indigo-700 font-medium px-3 py-1 bg-indigo-50 hover:bg-indigo-100 rounded"
                      >
                        Set Status
                      </button>
                      <button
                        onClick={() => {
                          setSelectedBlog(blog);
                          setStatusModalOpen(true);
                        }}
                        className="text-slate-900 hover:text-slate-700 font-medium px-3 py-1 bg-slate-50 hover:bg-slate-100 rounded"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-6 text-sm text-slate-600">
        Showing {filteredBlogs.length} of {blogs.length} blog submissions
      </div>

      {/* Status Modal */}
      {statusModalOpen && selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-slate-900">
                  Set Blog Status: {selectedBlog.title}
                </h3>
                <button 
                  onClick={() => setStatusModalOpen(false)}
                  className="text-slate-400 hover:text-slate-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-slate-900 mb-2">Blog Details:</h4>
                <div className="text-sm text-slate-700">
                  <p><span className="font-medium">Author:</span> {selectedBlog.user_name}</p>
                  <p><span className="font-medium">Category:</span> {selectedBlog.category || 'N/A'}</p>
                  <p><span className="font-medium">Language:</span> {selectedBlog.language || 'N/A'}</p>
                  <p><span className="font-medium">Current Status:</span> <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedBlog.status)}`}>{selectedBlog.status}</span></p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-slate-900 mb-2">Content Preview:</h4>
                <div 
                  className="prose max-w-none border border-slate-200 p-4 rounded-md text-sm bg-slate-50"
                  dangerouslySetInnerHTML={{ __html: selectedBlog.content?.substring(0, 500) + '...' || '' }}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="newStatus" className="block text-sm font-medium text-slate-700 mb-2">
                  Set Status *
                </label>
                <select
                  id="newStatus"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                >
                  <option value="pending">Pending</option>
                  <option value="review">Under Review</option>
                  <option value="approved">Approved</option>
                  <option value="revision">Needs Revision</option>
                  <option value="rejected">Rejected</option>
                  <option value="posted">Posted</option>
                </select>
                <p className="text-xs text-slate-500 mt-1">Select the appropriate status for this blog submission</p>
              </div>

              <div className="mb-6">
                <label htmlFor="adminComment" className="block text-sm font-medium text-slate-700 mb-2">
                  Admin Comment (Optional)
                </label>
                <textarea
                  id="adminComment"
                  value={adminComment}
                  onChange={(e) => setAdminComment(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  placeholder="Add any comments or feedback for the blogger..."
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setStatusModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={submitStatusChange}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
