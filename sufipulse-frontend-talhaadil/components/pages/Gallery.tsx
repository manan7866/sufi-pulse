"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Play,
  Filter,
  Search,
  Globe,
  Clock,
  Heart,
  Eye,
  Download,
  Share2,
  Star,
  Music,
  Headphones,
  Users,
} from "lucide-react"
import { incrementDaily, incrementMonthly, incrementWeekly } from "@/lib/increment"
import { useCMSPage } from "@/hooks/useCMSPage"
import { homePageFallbackData } from "@/lib/cmsFallbackData"

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
const CHANNEL_ID = "UCraDr3i5A3k0j7typ6tOOsQ"

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
  duration: string
  views: string
  category: string
  language: string
  uploadDate: string
  videoId: string
  description: string
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

const parseDuration = (duration: string): number => {
  const parts = duration.split(':').map(Number);
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  return 0;
};

const parseViews = (views: string): number => {
  const num = parseFloat(views.replace(/[KMB]/g, ''));
  const multiplier = views.toUpperCase().includes('K') ? 1000 : views.toUpperCase().includes('M') ? 1000000 : 1;
  return num * multiplier;
};

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [videos, setVideos] = useState<ProcessedVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch CMS data with fallback for gallery page
  const { data: cmsData } = useCMSPage({
    pageSlug: 'gallery',
    fallbackData: homePageFallbackData,
    enabled: true
  });

  const pageData = cmsData || homePageFallbackData;

  const filters = [
    { id: "all", label: "All Videos", count: 0 },
    { id: "popular", label: "Popular", count: 0 },
    { id: "old", label: "Old", count: 0 },
    { id: "new", label: "New", count: 0 },
  ]

  const categorizeVideo = (description: string): string => {
    const descLower = description.toLowerCase()
    if (descLower.includes("popular")) return "popular"
    if (descLower.includes("old")) return "old"
    if (descLower.includes("new")) return "new"
    return "all"
  }

  const fetchYouTubeVideos = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/youtube/videos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!res.ok) {
        throw new Error(`Error fetching videos: ${res.statusText}`)
      }

      const data = await res.json()

      if (data) {
        const processedVideos: ProcessedVideo[] = data.map((video: any) => ({
          id: video.id,
          title: video.title,
          writer: video.writer,
          vocalist: video.vocalist,
          thumbnail: video.thumbnail,
          duration: video.duration,
          views: video.views,
          category: categorizeVideo(video.description || ""),
          language: "Multilingual",
          uploadDate: video.uploaded_at,
          videoId: video.id,
          description: video.description || "",
        }))

        console.log("Fetched videos from backend:", processedVideos)
        setVideos(processedVideos)
        filters.forEach((filter) => {
          filter.count = processedVideos.length
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      console.error("Error fetching backend videos:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchYouTubeVideos()
  }, [])
//These fields data coming from database cms
  const stats = (pageData.stats && pageData.stats.length > 0)
    ? pageData.stats.map((stat: any) => ({
        number: stat.stat_number === '0' ? videos.length.toString() : stat.stat_number,
        label: stat.stat_label,
        icon: stat.stat_icon === 'Play' ? Play : stat.stat_icon === 'Globe' ? Globe : stat.stat_icon === 'Eye' ? Eye : Heart
      }))
    : [
        { number: videos.length.toString(), label: "Sacred Videos", icon: Play },
        { number: `${incrementMonthly(17, 50)}+`, label: "Languages", icon: Globe },
        {
          number: videos.reduce((total, video) => total + Number.parseInt(video.views.replace(/[KM]/g, "")), 0) + "K+",
          label: "Total Views",
          icon: Eye,
        },
        { number: `${incrementMonthly(43, 200)}+`, label: "Countries Reached", icon: Heart },
      ];

  const searchedVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.writer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.vocalist.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  let filteredVideos = [...searchedVideos];

  if (activeFilter === 'all') {
    filteredVideos.sort((a, b) => parseDuration(b.duration) - parseDuration(a.duration));
  } else if (activeFilter === 'popular') {
    filteredVideos.sort((a, b) => parseViews(b.views) - parseViews(a.views));
  } else if (activeFilter === 'old') {
    filteredVideos.sort((a, b) => new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime());
  } else if (activeFilter === 'new') {
    filteredVideos.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
  }

  const handleVideoClick = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-24 w-24 sm:h-32 sm:w-32 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-slate-600 text-sm sm:text-base">Loading sacred videos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-sm sm:text-base mb-4">Error loading videos: {error}</p>
          <button
            onClick={fetchYouTubeVideos}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  Sacred Video
                  <span className="block text-emerald-400">Gallery</span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed">
                  Experience divine kalam brought to life through global spiritual voices. From traditional Qawwali to
                  contemporary spiritual anthems.
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-emerald-500/20">
                <p className="text-emerald-300 font-medium text-sm sm:text-base mb-2">Sacred Collection</p>
                <blockquote className="text-sm sm:text-lg italic">
                  "Every video is a bridge between hearts and the Divine"
                </blockquote>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/contact?type=writer"
                  className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
                >
                  <Music className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Submit Your Kalam</span>
                </Link>
               
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-slate-800 rounded-xl overflow-hidden shadow-xl">
                <img
                  src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Sacred Video Gallery"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                  <h3 className="text-white text-lg sm:text-xl font-bold ">Divine Collaborations</h3>
                  <p className="text-slate-200 text-xs sm:text-sm">{videos.length} sacred videos from our global community</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-1 sm:mb-2">{stat.number}</div>
                  <div className="text-slate-600 text-sm sm:text-base font-medium">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-slate-100">
            <div className="relative mb-4 sm:mb-6">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search sacred videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 text-sm sm:text-base"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0">
                <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 flex-shrink-0" />
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center space-x-2 px-3 py-1 sm:px-4 sm:py-2 rounded-lg whitespace-nowrap font-medium transition-all duration-200 text-sm sm:text-base ${activeFilter === filter.id
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600"
                      }`}
                  >
                    <span>{filter.label}</span>
                  </button>
                ))}
              </div>
              <div className="text-xs sm:text-sm text-slate-600">
                Showing {filteredVideos.length} of {videos.length} videos
              </div>
            </div>
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-slate-100 cursor-pointer"
                onClick={() => handleVideoClick(video.videoId)}
              >
                <div className="relative w-full aspect-w-16 aspect-h-9">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 right-2 sm:right-3 flex justify-between items-start">
                    <span className="text-xs font-medium text-white bg-emerald-600 px-2 py-1 rounded-lg capitalize">
                      Play Now
                    </span>
                    <div className="flex items-center space-x-1 text-white text-xs bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">
                      <Clock className="w-3 h-3" />
                      <span>{video.duration}</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-600/90 rounded-full flex items-center justify-center">
                      <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-1" />
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="text-emerald-600 font-bold text-sm sm:text-base md:text-lg mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  <div className="flex items-center justify-between text-slate-600 text-xs sm:text-sm mb-3">
                    <span>by {video.writer}</span>
                    <div className="flex items-center space-x-2">
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-amber-950" />
                      <span>{video.views}</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-xs sm:text-sm text-slate-600 mb-3">
                    <div>
                      <span className="font-medium">Uploaded:</span>{" "}
                      {new Date(video.uploadDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                   
                    <div className="flex space-x-2">
                      <button
                        className="p-2 text-slate-400 hover:text-emerald-600 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.share?.({
                            title: video.title,
                            url: `https://www.youtube.com/watch?v=${video.videoId}`,
                          });
                        }}
                      >
                        <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button
                        className="p-2 text-slate-400 hover:text-emerald-600 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`https://www.youtube.com/watch?v=${video.videoId}`, "_blank");
                        }}
                      >
                        <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <button
              onClick={fetchYouTubeVideos}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold transition-colors duration-200 text-sm sm:text-base"
            >
              Refresh Videos
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">Share Your Sacred Voice</h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 mb-6 sm:mb-8 leading-relaxed">
            Join our global community and experience the complete journey from sacred words to worldwide spiritual
            impact through professional video production.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/contact?type=writer"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
            >
              <Music className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Submit Your Kalam</span>
            </Link>
            <Link
              href="/contact?type=vocalist"
              className="inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base"
            >
              <Headphones className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Join</span>
            </Link>
            <Link
              href="/studio"
              className="inline-flex items-center space-x-2 border-2 border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base"
            >
              <Star className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Visit Studio</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Gallery
