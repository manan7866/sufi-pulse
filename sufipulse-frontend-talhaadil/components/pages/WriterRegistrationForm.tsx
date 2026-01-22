"use client"
import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { PenTool, Globe, BookOpen, CheckCircle, Award, Star, Users, Briefcase } from "lucide-react"
import { submitWriterProfile } from "@/services/writer"
import Cookies from "js-cookie"

interface WriterRegistrationFormProps {
  onRegistrationComplete: () => void
}

const WriterRegistrationForm: React.FC<WriterRegistrationFormProps> = ({ onRegistrationComplete }) => {
  const [formData, setFormData] = useState({
    writingStyles: [] as string[],
    languages: [] as string[],
    sampleTitle: "",
    experienceBackground: "",
    portfolio: "",
    availability: "",
    acceptTerms: false,
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const writingStyleOptions = [
    "Poetry",
    "Short Stories",
    "Editorials",
    "Articles",
    "Essays",
    "Creative Writing",
    "Technical Writing",
    "Academic Writing",
    "Journalism",
    "Copywriting",
    "Content Writing",
    "Scriptwriting",
  ]

  const languageOptions = [
    "English",
    "Urdu",
    "Arabic",
    "Persian",
    "Turkish",
    "Hindi",
    "Punjabi",
    "Sindhi",
    "Pashto",
    "Bengali",
    "French",
    "Spanish",
  ]

  const availabilityOptions = [
    "Full-time availability",
    "Part-time (20-30 hours/week)",
    "Freelance/Project-based",
    "Weekend availability only",
    "Evening hours only",
    "Flexible schedule",
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleMultiSelect = (name: string, value: string) => {
    setFormData((prev) => {
      const currentArray = prev[name as keyof typeof prev] as string[]
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value]

      return { ...prev, [name]: newArray }
    })

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

  

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const payload = {
        writing_styles: formData.writingStyles,
        languages: formData.languages,
        sample_title: formData.sampleTitle,
        experience_background: formData.experienceBackground,
        portfolio: formData.portfolio,
        availability: formData.availability,
      }

      const response = await submitWriterProfile(payload)
      console.log("✅ Writer Profile Submitted:", response.data)
      Cookies.set("info_submitted", "true");
      window.location.reload()
      // Call the callback to indicate registration is complete
      onRegistrationComplete()
    } catch (error: any) {
      console.error("❌ Submission Error:", error)
      setErrors({ submit: "Submission failed. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  const stats = [
    { number: "150+", label: "Active Writers", icon: PenTool },
    { number: "12+", label: "Languages", icon: Globe },
    { number: "500+", label: "Published Works", icon: BookOpen },
    { number: "100%", label: "Free Platform", icon: Award },
  ]

  const guidelines = [
    {
      title: "Writing Quality",
      description: "Clear, engaging content with proper grammar and structure",
      icon: Star,
    },
    {
      title: "Originality",
      description: "Original work that reflects your unique voice and perspective",
      icon: Award,
    },
    {
      title: "Cultural Sensitivity",
      description: "Respectful content that honors diverse traditions and beliefs",
      icon: Users,
    },
    {
      title: "Professional Approach",
      description: "Commitment to deadlines and collaborative work environment",
      icon: Briefcase,
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 relative">
      {/* Fixed Notification Popup */}
      <section className="fixed bottom-4 right-4 w-64 sm:w-72 md:w-80 bg-white border border-slate-200 shadow-lg rounded-lg p-4 text-center z-50 sm:bottom-5 sm:right-5">
  <h2 className="text-base sm:text-lg font-semibold text-slate-800 mb-2">
    Join Our Writer Community
  </h2>
  <p className="text-xs sm:text-sm text-slate-600 mb-3">
    Share your expertise and connect with writers worldwide. After submitting the form, you’ll go straight to your dashboard.
  </p>
</section>



      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                Join Our Writer Community
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
                Share your writing expertise and become part of our global community of talented writers
              </p>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 mb-12 sm:mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-slate-100 text-center"
                >
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600 mx-auto mb-3" />
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">{stat.number}</h3>
                  <p className="text-sm sm:text-base text-slate-600">{stat.label}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Guidelines */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Writer Guidelines</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Follow these guidelines to ensure your writing meets our community standards
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {guidelines.map((guideline, index) => {
              const Icon = guideline.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-slate-100 text-center"
                >
                  <Icon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{guideline.title}</h3>
                  <p className="text-sm text-slate-600">{guideline.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Writer Registration</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Complete your writer profile to join our community
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Writing Styles */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Writing Styles * (Select all that apply)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {writingStyleOptions.map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => handleMultiSelect("writingStyles", style)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                        formData.writingStyles.includes(style)
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
                {errors.writingStyles && <p className="text-sm text-red-600 mt-1">{errors.writingStyles}</p>}
              </div>

              {/* Languages */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Languages * (Select all you can write in)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {languageOptions.map((language) => (
                    <button
                      key={language}
                      type="button"
                      onClick={() => handleMultiSelect("languages", language)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                        formData.languages.includes(language)
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {language}
                    </button>
                  ))}
                </div>
                {errors.languages && <p className="text-sm text-red-600 mt-1">{errors.languages}</p>}
              </div>

              {/* Sample Title */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Sample Work Title *</label>
                <input
                  type="text"
                  name="sampleTitle"
                  value={formData.sampleTitle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                  placeholder="Title of your best writing sample"
                  required
                />
                {errors.sampleTitle && <p className="text-sm text-red-600 mt-1">{errors.sampleTitle}</p>}
              </div>

              {/* Experience Background */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Experience & Background *</label>
                <textarea
                  name="experienceBackground"
                  value={formData.experienceBackground}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                  placeholder="Tell us about your writing experience, education, published works, and areas of expertise..."
                  required
                />
                {errors.experienceBackground && (
                  <p className="text-sm text-red-600 mt-1">{errors.experienceBackground}</p>
                )}
              </div>

              {/* Portfolio */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Portfolio/Previous Work (Optional)
                </label>
                <input
                  type="url"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                  placeholder="https://your-portfolio.com or link to published works"
                />
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Availability *</label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
                  required
                >
                  <option value="">Select your availability</option>
                  {availabilityOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.availability && <p className="text-sm text-red-600 mt-1">{errors.availability}</p>}
              </div>

              {/* Terms */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                <h4 className="text-base font-medium text-emerald-800 mb-2">Writer Agreement</h4>
                <p className="text-sm text-emerald-700 mb-4">
                  By registering as a writer, I agree to contribute original, high-quality content that respects our
                  community guidelines and cultural values. I understand this is a collaborative platform where I will
                  receive proper attribution for my work.
                </p>
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="mt-1 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500 h-5 w-5"
                    required
                  />
                  <span className="text-sm text-emerald-800">I understand and accept this writer agreement *</span>
                </label>
                {errors.acceptTerms && <p className="text-sm text-red-600 mt-1">{errors.acceptTerms}</p>}
              </div>

              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-600">{errors.submit}</p>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Complete Registration</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default WriterRegistrationForm