"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getAllBloggers } from "@/services/admin"

interface Blogger {
  id: number
  email: string
  name: string
  role: string
  country: string
  city: string
}

export default function BloggersPage() {
  const [bloggers, setBloggers] = useState<Blogger[]>([])
  const [filteredBloggers, setFilteredBloggers] = useState<Blogger[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchBloggers = async () => {
      try {
        console.log("[v0] Fetching bloggers...")
        const response = await getAllBloggers()
        console.log("[v0] Bloggers response:", response.data)
        setBloggers(response.data?.bloggers || [])
        setFilteredBloggers(response.data?.bloggers || [])
      } catch (error) {
        console.error("[v0] Error fetching bloggers:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBloggers()
  }, [])

  useEffect(() => {
    const filtered = bloggers.filter(blogger =>
      blogger.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blogger.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blogger.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blogger.city && blogger.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (blogger.country && blogger.country.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    setFilteredBloggers(filtered)
  }, [searchQuery, bloggers])

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-blue-100 text-blue-800"
      case "blogger":
        return "bg-purple-100 text-purple-800"
      case "editor":
        return "bg-green-100 text-green-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-emerald-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your bloggers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Bloggers</h1>
        <p className="text-slate-600 mt-2 text-sm sm:text-base">Manage all registered bloggers</p>
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

      {/* Bloggers Table */}
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
            {filteredBloggers.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-600">
                  {searchQuery ? "No bloggers found matching your search" : "No bloggers found"}
                </td>
              </tr>
            ) : (
              filteredBloggers.map((blogger) => (
                <tr key={blogger.id} className="border-t border-slate-200 hover:bg-slate-50">
                  <td className="py-3 px-4 sm:px-6 text-sm text-slate-800">{blogger.name}</td>
                  <td className="py-3 px-4 sm:px-6 text-sm text-slate-600">{blogger.email}</td>
                  <td className="py-3 px-4 sm:px-6 text-sm text-slate-600">
                    {blogger.city && blogger.country ? `${blogger.city}, ${blogger.country}` : "N/A"}
                  </td>
                  <td className="py-3 px-4 sm:px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(blogger.role)}`}>
                      {blogger.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 sm:px-6 text-sm">
                    <Link
                      href={`/admin/bloggers/${blogger.id}`}
                      className="text-emerald-900 hover:text-emerald-700 font-medium"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-6 text-sm text-slate-600">
        Showing {filteredBloggers.length} of {bloggers.length} bloggers
      </div>
    </div>
  )
}
