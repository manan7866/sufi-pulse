'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  Mic, 
  User, 
  Mail, 
  MapPin, 
  Volume2, 
  Music, 
  Heart,
  CheckCircle,
  ArrowRight,
  Users,
  Award,
  Star,
  Globe
} from 'lucide-react';

const JoinVocalistPool = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    location: '',
    vocalRange: '',
    languages: '',
    specialties: '',
    experience: '',
    bio: '',
    availability: '',
    portfolio: '',
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
    if (!formData.vocalRange) newErrors.vocalRange = 'Vocal range is required';
    if (!formData.languages.trim()) newErrors.languages = 'Languages are required';
    if (!formData.bio.trim()) newErrors.bio = 'Bio is required';
    if (!formData.availability) newErrors.availability = 'Availability is required';
    if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms';

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
      toast.success('Your vocalist application has been submitted successfully! We will review it and get back to you soon.');
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        location: '',
        vocalRange: '',
        languages: '',
        specialties: '',
        experience: '',
        bio: '',
        availability: '',
        portfolio: '',
        acceptTerms: false
      });
    } catch (error) {
      toast.error('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { number: "43", label: "Active Vocalists", icon: Mic },
    { number: "15+", label: "Languages", icon: Globe },
    { number: "200+", label: "Collaborations", icon: Music },
    { number: "100%", label: "Free Service", icon: Award }
  ];

  const vocalRanges = [
    'Soprano',
    'Mezzo-Soprano', 
    'Alto',
    'Tenor',
    'Baritone',
    'Bass'
  ];

  const specialties = [
    'Qawwali',
    'Sufi Chants',
    'Arabic Spiritual',
    'Contemporary Spiritual',
    'Traditional Dhikr',
    'Multilingual Performance',
    'Whisper Kalam',
    'Sacred Recitation'
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
              <Mic className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Join Our Sacred
              <span className="block text-emerald-400">Vocalist Pool</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20 max-w-4xl mx-auto"
            >
              <p className="text-xl text-slate-300 leading-relaxed mb-6">
                Lend your voice to divine words and bring sacred poetry to life. Join our global 
                community of vocalists who collaborate with writers from around the world.
              </p>
              <blockquote className="text-2xl font-light italic text-emerald-300 mb-4">
                "Every voice carries the potential to touch hearts across continents"
              </blockquote>
              <p className="text-slate-300">
                Professional recording, global distribution, and full credit all provided free.
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

      {/* Application Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Share Your Sacred Voice
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Apply to join our global pool of spiritual vocalists and bring divine kalam to life
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

              {/* Vocal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Vocal Range *</label>
                  <select
                    name="vocalRange"
                    value={formData.vocalRange}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                    required
                  >
                    <option value="">Select Vocal Range</option>
                    {vocalRanges.map(range => (
                      <option key={range} value={range.toLowerCase()}>{range}</option>
                    ))}
                  </select>
                  {errors.vocalRange && <p className="text-sm text-red-600 mt-1">{errors.vocalRange}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Languages You Perform In *</label>
                  <input
                    type="text"
                    name="languages"
                    value={formData.languages}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                    placeholder="e.g., Arabic, Urdu, English, Turkish"
                    required
                  />
                  {errors.languages && <p className="text-sm text-red-600 mt-1">{errors.languages}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Vocal Specialties</label>
                <input
                  type="text"
                  name="specialties"
                  value={formData.specialties}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                  placeholder="e.g., Qawwali, Sufi Chants, Spiritual Ballads"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Examples: {specialties.slice(0, 4).join(', ')}, etc.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Experience & Background</label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                  placeholder="Describe your vocal training, performance experience, or musical background..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">About Your Vocal Journey *</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                  placeholder="Share your vocal background, spiritual connection to music, and what draws you to sacred performance..."
                  required
                />
                {errors.bio && <p className="text-sm text-red-600 mt-1">{errors.bio}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Availability *</label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                    required
                  >
                    <option value="">Select Availability</option>
                    <option value="immediate">Available for immediate collaborations</option>
                    <option value="limited">Limited availability</option>
                    <option value="future">Interested in future projects</option>
                    <option value="seasonal">Seasonal availability</option>
                  </select>
                  {errors.availability && <p className="text-sm text-red-600 mt-1">{errors.availability}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Portfolio/Sample Links</label>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                    placeholder="https://your-portfolio.com or SoundCloud link"
                  />
                </div>
              </div>

              {/* Sacred Commitment */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                <h4 className="font-medium text-emerald-800 mb-2">Sacred Commitment</h4>
                <p className="text-sm text-emerald-700 mb-4">
                  By joining our vocalist pool, I commit to lending my voice for the sacred purpose of amplifying 
                  divine kalam with sincerity and spiritual intention. I understand this is a non-commercial 
                  spiritual service where I will receive full credit for my vocal contributions while serving 
                  the global ummah through sacred sound.
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
                      <Mic className="w-5 h-5" />
                      <span>Submit Application</span>
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
            Become Part of Our Sacred Sound
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Join our community of vocalists who bring divine poetry to life through the power of sacred voice. 
            Experience professional recording and global reach while serving the spiritual community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/vocalists"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <Users className="w-5 h-5" />
              <span>Meet Our Vocalists</span>
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <Music className="w-5 h-5" />
              <span>Listen to Collaborations</span>
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center space-x-2 border-2 border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <Star className="w-5 h-5" />
              <span>How It Works</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinVocalistPool;