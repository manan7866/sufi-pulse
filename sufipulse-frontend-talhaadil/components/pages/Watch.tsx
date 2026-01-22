'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Play, 
  Users, 
  Globe, 
  Heart, 
  Filter, 
  Search, 
  ArrowRight, 
  Star,
  Music,
  BookOpen,
  Award,
  CheckCircle,
  Eye,
  Clock
} from 'lucide-react';

const Watch = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');

  const featuredVideos = [
    {
      id: 1,
      title: "Ishq-e-Haqiqi",
      writer: "Amina Rahman",
      vocalist: "Muhammad Ali",
      thumbnail: "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=400",
      views: "12.5K",
      duration: "4:32",
      format: "Qawwali"
    },
    {
      id: 2,
      title: "Wahdat Symphony",
      writer: "Dr. Sarah Ahmed",
      vocalist: "Fatima Zahra",
      thumbnail: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400",
      views: "8.7K",
      duration: "6:18",
      format: "Anthem"
    },
    {
      id: 3,
      title: "Path of Fanaa",
      writer: "Ahmad Hassan",
      vocalist: "Ensemble Voice",
      thumbnail: "https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=400",
      views: "15.2K",
      duration: "5:45",
      format: "Chant"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      location: "London, UK",
      role: "Spiritual Seeker",
      quote: "These sacred videos have transformed my daily spiritual practice. Each kalam touches the soul in ways I never imagined possible.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Ahmed Hassan",
      location: "Cairo, Egypt",
      role: "Music Lover",
      quote: "The quality of production and spiritual depth in these videos is unmatched. SufiPulse has created something truly divine.",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Maria Rodriguez",
      location: "Barcelona, Spain",
      role: "Interfaith Practitioner",
      quote: "These videos bridge cultures and hearts. I share them with my interfaith community regularly.",
      image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200"
    }
  ];

  const stats = [
    { number: "156", label: "Sacred Videos", icon: Play },
    { number: "25+", label: "Languages Featured", icon: Globe },
    { number: "127K+", label: "Global Views", icon: Eye },
    { number: "50+", label: "Countries Reached", icon: Heart }
  ];

  const videoCategories = [
    {
      id: 'qawwali',
      title: 'Qawwali',
      description: 'Traditional Sufi devotional music with powerful vocals and rhythmic accompaniment',
      count: '43 videos'
    },
    {
      id: 'chant',
      title: 'Sacred Chants',
      description: 'Meditative chanting that elevates the soul and connects hearts to the Divine',
      count: '37 videos'
    },
    {
      id: 'anthem',
      title: 'Spiritual Anthems',
      description: 'Contemporary spiritual songs that inspire unity and divine connection',
      count: '28 videos'
    }
  ];

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
                  Watch Sacred
                  <span className="block text-emerald-400">Collaborations</span>
                </h1>
                <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed">
                  Experience divine kalam brought to life through global spiritual voices. 
                  From Qawwali to whisper kalam discover your soul's resonance.
                </p>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20">
                <p className="text-emerald-300 font-medium mb-2">Sacred Video Library</p>
                <blockquote className="text-lg italic">
                  "Every video is a bridge between hearts and the Divine"
                </blockquote>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/gallery?filter=featured"
                  className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Featured Videos</span>
                </Link>
                <Link
                  href="/gallery?filter=qawwali"
                  className="inline-flex items-center justify-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
                >
                  <Music className="w-5 h-5" />
                  <span>Browse Qawwali</span>
                </Link>
                <Link
                  href="/gallery"
                  className="inline-flex items-center justify-center space-x-2 border-2 border-white/30 hover:border-emerald-400 text-white hover:text-emerald-400 px-8 py-4 rounded-xl font-semibold transition-all duration-200"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>All Categories</span>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Sacred Video Collection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-20 h-20 bg-emerald-600/90 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </button>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-xl font-bold mb-2">Sacred Video Experience</h3>
                  <p className="text-slate-200 text-sm">Discover divine kalam from around the world</p>
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

      {/* Featured Videos */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Featured Sacred Videos
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experience the most beloved collaborations from our global spiritual community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredVideos.map((video) => (
              <div key={video.id} className="group cursor-pointer">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-slate-100">
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-emerald-600/90 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex justify-between items-end">
                        <div>
                          <h3 className="font-bold text-lg">{video.title}</h3>
                          <p className="text-sm opacity-90">by {video.writer}</p>
                        </div>
                        <div className="text-xs bg-black/40 backdrop-blur-sm px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>Vocalist: {video.vocalist}</span>
                      <span>{video.views} views</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/gallery"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <span>Explore All Videos</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Video Categories */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Sacred Video Categories
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover different forms of spiritual expression through our curated video collections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videoCategories.map((category, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Music className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">{category.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-3">{category.description}</p>
                <div className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                  {category.count}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/gallery"
              className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <span>Browse All Categories</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Voices from Our Global Audience
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Hear how our sacred videos touch hearts and transform lives around the world
            </p>
          </div>

          <div className="relative">
            <div className="bg-slate-800 rounded-2xl p-8 lg:p-12 text-white">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <blockquote className="text-2xl lg:text-3xl font-light italic leading-relaxed mb-6">
                    "{testimonials[activeTestimonial].quote}"
                  </blockquote>
                  <div>
                    <div className="font-bold text-xl text-emerald-300">
                      {testimonials[activeTestimonial].name}
                    </div>
                    <div className="text-slate-300">
                      {testimonials[activeTestimonial].role} • {testimonials[activeTestimonial].location}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <img
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].name}
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-4 ring-4 ring-emerald-400"
                  />
                </div>
              </div>
              
              <div className="flex justify-center space-x-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === activeTestimonial ? 'bg-emerald-400' : 'bg-slate-600 hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-8">
              Sacred Video Mission
            </h2>
            <div className="max-w-4xl mx-auto">
              <blockquote className="text-2xl lg:text-3xl font-light italic text-slate-700 leading-relaxed mb-8">
                "Every video is a window to the Divine, connecting hearts across cultures and continents."
              </blockquote>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Our video library serves as a bridge between the sacred and the everyday, offering viewers 
                around the world access to authentic Sufi wisdom through beautiful musical collaborations. 
                Each video represents a labor of love, bringing together writers, vocalists, and our production 
                team in service of the Divine message.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2">Free Access</h3>
                  <p className="text-sm text-slate-600">All videos freely available to the global community</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2">Multiple Languages</h3>
                  <p className="text-sm text-slate-600">Sacred content in 25+ languages</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2">Global Reach</h3>
                  <p className="text-sm text-slate-600">Touching hearts in 50+ countries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Experience Sacred Beauty?
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Immerse yourself in our collection of divine collaborations. From traditional Qawwali to contemporary 
            spiritual anthems, discover the video that speaks to your soul.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gallery"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <Play className="w-5 h-5" />
              <span>Start Watching</span>
            </Link>
            <Link
              href="/contact?type=writer"
              className="inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <Music className="w-5 h-5" />
              <span>Submit Your Kalam</span>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center space-x-2 border-2 border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <BookOpen className="w-5 h-5" />
              <span>Learn More</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Watch;