"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Save,
  FileText,
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  Quote,
  MapPin,
  Eye,
  EyeOff,
  Trash2,
  Edit
} from "lucide-react"
import {
  adminGetAllPages,
  adminUpdatePage,
  adminGetPageStats,
  adminGetPageValues,
  adminGetPageTeam,
  adminGetPageTimeline,
  adminGetPageTestimonials,
  adminGetPageHubs,
  adminDeleteStat,
  adminDeleteValue,
  adminDeleteTeamMember,
  adminDeleteTimelineItem,
  adminDeleteTestimonial,
  adminDeleteHub
} from "@/services/cms"

export default function EditCMSPage() {
  const router = useRouter()
  const params = useParams()
  const pageId = parseInt(params.id as string)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("details")

  const [pageData, setPageData] = useState({
    page_name: "",
    page_title: "",
    page_slug: "",
    meta_description: "",
    meta_keywords: "",
    hero_title: "",
    hero_subtitle: "",
    hero_quote: "",
    hero_quote_author: "",
    is_active: true
  })

  const [stats, setStats] = useState<any[]>([])
  const [values, setValues] = useState<any[]>([])
  const [team, setTeam] = useState<any[]>([])
  const [timeline, setTimeline] = useState<any[]>([])
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [hubs, setHubs] = useState<any[]>([])

  useEffect(() => {
    fetchPageData()
  }, [pageId])

  const fetchPageData = async () => {
    try {
      setLoading(true)
      const [pagesRes, statsRes, valuesRes, teamRes, timelineRes, testimonialsRes, hubsRes] = await Promise.all([
        adminGetAllPages(),
        adminGetPageStats(pageId),
        adminGetPageValues(pageId),
        adminGetPageTeam(pageId),
        adminGetPageTimeline(pageId),
        adminGetPageTestimonials(pageId),
        adminGetPageHubs(pageId)
      ])

      const page = pagesRes.data.data.find((p: any) => p.id === pageId)
      if (page) {
        setPageData({
          page_name: page.page_name || "",
          page_title: page.page_title || "",
          page_slug: page.page_slug || "",
          meta_description: page.meta_description || "",
          meta_keywords: page.meta_keywords || "",
          hero_title: page.hero_title || "",
          hero_subtitle: page.hero_subtitle || "",
          hero_quote: page.hero_quote || "",
          hero_quote_author: page.hero_quote_author || "",
          is_active: page.is_active
        })
      }

      setStats(statsRes.data.data || [])
      setValues(valuesRes.data.data || [])
      setTeam(teamRes.data.data || [])
      setTimeline(timelineRes.data.data || [])
      setTestimonials(testimonialsRes.data.data || [])
      setHubs(hubsRes.data.data || [])
    } catch (error) {
      console.error("Error fetching page data:", error)
      alert("Failed to load page data")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      await adminUpdatePage(pageId, pageData)
      alert("Page updated successfully!")
    } catch (error: any) {
      alert(error.response?.data?.detail || "Failed to update page")
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setPageData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleDeleteStat = async (statId: number) => {
    if (!confirm("Are you sure you want to delete this statistic?")) return
    try {
      await adminDeleteStat(statId)
      setStats(stats.filter(s => s.id !== statId))
      alert("Stat deleted successfully!")
    } catch (error: any) {
      alert(error.response?.data?.detail || "Failed to delete stat")
    }
  }

  const handleDeleteValue = async (valueId: number) => {
    if (!confirm("Are you sure you want to delete this value?")) return
    try {
      await adminDeleteValue(valueId)
      setValues(values.filter(v => v.id !== valueId))
      alert("Value deleted successfully!")
    } catch (error: any) {
      alert(error.response?.data?.detail || "Failed to delete value")
    }
  }

  const handleDeleteTeamMember = async (memberId: number) => {
    if (!confirm("Are you sure you want to delete this team member?")) return
    try {
      await adminDeleteTeamMember(memberId)
      setTeam(team.filter(t => t.id !== memberId))
      alert("Team member deleted successfully!")
    } catch (error: any) {
      alert(error.response?.data?.detail || "Failed to delete team member")
    }
  }

  const handleDeleteTimeline = async (timelineId: number) => {
    if (!confirm("Are you sure you want to delete this timeline item?")) return
    try {
      await adminDeleteTimelineItem(timelineId)
      setTimeline(timeline.filter(t => t.id !== timelineId))
      alert("Timeline item deleted successfully!")
    } catch (error: any) {
      alert(error.response?.data?.detail || "Failed to delete timeline item")
    }
  }

  const handleDeleteTestimonial = async (testimonialId: number) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return
    try {
      await adminDeleteTestimonial(testimonialId)
      setTestimonials(testimonials.filter(t => t.id !== testimonialId))
      alert("Testimonial deleted successfully!")
    } catch (error: any) {
      alert(error.response?.data?.detail || "Failed to delete testimonial")
    }
  }

  const handleDeleteHub = async (hubId: number) => {
    if (!confirm("Are you sure you want to delete this location?")) return
    try {
      await adminDeleteHub(hubId)
      setHubs(hubs.filter(h => h.id !== hubId))
      alert("Location deleted successfully!")
    } catch (error: any) {
      alert(error.response?.data?.detail || "Failed to delete location")
    }
  }

  // Smart tabs - only show relevant tabs for each page
  const getPageSpecificTabs = () => {
    const slug = pageData.page_slug;
    
    // Founder page: needs stats + testimonials
    if (slug === 'founder') {
      return [
        { id: "details", label: "Page Details", icon: FileText },
        { id: "stats", label: "Statistics", icon: BarChart3, count: stats.length },
        { id: "testimonials", label: "Quotes", icon: Quote, count: testimonials.length }
      ];
    }
    
    // Contact page: needs stats + hubs
    if (slug === 'contact') {
      return [
        { id: "details", label: "Page Details", icon: FileText },
        { id: "stats", label: "Statistics", icon: BarChart3, count: stats.length },
        { id: "hubs", label: "Locations", icon: MapPin, count: hubs.length }
      ];
    }
    
    // About page: can have stats + values + team + timeline
    if (slug === 'about') {
      return [
        { id: "details", label: "Page Details", icon: FileText },
        { id: "stats", label: "Statistics", icon: BarChart3, count: stats.length },
        { id: "values", label: "Values", icon: TrendingUp, count: values.length },
        { id: "team", label: "Team", icon: Users, count: team.length },
        { id: "timeline", label: "Timeline", icon: Clock, count: timeline.length }
      ];
    }
    
    // Our Mission & Who We Are: stats + values
    if (slug === 'our-mission' || slug === 'who-we-are') {
      return [
        { id: "details", label: "Page Details", icon: FileText },
        { id: "stats", label: "Statistics", icon: BarChart3, count: stats.length },
        { id: "values", label: "Values", icon: TrendingUp, count: values.length }
      ];
    }
    
    // Home page: stats + testimonials
    if (slug === 'home') {
      return [
        { id: "details", label: "Page Details", icon: FileText },
        { id: "stats", label: "Statistics", icon: BarChart3, count: stats.length },
        { id: "testimonials", label: "Testimonials", icon: Quote, count: testimonials.length }
      ];
    }
    
    // Gallery: stats only
    if (slug === 'gallery') {
      return [
        { id: "details", label: "Page Details", icon: FileText },
        { id: "stats", label: "Statistics", icon: BarChart3, count: stats.length }
      ];
    }
    
    // ALL OTHER PAGES: ONLY stats (13 pages)
    return [
      { id: "details", label: "Page Details", icon: FileText },
      { id: "stats", label: "Statistics", icon: BarChart3, count: stats.length }
    ];
  };

  const tabs = getPageSpecificTabs();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-emerald-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading page data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link
            href="/admin/cms"
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Edit {pageData.page_name}
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Manage page content and settings
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-slate-200">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    activeTab === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        {activeTab === "details" && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Page Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Page Name *
                </label>
                <input
                  type="text"
                  name="page_name"
                  value={pageData.page_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g., Home, About"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Page Title *
                </label>
                <input
                  type="text"
                  name="page_title"
                  value={pageData.page_title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g., SufiPulse - Home Page"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Page Slug *
                </label>
                <input
                  type="text"
                  name="page_slug"
                  value={pageData.page_slug}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g., home, about-us"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Status
                </label>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => setPageData(prev => ({ ...prev, is_active: !prev.is_active }))}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      pageData.is_active
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {pageData.is_active ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                    {pageData.is_active ? "Active" : "Inactive"}
                  </button>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  name="meta_description"
                  value={pageData.meta_description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="SEO meta description for search engines"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Meta Keywords
                </label>
                <input
                  type="text"
                  name="meta_keywords"
                  value={pageData.meta_keywords}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="SEO keywords separated by commas"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Hero Title
                </label>
                <input
                  type="text"
                  name="hero_title"
                  value={pageData.hero_title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Main heading for hero section"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Hero Subtitle
                </label>
                <textarea
                  name="hero_subtitle"
                  value={pageData.hero_subtitle}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Subtitle or description for hero section"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Hero Quote
                </label>
                <textarea
                  name="hero_quote"
                  value={pageData.hero_quote}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Featured quote for hero section"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Quote Author
                </label>
                <input
                  type="text"
                  name="hero_quote_author"
                  value={pageData.hero_quote_author}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Author of the quote"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
              <Link
                href="/admin/cms"
                className="px-6 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        )}

        {activeTab === "stats" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-800">Page Statistics</h2>
              <Link
                href={`/admin/cms/${pageId}/stats/new`}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Add Stat
              </Link>
            </div>
            {stats.length === 0 ? (
              <div className="text-center py-12">
                <BarChart3 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">No statistics added yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div key={stat.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-2xl font-bold text-emerald-600">{stat.stat_number}</p>
                        <p className="font-medium text-slate-800 mt-1">{stat.stat_label}</p>
                        {stat.stat_description && (
                          <p className="text-sm text-slate-500 mt-1">{stat.stat_description}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/cms/stats/${stat.id}/edit`}
                          className="p-2 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4 text-emerald-600" />
                        </Link>
                        <button
                          onClick={() => handleDeleteStat(stat.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "values" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-800">Core Values</h2>
              <Link
                href={`/admin/cms/${pageId}/values/new`}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Add Value
              </Link>
            </div>
            {values.length === 0 ? (
              <div className="text-center py-12">
                <TrendingUp className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">No values added yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {values.map((value) => (
                  <div key={value.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-800">{value.value_title}</h3>
                        {value.value_description && (
                          <p className="text-sm text-slate-600 mt-2">{value.value_description}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/cms/values/${value.id}/edit`}
                          className="p-2 hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4 text-emerald-600" />
                        </Link>
                        <button
                          onClick={() => handleDeleteValue(value.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "team" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-800">Team Members</h2>
              <Link
                href={`/admin/cms/${pageId}/team/new`}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Add Member
              </Link>
            </div>
            {team.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">No team members added yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {team.map((member) => (
                  <div key={member.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex gap-4">
                      {member.member_image_url && (
                        <img
                          src={member.member_image_url}
                          alt={member.member_name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-800">{member.member_name}</h3>
                        <p className="text-sm text-emerald-600">{member.member_role}</p>
                        {member.member_organization && (
                          <p className="text-xs text-slate-500 mt-1">{member.member_organization}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/cms/team/${member.id}/edit`}
                          className="p-2 hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4 text-emerald-600" />
                        </Link>
                        <button
                          onClick={() => handleDeleteTeamMember(member.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "timeline" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-800">Timeline / Milestones</h2>
              <Link
                href={`/admin/cms/${pageId}/timeline/new`}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Add Item
              </Link>
            </div>
            {timeline.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">No timeline items added yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {timeline.map((item) => (
                  <div key={item.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-lg font-bold text-emerald-600">{item.timeline_year}</p>
                        <h3 className="font-bold text-slate-800 mt-1">{item.timeline_title}</h3>
                        {item.timeline_description && (
                          <p className="text-sm text-slate-600 mt-2">{item.timeline_description}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/cms/timeline/${item.id}/edit`}
                          className="p-2 hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4 text-emerald-600" />
                        </Link>
                        <button
                          onClick={() => handleDeleteTimeline(item.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "testimonials" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-800">
                {pageData.page_slug === 'founder' ? 'Quotes' : 'Testimonials'}
              </h2>
              <Link
                href={`/admin/cms/${pageId}/testimonials/new`}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Add {pageData.page_slug === 'founder' ? 'Quote' : 'Testimonial'}
              </Link>
            </div>
            {testimonials.length === 0 ? (
              <div className="text-center py-12">
                <Quote className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">No {pageData.page_slug === 'founder' ? 'quotes' : 'testimonials'} added yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <Quote className="w-5 h-5 text-emerald-600 mb-2" />
                        <p className="text-slate-700 italic">&quot;{testimonial.testimonial_quote}&quot;</p>
                        <p className="font-medium text-slate-800 mt-3">{testimonial.testimonial_name}</p>
                        {testimonial.testimonial_role && (
                          <p className="text-sm text-slate-500">{testimonial.testimonial_role}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/cms/testimonials/${testimonial.id}/edit`}
                          className="p-2 hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4 text-emerald-600" />
                        </Link>
                        <button
                          onClick={() => handleDeleteTestimonial(testimonial.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "hubs" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-800">Locations / Hubs</h2>
              <Link
                href={`/admin/cms/${pageId}/hubs/new`}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Add Location
              </Link>
            </div>
            {hubs.length === 0 ? (
              <div className="text-center py-12">
                <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">No locations added yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {hubs.map((hub) => (
                  <div key={hub.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-800">{hub.hub_title}</h3>
                        {hub.hub_details && (
                          <p className="text-sm text-slate-600 mt-2 whitespace-pre-line">{hub.hub_details}</p>
                        )}
                        {hub.hub_description && (
                          <p className="text-xs text-slate-500 mt-2">{hub.hub_description}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/cms/hubs/${hub.id}/edit`}
                          className="p-2 hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4 text-emerald-600" />
                        </Link>
                        <button
                          onClick={() => handleDeleteHub(hub.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
