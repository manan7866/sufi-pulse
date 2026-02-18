"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import api from "@/lib/axios"

interface BloggerProfile {
  user_id: number
  author_name: string | null
  author_image_url: string | null
  short_bio: string | null
  location: string | null
  website_url: string | null
  social_links: Record<string, any> | null
  publish_pseudonym: boolean
  original_work_confirmation: boolean
  publishing_rights_granted: boolean
  discourse_policy_agreed: boolean
  status: string
  created_at: string
  updated_at: string
  country: string
  city: string
}

export default function BloggerDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [profile, setProfile] = useState<BloggerProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [adminComments, setAdminComments] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")

  // All possible statuses for blogger profiles
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
        console.log("[v0] Fetching blogger profile for ID:", params.id)
        const response = await api.get(`/bloggers/get/${params.id}`, {
          headers: {
            requiresAuth: true,
          },
        })
        console.log("[v0] Blogger profile response:", response.data)
        setProfile(response.data)
      } catch (error) {
        console.error("[v0] Error fetching blogger profile:", error)
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
      const response = await api.get(`/bloggers/get/${params.id}`, {
        headers: {
          requiresAuth: true,
        },
      })
      setProfile(response.data)
      setAdminComments("")
      setSelectedStatus("")
      alert(`Blogger status updated to ${newStatus.replace('_', ' ')} successfully!`)
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
          <p className="text-slate-600">Loading blogger profile...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-800 text-lg">Blogger not found</div>
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
          <h1 className="text-3xl font-bold text-slate-900">Blogger Details</h1>
          <p className="text-slate-800 mt-2">ID: {profile.user_id}</p>
        </div>
        <button
          onClick={() => router.back()}
          className="bg-slate-800 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-slate-900 transition-colors duration-200"
        >
          ← Back
        </button>
      </div>

      {/* Status Update Actions */}
      {profile.status === "pending" && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Review Actions</h2>
          <div className="space-y-4">
            <textarea
              value={adminComments}
              onChange={(e) => setAdminComments(e.target.value)}
              placeholder="Add comments for the blogger (optional)..."
              className="w-full p-2 border border-slate-200 rounded-md"
              rows={3}
            />
            <div className="flex gap-4">
              <button
                onClick={() => handleStatusUpdate("approved")}
                disabled={isUpdating}
                className="bg-emerald-900 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-emerald-800 transition-colors duration-200 disabled:opacity-50"
              >
                Approve Blogger
              </button>
              <button
                onClick={() => handleStatusUpdate("rejected")}
                disabled={isUpdating}
                className="bg-red-900 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-red-800 transition-colors duration-200 disabled:opacity-50"
              >
                Reject Blogger
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Basic Info */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-800">Author Name</label>
              <p className="text-slate-900">{profile.author_name || "N/A"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-800">Location</label>
              <p className="text-slate-900">
                {profile.city && profile.country ? `${profile.city}, ${profile.country}` : "N/A"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-800">Website</label>
              {profile.website_url ? (
                <a
                  href={profile.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-900 hover:underline"
                >
                  {profile.website_url}
                </a>
              ) : (
                <p className="text-slate-800">No website provided</p>
              )}
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

        {/* Bio & Social */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Bio & Social</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-800">Short Bio</label>
              <p className="text-slate-900">{profile.short_bio || "No bio provided"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-800">Author Image</label>
              {profile.author_image_url ? (
                <img
                  src={profile.author_image_url}
                  alt={profile.author_name || "Author"}
                  className="w-24 h-24 rounded-full object-cover mt-2"
                />
              ) : (
                <p className="text-slate-800">No image available</p>
              )}
            </div>
            {profile.social_links && Object.keys(profile.social_links).length > 0 && (
              <div>
                <label className="text-sm font-medium text-slate-800">Social Links</label>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {Object.entries(profile.social_links).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded hover:bg-slate-200"
                    >
                      {platform}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Policy Agreements */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Policy Agreements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={profile.publish_pseudonym}
              disabled
              className="w-4 h-4 text-emerald-900 rounded"
            />
            <label className="text-sm text-slate-800">Publish as Pseudonym</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={profile.original_work_confirmation}
              disabled
              className="w-4 h-4 text-emerald-900 rounded"
            />
            <label className="text-sm text-slate-800">Original Work Confirmed</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={profile.publishing_rights_granted}
              disabled
              className="w-4 h-4 text-emerald-900 rounded"
            />
            <label className="text-sm text-slate-800">Publishing Rights Granted</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={profile.discourse_policy_agreed}
              disabled
              className="w-4 h-4 text-emerald-900 rounded"
            />
            <label className="text-sm text-slate-800">Discourse Policy Agreed</label>
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
