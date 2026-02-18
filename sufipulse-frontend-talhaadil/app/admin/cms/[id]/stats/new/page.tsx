"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, X } from "lucide-react"
import { adminCreateStat } from "@/services/cms"

export default function AddStatPage() {
  const router = useRouter()
  const params = useParams()
  const pageId = parseInt(params.id as string)

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    stat_number: "",
    stat_label: "",
    stat_description: "",
    stat_icon: "",
    stat_order: "0"
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      await adminCreateStat(pageId, {
        ...formData,
        stat_order: parseInt(formData.stat_order),
        is_active: true
      })
      alert("Stat created successfully!")
      router.push(`/admin/cms/edit/${pageId}`)
    } catch (error: any) {
      alert(error.response?.data?.detail || "Failed to create stat")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <Link href={`/admin/cms/edit/${pageId}`} className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4">
          <ArrowLeft className="w-5 h-5" />
          Back to Page
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Add New Statistic</h1>
        <p className="text-slate-600 mt-2">Add a new statistic to this page</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Stat Number *
          </label>
          <input
            type="text"
            name="stat_number"
            value={formData.stat_number}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="e.g., 300+, 100%, 50+"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Stat Label *
          </label>
          <input
            type="text"
            name="stat_label"
            value={formData.stat_label}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="e.g., Sacred Collaborations, Countries"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Description
          </label>
          <textarea
            name="stat_description"
            value={formData.stat_description}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Optional description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Icon Name
          </label>
          <input
            type="text"
            name="stat_icon"
            value={formData.stat_icon}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="e.g., Heart, Globe, Music, Award"
          />
          <p className="text-xs text-slate-500 mt-1">Lucide icon name (optional)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Order
          </label>
          <input
            type="number"
            name="stat_order"
            value={formData.stat_order}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="0"
          />
          <p className="text-xs text-slate-500 mt-1">Lower numbers appear first</p>
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-slate-200">
          <Link
            href={`/admin/cms/edit/${pageId}`}
            className="px-6 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {loading ? "Creating..." : "Create Stat"}
          </button>
        </div>
      </form>
    </div>
  )
}
