'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { submitBloggerProfile } from '@/services/blogger';
import Cookies from 'js-cookie';

const BloggerProfilePage = () => {
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

      // Send profile data to backend using service
      const response = await submitBloggerProfile(dataToSend);

      if (response.status === 200) {
        toast.success('Profile updated successfully!');
        // Update the info_submitted cookie to reflect that the user has completed registration
        Cookies.set("info_submitted", "true", { path: "/" });
        router.push('/blogger/dashboard'); // Redirect to dashboard after successful submission
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Blogger Profile</h1>
        
        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
          {/* Author Name */}
          <div className="mb-6">
            <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 mb-2">
              Author Name *
            </label>
            <input
              type="text"
              id="authorName"
              name="authorName"
              value={formData.authorName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your author name"
            />
          </div>

          {/* Author Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Author Image Upload *
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Square format recommended (500 × 500), Max 2MB, Auto-crop, Circular display on frontend
            </p>
            <div className="flex items-center">
              <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-full cursor-pointer bg-gray-50 hover:bg-gray-100">
                {formData.authorImage ? (
                  <img 
                    src={URL.createObjectURL(formData.authorImage)} 
                    alt="Preview" 
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <p className="text-xs text-gray-500 mt-2">Upload</p>
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

          {/* Short Bio */}
          <div className="mb-6">
            <label htmlFor="shortBio" className="block text-sm font-medium text-gray-700 mb-2">
              Short Bio * (50–100 words)
            </label>
            <textarea
              id="shortBio"
              name="shortBio"
              value={formData.shortBio}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Write a short bio (50-100 words)"
            />
          </div>

          {/* Location */}
          <div className="mb-6">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location (Optional)
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your location"
            />
          </div>

          {/* Website / Social Links */}
          <div className="mb-6">
            <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700 mb-2">
              Website / Social Links (Optional)
            </label>
            <input
              type="url"
              id="websiteUrl"
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
              placeholder="https://yourwebsite.com"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Twitter</label>
                <input
                  type="url"
                  value={formData.socialLinks.twitter}
                  onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                  placeholder="https://twitter.com/username"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Instagram</label>
                <input
                  type="url"
                  value={formData.socialLinks.instagram}
                  onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                  placeholder="https://instagram.com/username"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">LinkedIn</label>
                <input
                  type="url"
                  value={formData.socialLinks.linkedin}
                  onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Facebook</label>
                <input
                  type="url"
                  value={formData.socialLinks.facebook}
                  onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                  placeholder="https://facebook.com/username"
                />
              </div>
            </div>
          </div>

          {/* Publish under pseudonym */}
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="publishPseudonym"
                checked={formData.publishPseudonym}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Publish under pseudonym</span>
            </label>
          </div>

          {/* Declaration & Rights */}
          <div className="mb-6 p-4 bg-blue-50 rounded-md border border-blue-100">
            <h3 className="font-medium text-gray-900 mb-3">Declaration & Rights</h3>
            
            <div className="space-y-2">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="originalWorkConfirmation"
                  checked={formData.originalWorkConfirmation}
                  onChange={handleChange}
                  required
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">I confirm this is original work</span>
              </label>
              
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="publishingRightsGranted"
                  checked={formData.publishingRightsGranted}
                  onChange={handleChange}
                  required
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">I grant SufiPulse publishing rights</span>
              </label>
              
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="discoursePolicyAgreed"
                  checked={formData.discoursePolicyAgreed}
                  onChange={handleChange}
                  required
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">I agree to respectful discourse policy</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BloggerProfilePage;