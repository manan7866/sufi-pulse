"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getAllWriters } from "@/services/admin"

interface Writer {
  id: number
  email: string
  name: string
  role: string
  country: string
  city: string
}

export default function WritersPage() {
  const [writers, setWriters] = useState<Writer[]>([])
  const [filteredWriters, setFilteredWriters] = useState<Writer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchWriters = async () => {
      try {
        console.log("[v0] Fetching writers...")
        const response = await getAllWriters()
        console.log("[v0] Writers response:", response.data)
        setWriters(response.data?.writers || [])
        setFilteredWriters(response.data?.writers || [])
      } catch (error) {
        console.error("[v0] Error fetching writers:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWriters()
  }, [])

  useEffect(() => {
    const filtered = writers.filter(writer =>
      writer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      writer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      writer.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (writer.city && writer.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (writer.country && writer.country.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    setFilteredWriters(filtered)
  }, [searchQuery, writers])

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-blue-100 text-blue-800"
      case "editor":
        return "bg-green-100 text-green-800"
      case "writer":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  if (loading) {
      return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-emerald-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your writers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Writers</h1>
        <p className="text-slate-600 mt-2 text-sm sm:text-base">Manage all registered writers</p>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search by name, email, role, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-900 text-slate-800 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Writers Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-sm border border-slate-200">
          <thead>
            <tr className="bg-slate-50 text-slate-800 text-sm sm:text-base">
              <th className="py-3 px-4 sm:px-6 text-left font-semibold">Name</th>
              <th className="py-3 px-4 sm:px-6 text-left font-semibold">Email</th>
              <th className="py-3 px-4 sm:px-6 text-left font-semibold">Location</th>
              <th className="py-3 px-4 sm:px-6 text-left font-semibold">Role</th>
              <th className="py-3 px-4 sm:px-6 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredWriters.map((writer) => (
              <tr key={writer.id} className="border-t border-slate-200 hover:bg-slate-50">
               
                <td className="py-3 px-4 sm:px-6 text-slate-800 text-sm sm:text-base">{writer.name}</td>
                <td className="py-3 px-4 sm:px-6 text-slate-800 text-sm sm:text-base">{writer.email}</td>
                <td className="py-3 px-4 sm:px-6 text-slate-800 text-sm sm:text-base">
                  {writer.city && writer.country ? `${writer.city}, ${writer.country}` : "Location not specified"}
                </td>
                <td className="py-3 px-4 sm:px-6">
                  <span className={`text-xs px-2 py-1 rounded-full ${getRoleColor(writer.role)}`}>{writer.role}</span>
                </td>
                <td className="py-3 px-4 sm:px-6">
                  <Link
                    href={`/admin/writers/${writer.id}`}
                    className="inline-block bg-emerald-900 text-emerald-50 py-1 px-3 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors duration-200"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredWriters.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-800 text-lg">No writers found</div>
        </div>
      )}
    </div>
  )
}