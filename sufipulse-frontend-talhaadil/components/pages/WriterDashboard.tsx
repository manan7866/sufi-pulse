'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  FileText, 
  TrendingUp,
  Bell,
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  Share2,
  ArrowRight,
  Users,
  Award,
  Heart,
  Play
} from 'lucide-react';

const WriterDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const mySubmissions = [
    {
      id: 1,
      title: "Whispers of Divine Love",
      submitted: "2 hours ago",
      status: "editorial_review",
      language: "Urdu",
      musicType: "Qawwali",
      views: "0",
      progress: 25
    },
    {
      id: 2,
      title: "Unity in Silence",
      submitted: "1 day ago",
      status: "music_direction",
      language: "English",
      musicType: "Chant",
      views: "0",
      progress: 45
    },
    {
      id: 3,
      title: "Journey to the Beloved",
      submitted: "2 days ago",
      status: "vocalist_assigned",
      language: "Arabic",
      musicType: "Anthem",
      views: "0",
      progress: 65
    },
    {
      id: 4,
      title: "Sacred Breath",
      submitted: "1 week ago",
      status: "recording",
      language: "Turkish",
      musicType: "Whisper Kalam",
      views: "0",
      progress: 85
    },
    {
      id: 5,
      title: "Ishq-e-Haqiqi",
      submitted: "2 weeks ago",
      status: "published",
      language: "Urdu",
      musicType: "Qawwali",
      views: "12.5K",
      progress: 100
    }
  ];

  const testimonials = [
    {
      name: "Amina Rahman",
      location: "Karachi, Pakistan",
      role: "Featured Writer",
      quote: "The dashboard makes tracking my spiritual journey so simple. Seeing my kalam transform from words to global inspiration is truly divine.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Dr. Sarah Ahmed",
      location: "London, UK",
      role: "Contemporary Poet",
      quote: "Having complete visibility into the production process while maintaining the sacred nature of the work is remarkable.",
      image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Ahmad Hassan",
      location: "Damascus, Syria",
      role: "Multilingual Writer",
      quote: "The dashboard connects me with the global SufiPulse community while honoring the individual journey of each kalam.",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200"
    }
  ];

  const stats = [
    { number: "5", label: "Total Submissions", icon: FileText },
    { number: "1", label: "Published Works", icon: CheckCircle },
    { number: "12.5K", label: "Total Views", icon: Eye },
    { number: "4", label: "In Progress", icon: Clock }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      editorial_review: { color: 'bg-amber-100 text-amber-700', label: 'Editorial Review' },
      music_direction: { color: 'bg-blue-100 text-blue-700', label: 'Music Direction' },
      vocalist_assigned: { color: 'bg-purple-100 text-purple-700', label: 'Vocalist Assigned' },
      recording: { color: 'bg-indigo-100 text-indigo-700', label: 'Recording' },
      mixing: { color: 'bg-orange-100 text-orange-700', label: 'Mixing' },
      final_review: { color: 'bg-pink-100 text-pink-700', label: 'Final Review' },
      published: { color: 'bg-emerald-100 text-emerald-700', label: 'Published' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.editorial_review;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'submissions', label: 'My Submissions', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-center space-x-4 mb-6">
                <img 
                  src="/Untitled (250 x 250 px) (1).png" 
                  alt="SufiPulse Logo" 
                  className="w-16 h-16 rounded-2xl shadow-2xl object-contain bg-white p-2"
                />
                <div>
                  <h1 className="text-2xl font-bold text-emerald-400">SufiPulse</h1>
                  <p className="text-emerald-300 text-sm">Writer Studio</p>
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Writer
                  <span className="block text-emerald-400">Dashboard</span>
                </h2>
                <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed">
                  Welcome back, Amina Rahman. Manage your sacred collaborations and track 
                  your spiritual journey from divine inspiration to global impact.
                </p>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20">
                <p className="text-emerald-300 font-medium mb-2">Your Sacred Journey</p>
                <blockquote className="text-lg italic">
                  "Track every step from submission to global hearts"
                </blockquote>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact?type=writer"
                  className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  <Plus className="w-5 h-5" />
                  <span>Submit New Kalam</span>
                </Link>
                <Link
                  href="/gallery"
                  className="inline-flex items-center justify-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
                >
                  <Play className="w-5 h-5" />
                  <span>View My Published Works</span>
                </Link>
                <Link
                  href="/writers"
                  className="inline-flex items-center justify-center space-x-2 border-2 border-white/30 hover:border-emerald-400 text-white hover:text-emerald-400 px-8 py-4 rounded-xl font-semibold transition-all duration-200"
                >
                  <Users className="w-5 h-5" />
                  <span>Writer Community</span>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Writer Dashboard"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-20 h-20 bg-emerald-600/90 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110">
                    <LayoutDashboard className="w-8 h-8 text-white" />
                  </button>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-xl font-bold mb-2">Your Creative Hub</h3>
                  <p className="text-slate-200 text-sm">Manage submissions and track your spiritual impact</p>
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

      {/* Dashboard Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Your Recent Submissions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Track the journey of your sacred kalam from submission to global publication
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mySubmissions.slice(0, 3).map((submission) => (
              <div key={submission.id} className="group cursor-pointer">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-slate-100">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-800 mb-2">{submission.title}</h3>
                        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-2">
                          <Clock className="w-3 h-3" />
                          <span>{submission.submitted}</span>
                          <span>•</span>
                          <span>{submission.language}</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        {getStatusBadge(submission.status)}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                        <span>Progress</span>
                        <span>{submission.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${submission.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {submission.status === 'published' && (
                      <div className="flex items-center justify-between bg-emerald-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2">
                          <Eye className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm font-medium text-emerald-800">{submission.views} views</span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                            <Share2 className="w-4 h-4" />
                            <span>Share</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/dashboard"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <span>View Full Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Dashboard Features */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Dashboard Features
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to manage your sacred writing journey in one place
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sidebarItems.slice(0, 3).map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{item.label}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {item.id === 'overview' && "Complete overview of your submissions and their progress"}
                    {item.id === 'submissions' && "Detailed tracking of all your kalam submissions"}
                    {item.id === 'analytics' && "Insights into your published works' global impact"}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/dashboard"
              className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <span>Access Full Dashboard</span>
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
              Writer Dashboard Experience
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Hear from writers who use the dashboard to manage their spiritual journey
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
              Your Sacred Writing Hub
            </h2>
            <div className="max-w-4xl mx-auto">
              <blockquote className="text-2xl lg:text-3xl font-light italic text-slate-700 leading-relaxed mb-8">
                "Every submission is a sacred trust, every dashboard update a step closer to global hearts."
              </blockquote>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Your writer dashboard is more than a management tool—it's your spiritual command center. 
                Track the divine journey of your kalam from initial submission through global publication, 
                connecting with our community while maintaining the sacred nature of your creative process.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2">Real-time Tracking</h3>
                  <p className="text-sm text-slate-600">Follow your kalam's journey at every step</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2">Global Impact</h3>
                  <p className="text-sm text-slate-600">See how your words touch hearts worldwide</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2">Community Connection</h3>
                  <p className="text-sm text-slate-600">Connect with fellow writers and vocalists</p>
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
            Ready to Access Your Dashboard?
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Join our community of sacred writers and gain access to your personal dashboard. 
            Track your submissions, connect with the community, and watch your divine words reach the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Access Dashboard</span>
            </Link>
            <Link
              href="/contact?type=writer"
              className="inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              <span>Submit First Kalam</span>
            </Link>
            <Link
              href="/writers"
              className="inline-flex items-center space-x-2 border-2 border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <Users className="w-5 h-5" />
              <span>Join Community</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WriterDashboard;