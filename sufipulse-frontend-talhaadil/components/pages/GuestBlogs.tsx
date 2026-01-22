'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
} from 'lucide-react';
import { getGuestPosts } from '@/services/requests';
import { incrementMonthly, incrementWeekly } from '@/lib/increment';

// Predefined list of possible categories from the API (lowercase)
const possibleCategories = [
  { id: 'sufi poetry', label: 'Sufi Poetry' },
  { id: 'spirituality', label: 'Spirituality' },
  { id: 'culture', label: 'Culture' },
  { id: 'music', label: 'Music' },
];

const GuestBlogs = () => {
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

  const stats = [
    { number: `${incrementWeekly(15)}`, label: 'Guest Contributors', icon: Users },
    { number: `${incrementWeekly(25)}`, label: 'Published Articles', icon: BookOpen },
    { number: `${incrementMonthly(12,200)}`, label: 'Countries Represented', icon: Globe },
    { number: "100%", label: "Free Service", icon: Award },
  ];

  // Function to calculate dynamic category counts
  const calculateCategoryCounts = (posts) => {
    const counts = {
      all: posts.length,
      'sufi poetry': 0,
      spirituality: 0,
      culture: 0,
      music: 0,
    };

    posts.forEach((post) => {
      const category = post.category.toLowerCase();
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

  // Fetch posts from the API
  const fetchPosts = async (reset = false) => {
    setLoading(true);
    try {
      const response = await getGuestPosts({ skip: reset ? 0 : skip, limit });
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

  // Filter posts based on category and search term
  const filteredPosts = posts.filter((post) => {
    const matchesFilter = activeFilter === 'all' || post.category.toLowerCase() === activeFilter;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Handle Load More button click
  const handleLoadMore = () => {
    fetchPosts();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Guest
                  <span className="block text-emerald-400">Blogs</span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed">
                  Voices from our global spiritual community sharing insights on sufi poetry,
                  spirituality, culture, and music.
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-emerald-500/20">
                <p className="text-emerald-300 font-medium mb-2 text-sm sm:text-base">Community Wisdom</p>
                <blockquote className="text-sm sm:text-base lg:text-lg italic">
                  "Every guest voice adds a new dimension to our understanding of the sacred"
                </blockquote>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/contact?type=guest-blog"
                  className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
                >
                  <PenTool className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Submit Guest Post</span>
                </Link>
                <Link
                  href="/writers"
                  className="inline-flex items-center justify-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base"
                >
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Meet Our Writers</span>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] sm:aspect-video bg-slate-800 rounded-xl overflow-hidden shadow-xl">
                <img
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Guest Blogs"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                  <h3 className="text-white text-base sm:text-xl font-bold ">Global Spiritual Voices</h3>
                  <p className="text-slate-200 text-xs sm:text-sm">Insights from scholars, artists, and practitioners worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-1 sm:mb-2">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-slate-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-12 sm:py-16 lg:py-20 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
          <span className="text-emerald-600 mr-2 sm:mr-4">See Our</span>
          <span className="text-slate-800">Guest Blogs</span>
        </h2>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-slate-500 max-w-3xl mx-auto">
          Explore inspiring stories, insights, and experiences shared by our valued contributors.
        </p>
      </section>

      {/* Search and Filters */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-slate-100">
            <div className="relative mb-4 sm:mb-6">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search guest articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border border-slate-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 text-sm sm:text-base"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
              <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hidden">
                <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 flex-shrink-0" />
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-1 sm:py-2 rounded-lg whitespace-nowrap font-medium transition-all duration-200 text-xs sm:text-sm ${
                      activeFilter === category.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600'
                    }`}
                  >
                    <span>{category.label}</span>
                    <span
                      className={`text-xs px-1.5 sm:px-2 py-0.5 rounded-full ${
                        activeFilter === category.id ? 'bg-white/20' : 'bg-slate-300'
                      }`}
                    >
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs sm:text-sm text-slate-600">
              Showing {filteredPosts.length} of {posts.length} articles
            </div>
          </div>

          {/* Guest Posts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-slate-100"
              >
                <div className="relative">
                  <div className="absolute top-3 sm:top-4 left-4 sm:left-6 flex justify-between items-start">
                    <span className="text-xs font-medium text-white bg-emerald-600 px-2 py-1 rounded-lg">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-6 mt-6 sm:mt-8">
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-2 sm:mb-3 line-clamp-2">{post.title}</h3>
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-600 mb-1 sm:mb-2">
                    <User className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="text-xs text-slate-500 mb-2 sm:mb-3">
                    {post.role} • {post.country}, {post.city}
                  </div>
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 mb-3 sm:mb-4">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">{post.content}</p>

                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-emerald-50 text-emerald-700 px-1.5 sm:px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-3 text-xs text-slate-500">
                      {post.views && (
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{post.views}</span>
                        </div>
                      )}
                      {post.comments && (
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-3 h-3" />
                          <span>{post.comments}</span>
                        </div>
                      )}
                    </div>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-8 sm:mt-10 lg:mt-12">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className={`bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-colors duration-200 text-sm sm:text-base ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Loading...' : 'Load More Articles'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">Share Your Spiritual Insights</h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 mb-6 sm:mb-8 leading-relaxed">
            Join our community of guest contributors. Share your knowledge, experiences, and insights
            about sufi poetry, spirituality, culture, and music.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/contact?type=guest-blog"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
            >
              <PenTool className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Submit Guest Post</span>
            </Link>
            <Link
              href="/writers"
              className="inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base"
            >
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Join Writers Community</span>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center space-x-2 border-2 border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base"
            >
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Learn About Us</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GuestBlogs;