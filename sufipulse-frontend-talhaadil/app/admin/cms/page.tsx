"use client"

import { useEffect, useState } from "react"
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Eye, 
  BarChart3, 
  Users, 
  Quote, 
  Clock, 
  MapPin,
  TrendingUp,
  Activity
} from "lucide-react"
import Link from "next/link"
import { adminGetAllPages, adminDeletePage, getPageData } from "@/services/cms"

interface CMSPage {
  id: number
  page_name: string
  page_title: string
  page_slug: string
  is_active: boolean
  updated_at: string
}

export default function CMSPagesPage() {
  const [pages, setPages] = useState<CMSPage[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPage, setSelectedPage] = useState<CMSPage | null>(null)
  const [pageStats, setPageStats] = useState<any>(null)

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      setLoading(true)
      const response = await adminGetAllPages()
      setPages(response.data?.data || [])
    } catch (error) {
      console.error("Error fetching pages:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (pageId: number) => {
    if (!confirm("Are you sure you want to delete this page? This action cannot be undone.")) {
      return
    }

    try {
      await adminDeletePage(pageId)
      setPages(pages.filter(p => p.id !== pageId))
      alert("Page deleted successfully")
    } catch (error: any) {
      alert(error.response?.data?.detail || "Failed to delete page")
    }
  }

  const handleViewPage = async (pageSlug: string) => {
    try {
      const response = await getPageData(pageSlug)
      setPageStats(response.data?.data)
      alert("Page data fetched! Check console for details.")
      console.log("Page Data:", response.data?.data)
    } catch (error) {
      console.error("Error fetching page data:", error)
    }
  }

  const filteredPages = pages.filter(page =>
    page.page_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.page_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.page_slug.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (isActive: boolean) => {
    return isActive 
      ? "bg-emerald-100 text-emerald-700 border-emerald-200" 
      : "bg-slate-100 text-slate-700 border-slate-200"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-emerald-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading CMS pages...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-3">
              <FileText className="w-8 h-8 text-emerald-600" />
              CMS Pages Management
            </h1>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">
              Manage website page content, stats, values, team members, and more
            </p>
          </div>
          <Link
            href="/admin/cms/new"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add New Page
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium">Total Pages</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{pages.length}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium">Active Pages</p>
              <p className="text-3xl font-bold text-emerald-600 mt-1">
                {pages.filter(p => p.is_active).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium">Inactive Pages</p>
              <p className="text-3xl font-bold text-slate-600 mt-1">
                {pages.filter(p => !p.is_active).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-slate-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 font-medium">Content Types</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">7</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search pages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Page Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 text-lg font-medium">No pages found</p>
                    <p className="text-slate-400 text-sm mt-1">
                      {searchQuery ? "Try adjusting your search" : "Create your first page to get started"}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredPages.map((page) => (
                  <tr key={page.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                          <FileText className="w-5 h-5 text-emerald-600" />
                        </div>
                        <span className="font-semibold text-slate-900">{page.page_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-600">{page.page_title}</span>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-sm bg-slate-100 px-2 py-1 rounded text-slate-600">
                        /{page.page_slug}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(page.is_active)}`}>
                        {page.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-slate-500">
                        <Clock className="w-4 h-4 mr-2" />
                        {new Date(page.updated_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewPage(page.page_slug)}
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Data"
                        >
                          <Eye className="w-4 h-4 text-blue-600" />
                        </button>
                        <Link
                          href={`/admin/cms/edit/${page.id}`}
                          className="p-2 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Edit Page"
                        >
                          <Edit className="w-4 h-4 text-emerald-600" />
                        </Link>
                        <button
                          onClick={() => handleDelete(page.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Page"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Content Types Info */}
      <div className="mt-8 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl p-6 border border-emerald-100">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-emerald-600" />
          Manage Page Content Types
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <BarChart3 className="w-6 h-6 text-emerald-600 mb-2" />
            <p className="text-sm font-semibold text-slate-800">Statistics</p>
            <p className="text-xs text-slate-500 mt-1">Numbers & metrics</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <TrendingUp className="w-6 h-6 text-blue-600 mb-2" />
            <p className="text-sm font-semibold text-slate-800">Values</p>
            <p className="text-xs text-slate-500 mt-1">Core principles</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <Users className="w-6 h-6 text-purple-600 mb-2" />
            <p className="text-sm font-semibold text-slate-800">Team</p>
            <p className="text-xs text-slate-500 mt-1">Members & bios</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <Clock className="w-6 h-6 text-orange-600 mb-2" />
            <p className="text-sm font-semibold text-slate-800">Timeline</p>
            <p className="text-xs text-slate-500 mt-1">Milestones</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <Quote className="w-6 h-6 text-pink-600 mb-2" />
            <p className="text-sm font-semibold text-slate-800">Testimonials</p>
            <p className="text-xs text-slate-500 mt-1">Quotes & reviews</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <MapPin className="w-6 h-6 text-teal-600 mb-2" />
            <p className="text-sm font-semibold text-slate-800">Hubs</p>
            <p className="text-xs text-slate-500 mt-1">Locations</p>
          </div>
        </div>
      </div>
    </div>
  )
}
