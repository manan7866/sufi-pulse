'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/context/ToastContext';
import toast from 'react-hot-toast';
import {
  Mic,
  Calendar,
  Clock,
  Music,
  Upload,
  CheckCircle,
  AlertCircle,
  Eye,
  X,
  Loader2,
  Info,
  Users
} from 'lucide-react';
import {
  getApprovedLyrics,
  createStudioRecordingRequest,
  ApprovedLyric,
} from '@/services/recordingRequests';
import LyricPreviewModal from './LyricPreviewModal';

interface StudioRecordingRequestFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface FormData {
  kalam_id: number | '';
  preferred_session_date: string;
  preferred_time_block: 'Morning' | 'Afternoon' | 'Evening' | '';
  estimated_studio_duration: '1 Hour' | '2 Hours' | 'Half Day' | 'Full Day' | '';
  performance_direction: string;
  availability_confirmed: boolean;
  studio_policies_agreed: boolean;
  whatsapp_number: string;
  referenceFile?: File | null;
}

interface FormErrors {
  kalam_id?: string;
  preferred_session_date?: string;
  preferred_time_block?: string;
  estimated_studio_duration?: string;
  performance_direction?: string;
  availability_confirmed?: string;
  studio_policies_agreed?: string;
  whatsapp_number?: string;
}

const StudioRecordingRequestForm: React.FC<StudioRecordingRequestFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [approvedLyrics, setApprovedLyrics] = useState<ApprovedLyric[]>([]);
  const [selectedLyric, setSelectedLyric] = useState<ApprovedLyric | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    kalam_id: '',
    preferred_session_date: '',
    preferred_time_block: '',
    estimated_studio_duration: '',
    performance_direction: '',
    availability_confirmed: false,
    studio_policies_agreed: false,
    whatsapp_number: '',
    referenceFile: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Fetch approved lyrics on mount
  useEffect(() => {
    fetchApprovedLyrics();
  }, []);

  const fetchApprovedLyrics = async () => {
    try {
      setLoading(true);
      const response = await getApprovedLyrics();
      setApprovedLyrics(response.data.lyrics || []);

      if (response.data.lyrics.length === 0) {
        toast('No approved lyrics available at the moment. Please check back later.', {
          icon: 'ℹ️',
          style: {
            background: '#fef3c7',
            color: '#92400e',
          },
        });
      }
    } catch (error: any) {
      console.error('Error fetching approved lyrics:', error);
      showToast(error.response?.data?.detail || 'Failed to load approved lyrics');
    } finally {
      setLoading(false);
    }
  };

  const handleLyricChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const kalamId = parseInt(e.target.value);
    setFormData(prev => ({ ...prev, kalam_id: kalamId || '' }));
    
    const lyric = approvedLyrics.find(l => l.id === kalamId) || null;
    setSelectedLyric(lyric);
    
    if (errors.kalam_id) {
      setErrors(prev => ({ ...prev, kalam_id: '' }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/x-wav'];
      if (!allowedTypes.includes(file.type)) {
        showToast('Invalid file type. Please upload MP3 or WAV files only.');
        e.target.value = '';
        return;
      }
      
      // Validate file size (10MB max)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        showToast('File size exceeds 10MB limit.');
        e.target.value = '';
        return;
      }
      
      setFormData(prev => ({ ...prev, referenceFile: file }));
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.kalam_id) {
      newErrors.kalam_id = 'Please select an approved lyric';
    }
    if (!formData.preferred_session_date) {
      newErrors.preferred_session_date = 'Preferred session date is required';
    } else {
      const selectedDate = new Date(formData.preferred_session_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.preferred_session_date = 'Session date cannot be in the past';
      }
    }
    if (!formData.preferred_time_block) {
      newErrors.preferred_time_block = 'Please select a time block';
    }
    if (!formData.estimated_studio_duration) {
      newErrors.estimated_studio_duration = 'Please select studio duration';
    }
    if (!formData.performance_direction.trim()) {
      newErrors.performance_direction = 'Performance direction is required';
    } else if (formData.performance_direction.trim().length < 20) {
      newErrors.performance_direction = 'Please provide more detailed performance direction (at least 20 characters)';
    }
    if (!formData.whatsapp_number.trim()) {
      newErrors.whatsapp_number = 'WhatsApp number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.whatsapp_number)) {
      newErrors.whatsapp_number = 'Please enter a valid phone number';
    }
    if (!formData.availability_confirmed) {
      newErrors.availability_confirmed = 'You must confirm your availability';
    }
    if (!formData.studio_policies_agreed) {
      newErrors.studio_policies_agreed = 'You must agree to the studio policies';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors below');
      return;
    }

    try {
      setSubmitting(true);

      const requestData = {
        kalam_id: Number(formData.kalam_id),
        preferred_session_date: formData.preferred_session_date,
        preferred_time_block: formData.preferred_time_block as 'Morning' | 'Afternoon' | 'Evening',
        estimated_studio_duration: formData.estimated_studio_duration as '1 Hour' | '2 Hours' | 'Half Day' | 'Full Day',
        performance_direction: formData.performance_direction,
        availability_confirmed: formData.availability_confirmed,
        studio_policies_agreed: formData.studio_policies_agreed,
        whatsapp_number: formData.whatsapp_number,
      };

      await createStudioRecordingRequest(requestData);
      
      toast.success('Studio recording request submitted successfully! Your request is now pending review.');
      
      if (onSuccess) {
        onSuccess();
      }
      
      // Reset form
      setFormData({
        kalam_id: '',
        preferred_session_date: '',
        preferred_time_block: '',
        estimated_studio_duration: '',
        performance_direction: '',
        availability_confirmed: false,
        studio_policies_agreed: false,
      });
      setSelectedLyric(null);
    } catch (error: any) {
      console.error('Error submitting studio request:', error);
      showToast(error.response?.data?.detail || 'Failed to submit studio recording request');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePreviewLyric = () => {
    if (selectedLyric) {
      setShowPreview(true);
    }
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  const timeBlocks = [
    { value: 'Morning', label: 'Morning (9:00 AM - 12:00 PM)', icon: '🌅' },
    { value: 'Afternoon', label: 'Afternoon (1:00 PM - 4:00 PM)', icon: '☀️' },
    { value: 'Evening', label: 'Evening (5:00 PM - 8:00 PM)', icon: '🌆' },
  ];

  const durations = [
    { value: '1 Hour', label: '1 Hour', description: 'Quick vocal tracking' },
    { value: '2 Hours', label: '2 Hours', description: 'Standard session' },
    { value: 'Half Day', label: 'Half Day (4 hours)', description: 'Extended recording' },
    { value: 'Full Day', label: 'Full Day (8 hours)', description: 'Complete production' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        <p className="ml-3 text-slate-600">Loading approved lyrics...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-emerald-900 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Studio Recording Request</h2>
              <p className="text-emerald-300 text-sm">In-Person Session at SufiPulse Studio</p>
            </div>
          </div>
          {onCancel && (
            <button
              onClick={onCancel}
              className="text-white/70 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-8">
        {/* Section 1: Lyric Selection */}
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <Music className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900">1. Lyric Selection</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Approved Lyric <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                <select
                  value={formData.kalam_id}
                  onChange={handleLyricChange}
                  className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    errors.kalam_id ? 'border-red-500' : 'border-slate-300'
                  }`}
                >
                  <option value="">Select an approved lyric...</option>
                  {approvedLyrics.map((lyric) => (
                    <option key={lyric.id} value={lyric.id}>
                      {lyric.title} - {lyric.language} ({lyric.writer_name})
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handlePreviewLyric}
                  disabled={!selectedLyric}
                  className="px-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </button>
              </div>
              {errors.kalam_id && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.kalam_id}
                </p>
              )}
              {selectedLyric && (
                <div className="mt-3 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-slate-600">Writer:</span>
                      <span className="ml-2 font-medium text-slate-900">{selectedLyric.writer_name}</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Language:</span>
                      <span className="ml-2 font-medium text-slate-900">{selectedLyric.language}</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Category:</span>
                      <span className="ml-2 font-medium text-slate-900">{selectedLyric.category}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Section 2: Session Scheduling */}
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900">2. Session Scheduling</h3>
          </div>

          <div className="space-y-4">
            {/* Preferred Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Preferred Session Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="preferred_session_date"
                value={formData.preferred_session_date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  errors.preferred_session_date ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.preferred_session_date && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.preferred_session_date}
                </p>
              )}
            </div>

            {/* Time Block */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Preferred Time Block <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {timeBlocks.map((block) => (
                  <label
                    key={block.value}
                    className={`relative cursor-pointer p-4 border-2 rounded-lg transition-all ${
                      formData.preferred_time_block === block.value
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="preferred_time_block"
                      value={block.value}
                      checked={formData.preferred_time_block === block.value}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-2xl mb-2">{block.icon}</div>
                      <div className="font-medium text-slate-900">{block.label}</div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.preferred_time_block && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.preferred_time_block}
                </p>
              )}
            </div>

            {/* Studio Duration */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Estimated Studio Duration <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {durations.map((duration) => (
                  <label
                    key={duration.value}
                    className={`relative cursor-pointer p-4 border-2 rounded-lg transition-all ${
                      formData.estimated_studio_duration === duration.value
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="estimated_studio_duration"
                      value={duration.value}
                      checked={formData.estimated_studio_duration === duration.value}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="font-medium text-slate-900 mb-1">{duration.label}</div>
                      <div className="text-xs text-slate-500">{duration.description}</div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.estimated_studio_duration && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.estimated_studio_duration}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Section 3: Artistic Preparation */}
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <Music className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900">3. Artistic Preparation</h3>
          </div>

          <div className="space-y-4">
            {/* Performance Direction */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Performance Direction <span className="text-red-500">*</span>
              </label>
              <textarea
                name="performance_direction"
                value={formData.performance_direction}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe the tone, delivery style, tempo sensitivity, and vocal interpretation you envision for this recording..."
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  errors.performance_direction ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.performance_direction && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.performance_direction}
                </p>
              )}
              <p className="mt-1 text-xs text-slate-500">
                Minimum 20 characters. Be specific about your artistic vision.
              </p>
            </div>

            {/* Reference Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Reference Upload <span className="text-slate-400">(Optional)</span>
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                <p className="text-sm text-slate-600 mb-1">
                  Demo / Scratch Vocal (MP3 or WAV)
                </p>
                <p className="text-xs text-slate-500 mb-3">
                  Maximum file size: 10MB
                </p>
                {formData.referenceFile ? (
                  <div className="bg-emerald-50 rounded-lg p-3 mb-3">
                    <p className="text-sm font-medium text-emerald-800 truncate">
                      {formData.referenceFile.name}
                    </p>
                    <p className="text-xs text-emerald-600">
                      {(formData.referenceFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : null}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".mp3,.wav,audio/mpeg,audio/wav,audio/x-wav"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={handleChooseFile}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 text-sm transition-colors font-medium"
                >
                  {formData.referenceFile ? 'Change File' : 'Choose File'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Contact Information */}
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <Users className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900">4. Contact Information</h3>
          </div>

          <div className="space-y-4">
            {/* WhatsApp Number */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                WhatsApp Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="whatsapp_number"
                value={formData.whatsapp_number}
                onChange={handleInputChange}
                placeholder="+1 234 567 8900"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  errors.whatsapp_number ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.whatsapp_number && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.whatsapp_number}
                </p>
              )}
              <p className="mt-1 text-xs text-slate-500">
                We'll use this to contact you about your recording request
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Confirmation */}
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900">5. Confirmation</h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="availability_confirmed"
                checked={formData.availability_confirmed}
                onChange={handleInputChange}
                className="mt-1 w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
              />
              <span className="text-sm text-slate-700">
                I confirm my availability for the selected session date and time block
              </span>
            </label>
            {errors.availability_confirmed && (
              <p className="text-sm text-red-500 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                {errors.availability_confirmed}
              </p>
            )}

            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="studio_policies_agreed"
                checked={formData.studio_policies_agreed}
                onChange={handleInputChange}
                className="mt-1 w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
              />
              <span className="text-sm text-slate-700">
                I agree to SufiPulse studio policies and terms of service
              </span>
            </label>
            {errors.studio_policies_agreed && (
              <p className="text-sm text-red-500 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                {errors.studio_policies_agreed}
              </p>
            )}
          </div>
        </section>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-200">
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-gradient-to-r from-emerald-600 to-slate-800 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting Request...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Submit Studio Recording Request</span>
              </>
            )}
          </button>
          <p className="mt-3 text-center text-xs text-slate-500">
            Status after submission: <span className="font-medium text-emerald-600">Pending Review</span>
          </p>
        </div>
      </form>

      {/* Lyric Preview Modal */}
      <LyricPreviewModal
        lyric={selectedLyric}
        isOpen={showPreview}
        onClose={handleClosePreview}
      />
    </div>
  );
};

export default StudioRecordingRequestForm;
