"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { getKalamsByWriter } from "@/services/admin"

interface Kalam {
  id: number
  title: string
  language: string
  theme: string
  sufi_influence: string
  musical_preference: string
}

export default function WriterDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [kalams, setKalams] = useState<Kalam[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchKalams = async () => {
      try {
        console.log("[v0] Fetching kalams for writer ID:", params.id)
        const response = await getKalamsByWriter(Number(params.id))
        console.log("[v0] Writer kalams response:", response.data)
        setKalams(response.data?.kalams || [])
      } catch (error) {
        console.error("[v0] Error fetching writer kalams:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchKalams()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-emerald-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading kalams...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Writer's Kalams</h1>
          <p className="text-slate-800 mt-2">Writer ID: {params.id}</p>
        </div>
        <button
          onClick={() => router.back()}
          className="bg-slate-800 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-slate-900 transition-colors duration-200"
        >
          ← Back
        </button>
      </div>

      {/* Kalams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kalams.map((kalam) => (
          <div key={kalam.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs bg-emerald-50 text-emerald-900 px-2 py-1 rounded-full">{kalam.language}</span>
              <span className="text-xs bg-slate-50 text-slate-800 px-2 py-1 rounded-full">{kalam.theme}</span>
            </div>

            <h3 className="text-lg font-semibold text-slate-900 mb-2">{kalam.title}</h3>
            <p className="text-slate-800 text-sm mb-2">
              <strong>Sufi Influence:</strong> {kalam.sufi_influence}
            </p>
            <p className="text-slate-800 text-sm mb-4">
              <strong>Musical Preference:</strong> {kalam.musical_preference}
            </p>

            <Link
              href={`/admin/kalams/${kalam.id}`}
              className="w-full bg-emerald-900 text-emerald-50 py-2 px-4 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors duration-200 text-center block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      {kalams.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-800 text-lg">No kalams found for this writer</div>
        </div>
      )}
    </div>
  )
}
