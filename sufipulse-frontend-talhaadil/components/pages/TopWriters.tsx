'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Star, 
  MapPin, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Eye, 
  Heart,
  ArrowRight,
  Users,
  Globe,
  CheckCircle,
  Play,
  PenTool
} from 'lucide-react';

const TopWriters = () => {
  const [sortBy, setSortBy] = useState('rating');
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const topWriters = [
    {
      id: 1,
      name: "Amina Rahman",
      location: "Karachi, Pakistan",
      languages: ["Urdu", "English"],
      speciality: "Classical Urdu Poetry",
      sufOrder: "Chishti",
      bio: "Master of classical Urdu poetry, weaving traditional Sufi themes with contemporary spiritual insights.",
      kalams: 12,
      rating: 4.9,
      totalViews: "45.2K",
      totalLikes: "3.8K",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200",
      themes: ["Ishq-e-Haqiqi", "Wahdat", "Tawbah", "Divine Unity"],
      recentWork: "Ishq-e-Haqiqi",
      joinedDate: "2023",
      rank: 1
    },
    {
      id: 2,
      name: "Ahmad Hassan",
      location: "Damascus, Syria",
      languages: ["Arabic", "English", "Turkish"],
      speciality: "Multilingual Mystical Verses",
      sufOrder: "Mevlevi",
      bio: "Master of multilingual expression, creating bridges between cultures through sacred poetry.",
      kalams: 15,
      rating: 4.9,
      totalViews: "52.1K",
      totalLikes: "4.2K",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200",
      themes: ["Fanaa", "Whirling Mysticism", "Cross-cultural Unity", "Sacred Dance"],
      recentWork: "Path of Fanaa",
      joinedDate: "2022",
      rank: 2
    },
    {
      id: 3,
      name: "Dr. Sarah Ahmed",
      location: "London, UK",
      languages: ["English", "Urdu"],
      speciality: "Contemporary Spiritual Poetry",
      sufOrder: "Naqshbandi",
      bio: "Academic and poet exploring the intersection of modern spirituality and traditional Sufi wisdom.",
      kalams: 8,
      rating: 4.8,
      totalViews: "38.7K",
      totalLikes: "3.1K",
      image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200",
      themes: ["Climate Spirituality", "Unity", "Modern Mysticism", "Sacred Ecology"],
      recentWork: "Wahdat Symphony",
      joinedDate: "2023",
      rank: 3
    }
  ];

  const testimonials = [
    {
      name: "Zara Mir",
      location: "Srinagar, Kashmir",
      role: "Emerging Writer",
      quote: "Seeing the top writers' journeys inspires me daily. Their dedication to sacred poetry shows what's possible when divine words meet global hearts.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Hassan Al-Maghribi",
      location: "Fez, Morocco",
      role: "Traditional Poet",
      quote: "The top writers represent the best of our global Sufi community. Their success motivates us all to reach higher spiritual expression.",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Maria Santos",
      location: "Barcelona, Spain",
      role: "Interfaith Writer",
      quote: "These writers bridge cultures and hearts through their sacred words. They show how Sufi poetry can unite the world.",
      image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200"
    }
  ];

  const stats = [
    { number: "89", label: "Total Writers", icon: Users },
    { number: "300+", label: "Kalam Created", icon: BookOpen },
    { number: "25+", label: "Languages", icon: Globe },
    { number: "127K+", label: "Total Views", icon: Eye }
  ];

  const getRankBadge = (rank: number) => {
    const colors = {
      1: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      2: 'bg-gray-100 text-gray-800 border-gray-200',
      3: 'bg-orange-100 text-orange-800 border-orange-200'
    };
    
    return colors[rank as keyof typeof colors] || 'bg-emerald-100 text-emerald-800 border-emerald-200';
  };

  const sortOptions = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'views', label: 'Most Views' },
    { value: 'kalams', label: 'Most Kalams' },
    { value: 'recent', label: 'Recently Joined' }
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
                  Top Sufi
                  <span className="block text-emerald-400">Writers</span>
                </h1>
                <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed">
                  Celebrating the most impactful voices in our global spiritual community. 
                  Discover the writers whose sacred words touch hearts across continents.
                </p>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20">
                <p className="text-emerald-300 font-medium mb-2">Global Recognition</p>
                <blockquote className="text-lg italic">
                  "Excellence in sacred poetry, measured by hearts touched worldwide"
                </blockquote>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/writers"
                  className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  <Users className="w-5 h-5" />
                  <span>Browse All Writers</span>
                </Link>
                <Link
                  href="/contact?type=writer"
                  className="inline-flex items-center justify-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
                >
                  <PenTool className="w-5 h-5" />
                  <span>Submit Your Kalam</span>
                </Link>
                <Link
                  href="/gallery"
                  className="inline-flex items-center justify-center space-x-2 border-2 border-white/30 hover:border-emerald-400 text-white hover:text-emerald-400 px-8 py-4 rounded-xl font-semibold transition-all duration-200"
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Their Works</span>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Top Writers Celebration"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-20 h-20 bg-emerald-600/90 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110">
                    <Award className="w-8 h-8 text-white" />
                  </button>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-xl font-bold mb-2">Celebrating Excellence</h3>
                  <p className="text-slate-200 text-sm">Honoring the voices that inspire global spiritual awakening</p>
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

      {/* Top 3 Podium */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Top 3 Sacred Voices
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Celebrating the writers whose divine words have touched the most hearts worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Second Place */}
            <div className="md:order-1 transform md:translate-y-8">
              <div className="bg-white rounded-2xl shadow-xl p-6 text-center border-2 border-gray-200">
                <div className="relative mb-4">
                  <img
                    src={topWriters[1].image}
                    alt={topWriters[1].name}
                    className="w-20 h-20 rounded-full object-cover mx-auto ring-4 ring-gray-200"
                  />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">{topWriters[1].name}</h3>
                <p className="text-sm text-slate-600 mb-2">{topWriters[1].location}</p>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{topWriters[1].rating}</span>
                </div>
                <p className="text-xs text-slate-500">{topWriters[1].kalams} Kalams • {topWriters[1].totalViews} Views</p>
              </div>
            </div>

            {/* First Place */}
            <div className="md:order-2">
              <div className="bg-white rounded-2xl shadow-2xl p-8 text-center border-2 border-yellow-300 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">
                  👑
                </div>
                <div className="relative mb-6">
                  <img
                    src={topWriters[0].image}
                    alt={topWriters[0].name}
                    className="w-24 h-24 rounded-full object-cover mx-auto ring-4 ring-yellow-300"
                  />
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{topWriters[0].name}</h3>
                <p className="text-slate-600 mb-3">{topWriters[0].location}</p>
                <div className="flex items-center justify-center space-x-1 mb-3">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-bold text-lg">{topWriters[0].rating}</span>
                </div>
                <p className="text-sm text-slate-500 mb-4">{topWriters[0].kalams} Kalams • {topWriters[0].totalViews} Views</p>
                <div className="bg-yellow-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-yellow-800">Most Celebrated Writer</p>
                </div>
              </div>
            </div>

            {/* Third Place */}
            <div className="md:order-3 transform md:translate-y-8">
              <div className="bg-white rounded-2xl shadow-xl p-6 text-center border-2 border-orange-200">
                <div className="relative mb-4">
                  <img
                    src={topWriters[2].image}
                    alt={topWriters[2].name}
                    className="w-20 h-20 rounded-full object-cover mx-auto ring-4 ring-orange-200"
                  />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">{topWriters[2].name}</h3>
                <p className="text-sm text-slate-600 mb-2">{topWriters[2].location}</p>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{topWriters[2].rating}</span>
                </div>
                <p className="text-xs text-slate-500">{topWriters[2].kalams} Kalams • {topWriters[2].totalViews} Views</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/writers"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <span>View All Writers</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Writer Recognition */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Recognition Criteria
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              How we celebrate excellence in sacred poetry and global spiritual impact
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Spiritual Quality</h3>
              <p className="text-slate-600 leading-relaxed">
                Depth of spiritual insight and authentic connection to Sufi tradition in their sacred poetry
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Global Impact</h3>
              <p className="text-slate-600 leading-relaxed">
                Reach and resonance of their kalam across cultures, languages, and spiritual communities worldwide
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Community Love</h3>
              <p className="text-slate-600 leading-relaxed">
                Appreciation from our global community through views, shares, and spiritual testimonials
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/contact?type=writer"
              className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <span>Join Our Writers</span>
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
              Community Inspiration
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              How our top writers inspire the global SufiPulse community
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
              Celebrating Sacred Excellence
            </h2>
            <div className="max-w-4xl mx-auto">
              <blockquote className="text-2xl lg:text-3xl font-light italic text-slate-700 leading-relaxed mb-8">
                "Excellence in sacred poetry is measured not by fame, but by hearts touched and souls awakened."
              </blockquote>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Our top writers represent the pinnacle of spiritual expression in our global community. 
                They demonstrate how authentic Sufi poetry can transcend cultural boundaries, touch hearts 
                across continents, and inspire spiritual awakening in diverse communities worldwide.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2">Spiritual Authenticity</h3>
                  <p className="text-sm text-slate-600">Deep connection to Sufi tradition and wisdom</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2">Global Resonance</h3>
                  <p className="text-sm text-slate-600">Poetry that speaks to hearts across cultures</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2">Community Impact</h3>
                  <p className="text-sm text-slate-600">Inspiring others through sacred expression</p>
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
            Ready to Join Our Celebrated Writers?
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Every top writer started with a single sacred verse. Share your divine poetry with our global 
            community and begin your journey toward spiritual recognition and worldwide impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?type=writer"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <PenTool className="w-5 h-5" />
              <span>Submit Your Kalam</span>
            </Link>
            <Link
              href="/writers"
              className="inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <Users className="w-5 h-5" />
              <span>Browse All Writers</span>
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center space-x-2 border-2 border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <Play className="w-5 h-5" />
              <span>Watch Their Works</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TopWriters;