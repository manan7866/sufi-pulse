'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/context/ToastContext';
import toast from 'react-hot-toast';
import {
  Wifi,
  Music,
  Calendar,
  Upload,
  CheckCircle,
  AlertCircle,
  Eye,
  X,
  Loader2,
  Mic,
  AudioWaveform,
  Usb,
  Smartphone,
  Users
} from 'lucide-react';
import {
  getApprovedLyrics,
  createRemoteRecordingRequest,
  ApprovedLyric,
} from '@/services/recordingRequests';
import LyricPreviewModal from './LyricPreviewModal';

interface RemoteRecordingRequestFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface FormData {
  kalam_id: number | '';
  recording_environment: 'Professional Studio' | 'Condenser Mic Setup' | 'USB Microphone' | 'Mobile Setup' | '';
  target_submission_date: string;
  interpretation_notes: string;
  original_recording_confirmed: boolean;
  remote_production_standards_agreed: boolean;
  whatsapp_number: string;
  sampleFile?: File | null;
}

interface FormErrors {
  kalam_id?: string;
  recording_environment?: string;
  target_submission_date?: string;
  interpretation_notes?: string;
  original_recording_confirmed?: string;
  remote_production_standards_agreed?: string;
  whatsapp_number?: string;
}

const RemoteRecordingRequestForm: React.FC<RemoteRecordingRequestFormProps> = ({
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
    recording_environment: '',
    target_submission_date: '',
    interpretation_notes: '',
    original_recording_confirmed: false,
    remote_production_standards_agreed: false,
    whatsapp_number: '',
    sampleFile: null,
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
      
      setFormData(prev => ({ ...prev, sampleFile: file }));
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
    if (!formData.recording_environment) {
      newErrors.recording_environment = 'Please select your recording environment';
    }
    if (!formData.target_submission_date) {
      newErrors.target_submission_date = 'Target submission date is required';
    } else {
      const selectedDate = new Date(formData.target_submission_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.target_submission_date = 'Submission date cannot be in the past';
      }
    }
    if (!formData.interpretation_notes.trim()) {
      newErrors.interpretation_notes = 'Interpretation notes are required';
    } else if (formData.interpretation_notes.trim().length < 20) {
      newErrors.interpretation_notes = 'Please provide more detailed interpretation notes (at least 20 characters)';
    }
    if (!formData.original_recording_confirmed) {
      newErrors.original_recording_confirmed = 'You must confirm original recording';
    }
    if (!formData.remote_production_standards_agreed) {
      newErrors.remote_production_standards_agreed = 'You must agree to remote production standards';
    }
    if (!formData.whatsapp_number.trim()) {
      newErrors.whatsapp_number = 'WhatsApp number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.whatsapp_number)) {
      newErrors.whatsapp_number = 'Please enter a valid phone number';
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
        recording_environment: formData.recording_environment as 'Professional Studio' | 'Condenser Mic Setup' | 'USB Microphone' | 'Mobile Setup',
        target_submission_date: formData.target_submission_date,
        interpretation_notes: formData.interpretation_notes,
        original_recording_confirmed: formData.original_recording_confirmed,
        remote_production_standards_agreed: formData.remote_production_standards_agreed,
        whatsapp_number: formData.whatsapp_number,
      };

      await createRemoteRecordingRequest(requestData);
      
      toast.success('Remote recording request submitted successfully! Your request is now under review.');
      
      if (onSuccess) {
        onSuccess();
      }
      
      // Reset form
      setFormData({
        kalam_id: '',
        recording_environment: '',
        target_submission_date: '',
        interpretation_notes: '',
        original_recording_confirmed: false,
        remote_production_standards_agreed: false,
      });
      setSelectedLyric(null);
    } catch (error: any) {
      console.error('Error submitting remote request:', error);
      showToast(error.response?.data?.detail || 'Failed to submit remote recording request');
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

  const recordingEnvironments = [
    {
      value: 'Professional Studio',
      label: 'Professional Studio',
      icon: AudioWaveform,
      description: 'Commercial recording facility',
      color: 'from-purple-500 to-indigo-600',
    },
    {
      value: 'Condenser Mic Setup',
      label: 'Condenser Mic Setup',
      icon: Mic,
      description: 'High-quality home setup',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      value: 'USB Microphone',
      label: 'USB Microphone',
      icon: Usb,
      description: 'Standard USB mic',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      value: 'Mobile Setup',
      label: 'Mobile Setup',
      icon: Smartphone,
      description: 'Portable recording',
      color: 'from-orange-500 to-amber-600',
    },
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
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Wifi className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Remote Recording Request</h2>
              <p className="text-emerald-300 text-sm">Remote Production for Approved Lyric</p>
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

        {/* Section 2: Technical Setup */}
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <Wifi className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900">2. Technical Setup</h3>
          </div>

          <div className="space-y-4">
            {/* Recording Environment */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Recording Environment <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recordingEnvironments.map((env) => {
                  const Icon = env.icon;
                  return (
                    <label
                      key={env.value}
                      className={`relative cursor-pointer p-4 border-2 rounded-lg transition-all ${
                        formData.recording_environment === env.value
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="recording_environment"
                        value={env.value}
                        checked={formData.recording_environment === env.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${env.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">{env.label}</div>
                          <div className="text-xs text-slate-500 mt-1">{env.description}</div>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
              {errors.recording_environment && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.recording_environment}
                </p>
              )}
            </div>

            {/* Target Submission Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Target Submission Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="target_submission_date"
                value={formData.target_submission_date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  errors.target_submission_date ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.target_submission_date && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.target_submission_date}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Section 3: Performance Plan */}
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <Music className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900">3. Performance Plan</h3>
          </div>

          <div className="space-y-4">
            {/* Interpretation Notes */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Interpretation Notes <span className="text-red-500">*</span>
              </label>
              <textarea
                name="interpretation_notes"
                value={formData.interpretation_notes}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe emotional tone, vocal layering plans, stylistic direction, and your artistic vision for this remote recording..."
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  errors.interpretation_notes ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.interpretation_notes && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.interpretation_notes}
                </p>
              )}
              <p className="mt-1 text-xs text-slate-500">
                Minimum 20 characters. Be specific about your performance approach.
              </p>
            </div>

            {/* Sample Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Upload Sample / Reference <span className="text-slate-400">(Optional)</span>
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                <p className="text-sm text-slate-600 mb-1">
                  Demo / Reference Vocal (MP3 or WAV)
                </p>
                <p className="text-xs text-slate-500 mb-3">
                  Maximum file size: 10MB
                </p>
                {formData.sampleFile ? (
                  <div className="bg-emerald-50 rounded-lg p-3 mb-3">
                    <p className="text-sm font-medium text-emerald-800 truncate">
                      {formData.sampleFile.name}
                    </p>
                    <p className="text-xs text-emerald-600">
                      {(formData.sampleFile.size / 1024 / 1024).toFixed(2)} MB
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
                  {formData.sampleFile ? 'Change File' : 'Choose File'}
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

        {/* Section 5: Professional Declaration */}
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900">5. Professional Declaration</h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="original_recording_confirmed"
                checked={formData.original_recording_confirmed}
                onChange={handleInputChange}
                className="mt-1 w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
              />
              <span className="text-sm text-slate-700">
                I confirm the performance will be my original recording and not copied from other sources
              </span>
            </label>
            {errors.original_recording_confirmed && (
              <p className="text-sm text-red-500 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                {errors.original_recording_confirmed}
              </p>
            )}

            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="remote_production_standards_agreed"
                checked={formData.remote_production_standards_agreed}
                onChange={handleInputChange}
                className="mt-1 w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
              />
              <span className="text-sm text-slate-700">
                I agree to SufiPulse remote production standards and quality guidelines
              </span>
            </label>
            {errors.remote_production_standards_agreed && (
              <p className="text-sm text-red-500 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                {errors.remote_production_standards_agreed}
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
                <span>Submit Remote Recording Request</span>
              </>
            )}
          </button>
          <p className="mt-3 text-center text-xs text-slate-500">
            Status after submission: <span className="font-medium text-emerald-600">Under Review</span>
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

export default RemoteRecordingRequestForm;
