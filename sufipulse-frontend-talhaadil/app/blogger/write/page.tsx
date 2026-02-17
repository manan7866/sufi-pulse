'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { toast } from 'react-hot-toast';
import { submitBlogPost, getBlogSubmissionById, updateBlogPost, uploadBlogImage } from '@/services/blogger';
import { BookOpen, Globe, Tag, Calendar, Edit, PenTool, Award, Upload } from 'lucide-react';

// Dynamically import the RichTextEditor to avoid SSR issues
const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), { ssr: false });

const BlogWritingForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogId = searchParams.get('id');

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    featuredImage: null as File | null,
    featuredImageUrl: '',
    content: '',
    category: '',
    tags: '',
    language: '',
    editorNotes: '',
    scheduledPublishDate: '',
    seoMetaTitle: '',
    seoMetaDescription: ''
  });

  const [loading, setLoading] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Load existing blog if editing
  useEffect(() => {
    if (blogId) {
      setIsEditing(true);
      fetchBlogDetails();
    }
  }, [blogId]);

  const fetchBlogDetails = async () => {
    try {
      const response = await getBlogSubmissionById(Number(blogId));
      if (response.status === 200) {
        const blog = response.data;
        setFormData({
          title: blog.title || '',
          excerpt: blog.excerpt || '',
          featuredImage: null,
          content: blog.content || '',
          category: blog.category || '',
          tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : '',
          language: blog.language || '',
          editorNotes: blog.editor_notes || '',
          scheduledPublishDate: blog.scheduled_publish_date || '',
          seoMetaTitle: blog.seo_meta_title || '',
          seoMetaDescription: blog.seo_meta_description || ''
        });
      } else {
        toast.error('Failed to load blog details');
      }
    } catch (error) {
      console.error('Error fetching blog details:', error);
      toast.error('An error occurred while loading blog details');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Validate image size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      // Upload the image
      setIsUploadingImage(true);
      try {
        const response = await uploadBlogImage(file);
        if (response.data && response.data.url) {
          setFormData(prev => ({ 
            ...prev, 
            featuredImage: file,
            featuredImageUrl: response.data.url 
          }));
          toast.success('Image uploaded successfully!');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Failed to upload image');
      } finally {
        setIsUploadingImage(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare form data
      const dataToSend = {
        title: formData.title,
        excerpt: formData.excerpt,
        featured_image_url: formData.featuredImageUrl || undefined,
        content: formData.content,
        category: formData.category,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        language: formData.language,
        editor_notes: formData.editorNotes,
        scheduled_publish_date: formData.scheduledPublishDate ? new Date(formData.scheduledPublishDate) : null,
        seo_meta_title: formData.seoMetaTitle,
        seo_meta_description: formData.seoMetaDescription
      };

      // Determine if we're creating or updating
      let response;
      if (isEditing) {
        // Use service function for updating blog
        response = await updateBlogPost(Number(blogId), dataToSend);
      } else {
        // Use service function for new blog submission
        response = await submitBlogPost(dataToSend);
      }

      if (response.status === 200) {
        toast.success(isEditing ? 'Blog updated successfully!' : 'Blog submitted successfully!');
        router.push('/blogger/dashboard');
      } else {
        const errorData = response.data;
        toast.error(errorData.message || 'Failed to submit blog');
      }
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'submitting'} blog:`, error);
      toast.error(`An error occurred while ${isEditing ? 'updating' : 'submitting'} the blog`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="relative h-40 sm:h-56 bg-gradient-to-r from-emerald-900 to-emerald-500">
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 text-white text-sm">
          <Edit className="w-4 h-4" />
          <span>{isEditing ? "Edit Blog" : "Write Blog"}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 -mt-16 sm:-mt-20">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="flex flex-col items-center text-center -mt-12 mb-8">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-emerald-900 to-emerald-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg border-4 border-white">
              <PenTool className="w-10 h-10" />
            </div>
            <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900">
              {isEditing ? 'Edit Your Blog Post' : 'Write New Blog Post'}
            </h1>
            <p className="text-slate-800 text-sm mt-2">
              {isEditing ? 'Update your blog content' : 'Share your thoughts with the community'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Content Classification */}
            <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-900" /> Content Classification
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-900" /> Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                  >
                    <option value="">Select a category</option>
                    <option value="Sufi Poetry">Sufi Poetry</option>
                    <option value="Sufi Vakh">Sufi Vakh</option>
                    <option value="Sufi History">Sufi History</option>
                    <option value="Sufi Personalities">Sufi Personalities</option>
                    <option value="Sufi Inquiry">Sufi Inquiry</option>
                  </select>
                </div>

                {/* Tags */}
                <div>
                  
                  <label htmlFor="tags" className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-900" /> Add Searchable Tags
                    
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                    placeholder="Enter tags separated by commas"
                  />
                  <p className="text-xs text-slate-500 mt-1">Comma-separated values</p>
                </div>

                {/* Language */}
                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-900" /> Language *
                  </label>
                  <select
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                  >
                    <option value="">Select a language</option>
                    <option value="English">English</option>
                    <option value="Urdu">Urdu</option>
                    <option value="Kashmiri">Kashmiri</option>
                    <option value="Arabic">Arabic</option>
                    <option value="Persian">Persian</option>
                    <option value="Turkish">Turkish</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Content Metadata */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-900" /> Content Metadata  Short Summary / Description
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <PenTool className="w-4 h-4 text-emerald-900" /> Title * (Max 120 characters)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      maxLength={120}
                      className="w-full px-4 py-3 pl-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                      placeholder="Enter blog title (max 120 characters)"
                    />
                    <PenTool className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>
                  <div className="text-right text-xs text-slate-500 mt-1">
                    {formData.title.length}/120
                  </div>
                </div>

                {/* Excerpt */}
                <div>
                  <label htmlFor="excerpt" className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-900" /> Excerpt / Abstract * (150–300 words)
                  </label>
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                    placeholder="Write a 150-300 word summary for blog preview"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    {formData.excerpt.split(/\s+/).filter(Boolean).length} words
                  </p>
                </div>
              </div>

              {/* Featured Image Upload */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-900" /> Featured Image Upload *
                </label>
                <p className="text-xs text-slate-500 mb-3">
                  1200 × 630 recommended, Used for blog cards and sharing
                </p>
                <div className="flex items-center">
                  <label className="flex flex-col items-center justify-center w-64 h-48 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 relative">
                    {isUploadingImage ? (
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                        <p className="text-xs text-emerald-600 font-medium">Uploading...</p>
                      </div>
                    ) : formData.featuredImageUrl ? (
                      <img
                        src={formData.featuredImageUrl}
                        alt="Featured Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 text-slate-400" />
                        <p className="text-xs text-slate-500 mt-2">Click to upload</p>
                        <p className="text-xs text-slate-400 mt-1">Max 5MB</p>
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
            </div>

            {/* Main Content Editor */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Edit className="w-4 h-4 text-emerald-900" /> Full Submission * (Rich Text Editor)
              </label>
              <p className="text-xs text-slate-500 mb-4">
                Word guideline: 800–1500 words (except poetry). Includes headings, quote blocks, RTL support, footnotes, verse formatting.
              </p>
              {typeof window !== 'undefined' && (
                <RichTextEditor 
                  content={formData.content} 
                  onChange={handleContentChange} 
                />
              )}
              <p className="text-xs text-slate-500 mt-2">
                {formData.content.split(/\s+/).filter(Boolean).length} words
              </p>
            </div>

            {/* Additional Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* SEO Settings */}
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                <h3 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-900" /> SEO Settings
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="seoMetaTitle" className="block text-xs text-slate-500 mb-1">SEO Meta Title</label>
                    <input
                      type="text"
                      id="seoMetaTitle"
                      name="seoMetaTitle"
                      value={formData.seoMetaTitle}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
                      placeholder="SEO meta title"
                    />
                  </div>
                  <div>
                    <label htmlFor="seoMetaDescription" className="block text-xs text-slate-500 mb-1">SEO Meta Description</label>
                    <input
                      type="text"
                      id="seoMetaDescription"
                      name="seoMetaDescription"
                      value={formData.seoMetaDescription}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm"
                      placeholder="SEO meta description"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Options */}
              <div>
                {/* Editor Notes */}
                <div className="mb-6">
                  <label htmlFor="editorNotes" className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <Edit className="w-4 h-4 text-emerald-900" /> Editor Notes (Optional)
                  </label>
                  <textarea
                    id="editorNotes"
                    name="editorNotes"
                    value={formData.editorNotes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                    placeholder="Add any notes for editors"
                  />
                </div>

                {/* Scheduled Publish Date */}
                <div>
                  <label htmlFor="scheduledPublishDate" className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-900" /> Scheduled Publish Date (Optional)
                  </label>
                  <input
                    type="date"
                    id="scheduledPublishDate"
                    name="scheduledPublishDate"
                    value={formData.scheduledPublishDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push('/blogger/dashboard')}
                className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 disabled:opacity-50 flex items-center"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {isEditing ? 'Updating...' : 'Submitting...'}
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? 'Update Blog' : 'Submit Blog'}
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

export default BlogWritingForm;