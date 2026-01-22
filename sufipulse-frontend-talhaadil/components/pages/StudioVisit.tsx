'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useToast } from '@/context/ToastContext';
import { 
  Building2, 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  Users, 
  Clock,
  CheckCircle,
  ArrowRight,
  Headphones,
  Award,
  Star,
  Globe,
  Music,
  Eye
} from 'lucide-react';

interface StudioVisitProps {
  onSubmit?: (formData: any) => void;
}

const StudioVisit: React.FC<StudioVisitProps> = ({ onSubmit }) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    organization: '',
    visitDate: '',
    visitPurpose: '',
    numberOfVisitors: '',
    additionalDetails: '',
    contactNumber: '',
    preferredTime: '',
    specialRequests: ''
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
    if (!formData.visitDate) newErrors.visitDate = 'Visit date is required';
    if (!formData.visitPurpose) newErrors.visitPurpose = 'Visit purpose is required';
    if (!formData.numberOfVisitors) newErrors.numberOfVisitors = 'Number of visitors is required';

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
      if (onSubmit) {
        await onSubmit(formData);
        toast.success('Your studio visit request has been submitted successfully! We will contact you soon to confirm details.');
      }
      
      // Reset form
      // setFormData({
      //   fullName: '',
      //   email: '',
      //   organization: '',
      //   visitDate: '',
      //   visitPurpose: '',
      //   numberOfVisitors: '',
      //   additionalDetails: '',
      //   contactNumber: '',
      //   preferredTime: '',
      //   specialRequests: ''
      // });
    } catch (error:any) {
      showToast(error.response.data.detail)
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { number: "300+", label: "Recordings Made", icon: Music },
    { number: "50+", label: "Countries Visited", icon: Globe },
    { number: "25+", label: "Languages Recorded", icon: Users },
    { number: "100%", label: "Sacred Focus", icon: Award }
  ];

  const visitPurposes = [
    'Studio Tour',
    'Recording Session',
    'Educational Visit',
    'Spiritual Pilgrimage',
    'Media Documentation',
    'Academic Research',
    'Cultural Exchange',
    'Partnership Meeting',
    'Other'
  ];

  const timeSlots = [
    'Morning (9:00 AM - 12:00 PM)',
    'Afternoon (1:00 PM - 4:00 PM)',
    'Evening (5:00 PM - 8:00 PM)',
    'Flexible'
  ];

  return (
    <div className="bg-white min-h-screen py-6 sm:py-8 lg:py-12">
      {/* Form Section */}
      <div className="max-w-md mx-auto px-4 sm:max-w-lg sm:px-6 md:max-w-2xl lg:max-w-3xl md:px-8">
        <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">Your Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 text-sm sm:text-base"
                  placeholder="Enter your full name"
                  required
                />
                {errors.fullName && <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 text-sm sm:text-base"
                  placeholder="your.email@example.com"
                  required
                />
                {errors.email && <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">Organization/Affiliation</label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 text-sm sm:text-base"
                  placeholder="Your organization or spiritual community"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">Contact Number</label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 text-sm sm:text-base"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Visit Details */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">Preferred Visit Date *</label>
                <input
                  type="date"
                  name="visitDate"
                  value={formData.visitDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 text-sm sm:text-base"
                  required
                />
                {errors.visitDate && <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.visitDate}</p>}
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">Preferred Time</label>
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 text-sm sm:text-base"
                >
                  <option value="">Select Time Preference</option>
                  {timeSlots.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">Purpose of Visit *</label>
                <select
                  name="visitPurpose"
                  value={formData.visitPurpose}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 text-sm sm:text-base"
                  required
                >
                  <option value="">Select Purpose</option>
                  {visitPurposes.map(purpose => (
                    <option key={purpose} value={purpose.toLowerCase()}>{purpose}</option>
                  ))}
                </select>
                {errors.visitPurpose && <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.visitPurpose}</p>}
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">Number of Visitors *</label>
                <select
                  name="numberOfVisitors"
                  value={formData.numberOfVisitors}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 text-sm sm:text-base"
                  required
                >
                  <option value="">Select Number</option>
                  <option value="1">1 person</option>
                  <option value="2-5">2-5 people</option>
                  <option value="6-10">6-10 people</option>
                  <option value="11-20">11-20 people</option>
                  <option value="20+">More than 20 people</option>
                </select>
                {errors.numberOfVisitors && <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.numberOfVisitors}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">Additional Details</label>
              <textarea
                name="additionalDetails"
                value={formData.additionalDetails}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 text-sm sm:text-base"
                placeholder="Please share any specific interests, requirements, or questions about your visit..."
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">Special Requests</label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 text-sm sm:text-base"
                placeholder="Any special accommodations, accessibility needs, or specific areas of interest..."
              />
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
                    <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Request Studio Visit</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudioVisit;