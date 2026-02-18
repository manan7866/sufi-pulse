"use client"

import { useEffect, useState } from "react"
import { getAllStudioVisitRequests, updateStudioVisitRequestStatus } from "@/services/requests"

interface StudioRequest {
  id: number
  vocalist_id: number
  kalam_id: number
  name: string
  email: string
  organization: string
  contact_number: string
  preferred_date: string
  preferred_time: string
  purpose: string
  number_of_visitors: string
  additional_details: string
  special_requests: string
  status: string
  admin_comments: string
  created_at: string
  updated_at: string
}

export default function StudioRequestsPage() {
  const [requests, setRequests] = useState<StudioRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<StudioRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedRows, setExpandedRows] = useState<number[]>([])
  const [updatingId, setUpdatingId] = useState<number | null>(null)
  const [adminComments, setAdminComments] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("")

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        console.log("[v0] Fetching studio visit requests...")
        const response = await getAllStudioVisitRequests()
        console.log("[v0] Studio requests response:", response.data)
        setRequests(Array.isArray(response.data) ? response.data : [])
        setFilteredRequests(Array.isArray(response.data) ? response.data : [])
      } catch (error) {
        console.error("[v0] Error fetching studio requests:", error)
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
      request.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (request.additional_details && request.additional_details.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (request.special_requests && request.special_requests.toLowerCase().includes(searchQuery.toLowerCase())) ||
      request.contact_number.toLowerCase().includes(searchQuery.toLowerCase())
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
      await updateStudioVisitRequestStatus(requestId, newStatus, adminComments)
      // Refresh requests
      const response = await getAllStudioVisitRequests()
      setRequests(Array.isArray(response.data) ? response.data : [])
      setFilteredRequests(Array.isArray(response.data) ? response.data : [])
      setAdminComments("")
      setSelectedStatus("")
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
          <p className="text-slate-600">Loading your studio requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Studio Visit Requests</h1>
        <p className="text-slate-600 mt-2 text-sm sm:text-base">Manage all studio visit requests</p>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search by name, email, organization, purpose, status, or contact..."
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
                  <p className="text-xs text-slate-600">Preferred Date</p>
                  <p className="text-sm sm:text-base text-slate-800">{new Date(request.preferred_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600">Purpose</p>
                  <p className="text-sm sm:text-base text-slate-800 truncate">{request.purpose}</p>
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
                        <strong>Contact Number:</strong> {request.contact_number}
                      </p>
                      <p className="text-slate-800">
                        <strong>Organization:</strong> {request.organization || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 font-medium">Visit Details</p>
                      <p className="text-slate-800">
                        <strong>Preferred Time:</strong> {request.preferred_time}
                      </p>
                      <p className="text-slate-800">
                        <strong>Number of Visitors:</strong> {request.number_of_visitors}
                      </p>
                      <p className="text-slate-800">
                        <strong>Purpose:</strong> {request.purpose}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-600 font-medium">Additional Information</p>
                      {request.additional_details ? (
                        <p className="text-slate-800">
                          <strong>Details:</strong> {request.additional_details}
                        </p>
                      ) : (
                        <p className="text-slate-600">No additional details provided</p>
                      )}
                      {request.special_requests ? (
                        <p className="text-slate-800">
                          <strong>Special Requests:</strong> {request.special_requests}
                        </p>
                      ) : (
                        <p className="text-slate-600">No special requests provided</p>
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
          <div className="text-slate-800 text-lg">No studio visit requests found</div>
        </div>
      )}
    </div>
  )
}