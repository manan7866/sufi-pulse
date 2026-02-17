'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { getBlogSubmissionById } from '@/services/blogger';
import {
  ArrowLeft,
  Calendar,
  User,
  Globe,
  BookOpen,
  Tag,
  Edit,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
} from 'lucide-react';

const BlogView = () => {
  const router = useRouter();
  const params = useParams();
  const blogId = params.id as string;
  
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  const fetchBlog = async () => {
    try {
      const response = await getBlogSubmissionById(Number(blogId));
      if (response.status === 200) {
        setBlog(response.data);
      } else {
        toast.error('Failed to load blog details');
        router.push('/blogger/dashboard');
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      toast.error('An error occurred while loading the blog');
      router.push('/blogger/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { color: string; icon: any; label: string }> = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pending Review' },
      review: { color: 'bg-blue-100 text-blue-800', icon: AlertCircle, label: 'Under Review' },
      revision: { color: 'bg-orange-100 text-orange-800', icon: Edit, label: 'Revision Requested' },
      approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Approved' },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Rejected' },
      posted: { color: 'bg-emerald-100 text-emerald-800', icon: CheckCircle, label: 'Published' },
    };

    const badge = badges[status] || { color: 'bg-gray-100 text-gray-800', icon: Clock, label: status };
    const Icon = badge.icon;

    return (
      <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${badge.color}`}>
        <Icon className="w-4 h-4" />
        <span>{badge.label}</span>
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading blog details...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Blog Post Not Found</h2>
          <p className="text-slate-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link
            href="/blogger/dashboard"
            className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/blogger/dashboard"
              className="inline-flex items-center space-x-2 text-slate-600 hover:text-emerald-600 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Dashboard</span>
            </Link>
            <Link
              href={`/blogger/write?id=${blog.id}`}
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Blog</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Featured Image */}
          {blog.featured_image_url && (
            <div className="h-64 sm:h-80 lg:h-96 overflow-hidden">
              <img
                src={blog.featured_image_url}
                alt={blog.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1200';
                }}
              />
            </div>
          )}

          <div className="p-6 sm:p-8 lg:p-10">
            {/* Status Badge */}
            <div className="mb-6">
              {getStatusBadge(blog.status)}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6">
              {blog.title}
            </h1>

            {/* Meta Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 pb-8 border-b border-slate-200">
              <div className="flex items-center space-x-3 text-slate-600">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-xs text-slate-500">Created</p>
                  <p className="font-medium">{formatDate(blog.created_at)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-slate-600">
                <Globe className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-xs text-slate-500">Language</p>
                  <p className="font-medium">{blog.language}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-slate-600">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-xs text-slate-500">Category</p>
                  <p className="font-medium">{blog.category}</p>
                </div>
              </div>
              {blog.scheduled_publish_date && (
                <div className="flex items-center space-x-3 text-slate-600">
                  <Clock className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="text-xs text-slate-500">Scheduled Publish</p>
                    <p className="font-medium">{formatDate(blog.scheduled_publish_date)}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Excerpt */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-3">Excerpt / Abstract</h2>
              <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg">
                {blog.excerpt}
              </p>
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-slate-800 mb-3 flex items-center space-x-2">
                  <Tag className="w-5 h-5 text-emerald-600" />
                  <span>Tags</span>
                </h2>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-3">Full Content</h2>
              <div
                className="prose prose-lg max-w-none bg-slate-50 p-6 rounded-lg"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>

            {/* Editor Notes */}
            {blog.editor_notes && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-slate-800 mb-3">Editor Notes</h2>
                <p className="text-slate-600 bg-amber-50 p-4 rounded-lg border border-amber-200">
                  {blog.editor_notes}
                </p>
              </div>
            )}

            {/* Admin Comments */}
            {blog.admin_comments && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-slate-800 mb-3">Admin Comments</h2>
                <p className="text-slate-600 bg-blue-50 p-4 rounded-lg border border-blue-200">
                  {blog.admin_comments}
                </p>
              </div>
            )}

            {/* SEO Information */}
            {(blog.seo_meta_title || blog.seo_meta_description) && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-slate-800 mb-3">SEO Information</h2>
                <div className="bg-slate-50 p-4 rounded-lg space-y-3">
                  {blog.seo_meta_title && (
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Meta Title</p>
                      <p className="text-slate-700 font-medium">{blog.seo_meta_title}</p>
                    </div>
                  )}
                  {blog.seo_meta_description && (
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Meta Description</p>
                      <p className="text-slate-700">{blog.seo_meta_description}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200">
              <Link
                href={`/blogger/write?id=${blog.id}`}
                className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex-1"
              >
                <Edit className="w-4 h-4" />
                <span>Edit This Blog</span>
              </Link>
              {blog.status === 'approved' || blog.status === 'posted' ? (
                <Link
                  href={`/reflection/guest-blogs/${blog.id}`}
                  className="inline-flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex-1"
                >
                  <Globe className="w-4 h-4" />
                  <span>View on Website</span>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogView;
