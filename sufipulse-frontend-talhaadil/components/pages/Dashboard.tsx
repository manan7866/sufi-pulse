'use client'

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Mic, 
  PlayCircle, 
  Settings, 
  Bell, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Plus,
  Download,
  Share2,
  Edit,
  Trash2
} from 'lucide-react';
import Link from 'next/link'
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userRole] = useState('writer'); // This would come from authentication

  const stats = [
    {
      title: "Total Kalam",
      value: "156",
      change: "+12 this month",
      trend: "up",
      icon: FileText,
      color: "text-emerald-600 bg-emerald-50"
    },
    {
      title: "Active Writers",
      value: "89",
      change: "+7 new writers",
      trend: "up",
      icon: Users,
      color: "text-slate-600 bg-slate-50"
    },
    {
      title: "Vocalists Pool",
      value: "43",
      change: "+3 this week",
      trend: "up",
      icon: Mic,
      color: "text-emerald-600 bg-emerald-50"
    },
    {
      title: "Total Views",
      value: "127K",
      change: "+18% this month",
      trend: "up",
      icon: Eye,
      color: "text-slate-600 bg-slate-50"
    }
  ];

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

  const recentActivity = [
    {
      id: 1,
      type: "submission",
      message: 'Your kalam "Whispers of Divine Love" is under editorial review',
      time: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      type: "collaboration",
      message: "Vocal recording completed for 'Sacred Breath'",
      time: "1 day ago",
      unread: true
    },
    {
      id: 3,
      type: "production",
      message: "Final mix approved for 'Journey to the Beloved'",
      time: "2 days ago",
      unread: false
    },
    {
      id: 4,
      type: "published",
      message: "Your kalam 'Ishq-e-Haqiqi' has been published and is live!",
      time: "2 weeks ago",
      unread: false
    }
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
    { id: 'collaborations', label: 'Collaborations', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <img 
                src="/Untitled (250 x 250 px) (1).png" 
                alt="SufiPulse Logo" 
                className="w-20 h-20 rounded-2xl shadow-2xl object-contain bg-white p-3"
              />
              <div className="text-center">
                <h1 className="text-3xl font-bold text-emerald-400">SufiPulse</h1>
                <p className="text-emerald-300">Community Dashboard</p>
              </div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              SufiPulse
              <span className="block text-emerald-400">Dashboard</span>
            </h2>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 max-w-3xl mx-auto">
              <p className="text-xl text-slate-300 leading-relaxed">
                Welcome back! Manage your sacred collaborations and track your spiritual journey 
                through our comprehensive dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Amina Rahman</h3>
                  <p className="text-sm text-slate-600 capitalize">{userRole}</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeTab === item.id
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <button className="w-full flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors duration-200">
                  <Plus className="w-4 h-4" />
                  <span>Submit New Kalam</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</div>
                          <div className="text-sm text-slate-600 mb-2">{stat.title}</div>
                          <div className="text-xs text-green-600">{stat.change}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {/* My Recent Submissions */}
                  <div className="bg-white rounded-2xl shadow-lg border border-slate-100">
                    <div className="p-6 border-b border-slate-100">
                      <h3 className="text-lg font-bold text-slate-800">Recent Submissions</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {mySubmissions.slice(0, 3).map((submission) => (
                          <div key={submission.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-semibold text-slate-800 mb-1">{submission.title}</h4>
                              <div className="flex items-center space-x-2 text-xs text-slate-500 mb-2">
                                <Clock className="w-3 h-3" />
                                <span>{submission.submitted}</span>
                                <span>•</span>
                                <span>{submission.language}</span>
                              </div>
                              <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                                <div 
                                  className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${submission.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="ml-4">
                              {getStatusBadge(submission.status)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Activity Feed */}
                  <div className="bg-white rounded-2xl shadow-lg border border-slate-100">
                    <div className="p-6 border-b border-slate-100">
                      <h3 className="text-lg font-bold text-slate-800">Recent Activity</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {recentActivity.map((activity) => (
                          <div key={activity.id} className={`p-4 rounded-lg border ${
                            activity.unread ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'
                          }`}>
                            <div className="flex items-start space-x-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                activity.unread ? 'bg-emerald-500' : 'bg-slate-300'
                              }`}></div>
                              <div className="flex-1">
                                <p className="text-slate-800 mb-1">{activity.message}</p>
                                <div className="flex items-center space-x-2 text-xs text-slate-500">
                                  <Clock className="w-3 h-3" />
                                  <span>{activity.time}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'submissions' && (
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100">
                <div className="p-6 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-800">My Submissions</h3>
                    <button className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                      <Plus className="w-4 h-4" />
                      <span>New Submission</span>
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {mySubmissions.map((submission) => (
                      <div key={submission.id} className="border border-slate-200 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-bold text-slate-800 mb-2">{submission.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-slate-600">
                              <span>Language: {submission.language}</span>
                              <span>Style: {submission.musicType}</span>
                              <span>Submitted: {submission.submitted}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(submission.status)}
                            <div className="flex space-x-1">
                              <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
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
                                <Link href={`/gallery/${submission.id}`} className="flex items-center space-x-1">
                                  <Share2 className="w-4 h-4" />
                                  <span>View</span>
                                </Link>
                              </button>
                              <button className="flex items-center space-x-1 text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                                <Link href={`/gallery/${submission.id}/download`} className="flex items-center space-x-1">
                                  <Download className="w-4 h-4" />
                                  <span>Download</span>
                                </Link>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800">Notifications</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentActivity.map((notification) => (
                      <div key={notification.id} className={`p-4 rounded-lg border ${
                        notification.unread ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.unread ? 'bg-emerald-500' : 'bg-slate-300'
                          }`}></div>
                          <div className="flex-1">
                            <p className="text-slate-800 mb-1">{notification.message}</p>
                            <div className="flex items-center space-x-2 text-xs text-slate-500">
                              <Clock className="w-3 h-3" />
                              <span>{notification.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {(activeTab !== 'overview' && activeTab !== 'submissions' && activeTab !== 'notifications') && (
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Section Under Development</h3>
                <p className="text-slate-600">
                  This dashboard section is being crafted with the same care and attention as our sacred kalam. 
                  Check back soon for updates.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;