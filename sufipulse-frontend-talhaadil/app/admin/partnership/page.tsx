"use client"

import { useEffect, useState } from "react"
import { getAllPartnershipProposals } from "@/services/admin"

interface PartnershipProposal {
  id: number
  full_name: string
  email: string
  organization_name: string
  organization_type: string
  role_title: string
  partnership_type: string
  website: string
  proposal_text: string
  proposed_timeline: string
  resources: string
  goals: string
  sacred_alignment: boolean
  created_at: string
  updated_at?: string
 
}

export default function PartnershipProposalsPage() {
  const [proposals, setProposals] = useState<PartnershipProposal[]>([])
  const [filteredProposals, setFilteredProposals] = useState<PartnershipProposal[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedRows, setExpandedRows] = useState<number[]>([])

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        console.log("[v0] Fetching partnership proposals...")
        const response = await getAllPartnershipProposals()
        console.log("[v0] Partnership proposals response:", response.data)

        const data = Array.isArray(response.data) ? response.data : []

        // inject default status since backend does not provide it
        const withStatus = data.map((p: PartnershipProposal) => ({
          ...p,
          status: p.status || "pending",
        }))

        setProposals(withStatus)
        setFilteredProposals(withStatus)
      } catch (error) {
        console.error("[v0] Error fetching partnership proposals:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProposals()
  }, [])

  useEffect(() => {
    const filtered = proposals.filter(proposal =>
      proposal.organization_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.partnership_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (proposal.proposal_text && proposal.proposal_text.toLowerCase().includes(searchQuery.toLowerCase())) ||
      proposal.full_name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredProposals(filtered)
  }, [searchQuery, proposals])

  const toggleRow = (id: number) => {
    setExpandedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    )
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
          <p className="text-slate-600">Loading partnership proposals...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Partnership Proposals</h1>
        <p className="text-slate-600 mt-2 text-sm sm:text-base">Manage all partnership proposals</p>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search by organization, email, proposal type, status, or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-900 text-slate-800 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Proposals Table */}
      <div className="space-y-4">
        {filteredProposals.map((proposal) => (
          <div
            key={proposal.id}
            className="bg-white rounded-lg shadow-sm border border-slate-200"
          >
            <div
              className="flex items-center justify-between p-4 sm:p-6 cursor-pointer hover:bg-slate-50"
              onClick={() => toggleRow(proposal.id)}
            >
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-slate-600">Organization</p>
                  <p className="text-sm sm:text-base text-slate-800 font-medium">{proposal.organization_name}</p>
                </div>
               
                <div>
                  <p className="text-xs text-slate-600">Partnership Type</p>
                  <p className="text-sm sm:text-base text-slate-800">{proposal.partnership_type}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600">Proposal</p>
                  <p className="text-sm sm:text-base text-slate-800 truncate">{proposal.proposal_text}</p>
                </div>
              </div>
              <div>
                <button
                  className="text-emerald-900 hover:text-emerald-700 focus:outline-none"
                  onClick={() => toggleRow(proposal.id)}
                >
                  {expandedRows.includes(proposal.id) ? (
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
            {expandedRows.includes(proposal.id) && (
              <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-600 font-medium">Contact Information</p>
                      <p className="text-slate-800"><strong>Name:</strong> {proposal.full_name}</p>
                      <p className="text-slate-800"><strong>Email:</strong> {proposal.email}</p>
                      <p className="text-slate-800"><strong>Organization:</strong> {proposal.organization_name} ({proposal.organization_type})</p>
                      <p className="text-slate-800"><strong>Role:</strong> {proposal.role_title}</p>
                      <p className="text-slate-800"><strong>Website:</strong> <a href={proposal.website} className="text-emerald-700 underline">{proposal.website}</a></p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 font-medium">Proposal Details</p>
                      <p className="text-slate-800"><strong>Type:</strong> {proposal.partnership_type}</p>
                      <p className="text-slate-800"><strong>Timeline:</strong> {proposal.proposed_timeline}</p>
                      <p className="text-slate-800"><strong>Resources:</strong> {proposal.resources}</p>
                      <p className="text-slate-800"><strong>Goals:</strong> {proposal.goals}</p>
                      <p className="text-slate-800"><strong>Alignment:</strong> {proposal.sacred_alignment ? "Yes" : "No"}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-600 font-medium">Timestamps</p>
                      <p className="text-slate-800"><strong>Created:</strong> {new Date(proposal.created_at).toLocaleString()}</p>
                      {proposal.updated_at && (
                        <p className="text-slate-800"><strong>Updated:</strong> {new Date(proposal.updated_at).toLocaleString()}</p>
                      )}
                    </div>
                  </div>
                </div>
               
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredProposals.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-800 text-lg">No partnership proposals found</div>
        </div>
      )}
    </div>
  )
}
