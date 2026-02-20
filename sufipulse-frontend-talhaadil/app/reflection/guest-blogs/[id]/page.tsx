'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
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
  Bookmark,
  ExternalLink,
  Send,
  Reply,
  Clock,
  PenTool,
  TrendingUp,
} from 'lucide-react';
import { 
  getBlogById, 
  getApprovedBlogs,
  recordBlogView,
  toggleBlogLike,
  getBlogLikeStatus,
  getBlogComments,
  addBlogComment,
  recordBlogShare 
} from '@/services/requests';

interface PageProps {
  params: Promise<{ id: string }>;
}

interface Comment {
  id: number;
  blog_id: number;
  user_id: number | null;
  commenter_name: string | null;
  commenter_email: string | null;
  comment_text: string;
  parent_id: number | null;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
  user_name: string | null;
  user_email: string | null;
  replies: Comment[];
}

export default function BlogPostDetailPage({ params }: PageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Engagement states
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentSkip, setCommentSkip] = useState(0);
  const [commentLimit] = useState(5);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [isLoadingMoreComments, setIsLoadingMoreComments] = useState(false);
  const [totalComments, setTotalComments] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [commenterName, setCommenterName] = useState('');
  const [commenterEmail, setCommenterEmail] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  // Load user info from cookies on mount
  useEffect(() => {
    const userName = Cookies.get('name');
    const userEmail = Cookies.get('email');
    const accessToken = Cookies.get('access_token');
    const userId = Cookies.get('user_id');
    
    console.log('Cookies on load:', { userName, userEmail, accessToken, userId });
    
    if (accessToken && (userName || userId)) {
      setIsLoggedIn(true);
      if (userName) setCommenterName(userName);
      if (userEmail) setCommenterEmail(userEmail);
    }
  }, []);

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
        setViews(foundBlog.view_count || 0);
        setLikes(foundBlog.like_count || 0);

        // Record view (will only count unique views)
        try {
          const viewResponse = await recordBlogView(parseInt(resolvedParams.id));
          if (viewResponse.data.is_unique_view) {
            setViews(viewResponse.data.views);
          }
        } catch (error) {
          console.error('Failed to record view:', error);
        }

        // Check if user already liked this blog
        try {
          const likeStatusResponse = await getBlogLikeStatus(parseInt(resolvedParams.id));
          setIsLiked(likeStatusResponse.data.liked);
        } catch (error) {
          console.error('Failed to get like status:', error);
        }

        // Fetch comments
        fetchComments(parseInt(resolvedParams.id));

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

  const fetchComments = async (blogId: number, append = false) => {
    try {
      if (!append) {
        setIsLoadingMoreComments(true);
      }
      const skip = append ? commentSkip : 0;
      const commentsResponse = await getBlogComments(blogId, skip, commentLimit);
      
      if (append) {
        setComments(prev => [...prev, ...(commentsResponse.data.comments || [])]);
      } else {
        setComments(commentsResponse.data.comments || []);
      }
      
      setTotalComments(commentsResponse.data.total_comments || 0);
      setHasMoreComments(commentsResponse.data.has_more ?? false);
      setCommentSkip(skip + commentLimit);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setIsLoadingMoreComments(false);
    }
  };

  const loadMoreComments = () => {
    if (!isLoadingMoreComments && hasMoreComments) {
      fetchComments(parseInt(resolvedParams.id), true);
    }
  };

  const handleLikeToggle = async () => {
    // Check if user is logged in
    const accessToken = Cookies.get('access_token');
    if (!accessToken) {
      toast.error('Please login to like blogs');
      setTimeout(() => {
        router.push('/login');
      }, 1000);
      return;
    }

    try {
      const response = await toggleBlogLike(parseInt(resolvedParams.id));
      setIsLiked(response.data.liked);
      setLikes(response.data.likes);

      if (response.data.liked) {
        toast.success('Blog liked!');
      } else {
        toast('Blog unliked', { icon: '👍' });
      }
    } catch (error: any) {
      console.error('Error toggling like:', error);
      toast.error('Failed to toggle like');
    }
  };

  const handleShare = async (platform: string) => {
    try {
      // Record the share in database
      await recordBlogShare(parseInt(resolvedParams.id), platform);
      
      const url = typeof window !== 'undefined' ? window.location.href : '';
      const text = encodeURIComponent(blog?.title || 'Check out this blog');

      const shareUrls: Record<string, string> = {
        whatsapp: `https://wa.me/?text=${text}%20${encodeURIComponent(url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      };

      if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank');
        toast.success(`Shared to ${platform}!`);
      }
    } catch (error: any) {
      console.error('Error sharing:', error);
      // Still open share even if recording fails
      const url = typeof window !== 'undefined' ? window.location.href : '';
      const text = encodeURIComponent(blog?.title || 'Check out this blog');
      
      if (platform === 'whatsapp') {
        window.open(`https://wa.me/?text=${text}%20${encodeURIComponent(url)}`, '_blank');
      } else if (platform === 'facebook') {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
      }
    }
  };

  const handleAddComment = async (parentId: number | null = null) => {
    // Check if user is logged in
    const accessToken = Cookies.get('access_token');
    if (!accessToken) {
      toast.error('Please login to comment');
      setTimeout(() => {
        router.push('/login');
      }, 1000);
      return;
    }

    const text = parentId ? replyText : commentText;

    if (!text.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    try {
      setIsSubmittingComment(true);

      // Only send comment_text and parent_id for authenticated users
      // The backend will get user info from the token
      const commentData: any = {
        comment_text: text,
      };

      if (parentId) {
        commentData.parent_id = parentId;
      }

      console.log('Sending comment data:', commentData);

      const response = await addBlogComment(parseInt(resolvedParams.id), commentData);

      console.log('Comment response:', response);

      // Refresh comments
      await fetchComments(parseInt(resolvedParams.id));

      // Clear form
      setCommentText('');
      setReplyText('');
      setReplyingTo(null);

      toast.success(parentId ? 'Reply added!' : 'Comment added!');
    } catch (error: any) {
      console.error('Error adding comment:', error);
      const errorMessage = error?.response?.data?.detail || error?.message || 'Failed to add comment';
      toast.error(errorMessage);
    } finally {
      setIsSubmittingComment(false);
      setIsSubmittingReply(false);
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

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  const renderComment = (comment: Comment, isReply = false) => {
    const authorName = comment.user_name || comment.commenter_name || 'Anonymous';
    const isCommentAuthor = comment.commenter_email === 'test@example.com'; // You can add auth check here

    return (
      <div key={comment.id} className={`${isReply ? 'ml-8 mt-4' : ''}`}>
        <div className={`bg-gradient-to-br ${isReply ? 'from-slate-50 to-gray-50' : 'from-white to-slate-50'} rounded-2xl p-6 border ${isReply ? 'border-slate-200' : 'border-slate-100'} shadow-sm hover:shadow-md transition-all duration-300`}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${isReply ? 'from-slate-400 to-slate-500' : 'from-emerald-400 to-emerald-600'} flex items-center justify-center ring-2 ring-white shadow-md`}>
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-slate-800">{authorName}</p>
                <p className="text-xs text-slate-500">{formatDate(comment.created_at)}</p>
              </div>
            </div>
          </div>
          
          <p className="text-slate-700 leading-relaxed mb-4">{comment.comment_text}</p>
          
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <button
                onClick={() => setReplyingTo(comment.id)}
                className="inline-flex items-center space-x-1.5 text-sm text-slate-600 hover:text-emerald-600 transition-colors duration-200"
              >
                <Reply className="w-4 h-4" />
                <span>Reply</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  toast.error('Please login to reply');
                  router.push('/login');
                }}
                className="inline-flex items-center space-x-1.5 text-sm text-slate-600 hover:text-emerald-600 transition-colors duration-200"
              >
                <Reply className="w-4 h-4" />
                <span>Reply</span>
              </button>
            )}
          </div>

          {replyingTo === comment.id && isLoggedIn && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write your reply..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 resize-none text-slate-700 placeholder-slate-400"
              />
              <div className="flex items-center space-x-3 mt-3">
                <button
                  onClick={() => handleAddComment(comment.id)}
                  disabled={isSubmittingReply}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmittingReply ? 'Posting...' : 'Post Reply'}</span>
                </button>
                <button
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyText('');
                  }}
                  className="text-slate-600 hover:text-slate-800 font-medium px-4 py-2.5 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Render replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4">
            {comment.replies.map((reply) => renderComment(reply, true))}
          </div>
        )}
      </div>
    );
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
      <div className="sticky top-0  bg-white/90 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
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
            <div className={`w-full h-full bg-gradient-to-br bg-green-400 flex items-center justify-center`}>
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
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-100">
          <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>
          <div className="prose prose-lg max-w-none">
            <div
              className="p-8 lg:p-12 prose-headings:text-slate-800 prose-headings:font-bold prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-800 prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-50/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </div>

        {/* Engagement Stats Bar - UPDATED WITH WHATSAPP & FACEBOOK SHARE */}
        <div className="mt-10 bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center space-x-4 sm:space-x-6">
              {/* Views */}
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-xl">
                  <Eye className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{views}</p>
                  <p className="text-sm text-slate-500">Views</p>
                </div>
              </div>

              {/* Like Button */}
              <button
                onClick={handleLikeToggle}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  isLiked
                    ? 'bg-gradient-to-br from-rose-100 to-rose-50 text-rose-600'
                    : 'bg-gradient-to-br from-slate-100 to-slate-50 text-slate-600 hover:from-rose-50 hover:to-rose-50'
                }`}
                title={!isLoggedIn ? 'Login to like' : undefined}
              >
                <div className={`p-2.5 rounded-xl ${isLiked ? 'bg-rose-200' : 'bg-slate-200'}`}>
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold">{likes}</p>
                  <p className="text-sm">Likes</p>
                </div>
                {!isLoggedIn && (
                  <div className="hidden lg:flex items-center space-x-1 ml-2 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
                    <User className="w-3 h-3" />
                    <span>Login to like</span>
                  </div>
                )}
              </button>

              {/* Comment Count */}
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{comments.length}</p>
                  <p className="text-sm text-slate-500">Comments</p>
                </div>
              </div>
            </div>

            {/* Share Buttons - WhatsApp & Facebook Only */}
            <div className="flex items-center space-x-3">
              <span className="text-slate-600 font-medium mr-2 hidden sm:inline">Share:</span>
              <button
                onClick={() => handleShare('whatsapp')}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-green-500/30"
                title="Share on WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
                </svg>
                <span className="hidden sm:inline">WhatsApp</span>
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-blue-500/30"
                title="Share on Facebook"
              >
                <Facebook className="w-5 h-5" />
                <span className="hidden sm:inline">Facebook</span>
              </button>
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

        {/* Comments Section */}
        <div className="mt-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-800">
              Comments ({comments.length})
            </h2>
          </div>

          {/* Add Comment Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-slate-100 mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Leave a Comment</h3>

            <div className="space-y-4">
              {/* Show user info for logged-in users */}
              {isLoggedIn ? (
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center ring-2 ring-emerald-300">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{commenterName || 'Registered User'}</p>
                      {/* <p className="text-sm text-slate-600">{commenterEmail || 'Email hidden'}</p> */}
                    </div>
                  </div>
                  <p className="text-xs text-emerald-700">
                    ✓ Logged in - Your name and email are automatically attached to comments
                  </p>
                </div>
              ) : (
                /* Login prompt for non-authenticated users */
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-amber-200">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-2">
                    Login to Comment
                  </h4>
                  <p className="text-slate-600 mb-6 text-sm">
                    Create an account or login to share your thoughts on this blog
                  </p>
                  <div className="flex items-center justify-center space-x-3">
                    <Link
                      href="/login"
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
                    >
                      <span>Login</span>
                    </Link>
                    <Link
                      href="/register"
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
                    >
                      <span>Register</span>
                    </Link>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Comment *
                </label>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder={isLoggedIn ? "Share your thoughts..." : "Login to comment"}
                  rows={5}
                  disabled={!isLoggedIn}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 resize-none text-slate-700 placeholder-slate-400 ${
                    isLoggedIn
                      ? 'border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                      : 'border-slate-100 bg-slate-50 cursor-not-allowed'
                  }`}
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  Be respectful and constructive in your comments
                </p>
                {isLoggedIn && (
                  <button
                    onClick={() => handleAddComment(null)}
                    disabled={isSubmittingComment || !commentText.trim()}
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                  >
                    <Send className="w-5 h-5" />
                    <span>{isSubmittingComment ? 'Posting...' : 'Post Comment'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.length > 0 ? (
              <>
                {comments.map((comment) => renderComment(comment))}
                
                {/* Load More Button */}
                {hasMoreComments && (
                  <div className="text-center pt-6">
                    <button
                      onClick={loadMoreComments}
                      disabled={isLoadingMoreComments}
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-slate-100 to-slate-50 hover:from-emerald-50 hover:to-emerald-50 text-slate-700 hover:text-emerald-700 px-8 py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-200 hover:border-emerald-200"
                    >
                      {isLoadingMoreComments ? (
                        <>
                          <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                          <span>Loading...</span>
                        </>
                      ) : (
                        <>
                          <span>Load More Comments</span>
                          <span className="text-sm text-slate-500">
                            ({comments.length} of {totalComments})
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-10 h-10 text-slate-400" />
                </div>
                <p className="text-slate-600 font-medium text-lg">No comments yet</p>
                <p className="text-slate-400 text-sm mt-1">Be the first to share your thoughts!</p>
              </div>
            )}
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
