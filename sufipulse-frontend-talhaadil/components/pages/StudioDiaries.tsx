'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Calendar, 
  User, 
  Clock, 
  Heart, 
  Music, 
  Mic, 
  Headphones,
  ArrowRight,
  Play,
  Star,
  Eye,
  MessageCircle,
  Share2,
  Filter,
  Search
} from 'lucide-react';

const StudioDiaries = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const diaryEntries = [
    {
      id: 1,
      title: "Recording 'Ishq-e-Haqiqi' - A Sacred Journey",
      author: "Michael 'SufiPulse' Hartman",
      role: "Lead Engineer",
      date: "2024-01-15",
      category: "recording",
      readTime: "8 min read",
      excerpt: "Today we recorded Amina Rahman's beautiful kalam 'Ishq-e-Haqiqi' with Muhammad Ali's powerful vocals. The energy in the studio was transcendent...",
      content: "The morning began with a quiet prayer, as it always does when we're about to record sacred kalam. Amina Rahman's 'Ishq-e-Haqiqi' had been with us for weeks during pre-production, but today it would finally receive the voice it deserved through Muhammad Ali's incredible vocal range.",
      image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400",
      views: "2.3K",
      comments: 45,
      featured: true
    },
    {
      id: 2,
      title: "The Art of Spiritual Mixing - Finding the Divine Balance",
      author: "Ryan Cole",
      role: "Mixing Assistant",
      date: "2024-01-10",
      category: "production",
      readTime: "6 min read",
      excerpt: "Mixing sacred music requires a different approach than commercial tracks. Every frequency must serve the spiritual message...",
      content: "When mixing Sufi kalam, we're not just balancing instruments and vocals - we're creating space for the Divine to breathe through the music. Each frequency adjustment is a prayer, each reverb tail a pathway to transcendence.",
      image: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400",
      views: "1.8K",
      comments: 32
    },
    {
      id: 3,
      title: "Capturing the Whisper - Recording Meditative Kalam",
      author: "Lucas Ray",
      role: "Vocal Technician",
      date: "2024-01-08",
      category: "recording",
      readTime: "5 min read",
      excerpt: "Some kalam is meant to be whispered, not sung. Today we explored the delicate art of recording whisper vocals for 'Silent Dhikr'...",
      content: "The studio fell into complete silence as we prepared to record the whisper vocals for 'Silent Dhikr'. This type of recording requires absolute precision - every breath, every subtle inflection carries spiritual weight.",
      image: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?auto=compress&cs=tinysrgb&w=400",
      views: "1.5K",
      comments: 28
    },
    {
      id: 4,
      title: "Global Collaboration - Connecting Hearts Across Continents",
      author: "Arman Sayeed",
      role: "Session Manager",
      date: "2024-01-05",
      category: "collaboration",
      readTime: "7 min read",
      excerpt: "Managing remote sessions with vocalists from Turkey, Morocco, and Kashmir presents unique challenges and beautiful opportunities...",
      content: "Today we coordinated three remote recording sessions across different time zones. The beauty of technology serving the sacred became evident as voices from different continents united in one divine purpose.",
      image: "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=400",
      views: "2.1K",
      comments: 38
    },
    {
      id: 5,
      title: "The Sacred Acoustics of SufiPulse Studio",
      author: "Elijah James",
      role: "Mastering & FX Design",
      date: "2024-01-03",
      category: "technical",
      readTime: "9 min read",
      excerpt: "Our studio's acoustic design isn't just about sound quality - it's about creating a space where the sacred can resonate...",
      content: "Every acoustic panel, every diffuser, every carefully calculated reflection point in our studio serves a dual purpose: technical excellence and spiritual resonance. The room itself becomes an instrument of the Divine.",
      image: "https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg?auto=compress&cs=tinysrgb&w=400",
      views: "1.9K",
      comments: 41
    }
  ];

  const categories = [
    { id: 'all', label: 'All Entries', count: 25 },
    { id: 'recording', label: 'Recording Sessions', count: 8 },
    { id: 'production', label: 'Production Notes', count: 6 },
    { id: 'collaboration', label: 'Global Collaborations', count: 5 },
    { id: 'technical', label: 'Technical Insights', count: 6 }
  ];

  const stats = [
    { number: "25", label: "Diary Entries", icon: BookOpen },
    { number: "300+", label: "Recording Sessions", icon: Mic },
    { number: "50+", label: "Countries Connected", icon: Heart },
    { number: "127K+", label: "Community Reads", icon: Eye }
  ];

  const filteredEntries = diaryEntries.filter(entry => {
    const matchesFilter = activeFilter === 'all' || entry.category === activeFilter;
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const featuredEntry = diaryEntries.find(entry => entry.featured);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Studio
                  <span className="block text-emerald-400">Diaries</span>
                </h1>
                <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed">
                  Behind-the-scenes insights from our sacred recording sessions. 
                  Discover the spiritual and technical journey of bringing divine kalam to life.
                </p>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20">
                <p className="text-emerald-300 font-medium mb-2">From Our Studio Team</p>
                <blockquote className="text-lg italic">
                  "Every recording session is a sacred ceremony, every mix a prayer in frequencies"
                </blockquote>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/studio"
                  className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  <Headphones className="w-5 h-5" />
                  <span>Visit Our Studio</span>
                </Link>
                <Link
                  href="/gallery"
                  className="inline-flex items-center justify-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
                >
                  <Play className="w-5 h-5" />
                  <span>Listen to Productions</span>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Studio Diaries"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-20 h-20 bg-emerald-600/90 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110">
                    <BookOpen className="w-8 h-8 text-white" />
                  </button>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-xl font-bold mb-2">Behind the Sacred Sessions</h3>
                  <p className="text-slate-200 text-sm">Intimate stories from our recording studio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div className="text-3xl font-bold text-slate-800 mb-2">{stat.number}</div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Entry */}
      {featuredEntry && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
                Featured Studio Story
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                An intimate look at our most recent sacred recording session
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative">
                  <img
                    src={featuredEntry.image}
                    alt={featuredEntry.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-12">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                      {featuredEntry.category}
                    </span>
                    <span className="text-sm text-slate-500">{featuredEntry.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">{featuredEntry.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-slate-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{featuredEntry.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(featuredEntry.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-6">{featuredEntry.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <span>{featuredEntry.views} views</span>
                      <span>{featuredEntry.comments} comments</span>
                    </div>
                    {/* <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                      Read Full Story
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Search and Filters */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-slate-100">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search studio diaries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                <Filter className="w-5 h-5 text-slate-500 flex-shrink-0" />
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all duration-200 ${
                      activeFilter === category.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600'
                    }`}
                  >
                    <span>{category.label}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activeFilter === category.id
                        ? 'bg-white/20'
                        : 'bg-slate-300'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="text-sm text-slate-600">
              Showing {filteredEntries.length} of {diaryEntries.length} entries
            </div>
          </div>

          {/* Diary Entries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEntries.map((entry) => (
              <div key={entry.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-slate-100">
                <div className="relative">
                  <img
                    src={entry.image}
                    alt={entry.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <span className="text-xs font-medium text-white bg-emerald-600 px-2 py-1 rounded-lg">
                      {entry.category}
                    </span>
                    <div className="flex items-center space-x-1 text-white text-xs bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">
                      <Clock className="w-3 h-3" />
                      <span>{entry.readTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-3 line-clamp-2">{entry.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-slate-600 mb-3">
                    <User className="w-4 h-4" />
                    <span>{entry.author}</span>
                    <span>•</span>
                    <span>{entry.role}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-500 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(entry.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">{entry.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-slate-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{entry.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{entry.comments}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors duration-200">
              Load More Entries
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Experience Our Sacred Studio
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            These diaries offer just a glimpse into our sacred recording process. 
            Visit our studio, submit your kalam, or join our global community of spiritual collaborators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/studio"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <Headphones className="w-5 h-5" />
              <span>Visit Studio</span>
            </Link>
            <Link
              href="/writer/submit"
              className="inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <Music className="w-5 h-5" />
              <span>Submit Kalam</span>
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center space-x-2 border-2 border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <Heart className="w-5 h-5" />
              <span>Join Community</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudioDiaries;