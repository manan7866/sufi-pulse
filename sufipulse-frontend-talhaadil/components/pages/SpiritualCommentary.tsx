'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Heart, 
  BookOpen, 
  Star, 
  Eye, 
  Calendar, 
  User, 
  Clock, 
  MessageCircle,
  ArrowRight,
  Play,
  Globe,
  Award,
  CheckCircle,
  Filter,
  Search,
  Share2,
  Bookmark
} from 'lucide-react';

const SpiritualCommentary = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const commentaries = [
    {
      id: 1,
      title: "The Spiritual Alchemy of 'Ishq-e-Haqiqi'",
      author: "Dr. Zarf-e-Noori",
      role: "Founder & Spiritual Director",
      date: "2024-01-20",
      category: "kalam-analysis",
      readTime: "15 min read",
      excerpt: "Amina Rahman's 'Ishq-e-Haqiqi' represents a perfect synthesis of classical Urdu mystical poetry and contemporary spiritual longing...",
      content: "In this profound kalam, we witness the eternal dance between the lover and the Beloved, expressed through the timeless language of Urdu mystical poetry. Each verse serves as a stepping stone on the path of divine love.",
      image: "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=400",
      views: "5.2K",
      comments: 89,
      featured: true,
      tags: ["Divine Love", "Classical Poetry", "Spiritual Analysis"]
    },
    {
      id: 2,
      title: "Unity in Diversity: The Global Language of Sacred Sound",
      author: "Dr. Amara Kumar",
      role: "Spiritual Director, Dr. Kumar Foundation",
      date: "2024-01-18",
      category: "philosophy",
      readTime: "12 min read",
      excerpt: "How SufiPulse's global collaborations demonstrate the universal nature of spiritual longing across cultures and languages...",
      content: "When a Kashmiri poet's words meet a Turkish vocalist's voice, something magical happens—the boundaries between cultures dissolve, revealing the universal heart of spiritual seeking.",
      image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400",
      views: "3.8K",
      comments: 67,
      tags: ["Unity", "Global Collaboration", "Cultural Bridge"]
    },
    {
      id: 3,
      title: "The Sacred Technology of Dhikr in Modern Production",
      author: "Prof. Hassan Al-Sufi",
      role: "Academic Advisor, Sufi Science Center",
      date: "2024-01-15",
      category: "spiritual-technology",
      readTime: "10 min read",
      excerpt: "Exploring how traditional dhikr practices inform our approach to rhythm, repetition, and spiritual resonance in studio production...",
      content: "Dhikr is not merely remembrance—it is a spiritual technology that transforms consciousness through sacred repetition. Our production methods honor this ancient wisdom.",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
      views: "4.1K",
      comments: 72,
      tags: ["Dhikr", "Sacred Technology", "Production"]
    },
    {
      id: 4,
      title: "Kashmir's Mystical Heritage in Contemporary Expression",
      author: "Zara Mir",
      role: "Kashmiri Cultural Preservationist",
      date: "2024-01-12",
      category: "heritage",
      readTime: "14 min read",
      excerpt: "How the mystical tradition of Kashmir finds new life through SufiPulse's global platform while maintaining its authentic essence...",
      content: "The valleys of Kashmir have always been a sanctuary for mystics. Today, through digital platforms, this sacred heritage reaches hearts across continents while preserving its essential spirit.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      views: "3.6K",
      comments: 58,
      tags: ["Kashmir", "Heritage", "Preservation"]
    },
    {
      id: 5,
      title: "The Metaphysics of Musical Collaboration",
      author: "Dr. Sarah Ahmed",
      role: "Contemporary Spiritual Poet",
      date: "2024-01-10",
      category: "collaboration",
      readTime: "9 min read",
      excerpt: "When sacred words meet divine voices, something beyond human creation emerges—a glimpse into the collaborative nature of divine creativity...",
      content: "True spiritual collaboration transcends individual ego, becoming a channel for divine creativity to manifest through human instruments. Each SufiPulse production exemplifies this sacred principle.",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
      views: "2.9K",
      comments: 45,
      tags: ["Collaboration", "Divine Creativity", "Metaphysics"]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Commentary', count: 18 },
    { id: 'kalam-analysis', label: 'Kalam Analysis', count: 5 },
    { id: 'philosophy', label: 'Spiritual Philosophy', count: 4 },
    { id: 'spiritual-technology', label: 'Sacred Technology', count: 3 },
    { id: 'heritage', label: 'Mystical Heritage', count: 3 },
    { id: 'collaboration', label: 'Divine Collaboration', count: 3 }
  ];

  const testimonials = [
    {
      name: "Dr. Hassan Al-Sufi",
      location: "Cairo, Egypt",
      role: "Islamic Scholar",
      quote: "These spiritual commentaries provide profound insights into the deeper meanings of sacred music and poetry. Essential reading for any serious seeker.",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Sister Fatima",
      location: "Istanbul, Turkey",
      role: "Sufi Teacher",
      quote: "The depth of spiritual analysis here helps me guide my students toward a deeper understanding of sacred expression and divine connection.",
      image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Brother Khalil",
      location: "Fez, Morocco",
      role: "Spiritual Practitioner",
      quote: "These commentaries illuminate the hidden dimensions of sacred music, revealing layers of meaning I never noticed before.",
      image: "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=200"
    }
  ];

  const stats = [
    { number: "18", label: "Deep Commentaries", icon: BookOpen },
    { number: "12", label: "Spiritual Themes", icon: Heart },
    { number: "8", label: "Contributing Scholars", icon: User },
    { number: "25K+", label: "Spiritual Insights Shared", icon: Star }
  ];

  const filteredCommentaries = commentaries.filter(commentary => {
    const matchesFilter = activeFilter === 'all' || commentary.category === activeFilter;
    const matchesSearch = commentary.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         commentary.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         commentary.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const featuredCommentary = commentaries.find(commentary => commentary.featured);

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
                  Spiritual
                  <span className="block text-emerald-400">Commentary</span>
                </h1>
                <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed">
                  Deep spiritual insights into sacred music, mystical poetry, and the divine art of 
                  collaboration. Exploring the hidden dimensions of our sacred productions.
                </p>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20">
                <p className="text-emerald-300 font-medium mb-2">Sacred Wisdom</p>
                <blockquote className="text-lg italic">
                  "Every kalam carries layers of meaning, every note a doorway to the Divine"
                </blockquote>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/gallery"
                  className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  <Play className="w-5 h-5" />
                  <span>Experience the Music</span>
                </Link>
                <Link
                  href="/writers"
                  className="inline-flex items-center justify-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
                >
                  <User className="w-5 h-5" />
                  <span>Meet Our Writers</span>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Spiritual Commentary"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-20 h-20 bg-emerald-600/90 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110">
                    <Heart className="w-8 h-8 text-white" />
                  </button>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-xl font-bold mb-2">Sacred Insights</h3>
                  <p className="text-slate-200 text-sm">Exploring the deeper meanings of divine expression</p>
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

      {/* Featured Commentary */}
      {featuredCommentary && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
                Featured Spiritual Commentary
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                A profound exploration of sacred meaning in our latest production
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative">
                  <img
                    src={featuredCommentary.image}
                    alt={featuredCommentary.title}
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
                      {featuredCommentary.category}
                    </span>
                    <span className="text-sm text-slate-500">{featuredCommentary.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">{featuredCommentary.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-slate-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{featuredCommentary.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(featuredCommentary.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-6">{featuredCommentary.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <span>{featuredCommentary.views} views</span>
                      <span>{featuredCommentary.comments} comments</span>
                    </div>
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                      Read Full Commentary
                    </button>
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
                placeholder="Search spiritual commentaries..."
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
              Showing {filteredCommentaries.length} of {commentaries.length} commentaries
            </div>
          </div>

          {/* Commentaries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCommentaries.map((commentary) => (
              <div key={commentary.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-slate-100">
                <div className="relative">
                  <img
                    src={commentary.image}
                    alt={commentary.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <span className="text-xs font-medium text-white bg-emerald-600 px-2 py-1 rounded-lg">
                      {commentary.category}
                    </span>
                    <div className="flex items-center space-x-1 text-white text-xs bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">
                      <Clock className="w-3 h-3" />
                      <span>{commentary.readTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-3 line-clamp-2">{commentary.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
                    <User className="w-4 h-4" />
                    <span>{commentary.author}</span>
                  </div>
                  <div className="text-xs text-slate-500 mb-3">{commentary.role}</div>
                  <div className="flex items-center space-x-2 text-sm text-slate-500 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(commentary.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">{commentary.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {commentary.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-slate-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{commentary.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{commentary.comments}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors">
                        <Bookmark className="w-4 h-4" />
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

          <div className="text-center mt-12">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors duration-200">
              Load More Commentaries
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Community Impact
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              How our spiritual commentaries deepen understanding and enhance practice
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

      {/* Call to Action */}
      <section className="py-20 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Deepen Your Spiritual Understanding
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Explore the hidden dimensions of sacred music and poetry through our spiritual commentaries. 
            Join our community to access deeper insights and contribute your own spiritual reflections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/join"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <Heart className="w-5 h-5" />
              <span>Join Community</span>
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <Play className="w-5 h-5" />
              <span>Experience the Music</span>
            </Link>
           
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpiritualCommentary;