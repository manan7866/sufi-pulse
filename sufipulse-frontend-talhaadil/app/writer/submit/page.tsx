"use client";
import { useState } from "react";
import type React from "react";
import Link from "next/link";
import { PenTool, ArrowLeft, BookOpen, User, Menu, X } from "lucide-react";
import { createKalam } from "@/services/writer";

// Define interfaces for type safety
interface KalamFormData {
  title: string;
  language: string;
  theme: string;
  kalam_text: string;
  description: string;
  sufi_influence: string;
  musical_preference: string;
  writer_comments: string;
}

interface KalamResponse {
  data: {
    id: string;
    title: string;
    // Add other fields as needed
  };
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
      errors?: Record<string, string>;
    };
  };
  message: string;
}

export default function SubmitKalam() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState<KalamFormData>({
    title: "",
    language: "",
    theme: "",
    kalam_text: "",
    description: "",
    sufi_influence: "",
    musical_preference: "",
    writer_comments: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    else if (formData.title.length > 100) newErrors.title = "Title must be under 100 characters";
    if (!formData.language) newErrors.language = "Language is required";
    if (!formData.theme) newErrors.theme = "Theme is required";
    if (!formData.kalam_text.trim()) newErrors.kalam_text = "Kalam text is required";
    else if (formData.kalam_text.length > 5000)
      newErrors.kalam_text = "Kalam text must be under 5000 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response: KalamResponse = await createKalam(formData);
      console.log("✅ Kalam created successfully:", response.data);
      alert("Kalam submitted successfully!");
      setFormData({
        title: "",
        language: "",
        theme: "",
        kalam_text: "",
        description: "",
        sufi_influence: "",
        musical_preference: "",
        writer_comments: "",
      });
    } catch (error: any) {
      console.error("Error submitting kalam:", error.response?.data || error.message);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
      alert(`Submission failed: ${error.response?.data?.detail || "Please try again."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-slate-900 bg-opacity-50 z-50">
          <div className="w-64 bg-white h-full p-4">
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-slate-600 hover:text-slate-900"
              aria-label="Close sidebar"
            >
              <X className="w-6 h-6" />
            </button>
            {/* Add sidebar content */}
          </div>
        </div>
      )}

      {/* Main content */}
      <div>
        {/* Top bar */}
        <div className="bg-white border-b border-slate-200 px-4 py-4 lg:px-8">
          <div className="flex items-center justify-between">
            
            <div className="flex items-center space-x-4">
              <Link href="/writer/kalams" className="text-slate-600 hover:text-slate-900">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h2 className="text-xl font-semibold text-slate-900">Submit Kalam</h2>
            </div>
          </div>
        </div>

        {/* Form content */}
        <div className="p-4 lg:p-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-900 focus:border-emerald-900 outline-none"
                    placeholder="Enter kalam title"
                    aria-required="true"
                  />
                  {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Language *
                    </label>
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-900 focus:border-emerald-900 outline-none"
                      aria-required="true"
                    >
                      <option value="">Select Language</option>
                      <option value="Urdu">Urdu</option>
                      <option value="English">English</option>
                      <option value="Arabic">Arabic</option>
                      <option value="Persian">Persian</option>
                      <option value="Turkish">Turkish</option>
                      <option value="Kashmiri">Kashmiri</option>
                      <option value="Multilingual">Multilingual</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.language && (
                      <p className="text-sm text-red-600 mt-1">{errors.language}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Theme *</label>
                    <select
                      name="theme"
                      value={formData.theme}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-900 focus:border-emerald-900 outline-none"
                      aria-required="true"
                    >
                      <option value="">Select Theme</option>
                      <option value="Divine Love">Divine Love</option>
                      <option value="Unity">Unity</option>
                      <option value="Spiritual Journey">Spiritual Journey</option>
                      <option value="Repentance">Repentance</option>
                      <option value="Remembrance">Remembrance</option>
                      <option value="Spiritual Awakening">Spiritual Awakening</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.theme && <p className="text-sm text-red-600 mt-1">{errors.theme}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Kalam Text *
                  </label>
                  <textarea
                    name="kalam_text"
                    value={formData.kalam_text}
                    onChange={handleInputChange}
                    rows={8}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-900 focus:border-emerald-900 outline-none"
                    placeholder="Enter your sacred poetry here..."
                    aria-required="true"
                  />
                  {errors.kalam_text && (
                    <p className="text-sm text-red-600 mt-1">{errors.kalam_text}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-900 focus:border-emerald-900 outline-none"
                    placeholder="Describe the inspiration or meaning..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Sufi Influence
                    </label>
                    <input
                      type="text"
                      name="sufi_influence"
                      value={formData.sufi_influence}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-900 focus:border-emerald-900 outline-none"
                      placeholder="e.g., Rumi, Bulleh Shah"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Musical Preference
                    </label>
                    <select
                      name="musical_preference"
                      value={formData.musical_preference}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-900 focus:border-emerald-900 outline-none"
                    >
                      <option value="">Open to Direction</option>
                      <option value="Qawwali">Qawwali</option>
                      <option value="Sacred Chant">Sacred Chant</option>
                      <option value="Spiritual Anthem">Spiritual Anthem</option>
                      <option value="Whisper Kalam">Whisper Kalam</option>
                      <option value="Soft instrumental">Soft instrumental</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Writer Comments
                  </label>
                  <textarea
                    name="writer_comments"
                    value={formData.writer_comments}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-900 focus:border-emerald-900 outline-none"
                    placeholder="Any additional comments or requests..."
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-6 py-3 bg-emerald-900 text-white rounded-lg hover:bg-emerald-800 transition-colors ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    aria-label="Submit Kalam"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin h-5 w-5 mr-2"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      "Submit Kalam"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}