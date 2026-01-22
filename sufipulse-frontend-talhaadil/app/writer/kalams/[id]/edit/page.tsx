'use client';
import { useState, useEffect } from "react";
import type React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { BookOpen, User, PenTool, Menu, X, ArrowLeft } from "lucide-react";
import { getKalamDetails, updateKalam } from "@/services/writer";

interface Kalam {
  id: number;
  title: string;
  language: string;
  theme: string;
  kalam_text: string;
  description: string;
  sufi_influence: string;
  musical_preference: string;
  youtube_link: string | null;
  writer_id: number;
  vocalist_id: number | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

interface Submission {
  id: number;
  kalam_id: number;
  status: string;
  user_approval_status: string;
  admin_comments: string;
  writer_comments: string;
  created_at: string;
  updated_at: string;
  vocalist_approval_status: string;
}

interface KalamData {
  kalam: Kalam;
  submission: Submission;
}

interface KalamFormData {
  title: string;
  language: string;
  theme: string;
  kalam_text: string;
  description: string;
  sufi_influence: string;
  musical_preference: string;
}

interface KalamResponse {
  data: {
    id: string;
    title: string;
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

export default function EditKalam() {
  const params = useParams();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [kalamData, setKalamData] = useState<KalamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<KalamFormData>({
    title: "",
    language: "",
    theme: "",
    kalam_text: "",
    description: "",
    sufi_influence: "",
    musical_preference: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (params.id) {
      fetchKalam();
    }
  }, [params.id]);

  const fetchKalam = async () => {
    try {
      const response = await getKalamDetails(String(params.id));
      if (response.status === 200) {
        const data = response.data;
        setKalamData(data);
        const { kalam } = data;
        setFormData({
          title: kalam.title,
          language: kalam.language,
          theme: kalam.theme,
          kalam_text: kalam.kalam_text,
          description: kalam.description || "",
          sufi_influence: kalam.sufi_influence || "",
          musical_preference: kalam.musical_preference || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch kalam:", error);
    } finally {
      setLoading(false);
    }
  };

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
    if (!validateForm() || !kalamData) return;

    if (["final_approved", "complete_approved"].includes(kalamData.submission.status)) {
      alert("This kalam cannot be edited as it has been finalized.");
      return;
    }

    setSaving(true);
    try {
      const response: KalamResponse = await updateKalam(Number(params.id), formData);
      console.log("✅ Kalam updated successfully:", response.data);
      alert("Kalam updated successfully!");
      router.push(`/writer/kalams/${params.id}`);
    } catch (error: any) {
      console.error("Error updating kalam:", error.response?.data || error.message);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
      alert(`Failed to update kalam: ${error.response?.data?.detail || "Please try again."}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-emerald-900 border-t-transparent rounded-full animate-spin mx-auto mb-3 sm:mb-4"></div>
          <p className="text-sm sm:text-base text-slate-600">Loading kalam...</p>
        </div>
      </div>
    );
  }

  if (!kalamData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-base sm:text-lg font-medium text-slate-900 mb-2">Kalam not found</h3>
          <Link href="/writer/kalams" className="text-emerald-900 hover:text-emerald-800 text-sm sm:text-base">
            Back to My Kalams
          </Link>
        </div>
      </div>
    );
  }

  if (["final_approved", "complete_approved"].includes(kalamData.submission.status)) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-base sm:text-lg font-medium text-slate-900 mb-2">Cannot Edit</h3>
          <p className="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4">This kalam has been finalized and cannot be edited.</p>
          <Link href={`/writer/kalams/${params.id}`} className="text-emerald-900 hover:text-emerald-800 text-sm sm:text-base">
            View Kalam
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-slate-900 bg-opacity-50 z-50">
          <div className="w-64 sm:w-72 bg-white h-full p-4 sm:p-6">
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-slate-600 hover:text-slate-900 mb-4"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <nav className="space-y-4">
              <Link
                href="/writer/kalams"
                className="flex items-center space-x-2 text-sm sm:text-base text-slate-600 hover:text-emerald-900"
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>My Kalams</span>
              </Link>
              <Link
                href="/writer/profile"
                className="flex items-center space-x-2 text-sm sm:text-base text-slate-600 hover:text-emerald-900"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Profile</span>
              </Link>
              <Link
                href="/writer/submit"
                className="flex items-center space-x-2 text-sm sm:text-base text-slate-600 hover:text-emerald-900"
              >
                <PenTool className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Submit New Kalam</span>
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <div>
        {/* Top bar */}
        <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-slate-600 hover:text-slate-900"
                aria-label="Open sidebar"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <Link href={`/writer/kalams/${params.id}`} className="text-slate-600 hover:text-slate-900">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" aria-label="Back to kalam" />
              </Link>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-900">Edit Kalam</h2>
            </div>
          </div>
        </div>

        {/* Form content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg sm:rounded-xl border border-slate-200 p-4 sm:p-6 lg:p-8">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-1 sm:mb-2">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-900 focus:border-emerald-900 outline-none text-sm sm:text-base"
                    placeholder="Enter kalam title"
                    aria-required="true"
                  />
                  {errors.title && <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.title}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-1 sm:mb-2">Language *</label>
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-900 focus:border-emerald-900 outline-none text-sm sm:text-base"
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
                    {errors.language && <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.language}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-1 sm:mb-2">Theme *</label>
                    <select
                      name="theme"
                      value={formData.theme}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-900 focus:border-emerald-900 outline-none text-sm sm:text-base"
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
                    {errors.theme && <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.theme}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-1 sm:mb-2">Kalam Text *</label>
                  <textarea
                    name="kalam_text"
                    value={formData.kalam_text}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-900 focus:border-emerald-900 outline-none text-sm sm:text-base"
                    placeholder="Enter your sacred poetry here..."
                    aria-required="true"
                  />
                  {errors.kalam_text && <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.kalam_text}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-1 sm:mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-900 focus:border-emerald-900 outline-none text-sm sm:text-base"
                    placeholder="Describe the inspiration or meaning..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-1 sm:mb-2">Sufi Influence</label>
                    <input
                      type="text"
                      name="sufi_influence"
                      value={formData.sufi_influence}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-900 focus:border-emerald-900 outline-none text-sm sm:text-base"
                      placeholder="e.g., Rumi, Bulleh Shah"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-1 sm:mb-2">Musical Preference</label>
                    <select
                      name="musical_preference"
                      value={formData.musical_preference}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-900 focus:border-emerald-900 outline-none text-sm sm:text-base"
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

                <div className="flex justify-end space-x-3 sm:space-x-4">
                  <Link
                    href={`/writer/kalams/${params.id}`}
                    className="px-4 sm:px-6 py-2 sm:py-3 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors text-sm sm:text-base"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-emerald-900 text-white rounded-lg hover:bg-emerald-800 disabled:opacity-50 transition-colors text-sm sm:text-base"
                  >
                    {saving ? (
                      <>
                        <div className="inline-block w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
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