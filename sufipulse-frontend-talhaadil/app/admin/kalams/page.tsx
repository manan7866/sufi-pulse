"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getAllKalams } from "@/services/admin"

interface Kalam {
  id: number
  title: string
  language: string
  theme: string
  sufi_influence: string
  musical_preference: string
}

export default function KalamsPage() {
  const [kalams, setKalams] = useState<Kalam[]>([])
  const [filteredKalams, setFilteredKalams] = useState<Kalam[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchKalams = async () => {
      try {
        console.log("[v0] Fetching all kalams...")
        const response = await getAllKalams()
        console.log("[v0] All kalams response:", response.data)
        setKalams(response.data?.kalams || [])
        setFilteredKalams(response.data?.kalams || [])
      } catch (error) {
        console.error("[v0] Error fetching kalams:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchKalams()
  }, [])

  useEffect(() => {
    const filtered = kalams.filter(kalam =>
      kalam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kalam.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kalam.theme.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kalam.sufi_influence.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kalam.musical_preference.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredKalams(filtered)
  }, [searchQuery, kalams])

  const getLanguageColor = (language: string) => {
    switch (language.toLowerCase()) {
      case "urdu":
        return "bg-blue-100 text-blue-800"
      case "punjabi":
        return "bg-green-100 text-green-800"
      case "arabic":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-emerald-100 text-emerald-800"
    }
  }

  const getThemeColor = (theme: string) => {
    switch (theme.toLowerCase()) {
      case "devotional":
        return "bg-red-100 text-red-800"
      case "mystical":
        return "bg-indigo-100 text-indigo-800"
      case "praise":
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
          <p className="text-slate-600">Loading your kalams...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Kalams</h1>
        <p className="text-slate-600 mt-2 text-sm sm:text-base">Manage all kalams in the system</p>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search by title, language, theme, sufi influence, or musical preference..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-900 text-slate-800 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Kalams Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-sm border border-slate-200">
          <thead>
            <tr className="bg-slate-50 text-slate-800 text-sm sm:text-base">
              <th className="py-3 px-4 sm:px-6 text-left font-semibold">Title</th>
              <th className="py-3 px-4 sm:px-6 text-left font-semibold">Language</th>
              <th className="py-3 px-4 sm:px-6 text-left font-semibold">Theme</th>
              <th className="py-3 px-4 sm:px-6 text-left font-semibold">Sufi Influence</th>
              <th className="py-3 px-4 sm:px-6 text-left font-semibold">Musical Preference</th>
              <th className="py-3 px-4 sm:px-6 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredKalams.map((kalam) => (
              <tr key={kalam.id} className="border-t border-slate-200 hover:bg-slate-50">
                <td className="py-3 px-4 sm:px-6 text-slate-800 text-sm sm:text-base">{kalam.title}</td>
                <td className="py-3 px-4 sm:px-6">
                  <span className={`text-xs px-2 py-1 rounded-full ${getLanguageColor(kalam.language)}`}>{kalam.language}</span>
                </td>
                <td className="py-3 px-4 sm:px-6">
                  <span className={`text-xs px-2 py-1 rounded-full ${getThemeColor(kalam.theme)}`}>{kalam.theme}</span>
                </td>
                <td className="py-3 px-4 sm:px-6 text-slate-800 text-sm sm:text-base">{kalam.sufi_influence}</td>
                <td className="py-3 px-4 sm:px-6 text-slate-800 text-sm sm:text-base">{kalam.musical_preference}</td>
                <td className="py-3 px-4 sm:px-6">
                  <Link
                    href={`/admin/kalams/${kalam.id}`}
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

      {filteredKalams.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-800 text-lg">No kalams found</div>
        </div>
      )}
    </div>
  )
}