"use client"

import { useEffect, useState } from "react"
import { 
  Users, 
  FileText, 
  Mic2, 
  Music, 
  Radio, 
  TrendingUp, 
  Activity,
  BarChart3,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react"
import Link from "next/link"
import { getAllVocalists, getAllWriters, getAllBloggers, getAllKalams, getAllBlogSubmissions } from "@/services/admin"
import { getAllRemoteRecordingRequests, getAllStudioVisitRequests } from "@/services/requests"
import { getAllStudioRequests, getAllRemoteRequests } from "@/services/adminRecordingRequests"

interface DashboardStats {
  totalVocalists: number
  totalWriters: number
  totalBloggers: number
  totalKalams: number
  totalBlogs: number
  totalStudioRequests: number
  totalRemoteRequests: number
  pendingStudioRequests: number
  pendingRemoteRequests: number
}

interface StatCardProps {
  title: string
  value: number
  icon: React.ReactNode
  color: string
  link: string
  trend?: {
    value: number
    isPositive: boolean
  }
}

function ModernStatCard({ title, value, icon, color, link, trend }: StatCardProps) {
  return (
    <Link href={link} className="block group">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <p className="text-4xl font-bold text-slate-900 mt-2 group-hover:text-emerald-700 transition-colors">
              {value}
            </p>
            {trend && (
              <div className="flex items-center mt-3">
                <span className={`text-sm font-semibold ${trend.isPositive ? "text-emerald-600" : "text-red-600"}`}>
                  {trend.isPositive ? "↗" : "↘"} {Math.abs(trend.value)}%
                </span>
                <span className="text-xs text-slate-500 ml-2">vs last month</span>
              </div>
            )}
          </div>
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${color}`}>
            {icon}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalVocalists: 0,
    totalWriters: 0,
    totalBloggers: 0,
    totalKalams: 0,
    totalBlogs: 0,
    totalStudioRequests: 0,
    totalRemoteRequests: 0,
    pendingStudioRequests: 0,
    pendingRemoteRequests: 0,
  })

  const [chartData, setChartData] = useState([
    { name: "Vocalists", value: 0 },
    { name: "Writers", value: 0 },
    { name: "Bloggers", value: 0 },
    { name: "Kalams", value: 0 },
    { name: "Blogs", value: 0 },
    { name: "Studio Req", value: 0 },
    { name: "Remote Req", value: 0 },
  ])

  const [loading, setLoading] = useState(true)
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [recordingRequests, setRecordingRequests] = useState<{ studio: any[], remote: any[] }>({ studio: [], remote: [] })

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("[v0] Fetching dashboard data...")

        const [vocalistsRes, writersRes, bloggersRes, kalamsRes, blogsRes, studioRes, remoteRes, studioRecordingRes, remoteRecordingRes] = await Promise.all([
          getAllVocalists(),
          getAllWriters(),
          getAllBloggers(),
          getAllKalams(),
          getAllBlogSubmissions(),
          getAllStudioVisitRequests(),
          getAllRemoteRecordingRequests(),
          getAllStudioRequests(),
          getAllRemoteRequests(),
        ])

        console.log("[v0] Vocalists response:", vocalistsRes.data)
        console.log("[v0] Writers response:", writersRes.data)
        console.log("[v0] Bloggers response:", bloggersRes.data)
        console.log("[v0] Kalams response:", kalamsRes.data)
        console.log("[v0] Blogs response:", blogsRes.data)
        console.log("[v0] Studio requests response:", studioRes.data)
        console.log("[v0] Remote requests response:", remoteRes.data)
        console.log("[v0] Studio recording requests:", studioRecordingRes.data)
        console.log("[v0] Remote recording requests:", remoteRecordingRes.data)

        const vocalistsCount = vocalistsRes.data?.vocalists?.length || 0
        const writersCount = writersRes.data?.writers?.length || 0
        const bloggersCount = bloggersRes.data?.bloggers?.length || 0
        const kalamsCount = kalamsRes.data?.kalams?.length || 0
        const blogsCount = blogsRes.data?.blogs?.length || 0
        const studioCount = Array.isArray(studioRes.data) ? studioRes.data.length : 0
        const remoteCount = Array.isArray(remoteRes.data) ? remoteRes.data.length : 0
        
        // Recording requests (studio & remote)
        const studioRecordingRequests = studioRecordingRes.data?.requests || []
        const remoteRecordingRequests = remoteRecordingRes.data?.requests || []
        const studioRecordingCount = studioRecordingRequests.length
        const remoteRecordingCount = remoteRecordingRequests.length
        const pendingStudioCount = studioRecordingRequests.filter((r: any) => r.status === 'pending_review').length
        const pendingRemoteCount = remoteRecordingRequests.filter((r: any) => r.status === 'under_review').length

        setStats({
          totalVocalists: vocalistsCount,
          totalWriters: writersCount,
          totalBloggers: bloggersCount,
          totalKalams: kalamsCount,
          totalBlogs: blogsCount,
          totalStudioRequests: studioCount + studioRecordingCount,
          totalRemoteRequests: remoteCount + remoteRecordingCount,
          pendingStudioRequests: pendingStudioCount,
          pendingRemoteRequests: pendingRemoteCount,
        })

        setChartData([
          { name: "Vocalists", value: vocalistsCount },
          { name: "Writers", value: writersCount },
          { name: "Bloggers", value: bloggersCount },
          { name: "Kalams", value: kalamsCount },
          { name: "Blogs", value: blogsCount },
          { name: "Studio Req", value: studioCount + studioRecordingCount },
          { name: "Remote Req", value: remoteCount + remoteRecordingCount },
        ])

        setRecordingRequests({
          studio: studioRecordingRequests.slice(0, 5),
          remote: remoteRecordingRequests.slice(0, 5),
        })

        // Mock recent activity (you can replace with real data)
        setRecentActivity([
          { type: "vocalist", action: "New vocalist registered", time: "2 hours ago" },
          { type: "kalam", action: "New kalam submitted", time: "4 hours ago" },
          { type: "blog", action: "Blog post pending review", time: "6 hours ago" },
        ])
      } catch (error) {
        console.error("[v0] Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                Admin Dashboard
              </h1>
              <p className="text-slate-600 mt-2 text-sm sm:text-base">
                Overview of your platform statistics and activity
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Clock className="w-4 h-4" />
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          <ModernStatCard
            title="Total Vocalists"
            value={stats.totalVocalists}
            icon={<Mic2 className="w-8 h-8 text-white" />}
            color="bg-gradient-to-br from-emerald-500 to-emerald-700"
            link="/admin/vocalists"
            trend={{ value: 12, isPositive: true }}
          />
          <ModernStatCard
            title="Total Writers"
            value={stats.totalWriters}
            icon={<FileText className="w-8 h-8 text-white" />}
            color="bg-gradient-to-br from-blue-500 to-blue-700"
            link="/admin/writers"
            trend={{ value: 8, isPositive: true }}
          />
          <ModernStatCard
            title="Total Bloggers"
            value={stats.totalBloggers}
            icon={<Users className="w-8 h-8 text-white" />}
            color="bg-gradient-to-br from-purple-500 to-purple-700"
            link="/admin/bloggers"
            trend={{ value: 15, isPositive: true }}
          />
          <ModernStatCard
            title="Total Kalams"
            value={stats.totalKalams}
            icon={<Music className="w-8 h-8 text-white" />}
            color="bg-gradient-to-br from-orange-500 to-orange-700"
            link="/admin/kalams"
            trend={{ value: 20, isPositive: true }}
          />
          <ModernStatCard
            title="Total Blogs"
            value={stats.totalBlogs}
            icon={<Eye className="w-8 h-8 text-white" />}
            color="bg-gradient-to-br from-pink-500 to-pink-700"
            link="/admin/blogs"
            trend={{ value: 10, isPositive: true }}
          />
          <ModernStatCard
            title="Studio Requests"
            value={stats.totalStudioRequests}
            icon={<CheckCircle className="w-8 h-8 text-white" />}
            color="bg-gradient-to-br from-teal-500 to-teal-700"
            link="/admin/recording-requests/studio"
            trend={{ value: 5, isPositive: false }}
          />
          <ModernStatCard
            title="Remote Requests"
            value={stats.totalRemoteRequests}
            icon={<Radio className="w-8 h-8 text-white" />}
            color="bg-gradient-to-br from-indigo-500 to-indigo-700"
            link="/admin/recording-requests/remote"
            trend={{ value: 18, isPositive: true }}
          />
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                Platform Overview
              </h2>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-emerald-600 rounded-full"></span>
                <span className="text-sm text-slate-600">Active Users</span>
              </div>
            </div>
            <div className="h-64">
              <canvas id="dashboardChart" className="w-full h-full" />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-600" />
                Recent Activity
              </h2>
              <Link href="/admin/notifications" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'vocalist' ? 'bg-emerald-500' :
                    activity.type === 'kalam' ? 'bg-blue-500' :
                    'bg-orange-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                    <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
              {recentActivity.length === 0 && (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm text-slate-500">No recent activity</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl shadow-lg p-6 sm:p-8 text-white">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link href="/admin/cms" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center transition-all">
              <FileText className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Manage CMS</span>
            </Link>
            <Link href="/admin/notifications" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center transition-all">
              <Users className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Notifications</span>
            </Link>
            <Link href="/admin/blog-submissions" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center transition-all">
              <CheckCircle className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Review Blogs</span>
            </Link>
            <Link href="/admin/kalams" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center transition-all">
              <Music className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Kalams</span>
            </Link>
          </div>
        </div>

        {/* Recording Requests Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Studio Recording Requests */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center">
                  <Mic2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Studio Recording Requests</h2>
                  <p className="text-sm text-slate-600">
                    {stats.pendingStudioRequests > 0 && (
                      <span className="text-amber-600 font-semibold">{stats.pendingStudioRequests} pending</span>
                    )}
                  </p>
                </div>
              </div>
              <Link href="/admin/recording-requests/studio" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              {recordingRequests.studio.length > 0 ? (
                recordingRequests.studio.slice(0, 4).map((request: any) => (
                  <div key={request.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{request.lyric_title}</p>
                      <p className="text-xs text-slate-600">
                        {new Date(request.preferred_session_date).toLocaleDateString()} • {request.preferred_time_block}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      request.status === 'pending_review' ? 'bg-amber-100 text-amber-700' :
                      request.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                      request.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {request.status.replace('_', ' ')}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Mic2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm text-slate-500">No studio recording requests</p>
                </div>
              )}
            </div>
          </div>

          {/* Remote Recording Requests */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl flex items-center justify-center">
                  <Radio className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Remote Recording Requests</h2>
                  <p className="text-sm text-slate-600">
                    {stats.pendingRemoteRequests > 0 && (
                      <span className="text-amber-600 font-semibold">{stats.pendingRemoteRequests} pending</span>
                    )}
                  </p>
                </div>
              </div>
              <Link href="/admin/recording-requests/remote" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              {recordingRequests.remote.length > 0 ? (
                recordingRequests.remote.slice(0, 4).map((request: any) => (
                  <div key={request.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{request.lyric_title}</p>
                      <p className="text-xs text-slate-600">
                        Target: {new Date(request.target_submission_date).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      request.status === 'under_review' ? 'bg-amber-100 text-amber-700' :
                      request.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                      request.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {request.status.replace('_', ' ')}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Radio className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm text-slate-500">No remote recording requests</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}