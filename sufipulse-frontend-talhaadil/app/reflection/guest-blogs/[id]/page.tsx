'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import {
  ArrowLeft,
  Calendar,
  User,
  Globe,
  BookOpen,
  Share2,
  Heart,
  MessageCircle,
  Eye,
  Tag,
  Quote,
  Sparkles,
  Mail,
  Twitter,
  Facebook,
  Linkedin,
  PenTool,
  Clock,
  TrendingUp,
  Bookmark,
  ExternalLink,
} from 'lucide-react';
import { getBlogById, getApprovedBlogs } from '@/services/requests';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BlogPostDetailPage({ params }: PageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Predefined categories with colors
  const categoryColors: Record<string, string> = {
    'sufi poetry': 'from-pink-500 to-rose-500',
    'sufi vakh': 'from-purple-500 to-indigo-500',
    'sufi history': 'from-amber-500 to-orange-500',
    'sufi personalities': 'from-emerald-500 to-teal-500',
    'sufi inquiry': 'from-blue-500 to-cyan-500',
  };

  const categoryLabels: Record<string, string> = {
    'sufi poetry': 'Sufi Poetry',
    'sufi vakh': 'Sufi Vakh',
    'sufi history': 'Sufi History',
    'sufi personalities': 'Sufi Personalities',
    'sufi inquiry': 'Sufi Inquiry',
  };

  useEffect(() => {
    fetchBlogPost();
  }, [resolvedParams.id]);

  const fetchBlogPost = async () => {
    setLoading(true);
    try {
      console.log('Fetching blog with ID:', resolvedParams.id);
      const blogResponse = await getBlogById(parseInt(resolvedParams.id));
      console.log('Blog response:', blogResponse);
      const foundBlog = blogResponse.data;

      if (foundBlog) {
        setBlog(foundBlog);

        const allBlogsResponse = await getApprovedBlogs({
          skip: 0,
          limit: 100,
        });

        const related = allBlogsResponse.data.filter(
          (b: any) => b.id !== parseInt(resolvedParams.id) &&
          b.category?.toLowerCase() === foundBlog.category?.toLowerCase()
        ).slice(0, 3);
        setRelatedBlogs(related);
      } else {
        console.error('Blog not found in response');
        toast.error('Blog post not found');
        router.push('/reflection/guest-blogs');
      }
    } catch (error: any) {
      console.error('Error fetching blog post:', error);
      const errorMessage = error?.response?.status === 404
        ? 'Blog post not found (404)'
        : error?.message || 'Failed to load blog';
      toast.error(errorMessage);
      router.push('/reflection/guest-blogs');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    return categoryColors[category?.toLowerCase()] || 'from-slate-500 to-gray-500';
  };

  const getCategoryLabel = (category: string) => {
    return categoryLabels[category?.toLowerCase()] || category || 'General';
  };

  const handleShare = (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const text = encodeURIComponent(blog?.title || 'Check out this blog');

    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${text}`,
      email: `mailto:?subject=${text}&body=${encodeURIComponent(url)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank');
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-emerald-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-emerald-600 animate-pulse" />
          </div>
          <p className="text-slate-600 font-medium text-lg">Loading blog post...</p>
          <p className="text-slate-400 text-sm mt-2">Please wait</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-12 h-12 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Blog Post Not Found</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/reflection/guest-blogs"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Guest Blogs</span>
          </Link>
        </div>
      </div>
    );
  }

  const categoryColor = getCategoryColor(blog.category);
  const categoryLabel = getCategoryLabel(blog.category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-50">
      {/* Navigation Header */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            <Link
              href="/reflection/guest-blogs"
              className="inline-flex items-center space-x-2 text-slate-600 hover:text-emerald-600 transition-all duration-200 group"
            >
              <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-emerald-100 transition-colors duration-200">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <span className="font-semibold">Back to Guest Blogs</span>
            </Link>

            <div className="flex items-center space-x-2">
              <button
                onClick={toggleBookmark}
                className={`p-2.5 rounded-lg transition-all duration-200 ${
                  isBookmarked 
                    ? 'bg-emerald-100 text-emerald-600' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
                title="Bookmark"
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="p-2.5 text-slate-600 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-200"
                title="Share on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="p-2.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                title="Share on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="p-2.5 text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleShare('email')}
                className="p-2.5 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                title="Share via Email"
              >
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Featured Image */}
      <div className="relative">
        <div className="h-[400px] lg:h-[550px] overflow-hidden">
          {blog.featured_image_url ? (
            <img
              src={blog.featured_image_url}
              alt={blog.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1200';
              }}
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${categoryColor} flex items-center justify-center`}>
              <BookOpen className="w-40 h-40 text-white/30" />
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>

        {/* Category Badge */}
        <div className="absolute top-6 left-4 sm:left-8">
          <span className={`inline-flex items-center space-x-2 text-white font-semibold bg-gradient-to-r ${categoryColor} px-5 py-2.5 rounded-full shadow-xl`}>
            <Sparkles className="w-4 h-4" />
            <span>{categoryLabel}</span>
          </span>
        </div>

        {/* Title and Meta */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Author */}
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center ring-2 ring-white/30">
                  {blog.author_image_url ? (
                    <img
                      src={blog.author_image_url}
                      alt={blog.author_name || blog.blogger_name || 'Author'}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">
                    {blog.author_name || blog.blogger_name || 'Anonymous'}
                  </p>
                  <p className="text-xs text-white/70">Author</p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center space-x-2 text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-xl">
                <Calendar className="w-5 h-5" />
                <span className="font-medium text-sm">{formatDate(blog.created_at)}</span>
              </div>

              {/* Language */}
              <div className="flex items-center space-x-2 text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-xl">
                <Globe className="w-5 h-5" />
                <span className="font-medium text-sm">{blog.language || 'English'}</span>
              </div>

              {/* Read Time */}
              <div className="flex items-center space-x-2 text-white/90 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-xl">
                <Clock className="w-5 h-5" />
                <span className="font-medium text-sm">{Math.ceil((blog.content?.length || 0) / 1000)} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Excerpt */}
        {blog.excerpt && (
          <div className="mb-12">
            <div className="relative pl-8 border-l-4 border-emerald-500">
              <div className="absolute top-0 left-0 -translate-x-2">
                <Quote className="w-8 h-8 text-emerald-500/30" />
              </div>
              <p className="text-xl lg:text-2xl text-slate-700 leading-relaxed italic font-medium">
                {blog.excerpt}
              </p>
            </div>
          </div>
        )}

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mb-10 flex flex-wrap gap-2">
            {blog.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-slate-100 to-slate-50 text-slate-600 px-4 py-2 rounded-full text-sm font-medium hover:from-emerald-50 hover:to-emerald-50 hover:text-emerald-600 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
              >
                <Tag className="w-3.5 h-3.5" />
                <span>#{tag}</span>
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
          <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>
          <div className="prose prose-lg max-w-none">
            <div
              className="p-8 lg:p-12 prose-headings:text-slate-800 prose-headings:font-bold prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-800 prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-50/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-10 bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-8 border border-slate-100">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl">
                  <Eye className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{blog.views || 0}</p>
                  <p className="text-sm text-slate-500">Views</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-gradient-to-br from-rose-100 to-rose-50 rounded-xl">
                  <Heart className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">Like</p>
                  <p className="text-sm text-slate-500">Appreciate</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">Comment</p>
                  <p className="text-sm text-slate-500">Discuss</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-slate-600">
              <Share2 className="w-5 h-5" />
              <span className="font-medium">Share this article</span>
            </div>
          </div>
        </div>

        {/* Author Bio */}
        <div className="mt-10 bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-2xl shadow-lg shadow-emerald-100/50 p-8 border border-emerald-100">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center flex-shrink-0 ring-4 ring-white shadow-lg">
              {blog.author_image_url ? (
                <img
                  src={blog.author_image_url}
                  alt={blog.author_name || blog.blogger_name || 'Author'}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-white" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-xl font-bold text-slate-800">
                  About the Author
                </h3>
                <Sparkles className="w-5 h-5 text-emerald-500" />
              </div>
              <p className="text-emerald-700 font-semibold mb-3">
                {blog.author_name || blog.blogger_name || 'Anonymous'}
              </p>
              {blog.short_bio && (
                <p className="text-slate-600 leading-relaxed">
                  {blog.short_bio}
                </p>
              )}
              {!blog.short_bio && (
                <p className="text-slate-600 leading-relaxed italic">
                  A valued contributor to our Sufi community, sharing insights on spirituality, poetry, and culture.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-800">
                Related Articles
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <Link
                  key={relatedBlog.id}
                  href={`/reflection/guest-blogs/${relatedBlog.id}`}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 hover:border-emerald-200"
                >
                  <div className="h-44 overflow-hidden relative">
                    {relatedBlog.featured_image_url ? (
                      <img
                        src={relatedBlog.featured_image_url}
                        alt={relatedBlog.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${getCategoryColor(relatedBlog.category)} flex items-center justify-center`}>
                        <BookOpen className="w-16 h-16 text-white/50" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-5">
                    <span className={`text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(relatedBlog.category)} px-3 py-1.5 rounded-full mb-3 inline-block shadow-sm`}>
                      {getCategoryLabel(relatedBlog.category)}
                    </span>
                    <h3 className="font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors duration-200 text-lg">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2">
                      {relatedBlog.excerpt || relatedBlog.content?.substring(0, 100) + '...'}
                    </p>
                    <div className="mt-4 flex items-center space-x-2 text-emerald-600 font-medium text-sm">
                      <span>Read More</span>
                      <ExternalLink className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Link
            href="/reflection/guest-blogs"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transform hover:scale-105"
          >
            <BookOpen className="w-6 h-6" />
            <span>Explore More Guest Blogs</span>
          </Link>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Share Your Spiritual Insights
          </h2>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            Join our community of guest contributors and share your knowledge with seekers around the world.
          </p>
          <Link
            href="/contact?type=guest-blog"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-emerald-500/40"
          >
            <PenTool className="w-6 h-6" />
            <span>Submit Your Blog Post</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
