"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getVocalistProfile } from "@/services/vocalist"
import api from "@/lib/axios"

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
  const [isUpdating, setIsUpdating] = useState(false)
  const [adminComments, setAdminComments] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")

  // All possible statuses for vocalist profiles
  const allStatuses = [
    { value: "pending", label: "Pending", color: "bg-amber-100 text-amber-900" },
    { value: "under_review", label: "Under Review", color: "bg-blue-100 text-blue-900" },
    { value: "approved", label: "Approved", color: "bg-emerald-100 text-emerald-900" },
    { value: "needs_revision", label: "Needs Revision", color: "bg-orange-100 text-orange-900" },
    { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-900" },
  ]

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

  const handleStatusUpdate = async (newStatus: "pending" | "under_review" | "approved" | "needs_revision" | "rejected") => {
    if (!profile) return
    setIsUpdating(true)
    try {
      await api.patch(
        `/admin/${profile.user_id}/status`,
        { status: newStatus },
        {
          headers: {
            requiresAuth: true,
          },
        }
      )
      // Refresh profile data
      const response = await getVocalistProfile(Number(params.id))
      setProfile(response.data)
      setAdminComments("")
      setSelectedStatus("")
      alert(`Vocalist status updated to ${newStatus.replace('_', ' ')} successfully!`)
    } catch (error) {
      console.error("[v0] Error updating status:", error)
      alert("Failed to update status. Please try again.")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleManualStatusChange = () => {
    if (!selectedStatus) {
      alert("Please select a status first")
      return
    }
    handleStatusUpdate(selectedStatus as any)
  }

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

      {/* Status Display */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-900">Current Status</h2>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              profile.status === "approved"
                ? "bg-emerald-100 text-emerald-900"
                : profile.status === "pending"
                  ? "bg-amber-100 text-amber-900"
                  : profile.status === "under_review"
                    ? "bg-blue-100 text-blue-900"
                    : profile.status === "needs_revision"
                      ? "bg-orange-100 text-orange-900"
                      : "bg-red-100 text-red-900"
            }`}
          >
            {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Manual Status Change Section - ALWAYS VISIBLE */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-sm border border-blue-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Change Vocalist Status</h2>
            <p className="text-sm text-slate-600">Select any status to update this vocalist profile</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {/* Status Dropdown */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Select New Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">-- Choose a status --</option>
              {allStatuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
            {selectedStatus && (
              <div className="mt-2">
                <p className="text-sm text-slate-600">
                  Current: <span className="font-medium">{profile.status}</span>
                </p>
                <p className="text-sm text-blue-700">
                  Changing to: <span className="font-bold">{selectedStatus.replace('_', ' ')}</span>
                </p>
              </div>
            )}
          </div>

          {/* Update Button */}
          <button
            onClick={handleManualStatusChange}
            disabled={!selectedStatus || isUpdating}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdating ? "Updating..." : "Update Status"}
          </button>
        </div>
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
                {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
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
