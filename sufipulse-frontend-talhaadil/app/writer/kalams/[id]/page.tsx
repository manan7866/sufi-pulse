"use client"
import { useState, useEffect } from "react"
import type React from "react"

import Link from "next/link"
import { useParams } from "next/navigation"
import { BookOpen, User, PenTool, Menu, X, ArrowLeft, CheckCircle, XCircle, AlertCircle, Clock } from "lucide-react"
import { getKalamDetails } from "@/services/writer"
import { getWriterResponse } from "@/services/writer"

interface Kalam {
  id: number
  title: string
  language: string
  theme: string
  kalam_text: string
  description: string
  sufi_influence: string
  musical_preference: string
  youtube_link: string | null
  writer_id: number
  vocalist_id: number | null
  published_at: string | null
  created_at: string
  updated_at: string
}

interface Submission {
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

interface KalamData {
  kalam: Kalam
  submission: Submission
}

export default function KalamDetail() {
  const params = useParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [kalamData, setKalamData] = useState<KalamData | null>(null)
  const [loading, setLoading] = useState(true)
  const [responseLoading, setResponseLoading] = useState(false)
  const [writerResponse, setWriterResponse] = useState({
    user_approval_status: "",
    writer_comments: "",
  })

  useEffect(() => {
    if (params.id) {
      fetchKalam()
    }
  }, [params.id])

  const fetchKalam = async () => {
    try {
      const response = await getKalamDetails(String(params.id))
      if (response.status === 200) {
        setKalamData(response.data)
      }
    } catch (error) {
      console.error("Failed to fetch kalam:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleWriterResponse = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!kalamData || !writerResponse.user_approval_status) return

    setResponseLoading(true)
    try {
      const response = await getWriterResponse(
        kalamData.kalam.id,
        kalamData.submission.id,
        {
          user_approval_status: writerResponse.user_approval_status,
          writer_comments: writerResponse.writer_comments,
        }
      )
      if (response.status === 200) {
        fetchKalam()
        setWriterResponse({ user_approval_status: "", writer_comments: "" })
      } else {
        alert("Failed to submit response. Please try again.")
      }
    } catch (error) {
      alert("Failed to submit response. Please try again.")
    } finally {
      setResponseLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-slate-600 bg-slate-100"
      case "admin_approved":
        return "text-emerald-900 bg-emerald-50"
      case "final_approved":
        return "text-emerald-900 bg-emerald-50"
      case "complete_approved":
        return "text-emerald-900 bg-emerald-50"
      case "posted":
        return "text-emerald-900 bg-emerald-50"
      case "admin_rejected":
        return "text-red-600 bg-red-50"
      case "changes_requested":
        return "text-orange-600 bg-orange-50"
      default:
        return "text-slate-600 bg-slate-100"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
      case "admin_approved":
      case "final_approved":
      case "complete_approved":
        return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
      case "admin_rejected":
        return <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
      case "changes_requested":
        return <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
      case "posted":
        return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
      default:
        return <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
    }
  }

  const formatStatus = (status: string) => {
    if (status === "final_approved") return "SufiPulse is Assigning Vocalist"
    if (status === "complete_approved") return "SufiPulse has Assigned Vocalist"
    if (status === "posted") return "Kalam posted at SufiPulse Channel"
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const getStatus = (status: string) => {
    if (status === "final_approved") return "Kalam Approved"
    if (status === "complete_approved") return "Kalam Approved"
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-emerald-900 border-t-transparent rounded-full animate-spin mx-auto mb-3 sm:mb-4"></div>
          <p className="text-slate-600 text-sm sm:text-base">Loading kalam...</p>
        </div>
      </div>
    )
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
    )
  }

  const { kalam, submission } = kalamData

  return (
    <div className="min-h-screen bg-slate-50">
      <div>
        <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Link href="/writer/kalams" className="text-slate-600 hover:text-slate-900">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Kalam Details</h2>
            </div>
            {!["final_approved", "complete_approved"].includes(submission.status) && (
              <Link
                href={`/writer/kalams/${kalam.id}/edit`}
                className="px-3 py-2 sm:px-4 sm:py-2 bg-emerald-900 text-white rounded-lg hover:bg-emerald-800 transition-colors text-sm sm:text-base"
              >
                Edit
              </Link>
            )}
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3 sm:gap-2">
                <div className="flex flex-row gap-2 items-center">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">Status:</h3>
                  <div
                    className={`px-2 py-1 sm:px-3 sm:py-2 rounded-lg flex items-center space-x-2 ${getStatusColor(submission.status)}`}
                  >
                    {getStatusIcon(submission.status)}
                    <span className="font-medium text-sm sm:text-base">{getStatus(submission.status)}</span>
                  </div>
                </div>
                <div
                  className={`px-2 py-1 sm:px-3 sm:py-2 rounded-lg flex items-center space-x-2 ${getStatusColor(submission.status)}`}
                >
                  {getStatusIcon(submission.status)}
                  <span className="font-medium text-sm sm:text-base">{formatStatus(submission.status)}</span>
                </div>
              </div>

              {submission.admin_comments && (
                <div className="bg-slate-50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-slate-900 mb-2 text-sm sm:text-base">Admin Comments</h4>
                  <p className="text-slate-700 text-sm sm:text-base">{submission.admin_comments}</p>
                </div>
              )}

              {submission.status === "changes_requested" && submission.user_approval_status === "pending" && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-medium text-orange-900 mb-3 sm:mb-4 text-sm sm:text-base">Response Required</h4>
                  <form onSubmit={handleWriterResponse} className="space-y-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-900 mb-2">Your Response</label>
                      <select
                        value={writerResponse.user_approval_status}
                        onChange={(e) =>
                          setWriterResponse((prev) => ({ ...prev, user_approval_status: e.target.value }))
                        }
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-900 focus:border-emerald-900 outline-none text-sm sm:text-base"
                        required
                      >
                        <option value="">Select your response</option>
                        <option value="approved">Accept Changes</option>
                        <option value="rejected">Reject Changes</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-900 mb-2">Comments</label>
                      <textarea
                        value={writerResponse.writer_comments}
                        onChange={(e) => setWriterResponse((prev) => ({ ...prev, writer_comments: e.target.value }))}
                        rows={3}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-900 focus:border-emerald-900 outline-none text-sm sm:text-base"
                        placeholder="Add your comments or request more changes..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={responseLoading}
                      className="px-4 sm:px-6 py-2 sm:py-3 bg-emerald-900 text-white rounded-lg hover:bg-emerald-800 disabled:opacity-50 transition-colors text-sm sm:text-base"
                    >
                      {responseLoading ? "Submitting..." : "Submit Response"}
                    </button>
                  </form>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-6">
              <div className="mb-4 sm:mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">{kalam.title}</h1>
                <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                  <span className="px-2 sm:px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs sm:text-sm">{kalam.language}</span>
                  <span className="px-2 sm:px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs sm:text-sm">{kalam.theme}</span>
                  {kalam.sufi_influence && (
                    <span className="px-2 sm:px-3 py-1 bg-emerald-50 text-emerald-900 rounded-lg text-xs sm:text-sm">{kalam.sufi_influence}</span>
                  )}
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">Kalam Text</h3>
                  <div className="bg-slate-50 rounded-lg p-3 sm:p-4">
                    <pre className="whitespace-pre-wrap text-slate-800 font-serif leading-relaxed text-sm sm:text-base">
                      {kalam.kalam_text}
                    </pre>
                  </div>
                </div>

                {kalam.description && (
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">Description</h3>
                    <p className="text-slate-700 text-sm sm:text-base">{kalam.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {kalam.musical_preference && (
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2 text-sm sm:text-base">Musical Preference</h4>
                      <p className="text-slate-700 text-sm sm:text-base">{kalam.musical_preference}</p>
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2 text-sm sm:text-base">Created</h4>
                    <p className="text-slate-700 text-sm sm:text-base">{new Date(kalam.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                {kalam.youtube_link && submission.status === "posted" && (
                  <div>
                    <h4 className="font-medium text-slate-900 mb-2 text-sm sm:text-base">YouTube Link</h4>
                    <a
                      href={kalam.youtube_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-900 hover:text-emerald-800 underline text-sm sm:text-base"
                    >
                      {kalam.youtube_link}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}