'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { getMyBlogSubmissions } from '@/services/blogger';
import { Bell } from 'lucide-react';

const BloggerDashboard = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    fetchBlogs();
    fetchNotifications();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await getMyBlogSubmissions();
      if (response.status === 200) {
        const data = response.data;
        setBlogs(data.blogs || []);
      } else {
        toast.error('Failed to fetch your blogs');
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('An error occurred while fetching your blogs');
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      // Get the access token from cookies
      const Cookies = (await import('js-cookie')).default;
      const token = Cookies.get('access_token');
      
      // Fetch notifications from the notification API
      const response = await fetch('/api/notifications/user/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications || []);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blogger Dashboard</h1>
          <Link href="/blogger/write" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Write New Blog
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Total Blogs</h3>
            <p className="text-3xl font-bold text-emerald-600">{blogs.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Published</h3>
            <p className="text-3xl font-bold text-green-600">
              {blogs.filter(blog => blog.status === 'posted' || blog.status === 'approved').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Pending/Review</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {blogs.filter(blog => blog.status === 'pending' || blog.status === 'review').length}
            </p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Your Blog Posts</h2>
          </div>
          
          {loading ? (
            <div className="p-6 text-center">
              <p>Loading your blogs...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-500">You haven't written any blogs yet.</p>
              <Link href="/blogger/write" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Write Your First Blog
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {blogs.map((blog) => (
                <div key={blog.id} className="p-6 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{blog.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{blog.excerpt.substring(0, 100)}...</p>
                    <div className="mt-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        blog.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        blog.status === 'review' ? 'bg-blue-100 text-blue-800' :
                        blog.status === 'revision' ? 'bg-orange-100 text-orange-800' :
                        blog.status === 'approved' ? 'bg-green-100 text-green-800' :
                        blog.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        blog.status === 'posted' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {blog.status.toUpperCase().replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Link 
                      href={`/blogger/write?id=${blog.id}`} 
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </Link>
                    <Link 
                      href={`/blogger/blog/${blog.id}`} 
                      className="text-gray-600 hover:text-gray-900"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Notifications Section */}
      {notifications.length > 0 && (
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-emerald-600" />
              <h2 className="text-xl font-semibold text-gray-800">Recent Notifications</h2>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {notifications.slice(0, 5).map((notification) => (
              <div key={notification.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(notification.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BloggerDashboard;