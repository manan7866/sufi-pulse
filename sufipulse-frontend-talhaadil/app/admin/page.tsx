"use client"

import { useEffect, useState } from "react"
import StatsCard from "@/components/StatsCard"
import Chart from "@/components/Chart"
import { getAllVocalists, getAllWriters, getAllKalams } from "@/services/admin"
import { getAllRemoteRecordingRequests, getAllStudioVisitRequests } from "@/services/requests"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalVocalists: 0,
    totalWriters: 0,
    totalKalams: 0,
    totalStudioRequests: 0,
    totalRemoteRequests: 0,
  })

  const [chartData, setChartData] = useState([
    { name: "Vocalists", value: 0 },
    { name: "Writers", value: 0 },
    { name: "Kalams", value: 0 },
    { name: "Studio Req", value: 0 },
    { name: "Remote Req", value: 0 },
  ])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("[v0] Fetching dashboard data...")

        const [vocalistsRes, writersRes, kalamsRes, studioRes, remoteRes] = await Promise.all([
          getAllVocalists(),
          getAllWriters(),
          getAllKalams(),
          getAllStudioVisitRequests(),
          getAllRemoteRecordingRequests(),
        ])

        console.log("[v0] Vocalists response:", vocalistsRes.data)
        console.log("[v0] Writers response:", writersRes.data)
        console.log("[v0] Kalams response:", kalamsRes.data)
        console.log("[v0] Studio requests response:", studioRes.data)
        console.log("[v0] Remote requests response:", remoteRes.data)

        const vocalistsCount = vocalistsRes.data?.vocalists?.length || 0
        const writersCount = writersRes.data?.writers?.length || 0
        const kalamsCount = kalamsRes.data?.kalams?.length || 0
        const studioCount = Array.isArray(studioRes.data) ? studioRes.data.length : 0
        const remoteCount = Array.isArray(remoteRes.data) ? remoteRes.data.length : 0

        setStats({
          totalVocalists: vocalistsCount,
          totalWriters: writersCount,
          totalKalams: kalamsCount,
          totalStudioRequests: studioCount,
          totalRemoteRequests: remoteCount,
        })

        setChartData([
          { name: "Vocalists", value: vocalistsCount },
          { name: "Writers", value: writersCount },
          { name: "Kalams", value: kalamsCount },
          { name: "Studio Req", value: studioCount },
          { name: "Remote Req", value: remoteCount },
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-emerald-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-800 mt-2">Overview of your platform statistics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <StatsCard
          title="Total Vocalists"
          value={stats.totalVocalists}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Total Writers"
          value={stats.totalWriters}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Total Kalams"
          value={stats.totalKalams}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Studio Requests"
          value={stats.totalStudioRequests}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
          trend={{ value: 5, isPositive: false }}
        />
        <StatsCard
          title="Remote Requests"
          value={stats.totalRemoteRequests}
          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012-2v-1a2 2 0 012-2h2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          trend={{ value: 20, isPositive: true }}
        />
      </div>

      {/* Charts */}
      
        <Chart data={chartData} title="Platform Overview" />
        
    </div>
  )
} 