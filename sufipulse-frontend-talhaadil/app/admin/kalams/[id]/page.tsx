"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getKalamDetails } from "@/services/writer"
import { postYoutubeLink, updateSubmissionStatus, assignVocalist, getAllVocalists, getUser } from "@/services/admin"
import { sub } from "framer-motion/m"

interface KalamDetails {
  kalam: {
    id: number
    title: string
    language: string
    theme: string
    kalam_text: string
    description: string
    sufi_influence: string
    musical_preference: string
    youtube_link: string
    writer_id: number
    vocalist_id: number
    published_at: string | null
    created_at: string
    updated_at: string
  }
  submission: {
    id: number
    kalam_id: number
    status: string
    user_approval_status: string
    admin_comments: string
    writer_comments: string
    created_at: string
    updated_at: string
    vocalist_approval_status: string
  }
}

interface Vocalist {
  id: number
  email: string
  name: string
  role: string
  country: string
  city: string
}

export default function KalamDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [kalamDetails, setKalamDetails] = useState<KalamDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [vocalists, setVocalists] = useState<Vocalist[]>([])
  const [selectedVocalist, setSelectedVocalist] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [youtubeLink, setYoutubeLink] = useState("")
  const [adminComments, setAdminComments] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [writer, setWriter] = useState({
    name: "",
    country: "",
    city: ""
  })
  const [vocalistName, setVocalistName] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)


  useEffect(() => {
    const fetchKalamDetails = async () => {
      try {
        console.log("[v0] Fetching kalam details for ID:", params.id)
        const response = await getKalamDetails(String(params.id))
        console.log("[v0] Kalam details response:", response.data)
        console.log(kalamDetails)
        const anotherResponse = await getUser(response.data.kalam.writer_id)
        if (response.data.kalam.vocalist_id) {
          const vocalistResponse = await getUser(response.data.kalam.vocalist_id)
          setVocalistName(vocalistResponse.data.name)
        }
        console.log(anotherResponse.data)
        setKalamDetails(response.data)
        setWriter(
          {
            name: anotherResponse.data.name,
            country: anotherResponse.data.country,
            city: anotherResponse.data.city
          }
        )
      } catch (error) {
        console.error("[v0] Error fetching kalam details:", error)
      } finally {
        setLoading(false)
      }
    }

    const fetchVocalists = async () => {
      try {
        const response = await getAllVocalists()
        setVocalists(response.data.vocalists)
      } catch (error) {
        console.error("[v0] Error fetching vocalists:", error)
      }
    }



    if (params.id) {
      fetchKalamDetails()
      fetchVocalists()

    }
  }, [params.id])
  const statusMap = {
    final_approved: "Awaiting Vocalist"
  };



  const handleStatusUpdate = async (newStatus: 'changes_requested' | 'admin_approved' | 'admin_rejected') => {
    if (!kalamDetails) return
    setIsSubmitting(true)
    try {
      await updateSubmissionStatus(kalamDetails.kalam.id, kalamDetails.submission.id, {
        new_status: newStatus,
        comments: adminComments
      })
      const response = await getKalamDetails(String(params.id))
      setKalamDetails(response.data)
      setAdminComments("")
    } catch (error) {
      console.error("[v0] Error updating status:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAssignVocalist = async () => {
    if (!kalamDetails || !selectedVocalist) return
    setIsSubmitting(true)
    try {
      await assignVocalist(kalamDetails.kalam.id, { vocalist_id: selectedVocalist })
      const response = await getKalamDetails(String(params.id))
      setKalamDetails(response.data)
      setSelectedVocalist(null)
    } catch (error) {
      console.error("[v0] Error assigning vocalist:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePostYoutubeLink = async () => {
    if (!kalamDetails || !youtubeLink) return
    setIsSubmitting(true)
    try {
      await postYoutubeLink(kalamDetails.kalam.id, { youtube_link: youtubeLink })
      const response = await getKalamDetails(String(params.id))
      setKalamDetails(response.data)
      setYoutubeLink("")
    } catch (error) {
      console.error("[v0] Error posting YouTube link:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredVocalists = vocalists.filter(vocalist =>
    vocalist.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-emerald-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your kalam...</p>
        </div>
      </div>
    )
  }

  if (!kalamDetails) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-800 text-lg">Kalam not found</div>
        <button
          onClick={() => router.back()}
          className="mt-4 bg-emerald-900 text-emerald-50 py-2 px-4 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors duration-200"
        >
          Go Back
        </button>
      </div>
    )
  }

  const { kalam, submission } = kalamDetails


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{kalam.title}</h1>
          <p className="text-slate-800 mt-2">Kalam ID: {kalam.id}</p>
        </div>
        <button
          onClick={() => router.back()}
          className="bg-slate-800 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-slate-900 transition-colors duration-200"
        >
          ← Back
        </button>
      </div>

      {/* Status Actions */}
      {submission.status === "submitted" && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Review Actions</h2>
          <div className="space-y-4">
            <textarea
              value={adminComments}
              onChange={(e) => setAdminComments(e.target.value)}
              placeholder="Add comments for the writer..."
              className="w-full p-2 border border-slate-200 rounded-md"
            />
            <div className="flex gap-4">
              <button
                onClick={() => handleStatusUpdate("admin_approved")}
                disabled={isSubmitting}
                className="bg-emerald-900 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-emerald-800 transition-colors duration-200 disabled:opacity-50"
              >
                Approve Kalam
              </button>
              <button
                onClick={() => handleStatusUpdate("admin_rejected")}
                disabled={isSubmitting}
                className="bg-red-900 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-red-800 transition-colors duration-200 disabled:opacity-50"
              >
                Reject Kalam
              </button>
              <button
                onClick={() => handleStatusUpdate("changes_requested")}
                disabled={isSubmitting}
                className="bg-yellow-900 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-yellow-800 transition-colors duration-200 disabled:opacity-50"
              >
                Request Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Vocalist Assignment */}
      {submission.status === "final_approved" && submission.vocalist_approval_status !== "approved" && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Assign Vocalist</h2>
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search vocalists by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                className="w-full p-2 border border-slate-200 rounded-md"
              />
              {showDropdown && searchTerm && (
                <ul className="absolute z-10 w-full bg-white border border-slate-200 rounded-md mt-1 max-h-48 overflow-auto shadow-lg">
                  {filteredVocalists.length > 0 ? (
                    filteredVocalists.map(vocalist => (
                      <li
                        key={vocalist.id}
                        onClick={() => {
                          setSelectedVocalist(vocalist.id)
                          setSearchTerm(vocalist.name)
                          setShowDropdown(false)
                        }}
                        className={`p-2 hover:bg-slate-100 cursor-pointer ${selectedVocalist === vocalist.id ? "bg-emerald-50" : ""
                          }`}
                      >
                        <div className="font-medium text-black">{vocalist.name}</div>
                        <div className="text-xs text-slate-600">
                          {vocalist.city}, {vocalist.country}
                        </div>
                        <div className="text-xs text-slate-500">{vocalist.email}</div>
                      </li>
                    ))
                  ) : (
                    <li className="p-2 text-slate-500">No vocalists found</li>
                  )}
                </ul>
              )}
            </div>

            {selectedVocalist && (
              <p className="text-sm text-emerald-700">
                You selected: {
                  (() => {
                    const selected = filteredVocalists.find(v => v.id === selectedVocalist)
                    return selected
                      ? `${selected.name} (${selected.country}) - ${selected.email}`
                      : ""
                  })()
                }
              </p>
            )}
            <button
              onClick={handleAssignVocalist}
              disabled={!selectedVocalist || isSubmitting}
              className="bg-emerald-900 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-emerald-800 transition-colors duration-200 disabled:opacity-50"
            >
              Assign Vocalist
            </button>
          </div>
        </div>
      )}



      {/* YouTube Link Submission */}
      {submission.status === "complete_approved" && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Add YouTube Link</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter YouTube link..."
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-md"
            />
            <button
              onClick={handlePostYoutubeLink}
              disabled={!youtubeLink || isSubmitting}
              className="bg-emerald-900 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-emerald-800 transition-colors duration-200 disabled:opacity-50"
            >
              Post YouTube Link
            </button>
          </div>
        </div>
      )}

      {/* Kalam Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Basic Info */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Kalam Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-800">Language</label>
              <p className="text-slate-900">{kalam.language}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-800">Theme</label>
              <p className="text-slate-900">{kalam.theme}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-800">Sufi Influence</label>
              <p className="text-slate-900">{kalam.sufi_influence}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-800">Musical Preference</label>
              <p className="text-slate-900">{kalam.musical_preference}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-800">Writer Name</label>
              <p className="text-slate-900">{writer.name}</p>
            </div>
            <div>
              {submission.status === "final_approved" && (
                <>
                  <label className="text-sm font-medium text-slate-800">Vocalist Name</label>
                  <p className="text-slate-900">{vocalistName ? vocalistName : "Not Assigned"}</p>
                </>
              )}
            </div>
            {kalam.youtube_link && (
              <div>
                <label className="text-sm font-medium text-slate-800">YouTube Link</label>
                <a
                  href={kalam.youtube_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-900 hover:underline block"
                >
                  Watch on YouTube
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Submission Status */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Submission Status</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-800">Overall Status</label>
              <span
                className={`inline-block px-2 py-1 rounded-md text-sm font-medium ml-2 ${submission.status === "final_approved" || submission.status === "complete_approved" || submission.status === "posted"
                  ? "bg-emerald-50 text-emerald-900"
                  : submission.status === "pending" || submission.status === "submitted"
                    ? "bg-yellow-50 text-yellow-800"
                    : "bg-red-50 text-red-800"
                  }`}
              >
                {submission.status === "final_approved"
                  ? "Awaiting Vocalist"
                  : submission.status
                    .split('_')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')
                }

              </span>
            </div>
            {submission.status === "changes_requested" && (
              <div>
                <label className="text-sm font-medium text-slate-800">Writer Approval</label>
                <span
                  className={`inline-block px-2 py-1 rounded-md text-sm font-medium ml-2 ${submission.user_approval_status === "approved"
                    ? "bg-emerald-50 text-emerald-900"
                    : submission.user_approval_status === "pending"
                      ? "bg-yellow-50 text-yellow-800"
                      : "bg-red-50 text-red-800"
                    }`}
                >
                  {submission.user_approval_status}
                </span>
              </div>
            )}

            {submission.status === "final_approved" && (
              <div>
                <label className="text-sm font-medium text-slate-800">Vocalist Approval</label>
                <span
                  className={`inline-block px-2 py-1 rounded-md text-sm font-medium ml-2 ${submission.vocalist_approval_status === "approved"
                    ? "bg-emerald-50 text-emerald-900"
                    : submission.vocalist_approval_status === "pending"
                      ? "bg-yellow-50 text-yellow-800"
                      : "bg-red-50 text-red-800"
                    }`}
                >
                  {submission.vocalist_approval_status}
                </span>
              </div>
            )}
            {submission.status !== "posted" && (
              <>
                <div>
                  <label className="text-sm font-medium text-slate-800">Admin Comments</label>
                  <p className="text-slate-900">{submission.admin_comments || "No comments"}</p>
                </div>

                {submission.status !== "final_approved" &&
                  submission.status !== "complete_approved" && (
                    <div>
                      <label className="text-sm font-medium text-slate-800">Writer Comments</label>
                      <p className="text-slate-900">{submission.writer_comments || "No comments"}</p>
                    </div>
                  )}
              </>
            )}


          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Content</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-800">Description</label>
            <p className="text-slate-900 mt-1">{kalam.description}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-800">Kalam Text</label>
            <div className="bg-slate-50 p-4 rounded-md mt-1">
              <p className="text-slate-900 whitespace-pre-wrap">{kalam.kalam_text}</p>
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
            <p className="text-slate-900">{new Date(kalam.created_at).toLocaleString()}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-800">Updated At</label>
            <p className="text-slate-900">{new Date(kalam.updated_at).toLocaleString()}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-800">Published At</label>
            <p className="text-slate-900">
              {kalam.published_at ? new Date(kalam.published_at).toLocaleString() : "Not published"}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-800">Submission Updated</label>
            <p className="text-slate-900">{new Date(submission.updated_at).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}