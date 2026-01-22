'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  Mic,
  User,
  Mail,
  MapPin,
  Upload,
  Music,
  Heart,
  CheckCircle,
  ArrowRight,
  Award,
  Star,
  Globe,
  Users,
  Volume2
} from 'lucide-react';
import { vocalistSubmitKalam } from '@/services/vocalist';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
const SubmitSampleClip = () => {
  const { showToast } = useToast()
  const router = useRouter();   // ✅ initialize router
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    location: '',
    vocalRange: '',
    languages: '',
    experience: '',
    sampleTitle: '',
    sampleDescription: '',
    audioFile: null as File | null,
    portfolio: '',
    availability: '',
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, audioFile: file }));

    if (errors.audioFile) {
      setErrors(prev => ({ ...prev, audioFile: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

   

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast("Please fix the errors below");
      return;
    }

    setLoading(true);

    try {
      let audioUrl = "";

      // Upload audio to Cloudinary first
      if (formData.audioFile) {
        const uploadData = new FormData();
        uploadData.append("file", formData.audioFile);

        const uploadRes = await fetch("/api/cloudinary", {
          method: "POST",
          body: uploadData,
        });

        if (!uploadRes.ok) {
          throw new Error("Upload failed")
          return
        }

        const { url } = await uploadRes.json();
        audioUrl = url;
      }

      // Now submit payload with Cloudinary audio URL
      const payload = {
        vocal_range: formData.vocalRange,
        languages: formData.languages.split(",").map((lang) => lang.trim()),
        sample_title: formData.sampleTitle,
        audio_sample_url: audioUrl,
        sample_description: formData.sampleDescription,
        experience_background: formData.experience,
        portfolio: formData.portfolio,
        availability: formData.availability,
      };

      const response = await vocalistSubmitKalam(payload);
      Cookies.set("info_submitted", "true");

      console.log("✅ API Response:", response.data);
      showToast("Your vocal sample has been submitted successfully!");
      window.location.reload();

      setFormData({
        fullName: "",
        email: "",
        location: "",
        vocalRange: "",
        languages: "",
        experience: "",
        sampleTitle: "",
        sampleDescription: "",
        audioFile: null,
        portfolio: "",
        availability: "",
        acceptTerms: false,
      });
    } catch (error: any) {
      console.error("❌ Submission Error:", error);
      showToast(
        error.response?.data?.detail || "Submission failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { number: '43', label: 'Active Vocalists', icon: Mic },
    { number: '15+', label: 'Languages', icon: Globe },
    { number: '200+', label: 'Sample Reviews', icon: Music },
    { number: '100%', label: 'Free Evaluation', icon: Award }
  ];

  const vocalRanges = [
    'Soprano',
    'Mezzo-Soprano',
    'Alto',
    'Tenor',
    'Baritone',
    'Bass'
  ];

  const sampleGuidelines = [
    {
      title: 'Audio Quality',
      description: 'Clear recording with minimal background noise',
      icon: Volume2
    },
    {
      title: 'Duration',
      description: '30 seconds to 2 minutes of your best vocal work',
      icon: Music
    },
    {
      title: 'Content',
      description: 'Sacred or spiritual content preferred, but not required',
      icon: Heart
    },
    {
      title: 'Format',
      description: 'MP3, WAV, or M4A files accepted',
      icon: Upload
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
      <section className="fixed bottom-4 right-4 w-64 sm:w-72 md:w-80 bg-white border border-slate-200 shadow-lg rounded-lg p-4 text-center z-10 sm:bottom-5 sm:right-5">
        <h2 className="text-base sm:text-lg font-semibold text-slate-800 mb-2">
          Submit Your Sample Clip
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mb-3 line-clamp-3">
          Share your voice to unlock your personalized dashboard and join our community of sacred vocalists.
        </p>
      </section>

      {/* Sample Guidelines */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-full sm:max-w-3xl lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">
              Sample Submission Guidelines
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl sm:max-w-3xl mx-auto">
              Follow these guidelines to ensure your vocal sample receives the best evaluation
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {sampleGuidelines.map((guideline, index) => {
              const Icon = guideline.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-slate-100 text-center hover:shadow-xl transition-all duration-300">
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-2"> {guideline.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3">{guideline.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Submission Form */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-50">
        <div className="max-w-full sm:max-w-2xl lg:max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">
              Submit Your Vocal Sample
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl sm:max-w-3xl mx-auto">
              Share your voice and join our global community of sacred vocalists
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4 sm:p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">

              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 text-sm sm:text-base"
                  placeholder="City, Country"
                  required
                />
                {errors.location && <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.location}</p>}
              </div>

              {/* Vocal Information */}
              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">Vocal Range *</label>
                  <select
                    name="vocalRange"
                    value={formData.vocalRange}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 text-sm sm:text-base"
                    required
                  >
                    <option value="">Select Vocal Range</option>
                    {vocalRanges.map(range => (
                      <option key={range} value={range.toLowerCase()}>{range}</option>
                    ))}
                  </select>
                  {errors.vocalRange && <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.vocalRange}</p>}
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">Languages You Perform In *</label>
                  <input
                    type="text"
                    name="languages"
                    value={formData.languages}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 text-sm sm:text-base"
                    placeholder="e.g., Arabic, Urdu, English, Turkish"
                    required
                  />
                  {errors.languages && <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.languages}</p>}
                </div>
              </div>

              {/* Sample Information */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">Sample Title *</label>
                <input
                  type="text"
                  name="sampleTitle"
                  value={formData.sampleTitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 text-sm sm:text-base"
                  placeholder="Title of your vocal sample"
                  required
                />
                {errors.sampleTitle && <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.sampleTitle}</p>}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">Audio Sample *</label>
                <input
                  type="file"
                  name="audioFile"
                  onChange={handleFileChange}
                  accept="audio/*"
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 text-sm sm:text-base"
                  required
                />
                <p className="text-xs text-slate-500 mt-1">
                  Upload MP3, WAV, or M4A files (max 10MB). Duration: 30 seconds to 2 minutes.
                </p>
                {errors.audioFile && <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.audioFile}</p>}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">Sample Description</label>
                <textarea
                  name="sampleDescription"
                  value={formData.sampleDescription}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 text-sm sm:text-base"
                  placeholder="Describe your sample - what you're singing, the style, any special techniques..."
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">Experience & Background</label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 text-sm sm:text-base"
                  placeholder="Tell us about your vocal training, performance experience, and spiritual connection to music..."
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">Portfolio/Previous Work</label>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 text-sm sm:text-base"
                    placeholder="https://your-portfolio.com or SoundCloud link"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">Availability</label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 text-sm sm:text-base"
                  >
                    <option value="">Select Availability</option>
                    <option value="immediate">Available for immediate projects</option>
                    <option value="limited">Limited availability</option>
                    <option value="future">Interested in future opportunities</option>
                    <option value="seasonal">Seasonal availability</option>
                  </select>
                </div>
              </div>

              {/* Sacred Commitment */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 sm:p-6">
                <h4 className="text-sm sm:text-base font-medium text-emerald-800 mb-2">Sacred Commitment</h4>
                <p className="text-xs sm:text-sm text-emerald-700 mb-3 sm:mb-4 line-clamp-4">
                  By submitting this vocal sample, I express interest in lending my voice for the sacred purpose
                  of amplifying divine kalam with sincerity and spiritual intention. I understand this is a
                  non-commercial spiritual service where I will receive full credit for any vocal contributions.
                </p>
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="mt-1 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4 sm:h-5 sm:w-5"
                    required
                  />
                  <span className="text-xs sm:text-sm text-emerald-800">
                    I understand and accept this sacred commitment *
                  </span>
                </label>
                {errors.acceptTerms && <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.acceptTerms}</p>}
              </div>

              <div className="flex justify-center md:justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Submit Sample Clip</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SubmitSampleClip;