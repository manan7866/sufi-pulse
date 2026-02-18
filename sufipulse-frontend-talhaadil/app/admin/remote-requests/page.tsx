"use client"

import { useEffect, useState } from "react"
import { getAllRemoteRecordingRequests, updateRemoteRecordingRequestStatus } from "@/services/requests"

interface RemoteRequest {
  id: number
  vocalist_id: number
  kalam_id: number
  name: string
  email: string
  city: string
  country: string
  time_zone: string
  role: string
  project_type: string
  recording_equipment: string
  internet_speed: string
  preferred_software: string
  availability: string
  recording_experience: string
  technical_setup: string
  additional_details: string
  status: string
  admin_comments: string
  created_at: string
  updated_at: string
}

export default function RemoteRequestsPage() {
  const [requests, setRequests] = useState<RemoteRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<RemoteRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedRows, setExpandedRows] = useState<number[]>([])
  const [updatingId, setUpdatingId] = useState<number | null>(null)
  const [adminComments, setAdminComments] = useState("")

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        console.log("[v0] Fetching remote recording requests...")
        const response = await getAllRemoteRecordingRequests()
        console.log("[v0] Remote requests response:", response.data)
        setRequests(Array.isArray(response.data) ? response.data : [])
        setFilteredRequests(Array.isArray(response.data) ? response.data : [])
      } catch (error) {
        console.error("[v0] Error fetching remote requests:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [])

  useEffect(() => {
    const filtered = requests.filter(request =>
      request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.time_zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.project_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.recording_equipment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.internet_speed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.preferred_software.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.availability.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.recording_experience.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.technical_setup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (request.additional_details && request.additional_details.toLowerCase().includes(searchQuery.toLowerCase())) 

    )
    setFilteredRequests(filtered)
  }, [searchQuery, requests])

  const toggleRow = (id: number) => {
    setExpandedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    )
  }

  const handleStatusUpdate = async (requestId: number, newStatus: string) => {
    setUpdatingId(requestId)
    try {
      await updateRemoteRecordingRequestStatus(requestId, newStatus, adminComments)
      // Refresh requests
      const response = await getAllRemoteRecordingRequests()
      setRequests(Array.isArray(response.data) ? response.data : [])
      setFilteredRequests(Array.isArray(response.data) ? response.data : [])
      setAdminComments("")
      alert(`Request ${newStatus} successfully!`)
    } catch (error) {
      console.error("[v0] Error updating status:", error)
      alert("Failed to update status. Please try again.")
    } finally {
      setUpdatingId(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-emerald-100 text-emerald-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  if (loading) {
      return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-emerald-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading Studio Requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Remote Recording Requests</h1>
        <p className="text-slate-600 mt-2 text-sm sm:text-base">Manage all remote recording requests</p>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search by name, email, location, role, project type, or status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-900 text-slate-800 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Requests Table */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <div
            key={request.id}
            className="bg-white rounded-lg shadow-sm border border-slate-200"
          >
            <div
              className="flex items-center justify-between p-4 sm:p-6 cursor-pointer hover:bg-slate-50"
              onClick={() => toggleRow(request.id)}
            >
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-slate-600">Name</p>
                  <p className="text-sm sm:text-base text-slate-800 font-medium">{request.name}</p>
                </div>
               
                <div>
                  <p className="text-xs text-slate-600">Project Type</p>
                  <p className="text-sm sm:text-base text-slate-800">{request.project_type}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600">Availability</p>
                  <p className="text-sm sm:text-base text-slate-800 truncate">{request.availability}</p>
                </div>
              </div>
              <div>
                <button
                  className="text-emerald-900 hover:text-emerald-700 focus:outline-none"
                  onClick={() => toggleRow(request.id)}
                >
                  {expandedRows.includes(request.id) ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            {expandedRows.includes(request.id) && (
              <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50">
                {/* Status Update Section */}
                {request.status === "pending" && (
                  <div className="mb-6 p-4 bg-white rounded-lg border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Update Request Status</h3>
                    <div className="space-y-3">
                      <textarea
                        value={adminComments}
                        onChange={(e) => setAdminComments(e.target.value)}
                        placeholder="Add admin comments (optional)..."
                        className="w-full p-2 border border-slate-200 rounded-md text-sm"
                        rows={2}
                      />
                      <div className="flex gap-3 flex-wrap">
                        <button
                          onClick={() => handleStatusUpdate(request.id, "approved")}
                          disabled={updatingId === request.id}
                          className="bg-emerald-900 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-emerald-800 transition-colors disabled:opacity-50"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(request.id, "rejected")}
                          disabled={updatingId === request.id}
                          className="bg-red-900 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-red-800 transition-colors disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-600 font-medium">Contact Information</p>
                      <p className="text-slate-800">
                        <strong>Email:</strong> {request.email}
                      </p>
                      <p className="text-slate-800">
                        <strong>Location:</strong> {request.city && request.country ? `${request.city}, ${request.country}` : "Not specified"}
                      </p>
                      <p className="text-slate-800">
                        <strong>Time Zone:</strong> {request.time_zone || "Not specified"}
                      </p>
                      <p className="text-slate-800">
                        <strong>Role:</strong> {request.role}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 font-medium">Project Details</p>
                      <p className="text-slate-800">
                        <strong>Project Type:</strong> {request.project_type}
                      </p>
                      <p className="text-slate-800">
                        <strong>Availability:</strong> {request.availability}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-600 font-medium">Technical Information</p>
                      <p className="text-slate-800">
                        <strong>Recording Equipment:</strong> {request.recording_equipment || "Not specified"}
                      </p>
                      <p className="text-slate-800">
                        <strong>Internet Speed:</strong> {request.internet_speed || "Not specified"}
                      </p>
                      <p className="text-slate-800">
                        <strong>Preferred Software:</strong> {request.preferred_software || "Not specified"}
                      </p>
                      <p className="text-slate-800">
                        <strong>Recording Experience:</strong> {request.recording_experience || "Not specified"}
                      </p>
                      <p className="text-slate-800">
                        <strong>Technical Setup:</strong> {request.technical_setup || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 font-medium">Additional Information</p>
                      {request.additional_details ? (
                        <p className="text-slate-800">
                          <strong>Additional Details:</strong> {request.additional_details}
                        </p>
                      ) : (
                        <p className="text-slate-600">No additional details provided</p>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 font-medium">References</p>
                      <p className="text-slate-800">
                        <strong>Vocalist ID:</strong> {request.vocalist_id}
                      </p>
                      <p className="text-slate-800">
                        <strong>Kalam ID:</strong> {request.kalam_id}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 font-medium">Timestamps</p>
                      <p className="text-slate-800">
                        <strong>Created:</strong> {new Date(request.created_at).toLocaleString()}
                      </p>
                      <p className="text-slate-800">
                        <strong>Updated:</strong> {new Date(request.updated_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
               
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-800 text-lg">No remote recording requests found</div>
        </div>
      )}
    </div>
  )
}