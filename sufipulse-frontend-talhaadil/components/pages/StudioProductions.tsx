'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Play, 
  Filter, 
  Search, 
  Globe, 
  Clock, 
  User, 
  Heart, 
  Eye, 
  Download, 
  Share2,
  ArrowRight,
  Award,
  Star,
  Music,
  Headphones,
  Users
} from 'lucide-react';

const StudioProductions = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filters = [
    { id: 'all', label: 'All Productions', count: 300 },
    { id: 'qawwali', label: 'Qawwali', count: 85 },
    { id: 'chant', label: 'Sacred Chants', count: 72 },
    { id: 'anthem', label: 'Spiritual Anthems', count: 68 },
    { id: 'whisper', label: 'Whisper Kalam', count: 45 },
    { id: 'instrumental', label: 'Instrumentals', count: 30 }
  ];

  const studioProductions = [
    {
      id: 1,
      title: "Ishq-e-Haqiqi",
      writer: "Amina Rahman",
      vocalist: "Muhammad Ali",
      engineer: "Michael Hartman",
      language: "Urdu",
      format: "qawwali",
      thumbnail: "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=400",
      duration: "4:32",
      views: "12.5K",
      recordingDate: "2024-01-15",
      studioNotes: "Recorded in Studio A with full Qawwali ensemble. Captured the spiritual intensity perfectly.",
      technicalSpecs: "24-bit/96kHz, Neumann U87, Logic Pro X"
    },
    {
      id: 2,
      title: "Wahdat Symphony",
      writer: "Dr. Sarah Ahmed",
      vocalist: "Fatima Zahra",
      engineer: "Ryan Cole",
      language: "English",
      format: "anthem",
      thumbnail: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400",
      duration: "6:18",
      views: "8.7K",
      recordingDate: "2024-01-10",
      studioNotes: "Contemporary spiritual anthem with full orchestral arrangement. Mixed in Studio B.",
      technicalSpecs: "24-bit/48kHz, AKG C414, Pro Tools"
    },
    {
      id: 3,
      title: "Path of Fanaa",
      writer: "Ahmad Hassan",
      vocalist: "Ensemble Voice",
      engineer: "Lucas Ray",
      language: "Multilingual",
      format: "chant",
      thumbnail: "https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=400",
      duration: "5:45",
      views: "15.2K",
      recordingDate: "2024-01-08",
      studioNotes: "Multi-language chant with ensemble vocals. Recorded across multiple sessions.",
      technicalSpecs: "24-bit/96kHz, Multiple mics, Ableton Live"
    }
  ];

  const stats = [
    { number: "300+", label: "Studio Productions", icon: Music },
    { number: "25+", label: "Languages Recorded", icon: Globe },
    { number: "5", label: "Expert Engineers", icon: Users },
    { number: "127K+", label: "Total Views", icon: Eye }
  ];

  const filteredProductions = studioProductions.filter(production => {
    const matchesFilter = activeFilter === 'all' || production.format === activeFilter;
    const matchesSearch = production.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         production.writer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         production.vocalist.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
                  <span className="block text-emerald-400">Productions</span>
                </h1>
                <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed">
                  Explore our complete archive of sacred recordings produced at SufiPulse Studio. 
                  From traditional Qawwali to contemporary spiritual anthems.
                </p>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20">
                <p className="text-emerald-300 font-medium mb-2">Studio Excellence</p>
                <blockquote className="text-lg italic">
                  "Every production is a sacred ceremony, every recording a prayer in frequencies"
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
                  href="/studio-engineers"
                  className="inline-flex items-center justify-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
                >
                  <Users className="w-5 h-5" />
                  <span>Meet Engineers</span>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Studio Productions"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-20 h-20 bg-emerald-600/90 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </button>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-xl font-bold mb-2">Sacred Studio Archive</h3>
                  <p className="text-slate-200 text-sm">300+ professional recordings from our USA studio</p>
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

      {/* Search and Filters */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-slate-100">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search studio productions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                <Filter className="w-5 h-5 text-slate-500 flex-shrink-0" />
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all duration-200 ${
                      activeFilter === filter.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600'
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

            <div className="text-sm text-slate-600">
              Showing {filteredProductions.length} of {studioProductions.length} productions
            </div>
          </div>

          {/* Productions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProductions.map((production) => (
              <div key={production.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-slate-100">
                <div className="relative">
                  <img
                    src={production.thumbnail}
                    alt={production.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <span className="text-xs font-medium text-white bg-emerald-600 px-2 py-1 rounded-lg">
                      Studio Production
                    </span>
                    <div className="flex items-center space-x-1 text-white text-xs bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">
                      <Clock className="w-3 h-3" />
                      <span>{production.duration}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg mb-1">{production.title}</h3>
                    <div className="flex items-center justify-between text-white text-xs">
                      <span>{production.language}</span>
                      <div className="flex items-center space-x-2">
                        <Eye className="w-3 h-3" />
                        <span>{production.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-2 text-sm text-slate-600 mb-4">
                    <div><span className="font-medium">Writer:</span> {production.writer}</div>
                    <div><span className="font-medium">Vocalist:</span> {production.vocalist}</div>
                    <div><span className="font-medium">Engineer:</span> {production.engineer}</div>
                    <div><span className="font-medium">Recorded:</span> {production.recordingDate}</div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-lg p-3 mb-4">
                    <h4 className="font-medium text-slate-800 mb-1">Studio Notes</h4>
                    <p className="text-xs text-slate-600">{production.studioNotes}</p>
                  </div>

                  <div className="bg-emerald-50 rounded-lg p-3 mb-4">
                    <h4 className="font-medium text-emerald-800 mb-1">Technical Specs</h4>
                    <p className="text-xs text-emerald-700">{production.technicalSpecs}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                      {production.format}
                    </span>
                    <div className="flex space-x-2">
                      <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors">
                        <Play className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Experience Studio Excellence
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Every production represents our commitment to serving sacred poetry with technical excellence 
            and spiritual reverence. Submit your kalam and experience our studio's transformative power.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/writer/submit"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <Music className="w-5 h-5" />
              <span>Submit Your Kalam</span>
            </Link>
            <Link
              href="/studio"
              className="inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <Headphones className="w-5 h-5" />
              <span>Visit Our Studio</span>
            </Link>
            <Link
              href="/studio-engineers"
              className="inline-flex items-center space-x-2 border-2 border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <Users className="w-5 h-5" />
              <span>Meet Engineers</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudioProductions;