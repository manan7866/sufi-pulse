// components/pages/BloggerRegistrationForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Globe, BookOpen, Calendar, MapPin, ExternalLink, Edit, PenTool, Award, Clock } from "lucide-react";
import { toast } from "react-hot-toast";
import { submitBloggerProfile, getBloggerProfile } from "@/services/blogger";
import Cookies from "js-cookie";

interface BloggerRegistrationFormProps {
  onRegistrationComplete: () => void;
  onCancel?: () => void;
  isEditing?: boolean; // Whether this is for editing an existing profile
}

const BloggerRegistrationForm = ({ onRegistrationComplete, onCancel, isEditing = false }: BloggerRegistrationFormProps) => {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    authorName: '',
    authorImage: null as File | null,
    shortBio: '',
    location: '',
    websiteUrl: '',
    socialLinks: { twitter: '', instagram: '', linkedin: '', facebook: '' },
    publishPseudonym: false,
    originalWorkConfirmation: false,
    publishingRightsGranted: false,
    discoursePolicyAgreed: false,
  });

  const [loading, setLoading] = useState(false);

  // Load existing profile data if editing
  useEffect(() => {
    if (isEditing) {
      const loadProfile = async () => {
        try {
          const userId = parseInt(Cookies.get('user_id') || '0');
          if (userId) {
            const response = await getBloggerProfile(userId);
            if (response.status === 200 && response.data) {
              const profile = response.data;
              setFormData({
                authorName: profile.author_name || '',
                authorImage: null, // We don't load the image file, just the URL
                shortBio: profile.short_bio || '',
                location: profile.location || '',
                websiteUrl: profile.website_url || '',
                socialLinks: profile.social_links || { twitter: '', instagram: '', linkedin: '', facebook: '' },
                publishPseudonym: profile.publish_pseudonym || false,
                originalWorkConfirmation: profile.original_work_confirmation || false,
                publishingRightsGranted: profile.publishing_rights_granted || false,
                discoursePolicyAgreed: profile.discourse_policy_agreed || false,
              });
            }
          }
        } catch (error) {
          console.error('Error loading profile:', error);
          toast.error('Failed to load profile data');
        }
      };

      loadProfile();
    }
  }, [isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checkbox.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Validate image size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size should be less than 2MB');
        return;
      }
      setFormData(prev => ({ ...prev, authorImage: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create form data object
      const dataToSend = {
        author_name: formData.authorName,
        author_image_url: formData.authorImage ? URL.createObjectURL(formData.authorImage) : undefined,
        short_bio: formData.shortBio,
        location: formData.location,
        website_url: formData.websiteUrl,
        social_links: formData.socialLinks,
        publish_pseudonym: formData.publishPseudonym,
        original_work_confirmation: formData.originalWorkConfirmation,
        publishing_rights_granted: formData.publishingRightsGranted,
        discourse_policy_agreed: formData.discoursePolicyAgreed,
      };

      // Send profile data to backend
      const response = await submitBloggerProfile(dataToSend);

      if (response.status === 200) {
        toast.success('Profile updated successfully!');
        // Update the info_submitted cookie to reflect that the user has completed registration
        Cookies.set("info_submitted", "true", { path: "/" });
        onRegistrationComplete(); // Notify parent that registration is complete
      } else {
        const errorData = response.data;
        toast.error(errorData.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error submitting profile:', error);
      toast.error('An error occurred while submitting the profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <div className="relative h-40 sm:h-56 bg-gradient-to-r from-emerald-900 to-emerald-500">
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 text-white text-sm">
          <Edit className="w-4 h-4" />
          <span>{isEditing ? "Edit Profile" : "Complete Profile"}</span>
        </div>
      </div>

      {/* Profile Card */}
      <div className="max-w-5xl mx-auto px-4 -mt-16 sm:-mt-20">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 relative">
          {/* Avatar + Header */}
          <div className="flex flex-col items-center text-center -mt-12">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-emerald-900 to-emerald-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg border-4 border-white">
              <User />
            </div>
            <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900">
              {isEditing ? "Edit Your Blogger Profile" : "Complete Your Blogger Profile"}
            </h1>
            <p className="text-slate-800 text-sm mt-2">
              {isEditing ? "Update your profile information" : "Fill in your details to activate your blogger account"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* LEFT COLUMN */}
              <div className="space-y-6">
                {/* Author Name */}
                <div>
                  <label htmlFor="authorName" className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-900" /> Author Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="authorName"
                      name="authorName"
                      value={formData.authorName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pl-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                      placeholder="Enter your author name"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>
                </div>

                {/* Short Bio */}
                <div>
                  <label htmlFor="shortBio" className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-900" /> Short Bio * (50–100 words)
                  </label>
                  <textarea
                    id="shortBio"
                    name="shortBio"
                    value={formData.shortBio}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                    placeholder="Write a short bio (50-100 words)"
                  />
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-900" /> Location (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pl-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                      placeholder="Enter your location"
                    />
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-6">
                {/* Author Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-900" /> Author Image Upload *
                  </label>
                  <p className="text-xs text-slate-500 mb-2">
                    Square format recommended (500 × 500), Max 2MB, Auto-crop, Circular display on frontend
                  </p>
                  <div className="flex items-center">
                    <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-slate-300 rounded-full cursor-pointer bg-slate-50 hover:bg-slate-100">
                      {formData.authorImage ? (
                        <img 
                          src={URL.createObjectURL(formData.authorImage)} 
                          alt="Preview" 
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <p className="text-xs text-slate-500 mt-2">Upload</p>
                        </div>
                      )}
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        className="hidden" 
                      />
                    </label>
                  </div>
                </div>

                {/* Website */}
                <div>
                  <label htmlFor="websiteUrl" className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-900" /> Website (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      id="websiteUrl"
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pl-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                      placeholder="https://yourwebsite.com"
                    />
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-900" /> Social Links (Optional)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Twitter</label>
                      <input
                        type="url"
                        value={formData.socialLinks.twitter}
                        onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
                        placeholder="https://twitter.com/username"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Instagram</label>
                      <input
                        type="url"
                        value={formData.socialLinks.instagram}
                        onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
                        placeholder="https://instagram.com/username"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">LinkedIn</label>
                      <input
                        type="url"
                        value={formData.socialLinks.linkedin}
                        onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Facebook</label>
                      <input
                        type="url"
                        value={formData.socialLinks.facebook}
                        onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
                        placeholder="https://facebook.com/username"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Publish under pseudonym */}
            <div className="mt-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="publishPseudonym"
                  checked={formData.publishPseudonym}
                  onChange={handleChange}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-600 border-slate-300 rounded"
                />
                <span className="ml-2 text-sm text-slate-700">Publish under pseudonym</span>
              </label>
            </div>

            {/* Declaration & Rights */}
            <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
              <h3 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-900" /> Declaration & Rights
              </h3>
              
              <div className="space-y-2">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="originalWorkConfirmation"
                    checked={formData.originalWorkConfirmation}
                    onChange={handleChange}
                    required
                    className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-600 border-slate-300 rounded"
                  />
                  <span className="ml-2 text-sm text-slate-700">I confirm this is original work</span>
                </label>
                
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="publishingRightsGranted"
                    checked={formData.publishingRightsGranted}
                    onChange={handleChange}
                    required
                    className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-600 border-slate-300 rounded"
                  />
                  <span className="ml-2 text-sm text-slate-700">I grant SufiPulse publishing rights</span>
                </label>
                
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="discoursePolicyAgreed"
                    checked={formData.discoursePolicyAgreed}
                    onChange={handleChange}
                    required
                    className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-600 border-slate-300 rounded"
                  />
                  <span className="ml-2 text-sm text-slate-700">I agree to respectful discourse policy</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex justify-end space-x-3">
              {isEditing && (
                <button
                  type="button"
                  onClick={onCancel} // Go back to display view by calling the cancel callback
                  className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 disabled:opacity-50 flex items-center"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? "Update Profile" : "Save Profile"}
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

export default BloggerRegistrationForm;