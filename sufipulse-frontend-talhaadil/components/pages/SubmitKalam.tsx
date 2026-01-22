'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  PenTool, 
  User, 
  Mail, 
  MapPin, 
  Globe, 
  BookOpen, 
  Heart,
  CheckCircle,
  ArrowRight,
  Users,
  Award,
  Star
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';

const SubmitKalam = () => {
  const {showToast} = useToast()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    location: '',
    kalamTitle: '',
    language: '',
    theme: '',
    kalamText: '',
    description: '',
    sufInfluence: '',
    musicPreference: '',
    acceptTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.kalamTitle.trim()) newErrors.kalamTitle = 'Kalam title is required';
    if (!formData.language) newErrors.language = 'Language is required';
    if (!formData.theme) newErrors.theme = 'Theme is required';
    if (!formData.kalamText.trim()) newErrors.kalamText = 'Kalam text is required';
    if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast('Please fix the errors below');
      return;
    }

    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      showToast('Your kalam has been submitted successfully!');
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        location: '',
        kalamTitle: '',
        language: '',
        theme: '',
        kalamText: '',
        description: '',
        sufInfluence: '',
        musicPreference: '',
        acceptTerms: false
      });
    } catch (error) {
      toast.error('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { number: "300+", label: "Kalam Submitted", icon: BookOpen },
    { number: "89", label: "Active Writers", icon: Users },
    { number: "25+", label: "Languages", icon: Globe },
    { number: "100%", label: "Free Service", icon: Award }
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
              <PenTool className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Submit Your Sacred
              <span className="block text-emerald-400">Kalam</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20 max-w-4xl mx-auto"
            >
              <p className="text-xl text-slate-300 leading-relaxed mb-6">
                Share your divine poetry with our global spiritual community. We handle everything from 
                musical arrangement to vocalist selection, recording, and worldwide distribution.
              </p>
              <blockquote className="text-2xl font-light italic text-emerald-300 mb-4">
                "We don't sell divine lyrics. We amplify them."
              </blockquote>
              <p className="text-slate-300">
                Submit your kalam and let the world hear its pulse completely free.
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

      {/* Submission Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Share Your Divine Poetry
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Submit your sacred kalam and join our global community of Sufi writers
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
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

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                  placeholder="City, Country"
                  required
                />
                {errors.location && <p className="text-sm text-red-600 mt-1">{errors.location}</p>}
              </div>

              {/* Kalam Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Kalam Title *</label>
                  <input
                    type="text"
                    name="kalamTitle"
                    value={formData.kalamTitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                    placeholder="Title of your sacred poetry"
                    required
                  />
                  {errors.kalamTitle && <p className="text-sm text-red-600 mt-1">{errors.kalamTitle}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Language *</label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                    required
                  >
                    <option value="">Select Language</option>
                    <option value="urdu">Urdu</option>
                    <option value="english">English</option>
                    <option value="arabic">Arabic</option>
                    <option value="persian">Persian</option>
                    <option value="turkish">Turkish</option>
                    <option value="kashmiri">Kashmiri</option>
                    <option value="multilingual">Multilingual</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.language && <p className="text-sm text-red-600 mt-1">{errors.language}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Theme *</label>
                <select
                  name="theme"
                  value={formData.theme}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                  required
                >
                  <option value="">Select Theme</option>
                  <option value="ishq-e-haqiqi">Ishq-e-Haqiqi (Divine Love)</option>
                  <option value="wahdat">Wahdat (Unity)</option>
                  <option value="fanaa">Fanaa (Spiritual Dissolution)</option>
                  <option value="tawbah">Tawbah (Repentance)</option>
                  <option value="dhikr">Dhikr & Remembrance</option>
                  <option value="climate-spirituality">Climate Spirituality</option>
                  <option value="kashmiri-heritage">Kashmiri Heritage</option>
                  <option value="spiritual-journey">Spiritual Journey</option>
                  <option value="other">Other</option>
                </select>
                {errors.theme && <p className="text-sm text-red-600 mt-1">{errors.theme}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Your Kalam *</label>
                <textarea
                  name="kalamText"
                  value={formData.kalamText}
                  onChange={handleInputChange}
                  rows={8}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                  placeholder="Enter your sacred poetry here..."
                  required
                />
                {errors.kalamText && <p className="text-sm text-red-600 mt-1">{errors.kalamText}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description/Inspiration</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                  placeholder="Tell us about the inspiration or meaning behind your kalam..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Sufi Influence/Lineage</label>
                  <input
                    type="text"
                    name="sufInfluence"
                    value={formData.sufInfluence}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                    placeholder="e.g., Chishti, Naqshbandi, Mevlevi"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Musical Preference</label>
                  <select
                    name="musicPreference"
                    value={formData.musicPreference}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                  >
                    <option value="">Open to Direction</option>
                    <option value="qawwali">Qawwali</option>
                    <option value="chant">Sacred Chant</option>
                    <option value="anthem">Spiritual Anthem</option>
                    <option value="whisper">Whisper Kalam</option>
                  </select>
                </div>
              </div>

              {/* Sacred Commitment */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                <h4 className="font-medium text-emerald-800 mb-2">Sacred Consent & Digital Niyaz</h4>
                <p className="text-sm text-emerald-700 mb-4">
                  I submit this kalam as an offering to the global ummah. I understand SufiPulse may respectfully 
                  adapt it for musical production and assign vocalists as appropriate. I grant SufiPulse a perpetual 
                  non-commercial license to produce, publish, and promote this work in sacred service. My authorship 
                  will always be honored and prominently credited.
                </p>
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="mt-1 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                    required
                  />
                  <span className="text-sm text-emerald-800">
                    I understand and accept this sacred commitment *
                  </span>
                </label>
                {errors.acceptTerms && <p className="text-sm text-red-600 mt-1">{errors.acceptTerms}</p>}
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
                      <PenTool className="w-5 h-5" />
                      <span>Submit Sacred Kalam</span>
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
            Join Our Sacred Community
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            After submitting your kalam, consider joining our community to track your submissions 
            and connect with other spiritual writers and vocalists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/join"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <Users className="w-5 h-5" />
              <span>Join Community</span>
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <BookOpen className="w-5 h-5" />
              <span>How It Works</span>
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center space-x-2 border-2 border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <Star className="w-5 h-5" />
              <span>View Gallery</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubmitKalam;