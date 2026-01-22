'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Mic, MapPin, Volume2, Star, Plus, Filter, Users, Award, Globe, Music, ArrowRight, BookOpen, Heart } from 'lucide-react';

const Vocalists = () => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Vocalists', count: 43 },
    { id: 'urdu', label: 'Urdu Specialists', count: 18 },
    { id: 'english', label: 'English Specialists', count: 15 },
    { id: 'male', label: 'Male Voice', count: 24 },
    { id: 'female', label: 'Female Voice', count: 19 },
    { id: 'available', label: 'Available', count: 31 }
  ];

  const vocalists = [
    {
      id: 1,
      name: "Muhammad Ali",
      location: "Istanbul, Turkey",
      languages: ["Turkish", "Arabic", "Urdu"],
      vocalType: "Baritone",
      style: "Qawwali & Sufi Chants",
      gender: "male",
      available: true,
      bio: "Master of traditional Qawwali with deep spiritual resonance, carrying forward centuries of Sufi vocal tradition.",
      collaborations: 18,
      rating: 4.9,
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200",
      specialties: ["Qawwali", "Dhikr Chanting", "Classical Sufi", "Sacred Recitation"],
      featured: true,
      recentWork: "Ishq-e-Haqiqi",
      joinedDate: "2022"
    },
    {
      id: 2,
      name: "Fatima Zahra",
      location: "Cairo, Egypt",
      languages: ["Arabic", "English", "Persian"],
      vocalType: "Mezzo-Soprano",
      style: "Arabic Spiritual Songs",
      gender: "female",
      available: true,
      bio: "Ethereal voice specializing in Arabic spiritual traditions, bringing ancient prayers to life with contemporary sensitivity.",
      collaborations: 14,
      rating: 4.8,
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200",
      specialties: ["Arabic Maqam", "Spiritual Ballads", "Sacred Chants", "Mystical Vocals"],
      featured: true,
      recentWork: "Wahdat Symphony",
      joinedDate: "2023"
    },
    {
      id: 3,
      name: "Omar Suleiman",
      location: "Fez, Morocco",
      languages: ["Arabic", "French", "Berber"],
      vocalType: "Tenor",
      style: "Maghrebi Sufi Traditions",
      gender: "male",
      available: false,
      bio: "Keeper of North African Sufi vocal traditions, masterfully blending Andalusian influences with pure spiritual expression.",
      collaborations: 22,
      rating: 4.9,
      image: "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=200",
      specialties: ["Andalusian Sufi", "Maghrebi Chants", "Sacred Recitation", "Desert Songs"],
      recentWork: "Zikr of the Heart",
      joinedDate: "2022"
    },
    {
      id: 4,
      name: "Aisha Patel",
      location: "London, UK",
      languages: ["English", "Urdu", "Hindi"],
      vocalType: "Soprano",
      style: "Contemporary Spiritual",
      gender: "female",
      available: true,
      bio: "Bridge between Eastern and Western spiritual music, creating contemporary expressions of timeless Sufi wisdom.",
      collaborations: 11,
      rating: 4.7,
      image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200",
      specialties: ["Contemporary Fusion", "English Kalam", "Cross-cultural", "Modern Mysticism"],
      featured: true,
      recentWork: "Climate Awakening",
      joinedDate: "2023"
    },
    {
      id: 5,
      name: "Layla Benali",
      location: "Casablanca, Morocco",
      languages: ["Arabic", "French", "Spanish"],
      vocalType: "Alto",
      style: "Multilingual Mystical",
      gender: "female",
      available: true,
      bio: "Versatile vocalist exploring mystical expression across multiple languages, creating unique multicultural spiritual experiences.",
      collaborations: 9,
      rating: 4.6,
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200",
      specialties: ["Multilingual Performance", "Mystical Interpretation", "Cultural Fusion", "Sacred Harmony"],
      recentWork: "Tawbah Gardens",
      joinedDate: "2023"
    },
    {
      id: 6,
      name: "Tariq Shah",
      location: "Srinagar, Kashmir",
      languages: ["Kashmiri", "Urdu", "Hindi"],
      vocalType: "Baritone",
      style: "Kashmiri Mystical Tradition",
      gender: "male",
      available: true,
      bio: "Preserving the sacred vocal traditions of Kashmir, bringing the valley's mystical heritage to global audiences.",
      collaborations: 8,
      rating: 4.8,
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200",
      specialties: ["Kashmiri Folk", "Valley Mysticism", "Traditional Chants", "Cultural Heritage"],
      recentWork: "Kashmir's Call",
      joinedDate: "2024"
    },
    {
      id: 7,
      name: "Sacred Harmony Ensemble",
      location: "Global Collective",
      languages: ["Multiple"],
      vocalType: "Mixed Voices",
      style: "Collective Spiritual Expression",
      gender: "ensemble",
      available: true,
      bio: "International collective of voices united in spiritual expression, creating powerful group harmonies for sacred kalam.",
      collaborations: 7,
      rating: 4.8,
      image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=200",
      specialties: ["Group Harmonies", "Multicultural Blend", "Collective Dhikr", "Unity Chants"],
      recentWork: "Path of Fanaa",
      joinedDate: "2023"
    },
    {
      id: 8,
      name: "Whisper Collective",
      location: "Various Locations",
      languages: ["Arabic", "English", "Urdu"],
      vocalType: "Whisper Vocals",
      style: "Meditative Whisper Kalam",
      gender: "ensemble",
      available: true,
      bio: "Specialized collective focusing on whisper kalam and meditative vocal expressions for deep spiritual contemplation.",
      collaborations: 5,
      rating: 4.7,
      image: "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=200",
      specialties: ["Whisper Vocals", "Meditative Expression", "Silent Dhikr", "Contemplative Chants"],
      recentWork: "Silent Dhikr",
      joinedDate: "2024"
    }
  ];

  const filteredVocalists = vocalists.filter(vocalist => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'available') return vocalist.available;
    if (activeFilter === 'urdu') return vocalist.languages.some(lang => lang.toLowerCase().includes('urdu'));
    if (activeFilter === 'english') return vocalist.languages.some(lang => lang.toLowerCase().includes('english'));
    return vocalist.gender === activeFilter;
  });

  const featuredVocalists = vocalists.filter(vocalist => vocalist.featured);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <div className="w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mic className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Vocalist
              <span className="block text-emerald-400">Lounge</span>
            </h1>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20 max-w-4xl mx-auto">
              <p className="text-xl text-slate-300 leading-relaxed mb-6">
                Discover the sacred voices who bring divine kalam to life through the power of 
                spiritual expression. Meet our global community of vocalists serving the sacred.
              </p>
              <blockquote className="text-2xl font-light italic text-emerald-300 mb-4">
                "Every voice carries the potential to touch hearts across continents"
              </blockquote>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowApplicationForm(true)}
                  className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  <Plus className="w-5 h-5" />
                  <span>Join Artist Pool</span>
                </button>
                <Link
                  href="/gallery"
                  className="inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
                >
                  <Music className="w-5 h-5" />
                  <span>Hear Our Work</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-2">43</div>
              <div className="text-slate-600 font-medium">Active Vocalists</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-2">15+</div>
              <div className="text-slate-600 font-medium">Languages</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-2">200+</div>
              <div className="text-slate-600 font-medium">Collaborations</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-2">100%</div>
              <div className="text-slate-600 font-medium">Free Service</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Featured Vocalists */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center">
            <Award className="w-6 h-6 text-emerald-600 mr-2" />
            Featured Vocalists
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredVocalists.map((vocalist) => (
              <div key={vocalist.id} className="group">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 border border-emerald-100">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="relative">
                      <img
                        src={vocalist.image}
                        alt={vocalist.name}
                        className="w-16 h-16 rounded-full object-cover ring-4 ring-emerald-100"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                        vocalist.available ? 'bg-green-500' : 'bg-gray-400'
                      }`}></div>
                      <div className="absolute -top-1 -left-1 w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                        <Star className="w-3 h-3 text-white fill-current" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-800 mb-1">{vocalist.name}</h3>
                      <div className="flex items-center space-x-1 text-sm text-slate-500 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{vocalist.location}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-emerald-600">
                        <Star className="w-4 h-4 fill-current" />
                        <span>{vocalist.rating}</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-500">{vocalist.collaborations} Works</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                        {vocalist.vocalType}
                      </span>
                      <div className="flex items-center space-x-1">
                        {vocalist.available ? (
                          <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">Available</span>
                        ) : (
                          <span className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-full">Busy</span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm font-medium text-slate-700">{vocalist.style}</p>
                  </div>

                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                    {vocalist.bio}
                  </p>

                  <div className="mb-4">
                    <div className="text-xs font-medium text-slate-700 mb-2">Recent Work:</div>
                    <div className="text-sm font-medium text-emerald-600">{vocalist.recentWork}</div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {vocalist.specialties.slice(0, 3).map((specialty, index) => (
                      <span
                        key={index}
                        className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  <button 
                    className={`w-full py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                      vocalist.available 
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                    }`}
                    disabled={!vocalist.available}
                  >
                    {vocalist.available ? 'View Profile & Collaborate' : 'Currently Unavailable'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800">Browse All Vocalists</h3>
            <div className="text-sm text-slate-600">
              {filteredVocalists.length} of {vocalists.length} vocalists
            </div>
          </div>
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-slate-500 flex-shrink-0" />
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all duration-200 ${
                  activeFilter === filter.id
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <span>{filter.label}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activeFilter === filter.id
                    ? 'bg-white/20'
                    : 'bg-slate-300'
                }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Vocalists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVocalists.map((vocalist) => (
            <div key={vocalist.id} className="group">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-5 border border-slate-100">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="relative">
                    <img
                      src={vocalist.image}
                      alt={vocalist.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      vocalist.available ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800 mb-1 line-clamp-1">{vocalist.name}</h3>
                    <div className="flex items-center space-x-1 text-xs text-slate-500 mb-1">
                      <MapPin className="w-3 h-3" />
                      <span className="line-clamp-1">{vocalist.location}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-emerald-600">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{vocalist.rating}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500">{vocalist.collaborations}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                      {vocalist.vocalType}
                    </span>
                    <div className="flex items-center space-x-1">
                      {vocalist.available ? (
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">Available</span>
                      ) : (
                        <span className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-full">Busy</span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs font-medium text-slate-700 line-clamp-1">{vocalist.style}</p>
                </div>

                <div className="mb-3">
                  <div className="flex items-center space-x-1 mb-2">
                    <Volume2 className="w-3 h-3 text-slate-500" />
                    <span className="text-xs font-medium text-slate-700">Languages</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {vocalist.languages.slice(0, 2).map((lang, index) => (
                      <span
                        key={index}
                        className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
                      >
                        {lang}
                      </span>
                    ))}
                    {vocalist.languages.length > 2 && (
                      <span className="text-xs text-slate-500">+{vocalist.languages.length - 2}</span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-600 mb-3 leading-relaxed line-clamp-2">
                  {vocalist.bio}
                </p>

                <div className="mb-4">
                  <div className="flex items-center space-x-1 mb-2">
                    <Mic className="w-3 h-3 text-slate-500" />
                    <span className="text-xs font-medium text-slate-700">Specialties</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {vocalist.specialties.slice(0, 2).map((specialty, index) => (
                      <span
                        key={index}
                        className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                    {vocalist.specialties.length > 2 && (
                      <span className="text-xs text-slate-500">+{vocalist.specialties.length - 2}</span>
                    )}
                  </div>
                </div>

                <button 
                  className={`w-full py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                    vocalist.available 
                      ? 'bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700'
                      : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  }`}
                  disabled={!vocalist.available}
                >
                  {vocalist.available ? (
                    <Link href={`/vocalists/${vocalist.id}`} className="block w-full">View Profile</Link>
                  ) : (
                    'Not Available'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-slate-800 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Global Vocalist Community</h3>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Our vocalists bring diverse traditions and languages together in sacred harmony
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">43</div>
              <div className="text-slate-300">Active Vocalists</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">15+</div>
              <div className="text-slate-300">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">31</div>
              <div className="text-slate-300">Available Now</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">200+</div>
              <div className="text-slate-300">Collaborations</div>
            </div>
          </div>
        </div>

        {/* Application Form Modal */}
        {showApplicationForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-800">Join Artist Pool</h2>
                  <button
                    onClick={() => setShowApplicationForm(false)}
                    className="text-slate-500 hover:text-slate-700 p-2"
                  >
                    ×
                  </button>
                </div>
                <p className="text-slate-600 mt-2">Share your voice with our global spiritual community</p>
              </div>
              
              <form className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Your Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Vocal Type</label>
                    <select className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200">
                      <option>Soprano</option>
                      <option>Mezzo-Soprano</option>
                      <option>Alto</option>
                      <option>Tenor</option>
                      <option>Baritone</option>
                      <option>Bass</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Primary Style</label>
                    <select className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200">
                      <option>Qawwali</option>
                      <option>Sufi Chants</option>
                      <option>Arabic Spiritual</option>
                      <option>Contemporary Spiritual</option>
                      <option>Traditional Dhikr</option>
                      <option>Multilingual</option>
                      <option>Whisper Kalam</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Languages You Sing In</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                    placeholder="e.g., Arabic, Urdu, English, Turkish, Kashmiri"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Bio & Experience</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                    placeholder="Tell us about your vocal journey and spiritual practice..."
                  ></textarea>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <h4 className="font-medium text-emerald-800 mb-2">Spiritual Commitment</h4>
                  <p className="text-sm text-emerald-700">
                    By joining our vocalist pool, I commit to lending my voice for the sacred purpose of amplifying divine kalam 
                    with sincerity and spiritual intention, understanding this is a non-commercial spiritual service.
                  </p>
                  <label className="flex items-center space-x-2 mt-3">
                    <input type="checkbox" className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500" />
                    <span className="text-sm text-emerald-800">I understand and accept this commitment</span>
                  </label>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowApplicationForm(false)}
                    className="flex-1 py-3 px-6 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition-colors duration-200"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vocalists;