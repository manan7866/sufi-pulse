'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Play,
  Users,
  Globe,
  Heart,
  PenTool,
  Mic,
  ArrowRight,
  Star,
  Music,
  BookOpen,
  Award,
  CheckCircle
} from 'lucide-react';
import PromoteProtectSufiKalam from '../PromoteProtectSufiKalam';
import { incrementWeekly, incrementMonthly } from '@/lib/increment';
import { useCMSPage } from '@/hooks/useCMSPage';
import { homePageFallbackData } from '@/lib/cmsFallbackData';

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const CHANNEL_ID = "UCraDr3i5A3k0j7typ6tOOsQ";

interface YouTubeVideo {
  id: {
    videoId: string
  }
  snippet: {
    title: string
    description: string
    thumbnails: {
      medium: {
        url: string
      }
    }
    publishedAt: string
    channelTitle: string
  }
}

interface ProcessedVideo {
  id: string
  title: string
  writer: string
  vocalist: string
  thumbnail: string
  views: string
  duration: string
}

async function fetchFromYouTube(url: string, cacheTime?: number) {
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
    next: {
      revalidate: cacheTime || 60 * 60 * 24, // Revalidate every 24 hours by default
    }
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`YouTube API error: ${response.statusText}`);
  }
  return await response.json();
}

const Home = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [featuredKalam, setFeaturedKalam] = useState<ProcessedVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch CMS data with fallback
  const { data: cmsData, loading: cmsLoading } = useCMSPage({
    pageSlug: 'home',
    fallbackData: homePageFallbackData,
    enabled: true
  });

  // Use CMS data or fallback
  const pageData = cmsData || homePageFallbackData;

  const fetchYouTubeVideos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/youtube/videos-limited`);
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
      const data: ProcessedVideo[] = await response.json();
      setFeaturedKalam(data);
    } catch (err: any) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching YouTube videos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchYouTubeVideos();
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % (pageData.testimonials?.length || 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, pageData.testimonials]);

  // Map CMS testimonials to format expected by UI
  const testimonials = [
    {
      name: "Amina Rahman",
      location: "Delhi, India",
      role: "Sufi Writer",
      quote: "SufiPulse turned my kalam into a global spiritual experience with exceptional production quality.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Omar Ali",
      location: "London, UK",
      role: "Sufi Devotee",
      quote: "SufiPulse evokes the warmth of zikr circles, deepening my spiritual connection.",
      image: "/pics/38-min.png"
    },
    {
      name: "Sofia Müller",
      location: "Berlin, Germany",
      role: "Spiritual Music Lover",
      quote: "SufiPulse’s harmonies create a sacred space, pure and deeply moving.",
      image: "https://images.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Yusuf Khan",
      location: "Mumbai, India",
      role: "Sufi Music Lover",
      quote: "SufiPulse delivers kalam with grace, a true gift for spiritual seekers.",
      image: "/pics/36-min.png"
    },
    {
      name: "Emily Carter",
      location: "Boston, USA",
      role: "Sufi Music Enthusiast",
      quote: "SufiPulse opened my heart to meditative sounds, a new world of peace.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Muhammad Ali",
      location: "Istanbul, Turkey",
      role: "Qawwali Vocalist",
      quote: "SufiPulse collaborations feel like a divine journey, uniting hearts globally.",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Fatima Al Zahra",
      location: "Dubai, UAE",
      role: "Sufi Listener",
      quote: "SufiPulse’s kalams carry reverence, feeling like home for the soul.",
      image: "/pics/5-min.png"
    },
    {
      name: "David Coleman",
      location: "New York, USA",
      role: "Sufi Music Enthusiast",
      quote: "SufiPulse reveals Sufi music’s depth, like prayer through soulful sound.",
      image: "/pics/33-min.png"
    },
    {
      name: "Clara Hoffmann",
      location: "Munich, Germany",
      role: "Sufi Listener",
      quote: "SufiPulse feels like a garden of sound, a sanctuary for souls.",
      image: "/pics/10-min.png"
    },
    {
      name: "Karim Hassan",
      location: "Doha, Qatar",
      role: "Sufi Listener",
      quote: "SufiPulse feels like a majlis of seekers, pure and deeply soulful.",
      image: "/pics/30-min.png"
    },
    {
      name: "Rachel Green",
      location: "San Francisco, USA",
      role: "Sufi Listener",
      quote: "SufiPulse songs feel like intimate soul conversations, uplifting and grounding.",
      image: "/pics/12-min.png"
    },
    {
      name: "Ahmed Khan",
      location: "Karachi, Pakistan",
      role: "Sufi Music Lover",
      quote: "SufiPulse’s poetry and sound immerse me in beauty and devotion.",
      image: "/pics/25-min.png"
    },
    {
      name: "Isabella Rossi",
      location: "Rome, Italy",
      role: "Sufi Spirit Seeker",
      quote: "SufiPulse echoes devotion, timeless music that uplifts the soul.",
      image: "/pics/9-min.png"
    },
    {
      name: "Faisal Al-Mutairi",
      location: "Riyadh, Saudi Arabia",
      role: "Sufi Music Lover",
      quote: "SufiPulse’s sincerity in melody touches the heart, pure remembrance.",
      image: "/pics/28-min.png"
    },
    {
      name: "Hannah Wilson",
      location: "Toronto, Canada",
      role: "Spiritual Music Enthusiast",
      quote: "SufiPulse connects deeply with universal spirituality, transcending boundaries.",
      image: "/pics/13-min.png"
    },
    {
      name: "Sameer Sheikh",
      location: "Hyderabad, India",
      role: "Sufi Music Enthusiast",
      quote: "SufiPulse feels like entering a dargah, each note radiant with light.",
      image: "/pics/37-min.png"
    },
    {
      name: "Dr. Sarah Ahmed",
      location: "London, UK",
      role: "Contemporary Spiritual Poet",
      quote: "SufiPulse blends ancient wisdom with modern expression beautifully.",
      image: "/pics/23-min.png"
    },
    {
      name: "Mariam Nasser",
      location: "Doha, Qatar",
      role: "Sufi Spirit Seeker",
      quote: "SufiPulse evokes my grandmother’s prayers, nostalgic and deeply divine.",
      image: "/pics/24-min.png"
    },
    {
      name: "Michael Hartman",
      location: "Los Angeles, USA",
      role: "Spiritual Music Lover",
      quote: "SufiPulse blends tradition and modernity, connecting hearts timelessly.",
      image: "/pics/2-min.png"
    },
    {
      name: "Ayesha Khan",
      location: "Jakarta, Indonesia",
      role: "Sufi Music Enthusiast",
      quote: "SufiPulse’s devotion in sound humbles me, it’s truly prayerful.",
      image: "/pics/4-min.png"
    },
    {
      name: "Bilal Ahmed",
      location: "Lahore, Pakistan",
      role: "Sufi Listener",
      quote: "SufiPulse revived my love for qawwali, recalling childhood shrine visits.",
      image: "/pics/35-min.png"
    },
    {
      name: "Anna Johansson",
      location: "Stockholm, Sweden",
      role: "Global Sufi Music Lover",
      quote: "SufiPulse feels ancient yet alive, connecting me to sacred traditions.",
      image: "/pics/14-min.png"
    },
    {
      name: "Malik Johnson",
      location: "Atlanta, USA",
      role: "Sufi Spirit Seeker",
      quote: "SufiPulse connects my Black Muslim heritage to rhythm and dhikr.",
      image: "/pics/6-min.png"
    },
    {
      name: "Putri Lestari",
      location: "Amman, Jordan",
      role: "Sufi Music Lover",
      quote: "SufiPulse feels like a universal zikr, transcending all boundaries.",
      image: "/pics/15-min.png"
    },
  ];

  // Get icon component from icon name
  const getIconComponent = (iconName: string | null | undefined, defaultIcon: any) => {
    const iconMap: Record<string, any> = {
      'Heart': Heart,
      'Globe': Globe,
      'Music': Music,
      'Award': Award,
      'Users': Users,
      'BookOpen': BookOpen,
      'Star': Star,
      'Play': Play,
      'PenTool': PenTool,
      'Mic': Mic,
    };
    return iconName && iconMap[iconName] ? iconMap[iconName] : defaultIcon;
  };

  // These fields data coming from database cms
  const stats = (pageData.stats && pageData.stats.length > 0)
    ? pageData.stats.map((stat: any) => ({
        number: stat.stat_number,
        label: stat.stat_label,
        icon: getIconComponent(stat.stat_icon, Heart)
      }))
    : [
        { number: `${incrementWeekly(300)}+`, label: "Sacred Collaborations", icon: Heart },
        { number: `${incrementMonthly(43, 200)}+`, label: "Countries Represented", icon: Globe },
        { number: `${incrementWeekly(150)}+`, label: "Divine Kalam Created", icon: Music },
        { number: "100%", label: "Free for Writers", icon: Award }
      ];

  const handleVideoClick = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-24 w-24 sm:h-32 sm:w-32 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-slate-600 text-sm sm:text-base">Loading featured videos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4 text-sm sm:text-base">Error loading videos: {error}</p>
          <button
            onClick={fetchYouTubeVideos}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                <img
                  src="/Untitled (250 x 250 px) (1).png"
                  alt="SufiPulse Logo"
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-2xl shadow-xl object-contain bg-white p-2"
                />
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-emerald-400">SufiPulse main</h1>
                  <p className="text-emerald-300 text-xs sm:text-sm">Global Sufi Collaboration Studio</p>
                </div>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Global Sufi
                  <span className="block text-emerald-400">Collaboration Studio</span>
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed">
                  From Kashmir's sacred valleys to the global ummah submit your Sufi kalam.
                  Let the world hear its pulse.
                </p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 border border-emerald-500/20">
                <p className="text-emerald-300 font-medium mb-2 text-sm sm:text-base">Our Sacred Promise</p>
                <blockquote className="text-sm sm:text-base lg:text-lg italic">
                  "We don't sell divine lyrics. We amplify them."
                </blockquote>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/writer/profile"
                  className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
                >
                  <PenTool className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Submit Your Kalam</span>
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base"
                >
                  <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Join Artist Pool</span>
                </Link>
                <Link
                  href="/gallery"
                  className="inline-flex items-center justify-center space-x-2 border-2 border-white/30 hover:border-emerald-400 text-white hover:text-emerald-400 px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Watch Videos</span>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] sm:aspect-video bg-slate-800 rounded-lg sm:rounded-xl overflow-hidden shadow-xl">
                <img
                  src={featuredKalam[0]?.thumbnail || "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800"}
                  alt="SufiPulse Studio"
                  className="w-full h-full object-fit"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-emerald-600/90 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110"
                    onClick={() => featuredKalam[0] && handleVideoClick(featuredKalam[0].id)}
                  >
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 ">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-slate-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Kalam Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">
              Featured Sacred Collaborations
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
              Experience the divine fusion of sacred poetry and spiritual voices from our global community
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {featuredKalam.map((kalam) => (
              <div
                key={kalam.id}
                className="group cursor-pointer"
                onClick={() => handleVideoClick(kalam.id)}
              >
                <div className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-slate-100 flex flex-col h-full">
                  <div className="relative w-full aspect-[16/9]">
                    <img
                      src={kalam.thumbnail}
                      alt={kalam.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-emerald-600/90 rounded-full flex items-center justify-center">
                        <Play className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 lg:p-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-emerald-600 text-sm sm:text-base lg:text-lg mb-1 line-clamp-2">
                      {kalam.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mb-2 sm:mb-3">by {kalam.writer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-10 lg:mt-12">
            <Link
              href="/gallery"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
            >
              <span>Explore All Kalam</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">
              Your Sacred Journey
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
              From divine inspiration to global spiritual impact SufiPulse brings your kalam to life, free of cost.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <PenTool className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 mb-3 sm:mb-4">1. Submit Your Kalam</h3>
              <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed">
                Share your sacred poetry with our global community. We accept kalam in any language and provide translation services if needed.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Music className="w-8 h-8 sm:w-10 sm:h-10 text-slate-600" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 mb-3 sm:mb-4">2. We Create & Produce</h3>
              <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed">
                Our team handles everything musical direction, vocalist selection, professional recording, and production completely free.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 mb-3 sm:mb-4">3. Global Sharing</h3>
              <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed">
                Your kalam reaches the world through our platform and networks, with your authorship always prominently credited.
              </p>
            </div>
          </div>
          <div className="text-center mt-8 sm:mt-10 lg:mt-12">
            <Link
              href="/process"
              className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base"
            >
              <span>Learn the Complete Process</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">
              Voices from our Global Community
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
              Hear from Sufi music lovers around the world who have felt the SufiPulse journey
            </p>
          </div>
          <div className="relative">
            <div className="bg-slate-800 rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 text-white">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-center">
                <div className="lg:col-span-2">
                  <blockquote className="text-lg sm:text-xl lg:text-2xl font-light italic leading-relaxed mb-4 sm:mb-6">
                    "{testimonials[activeTestimonial].quote}"
                  </blockquote>
                  <div>
                    <div className="font-bold text-base sm:text-lg lg:text-xl text-emerald-300">
                      {testimonials[activeTestimonial].name}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-300">
                      {testimonials[activeTestimonial].role} • {testimonials[activeTestimonial].location}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <img
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].name}
                    className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full object-cover mx-auto mb-3 sm:mb-4 ring-2 sm:ring-3 lg:ring-4 ring-emerald-400"
                  />
                </div>
              </div>
              <div className="flex justify-center space-x-1 sm:space-x-2 mt-6 sm:mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveTestimonial(index);
                      setIsPaused(true);
                      setTimeout(() => setIsPaused(false), 10000);
                    }}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${index === activeTestimonial ? 'bg-emerald-400' : 'bg-slate-600 hover:bg-slate-500'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-12 sm:py-16 lg:py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-6 sm:mb-8">
              Our Sacred Mission
            </h2>
            <div className="max-w-4xl mx-auto">
              <blockquote className="text-lg sm:text-xl lg:text-2xl font-light italic text-slate-700 leading-relaxed mb-6 sm:mb-8">
                "We do not monetize the sacred. We serve it."
              </blockquote>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed mb-6 sm:mb-8">
                SufiPulse exists as a spiritual service to the global ummah, providing a platform where sacred Sufi words
                meet divine voices. Our mission transcends commercial interests we are dedicated to amplifying the
                timeless wisdom of Sufi poetry, with particular reverence for the mystical tradition of Kashmiri Sufism.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md sm:shadow-lg">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600 mb-3 sm:mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2 text-sm sm:text-base">100% Free Service</h3>
                  <p className="text-xs sm:text-sm text-slate-600">Complete production services at no cost to writers</p>
                </div>
                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md sm:shadow-lg">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600 mb-3 sm:mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2 text-sm sm:text-base">Global Reach</h3>
                  <p className="text-xs sm:text-sm text-slate-600">Connecting hearts across 50+ countries</p>
                </div>
                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md sm:shadow-lg">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600 mb-3 sm:mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2 text-sm sm:text-base">Sacred Integrity</h3>
                  <p className="text-xs sm:text-sm text-slate-600">Every project approached with spiritual reverence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
            Ready to Share Your Divine Words?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 mb-6 sm:mb-8 leading-relaxed">
            Join our global community of Sufi writers and vocalists. Whether you have sacred poetry to share
            or a voice to lend to the divine, you have a place in our spiritual family.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/writer/profile"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
            >
              <PenTool className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Submit Your Kalam</span>
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base"
            >
              <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Join</span>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center space-x-2 border-2 border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base"
            >
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Learn More</span>
            </Link>
          </div>
        </div>
      </section>

      <main className="min-h-screen">
        <PromoteProtectSufiKalam />
      </main>

      {/* Final Call to Action */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
            Ready to Collaborate or Adapt Sufi Kalam?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 mb-6 sm:mb-8 leading-relaxed">
            Join our global community of Sufi writers and vocalists. Whether you have sacred poetry to share
            or a voice to lend to the divine, you have a place in our spiritual family.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/partnership"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
            >
              <PenTool className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Explore Partnerships</span>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center space-x-2 border-2 border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base"
            >
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Learn More</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;