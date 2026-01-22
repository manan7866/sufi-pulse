'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  Globe, 
  User, 
  Mail, 
  Building, 
  Calendar, 
  FileText, 
  Camera,
  CheckCircle,
  ArrowRight,
  Award,
  Star,
  Heart,
  Users,
  BookOpen,
  Download
} from 'lucide-react';

const MediaPress = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mediaOrganization: '',
    role: '',
    mediaType: '',
    inquiryType: '',
    deadline: '',
    details: '',
    website: '',
    previousWork: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.mediaOrganization.trim()) newErrors.mediaOrganization = 'Media organization is required';
    if (!formData.role.trim()) newErrors.role = 'Your role is required';
    if (!formData.mediaType) newErrors.mediaType = 'Media type is required';
    if (!formData.inquiryType) newErrors.inquiryType = 'Inquiry type is required';
    if (!formData.details.trim()) newErrors.details = 'Media inquiry details are required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors below');
      return;
    }

    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Your media inquiry has been submitted successfully! Our media team will get back to you soon.');
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        mediaOrganization: '',
        role: '',
        mediaType: '',
        inquiryType: '',
        deadline: '',
        details: '',
        website: '',
        previousWork: ''
      });
    } catch (error) {
      toast.error('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { number: "50+", label: "Media Features", icon: Globe },
    { number: "25+", label: "Countries Covered", icon: Users },
    { number: "15+", label: "Languages Featured", icon: BookOpen },
    { number: "100%", label: "Authentic Stories", icon: Award }
  ];

  const mediaTypes = [
    'Print Media',
    'Online Publication',
    'Television',
    'Radio',
    'Podcast',
    'Documentary',
    'Academic Journal',
    'Blog/Website',
    'Social Media',
    'Other'
  ];

  const inquiryTypes = [
    'Interview Request',
    'Feature Story',
    'Press Release',
    'Documentary Collaboration',
    'Background Information',
    'Photo/Video Request',
    'Expert Commentary',
    'Event Coverage',
    'Research Assistance',
    'Other'
  ];

  const pressResources = [
    {
      title: "Official Press Kit",
      description: "High-resolution images, logos, and brand guidelines",
      type: "Download",
      icon: Download
    },
    {
      title: "Founder Biography",
      description: "Detailed background of Dr. Zarf-e-Noori and mission",
      type: "Document",
      icon: FileText
    },
    {
      title: "Mission Statement",
      description: "Our sacred commitment and global vision",
      type: "Document",
      icon: Heart
    },
    {
      title: "Impact Statistics",
      description: "Global reach, collaborations, and community metrics",
      type: "Data",
      icon: Star
    }
  ];

  const recentCoverage = [
    {
      outlet: "Spiritual Music Quarterly",
      title: "Bridging Cultures Through Sacred Sound",
      date: "2024-01-15",
      type: "Feature Article"
    },
    {
      outlet: "Global Faith Network",
      title: "Technology Serving the Sacred",
      date: "2024-01-10",
      type: "Interview"
    },
    {
      outlet: "Interfaith Dialogue Journal",
      title: "Kashmir's Mystical Heritage Goes Global",
      date: "2024-01-05",
      type: "Academic Feature"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <Globe className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Media &
              <span className="block text-emerald-400">Press</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20 max-w-4xl mx-auto"
            >
              <p className="text-xl text-slate-300 leading-relaxed mb-6">
                Share the story of SufiPulse with the world. We welcome media inquiries from journalists, 
                researchers, and content creators interested in our sacred mission.
              </p>
              <blockquote className="text-2xl font-light italic text-emerald-300 mb-4">
                "Every story shared amplifies our mission to connect hearts through divine expression"
              </blockquote>
              <p className="text-slate-300">
                Professional media resources and expert commentary available.
              </p>
            </motion.div>
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

      {/* Press Resources */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Press Resources
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Professional media assets and information for journalists and content creators
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {pressResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-slate-100 text-center hover:shadow-xl transition-all duration-300">
                  <Icon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2">{resource.title}</h3>
                  <p className="text-sm text-slate-600 mb-4">{resource.description}</p>
                  <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                    Access {resource.type} →
                  </button>
                </div>
              );
            })}
          </div>

          {/* Recent Coverage */}
          <div className="bg-slate-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Recent Media Coverage</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentCoverage.map((coverage, index) => (
                <div key={index} className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="text-sm text-emerald-600 font-medium mb-1">{coverage.outlet}</div>
                  <h4 className="font-bold text-slate-800 mb-2">{coverage.title}</h4>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{coverage.date}</span>
                    <span className="bg-slate-100 px-2 py-1 rounded">{coverage.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Media Inquiry Form */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Submit Media Inquiry
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Connect with our media team for interviews, features, and collaboration opportunities
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                    placeholder="Enter your full name"
                    required
                  />
                  {errors.fullName && <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                    placeholder="your.email@example.com"
                    required
                  />
                  {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Media Organization */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Media Organization *</label>
                  <input
                    type="text"
                    name="mediaOrganization"
                    value={formData.mediaOrganization}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                    placeholder="Name of your media organization"
                    required
                  />
                  {errors.mediaOrganization && <p className="text-sm text-red-600 mt-1">{errors.mediaOrganization}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Your Role *</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                    placeholder="e.g., Journalist, Producer, Editor"
                    required
                  />
                  {errors.role && <p className="text-sm text-red-600 mt-1">{errors.role}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Media Type *</label>
                  <select
                    name="mediaType"
                    value={formData.mediaType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                    required
                  >
                    <option value="">Select Media Type</option>
                    {mediaTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.mediaType && <p className="text-sm text-red-600 mt-1">{errors.mediaType}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Inquiry Type *</label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                    required
                  >
                    <option value="">Select Inquiry Type</option>
                    {inquiryTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.inquiryType && <p className="text-sm text-red-600 mt-1">{errors.inquiryType}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Deadline</label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Publication/Platform Website</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                    placeholder="https://your-publication.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Media Inquiry Details *</label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                  placeholder="Please describe your media inquiry, story angle, specific questions, or collaboration proposal..."
                  required
                />
                {errors.details && <p className="text-sm text-red-600 mt-1">{errors.details}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Previous Work/Portfolio</label>
                <textarea
                  name="previousWork"
                  value={formData.previousWork}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                  placeholder="Share links to relevant previous work or portfolio..."
                />
              </div>

              {/* Media Guidelines */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                <h4 className="font-medium text-emerald-800 mb-2">Media Guidelines</h4>
                <div className="text-sm text-emerald-700 space-y-1">
                  <p>• We respond to media inquiries within 48 hours during business days</p>
                  <p>• High-resolution images and press materials available upon request</p>
                  <p>• Interview availability subject to founder and team schedules</p>
                  <p>• We appreciate advance notice for filming or photography requests</p>
                  <p>• All coverage should respect the sacred nature of our mission</p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Globe className="w-5 h-5" />
                      <span>Submit Media Inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Share Our Sacred Story
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Help us amplify the message of global spiritual unity through your platform. 
            Together we can reach hearts that neither of us could touch alone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/about"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <BookOpen className="w-5 h-5" />
              <span>Learn Our Story</span>
            </Link>
            <Link
              href="/founder"
              className="inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <User className="w-5 h-5" />
              <span>Meet Our Founder</span>
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center space-x-2 border-2 border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <Camera className="w-5 h-5" />
              <span>View Our Work</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MediaPress;