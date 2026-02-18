'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';
import {
  Users,
  Calendar,
  User,
  Clock,
  Heart,
  Globe,
  BookOpen,
  Star,
  ArrowRight,
  Eye,
  MessageCircle,
  Share2,
  Filter,
  Search,
  Award,
  PenTool,
  Mic,
  Image as ImageIcon,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { getApprovedBlogs } from '@/services/requests';
import { incrementMonthly, incrementWeekly } from '@/lib/increment';
import { useCMSPage } from '@/hooks/useCMSPage';
import { aboutPageFallbackData } from '@/lib/cmsFallbackData';

// Predefined list of possible categories from the API (matching blogger categories)
const possibleCategories = [
  { id: 'sufi poetry', label: 'Sufi Poetry', color: 'from-pink-500 to-rose-500' },
  { id: 'sufi vakh', label: 'Sufi Vakh', color: 'from-purple-500 to-indigo-500' },
  { id: 'sufi history', label: 'Sufi History', color: 'from-amber-500 to-orange-500' },
  { id: 'sufi personalities', label: 'Sufi Personalities', color: 'from-emerald-500 to-teal-500' },
  { id: 'sufi inquiry', label: 'Sufi Inquiry', color: 'from-blue-500 to-cyan-500' },
];

const GuestBlogs = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit] = useState(6);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // State for dynamic categories
  const [categories, setCategories] = useState([
    { id: 'all', label: 'All Posts', count: 0 },
    ...possibleCategories.map((cat) => ({ ...cat, count: 0 })),
  ]);

// These  fields data comming from database cms
const { data: cmsData } = useCMSPage({
  pageSlug: 'guest-blogs',
  fallbackData: aboutPageFallbackData,
  enabled: true
});
const pageData = cmsData || aboutPageFallbackData;

const stats =  (pageData.stats && pageData.stats.length > 0)
? pageData.stats.map((stat: any) => ({
    number: stat.stat_number,
    label: stat.stat_label,
    icon: (() => {
      switch (stat.stat_icon) {
        case 'Users':
          return Users;
        case 'Calendar':
          return Calendar;
        case 'User':
          return User;
        case 'Clock':
          return Clock;
        case 'Heart':
          return Heart;
        case 'Globe':
          return Globe;
        case 'BookOpen':
          return BookOpen;
        case 'Star':
          return Star;
        case 'ArrowRight':
          return ArrowRight;
        case 'Eye':
          return Eye;
        case 'MessageCircle':
          return MessageCircle;
        case 'Share2':
          return Share2;
        case 'Filter':
          return Filter;
        case 'Search':
          return Search;
        case 'Award':
          return Award;
        case 'PenTool':
          return PenTool;
        case 'Mic':
          return Mic;
        case 'ImageIcon':
          return ImageIcon;
        default:
          return Users; // Default icon if none matches
      }
    })(),
  }))
: [
    { number: `${incrementWeekly(15)}`, label: 'Guest Contributors', icon: Users },
    { number: `${incrementWeekly(25)}`, label: 'Published Articles', icon: BookOpen },
    { number: `${incrementMonthly(12, 200)}`, label: 'Countries Represented', icon: Globe },
    { number: '100%', label: 'Free Service', icon: Award },
  ];

  // Function to calculate dynamic category counts
  const calculateCategoryCounts = (posts) => {
    const counts = {
      all: posts.length,
      'sufi poetry': 0,
      'sufi vakh': 0,
      'sufi history': 0,
      'sufi personalities': 0,
      'sufi inquiry': 0,
    };

    posts.forEach((post) => {
      const category = post.category ? post.category.toLowerCase() : '';
      if (counts.hasOwnProperty(category)) {
        counts[category]++;
      }
    });

    return [
      { id: 'all', label: 'All Posts', count: counts.all },
      ...possibleCategories.map((cat) => ({
        ...cat,
        count: counts[cat.id] || 0,
      })),
    ];
  };

  // Format date nicely
  const formatDate = (dateString: string) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    const cat = possibleCategories.find(
      (c) => c.id === category?.toLowerCase()
    );
    return cat?.color || 'from-slate-500 to-gray-500';
  };

  // Get category label
  const getCategoryLabel = (category: string) => {
    const cat = possibleCategories.find(
      (c) => c.id === category?.toLowerCase()
    );
    return cat?.label || category || 'General';
  };

  // Function to fetch posts from the API
  const fetchPosts = async (reset = false) => {
    setLoading(true);
    try {
      const categoryParam = activeFilter === 'all' ? undefined : activeFilter;
      const response = await getApprovedBlogs({
        skip: reset ? 0 : skip,
        limit,
        category: categoryParam,
        search: searchTerm || undefined,
      });
      const newPosts = response.data;
      setPosts((prev) => (reset ? newPosts : [...prev, ...newPosts]));
      setSkip((prev) => (reset ? limit : prev + limit));
      setHasMore(newPosts.length === limit);
      setCategories(calculateCategoryCounts(reset ? newPosts : [...posts, ...newPosts]));
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial posts on component mount
  useEffect(() => {
    fetchPosts(true);
  }, []);

  // Refetch when filter changes
  useEffect(() => {
    setSkip(0);
    setPosts([]);
    fetchPosts(true);
  }, [activeFilter]);

  // Refetch when search term changes (debounced)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setSkip(0);
      setPosts([]);
      fetchPosts(true);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // filteredPosts is just posts since filtering is done on backend
  const filteredPosts = posts;

  // Handle Load More button click
  const handleLoadMore = () => {
    fetchPosts();
  };

  // Handle guest post submission button click
  const handleGuestPostSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Check if user is logged in and is a blogger
    const userRole = Cookies.get('user_role');
    const isLoggedIn = Cookies.get('access_token');
    
    console.log('Submit Guest Post clicked:', { userRole, isLoggedIn });
    
    if (!isLoggedIn) {
      toast.error('Please log in first to submit a guest post');
      router.push('/login');
      return;
    }
    
    // Check if user role is exactly 'blogger'
    if (userRole !== 'blogger') {
      toast.error(`Only registered bloggers can submit guest posts. Your current role is: ${userRole || 'none'}. Please sign up as a blogger first.`);
      // router.push('/blogger/profile');
      alert('Only registered bloggers can submit guest posts. Please sign up as a blogger first.');

      return;
    }
    
    // User is a blogger, redirect to write page
    router.push('/blogger/write');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-6 lg:space-y-8">
              <div className="space-y-4 lg:space-y-6">
                <div className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-500/30">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-300">Community Voices</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  Guest
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                    Blogs
                  </span>
                </h1>
                
                <p className="text-lg lg:text-xl text-slate-300 leading-relaxed max-w-xl">
                  Discover profound insights on Sufi poetry, spirituality, culture, and music from our global community of scholars, artists, and practitioners.
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20">
                <p className="text-emerald-300 font-medium mb-3 text-base">Community Wisdom</p>
                <blockquote className="text-base lg:text-lg italic text-slate-200 leading-relaxed">
                  &ldquo;Every guest voice adds a new dimension to our understanding of the sacred&rdquo;
                </blockquote>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleGuestPostSubmit}
                  className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25 text-base"
                >
                  <PenTool className="w-5 h-5" />
                  <span>Submit Guest Post</span>
                </button>
                <Link
                  href="/writers"
                  className="inline-flex items-center justify-center space-x-2 bg-slate-700/50 hover:bg-slate-600/50 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm border border-slate-600 text-base"
                >
                  <Users className="w-5 h-5" />
                  <span>Meet Our Writers</span>
                </Link>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-3xl blur-2xl transform rotate-6"></div>
                <div className="relative aspect-video bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
                  <img
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="Guest Blogs"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <Globe className="w-5 h-5 text-emerald-400" />
                      <span className="text-emerald-400 text-sm font-medium">Global Community</span>
                    </div>
                    <h3 className="text-white text-2xl font-bold mb-2">Diverse Spiritual Voices</h3>
                    <p className="text-slate-300 text-sm">Insights from scholars, artists, and practitioners worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="group text-center p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 lg:w-8 lg:h-8 text-emerald-600" />
                  </div>
                  <div className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm lg:text-base text-slate-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section Title */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">
              Explore
            </span>
            <span className="text-slate-800 ml-4">Our Guest Blogs</span>
          </h2>
          <p className="mt-4 text-base lg:text-xl text-slate-500 max-w-3xl mx-auto">
            Discover inspiring stories, insights, and experiences shared by our valued contributors from around the world.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 lg:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-xl p-6 lg:p-8 border border-slate-100">
            {/* Search Bar */}
            <div className="relative mb-6 lg:mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles by title, content, or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 text-base shadow-sm"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="flex items-center space-x-2 text-slate-500">
                <Filter className="w-5 h-5" />
                <span className="font-medium">Filter by:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                      activeFilter === category.id
                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-500/25'
                        : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600'
                    }`}
                  >
                    <span>{category.label}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        activeFilter === category.id
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-emerald-600">{filteredPosts.length}</span> articles found
              </p>
              {loading && (
                <div className="flex items-center space-x-2 text-sm text-slate-500">
                  <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>Loading...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-8 lg:py-12 bg-gradient-to-br from-slate-50 via-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 && !loading ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">No articles found</h3>
              <p className="text-slate-500 mb-6">
                {searchTerm
                  ? `No results for "${searchTerm}". Try a different search term.`
                  : 'Be the first to contribute to this category!'}
              </p>
              <Link
                href="/contact?type=guest-blog"
                className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
              >
                <PenTool className="w-4 h-4" />
                <span>Submit a Post</span>
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredPosts.map((post) => {
                  const categoryColor = getCategoryColor(post.category);
                  const categoryLabel = getCategoryLabel(post.category);

                  return (
                    <div
                      key={post.id}
                      onClick={() => router.push(`/reflection/guest-blogs/${post.id}`)}
                      className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-slate-100 flex flex-col cursor-pointer"
                    >
                      {/* Blog Image */}
                      <div className="relative h-56 overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${categoryColor} opacity-10`}></div>
                        {post.featured_image_url ? (
                          <img
                            src={post.featured_image_url}
                            alt={post.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800';
                            }}
                          />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${categoryColor} flex items-center justify-center`}>
                            <BookOpen className="w-16 h-16 text-white/50" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className={`text-xs font-semibold text-white bg-gradient-to-r ${categoryColor} px-3 py-1.5 rounded-full shadow-lg`}>
                            {categoryLabel}
                          </span>
                        </div>
                        
                        {/* Date Badge */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center space-x-2 text-white/90 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span className="font-medium">{formatDate(post.created_at)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors duration-200">
                          {post.title}
                        </h3>
                        
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
                            {/* {post.author_image_url ? (
                              <img
                                src={post.author_image_url}
                                alt={post.author_name || post.blogger_name || 'Author'}
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              <User className="w-5 h-5 text-emerald-600" />
                            )} */}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-slate-800">
                              {post.author_name || post.blogger_name || 'Anonymous'}
                            </p>
                            <p className="text-xs text-slate-500">
                              {post.language || 'English'}
                            </p>
                          </div>
                        </div>
                        
                        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                          {post.excerpt || post.content?.substring(0, 200) + '...'}
                        </p>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag: string, index: number) => (
                              <span
                                key={index}
                                className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full hover:bg-emerald-50 hover:text-emerald-600 transition-colors duration-200"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <div className="flex items-center space-x-4 text-xs text-slate-500">
                            {post.views && (
                              <div className="flex items-center space-x-1">
                                <Eye className="w-3.5 h-3.5" />
                                <span>{post.views}</span>
                              </div>
                            )}
                            {post.comments && (
                              <div className="flex items-center space-x-1">
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>{post.comments}</span>
                              </div>
                            )}
                            {!post.views && !post.comments && (
                              <span>Just published</span>
                            )}
                          </div>

                          <div className="flex items-center space-x-1 text-emerald-600 font-medium text-sm group-hover:translate-x-1 transition-transform duration-200">
                            <span>Read More </span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center mt-12 lg:mt-16">
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className={`inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                      loading ? 'animate-pulse' : ''
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Loading More...</span>
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-5 h-5" />
                        <span>Load More Articles</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-500/30 mb-6">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-300">Share Your Knowledge</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Share Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Spiritual Insights?
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-slate-300 mb-8 leading-relaxed">
            Join our community of guest contributors. Share your knowledge, experiences, and insights
            about Sufi poetry, spirituality, culture, and music with seekers around the world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGuestPostSubmit}
              className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
            >
              <PenTool className="w-5 h-5" />
              <span>Submit Guest Post</span>
            </button>
            <Link
              href="/writers"
              className="inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm border border-white/20"
            >
              <Users className="w-5 h-5" />
              <span>Join Writers Community</span>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center space-x-2 border-2 border-emerald-400/50 hover:border-emerald-400 text-emerald-300 hover:text-emerald-400 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
            >
              <BookOpen className="w-5 h-5" />
              <span>Learn About Us</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GuestBlogs;
