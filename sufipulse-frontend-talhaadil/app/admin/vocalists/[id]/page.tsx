"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getVocalistProfile } from "@/services/vocalist"

interface VocalistProfile {
  user_id: number
  vocal_range: string
  languages: string[]
  sample_title: string
  audio_sample_url: string
  sample_description: string
  experience_background: string
  portfolio: string
  availability: string
  status: string
  created_at: string
  updated_at: string
  country: string
  city: string
}

export default function VocalistDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [profile, setProfile] = useState<VocalistProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("[v0] Fetching vocalist profile for ID:", params.id)
        const response = await getVocalistProfile(Number(params.id))
        console.log("[v0] Vocalist profile response:", response.data)
        setProfile(response.data)
      } catch (error) {
        console.error("[v0] Error fetching vocalist profile:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProfile()
    }
  }, [params.id])

  if (loading) {
     return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-emerald-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your vocalist...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-800 text-lg">Vocalist not found</div>
        <button
          onClick={() => router.back()}
          className="mt-4 bg-emerald-900 text-emerald-50 py-2 px-4 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors duration-200"
        >
          Go Back
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Vocalist Details</h1>
          <p className="text-slate-800 mt-2">ID: {profile.user_id}</p>
        </div>
        <button
          onClick={() => router.back()}
          className="bg-slate-800 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-slate-900 transition-colors duration-200"
        >
          ← Back
        </button>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Basic Info */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-800">Location</label>
              <p className="text-slate-900">
                {profile.city}, {profile.country}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-800">Vocal Range</label>
              <p className="text-slate-900">{profile.vocal_range}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-800">Languages</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {profile.languages.map((lang, index) => (
                  <span key={index} className="bg-emerald-50 text-emerald-900 px-2 py-1 rounded-md text-sm">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-800">Status</label>
              <span
                className={`inline-block px-2 py-1 rounded-md text-sm font-medium ml-2 ${
                  profile.status === "approved"
                    ? "bg-emerald-50 text-emerald-900"
                    : profile.status === "pending"
                      ? "bg-yellow-50 text-yellow-800"
                      : "bg-red-50 text-red-800"
                }`}
              >
                {profile.status}
              </span>
            </div>
          </div>
        </div>

        {/* Sample & Experience */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Sample & Experience</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-800">Sample Title</label>
              <p className="text-slate-900">{profile.sample_title}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-800">Sample Description</label>
              <p className="text-slate-900">{profile.sample_description}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-800">Audio Sample</label>
              {profile.audio_sample_url ? (
                <audio controls className="w-full mt-2">
                  <source src={profile.audio_sample_url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              ) : (
                <p className="text-slate-800">No audio sample available</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-slate-800">Experience Background</label>
              <p className="text-slate-900">{profile.experience_background}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-800">Portfolio</label>
              {profile.portfolio ? (
                <a
                  href={profile.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-900 hover:underline"
                >
                  View Portfolio
                </a>
              ) : (
                <p className="text-slate-800">No portfolio available</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-slate-800">Availability</label>
              <p className="text-slate-900">{profile.availability}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Timestamps */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Timeline</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-800">Created At</label>
            <p className="text-slate-900">{new Date(profile.created_at).toLocaleString()}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-800">Updated At</label>
            <p className="text-slate-900">{new Date(profile.updated_at).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
