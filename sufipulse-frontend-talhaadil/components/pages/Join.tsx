'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  User, 
  Mail, 
  Lock, 
  MapPin, 
  PenTool, 
  Mic, 
  Users, 
  Heart, 
  Globe, 
  Award,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Music,
  Star
} from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import PasswordStrength from '../ui/PasswordStrength';

const Join = () => {
  const [step, setStep] = useState(1); // 1: Role Selection, 2: Registration Form, 3: Success
  const [selectedRole, setSelectedRole] = useState<'writer' | 'vocalist' | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    location: '',
    password: '',
    confirmPassword: '',
    bio: '',
    experience: '',
    languages: '',
    specialization: '',
    acceptTerms: false,
    newsletter: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.bio.trim()) newErrors.bio = 'Bio is required';
    if (!formData.languages.trim()) newErrors.languages = 'Languages are required';
    if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRoleSelection = (role: 'writer' | 'vocalist') => {
    setSelectedRole(role);
    setStep(1);
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
      
   
      
      toast.success('Registration successful! You can now login to access your dashboard.');
      setStep(1);
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    {
      id: 'writer',
      title: 'Sacred Writer',
      icon: PenTool,
      description: 'Share your divine poetry and sacred verses with the global community',
      features: [
        'Submit unlimited kalam',
        'Professional music production',
        'Global vocalist collaboration',
        'Complete creative control',
        'Worldwide distribution'
      ],
      stats: { count: '89', label: 'Active Writers' }
    },
    {
      id: 'vocalist',
      title: 'Sacred Vocalist',
      icon: Mic,
      description: 'Lend your voice to divine words and bring sacred poetry to life',
      features: [
        'Collaborate with global writers',
        'Professional studio recording',
        'Multiple language projects',
        'Spiritual voice training',
        'International recognition'
      ],
      stats: { count: '43', label: 'Active Vocalists' }
    }
  ];

  const stats = [
    { number: "300+", label: "Sacred Collaborations", icon: Heart },
    { number: "50+", label: "Countries Connected", icon: Globe },
    { number: "25+", label: "Languages Served", icon: BookOpen },
    { number: "100%", label: "Free Service", icon: Award }
  ];

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-6xl font-bold text-slate-800 mb-6"
            >
              Join Our Sacred
              <span className="block text-emerald-600">Community</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-600 max-w-3xl mx-auto mb-8"
            >
              Choose your path in our global spiritual collaboration. Whether you craft divine words 
              or bring them to life with your voice, you have a sacred place in our community.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-800 rounded-2xl p-6 max-w-2xl mx-auto text-white"
            >
              <blockquote className="text-lg italic">
                "We don't sell divine lyrics. We amplify them."
              </blockquote>
              <cite className="text-emerald-300 text-sm mt-2 block">— Dr. Zarf-e-Noori, Founder</cite>
            </motion.div>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            {roleOptions.map((role, index) => {
              const Icon = role.icon;
              return (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.2 }}
                  className="group cursor-pointer"
                  onClick={() => handleRoleSelection(role.id as 'writer' | 'vocalist')}
                >
                  <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 border border-slate-100 h-full">
                    <div className="text-center mb-6">
                      <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-10 h-10 text-emerald-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">{role.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{role.description}</p>
                    </div>

                    <div className="space-y-3 mb-6">
                      {role.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          <span className="text-sm text-slate-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-emerald-50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-emerald-600 mb-1">{role.stats.count}</div>
                      <div className="text-sm text-emerald-700">{role.stats.label}</div>
                    </div>

                    <button onClick={
                      () => {
                        window.location.href = '/register'
                      }
                    } className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform group-hover:scale-105">
                      Join as {role.title}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <Icon className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-slate-800 mb-1">{stat.number}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4"
            >
              Complete Your {selectedRole === 'writer' ? 'Writer' : 'Vocalist'} Profile
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 max-w-2xl mx-auto"
            >
              Help us understand your spiritual journey and creative background to connect you 
              with the perfect collaborations.
            </motion.p>
          </div>

          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name *"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  icon={<User className="w-5 h-5" />}
                  error={errors.fullName}
                  required
                />
                <Input
                  label="Email Address *"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  icon={<Mail className="w-5 h-5" />}
                  error={errors.email}
                  required
                />
              </div>

              <Input
                label="Location *"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="City, Country"
                icon={<MapPin className="w-5 h-5" />}
                error={errors.location}
                required
              />

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Input
                    label="Password *"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a strong password"
                    icon={<Lock className="w-5 h-5" />}
                    showPasswordToggle
                    onTogglePassword={() => setShowPassword(!showPassword)}
                    showPassword={showPassword}
                    error={errors.password}
                    required
                  />
                  <PasswordStrength password={formData.password} className="mt-3" />
                </div>
                <Input
                  label="Confirm Password *"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  icon={<Lock className="w-5 h-5" />}
                  showPasswordToggle
                  onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                  showPassword={showConfirmPassword}
                  error={errors.confirmPassword}
                  required
                />
              </div>

              {/* Role-Specific Fields */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {selectedRole === 'writer' ? 'About Your Writing *' : 'About Your Vocal Journey *'}
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                  placeholder={
                    selectedRole === 'writer' 
                      ? "Tell us about your spiritual writing journey, influences, and the themes you explore..."
                      : "Share your vocal background, training, and spiritual connection to music..."
                  }
                  required
                />
                {errors.bio && <p className="text-sm text-red-600 mt-1">{errors.bio}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Languages You Work In *
                  </label>
                  <input
                    type="text"
                    name="languages"
                    value={formData.languages}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                    placeholder={
                      selectedRole === 'writer' 
                        ? "e.g., Urdu, English, Arabic, Persian"
                        : "e.g., Urdu, Arabic, English, Turkish"
                    }
                    required
                  />
                  {errors.languages && <p className="text-sm text-red-600 mt-1">{errors.languages}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {selectedRole === 'writer' ? 'Writing Specialization' : 'Vocal Specialization'}
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                    placeholder={
                      selectedRole === 'writer' 
                        ? "e.g., Classical Urdu Poetry, Contemporary Spiritual"
                        : "e.g., Qawwali, Sufi Chants, Spiritual Ballads"
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Experience & Background
                </label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                  placeholder={
                    selectedRole === 'writer' 
                      ? "Share any published works, spiritual lineage, or writing achievements..."
                      : "Describe your vocal training, performance experience, or musical background..."
                  }
                />
              </div>

              {/* Sacred Commitment */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <h4 className="font-bold text-emerald-800 mb-3">Sacred Commitment</h4>
                <p className="text-sm text-emerald-700 mb-4">
                  {selectedRole === 'writer' 
                    ? "I understand that SufiPulse is a non-commercial platform dedicated to amplifying sacred voices. I commit to sharing authentic spiritual poetry and grant SufiPulse the right to produce and distribute my work globally while maintaining full authorship credit."
                    : "I understand that SufiPulse is a non-commercial platform dedicated to amplifying sacred voices. I commit to lending my voice with spiritual intention and respect for the sacred nature of the poetry I will perform."
                  }
                </p>
                <div className="space-y-3">
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
                      I understand and accept this sacred commitment and agree to the{' '}
                      <Link href="/terms" className="underline hover:text-emerald-900">Terms of Service</Link> *
                    </span>
                  </label>
                  {errors.acceptTerms && <p className="text-sm text-red-600">{errors.acceptTerms}</p>}
                  
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleInputChange}
                      className="mt-1 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm text-emerald-800">
                      I'd like to receive updates about new collaborations and community news
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 px-6 border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors duration-200"
                >
                  Back to Role Selection
                </button>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  className="flex-1"
                >
                  Complete Registration
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-50 flex items-center justify-center py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100"
          >
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-slate-800 mb-4">
              Welcome to SufiPulse!
            </h1>
            
            <p className="text-slate-600 mb-6 leading-relaxed">
              Your registration as a <span className="font-semibold text-emerald-600 capitalize">{selectedRole}</span> has been completed successfully. 
              You can now login to access your personalized dashboard and begin your sacred journey.
            </p>

            <div className="bg-emerald-50 rounded-xl p-4 mb-6">
              <p className="text-emerald-800 text-sm">
                <strong>Next Steps:</strong> Login with your credentials to access your {selectedRole} dashboard 
                where you can {selectedRole === 'writer' ? 'submit your first kalam' : 'view available collaborations'}.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/login"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors duration-200"
              >
                Login to Dashboard
              </Link>
              <Link
                href="/"
                className="flex-1 border border-slate-300 text-slate-700 hover:bg-slate-50 py-3 px-6 rounded-xl font-semibold transition-colors duration-200"
              >
                Explore Community
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return null;
};

export default Join;