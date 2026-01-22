"use client"
import type React from "react"
import { useState, useEffect } from "react"

import Link from "next/link"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { getWriterProfile, submitWriterProfile } from "@/services/writer"
import { X } from "lucide-react"

interface WriterProfileData {
  user_id: number
  writing_styles: string[]
  languages: string[]
  sample_title: string
  experience_background: string
  portfolio: string
  availability: string
  created_at: string
  updated_at: string
  country: string
  city: string
}

const EditWriterProfile: React.FC = () => {
  const { writerId } = useParams<{ writerId: string }>()
  const [formData, setFormData] = useState({
    writing_styles: "",
    languages: "",
    sample_title: "",
    experience_background: "",
    portfolio: "",
    availability: "",
  })
  const [loading, setLoading] = useState(true)
  const [formError, setFormError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const response = await getWriterProfile(Number(writerId))
        setFormData({
          writing_styles: response.data.writing_styles.join(", "),
          languages: response.data.languages.join(", "),
          sample_title: response.data.sample_title,
          experience_background: response.data.experience_background,
          portfolio: response.data.portfolio,
          availability: response.data.availability,
        })
      } catch (err: any) {
        console.error("Error fetching writer profile:", err)
        setFormError("Failed to load profile data")
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [writerId])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      setFormError(null)
      const data = {
        writing_styles: formData.writing_styles
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s),
        languages: formData.languages
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s),
        sample_title: formData.sample_title,
        experience_background: formData.experience_background,
        portfolio: formData.portfolio,
        availability: formData.availability,
      }
      await submitWriterProfile(data)
      navigate(`/writer/${writerId}`)
    } catch (err: any) {
      console.error("Error submitting writer profile:", err)
      setFormError("Failed to update profile. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-emerald-900 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-800 font-medium">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto px-4"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-slate-900">Edit Writer Profile</h2>
            <Link to={`/writer/${writerId}`} className="text-slate-800 hover:text-emerald-900">
              <X className="w-6 h-6" />
            </Link>
          </div>
          {formError && (
            <div className="mb-6 p-4 bg-emerald-50 text-emerald-900 rounded-lg">
              {formError}
            </div>
          )}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-800 mb-1">
                Writing Styles (comma-separated)
              </label>
              <input
                type="text"
                name="writing_styles"
                value={formData.writing_styles}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-slate-50 text-slate-800 border border-slate-50 focus:border-emerald-900 focus:ring focus:ring-emerald-50"
                placeholder="e.g., Poetry, Short Stories, Editorials"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-800 mb-1">
                Languages (comma-separated)
              </label>
              <input
                type="text"
                name="languages"
                value={formData.languages}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-slate-50 text-slate-800 border border-slate-50 focus:border-emerald-900 focus:ring focus:ring-emerald-50"
                placeholder="e.g., English, Urdu"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-800 mb-1">
                Sample Title
              </label>
              <input
                type="text"
                name="sample_title"
                value={formData.sample_title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-slate-50 text-slate-800 border border-slate-50 focus:border-emerald-900 focus:ring focus:ring-emerald-50"
                placeholder="e.g., Echoes of a Forgotten City"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-800 mb-1">
                Experience & Background
              </label>
              <textarea
                name="experience_background"
                value={formData.experience_background}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-slate-50 text-slate-800 border border-slate-50 focus:border-emerald-900 focus:ring focus:ring-emerald-50"
                placeholder="e.g., 5 years of freelance writing..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-800 mb-1">
                Portfolio URL
              </label>
              <input
                type="url"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-slate-50 text-slate-800 border border-slate-50 focus:border-emerald-900 focus:ring focus:ring-emerald-50"
                placeholder="e.g., https://example.com/portfolio"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-800 mb-1">
                Availability
              </label>
              <input
                type="text"
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-slate-50 text-slate-800 border border-slate-50 focus:border-emerald-900 focus:ring focus:ring-emerald-50"
                placeholder="e.g., Available for part-time projects"
              />
            </div>
            <div className="flex justify-end gap-4">
              <Link
                to={`/writer/${writerId}`}
                className="px-4 py-2 rounded-lg bg-slate-50 text-slate-800 hover:bg-emerald-50 transition"
              >
                Cancel
              </Link>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-lg bg-emerald-900 text-white hover:bg-emerald-800 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default EditWriterProfile