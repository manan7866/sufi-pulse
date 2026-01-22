"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Trophy, Plus, Trash2, X } from "lucide-react"
import { getAllSpecialRecognitions,deleteSpecialRecognition, createSpecialRecognition } from "@/services/recognition"

interface SpecialRecognition {
  id: number
  title: string
  subtitle: string
  description: string
  achievement: string
}

interface RecognitionFormData {
  title: string
  subtitle: string
  description: string
  achievement: string
}

export default function SpecialRecognitionsPage() {
  const [recognitions, setRecognitions] = useState<SpecialRecognition[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [getLoading, setGetLoading] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)
  const [formData, setFormData] = useState<RecognitionFormData>({
    title: "",
    subtitle: "",
    description: "",
    achievement: "",
  })

  useEffect(() => {
    const fetchRecognitions = async () => {
      setGetLoading(true)
      try {
        const response = await getAllSpecialRecognitions()
        setRecognitions(response.data)
      } catch (error) {
        console.error("Failed to fetch special recognitions:", error)
      } finally {
        setGetLoading(false)
      }
    }

    fetchRecognitions()
  }, [])

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      achievement: "",
    })
  }

  const handleAddNew = () => {
    resetForm()
    setShowAddForm(true)
  }

  const handleCancel = () => {
    setShowAddForm(false)
    resetForm()
  }

  const handleDelete = async (recognitionId: number) => {
    setGetLoading(true)
    try {
      await deleteSpecialRecognition(recognitionId)
      setRecognitions(recognitions.filter((recognition) => recognition.id !== recognitionId))
    } catch (error) {
      console.error("Failed to delete recognition:", error)
    } finally {
      setGetLoading(false)
    }

    setShowDeleteConfirm(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await createSpecialRecognition(formData)
      setRecognitions([...recognitions, response.data])
    } catch (err: any) {
      console.log(err.response?.data?.detail || err.message)
    } finally {
      setLoading(false)
    }

    setShowAddForm(false)
    resetForm()
  }

  if (getLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <style>
        {`
          input, textarea {
            color: white;
          }
          input::placeholder, textarea::placeholder {
            color: white;
          }
        `}
      </style>
      <div className="bg-slate-800 shadow-sm border-b border-slate-700 px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Special Recognitions</h1>
              <p className="text-sm text-slate-300">Manage special recognition entries</p>
            </div>
          </div>
          {!showAddForm && (
            <button
              onClick={handleAddNew}
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-emerald-700 active:bg-emerald-800 transition-colors duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Recognition
            </button>
          )}
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {showAddForm && (
          <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Add New Recognition</h2>
              <button
                onClick={handleCancel}
                className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                    placeholder="Enter title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Subtitle</label>
                  <input
                    type="text"
                    required
                    value={formData.subtitle}
                    onChange={(e) => setFormData((prev) => ({ ...prev, subtitle: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                    placeholder="Enter subtitle"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                    placeholder="Enter description"
                    rows={4}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Achievement</label>
                  <textarea
                    required
                    value={formData.achievement}
                    onChange={(e) => setFormData((prev) => ({ ...prev, achievement: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                    placeholder="Enter achievement"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-slate-700">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 text-slate-300 bg-slate-700 hover:bg-slate-600 font-medium rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  {loading ? "Adding..." : "Add Recognition"}
                </button>
              </div>
            </form>
          </div>
        )}

        {!showAddForm && (
          <>
            <div className="hidden lg:block bg-slate-800 rounded-xl shadow-sm border border-slate-700 overflow-hidden">
              <table className="min-w-full divide-y divide-slate-700">
                <thead className="bg-emerald-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">
                      Recognition Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">
                      Achievement
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-emerald-900 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-slate-800 divide-y divide-slate-700">
                  {recognitions.map((recognition) => (
                    <tr key={recognition.id} className="hover:bg-slate-700 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-semibold text-white">{recognition.title}</div>
                          <div className="text-sm text-slate-300">{recognition.subtitle}</div>
                          <div className="text-sm text-slate-400">{recognition.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-300">{recognition.achievement}</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setShowDeleteConfirm(recognition.id)}
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:hidden space-y-4">
              {recognitions.map((recognition) => (
                <div key={recognition.id} className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{recognition.title}</h3>
                      <p className="text-sm text-slate-300">{recognition.subtitle}</p>
                      <p className="text-sm text-slate-400">{recognition.description}</p>
                    </div>
                    <button
                      onClick={() => setShowDeleteConfirm(recognition.id)}
                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-sm text-slate-300">{recognition.achievement}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl shadow-xl max-w-md w-full p-6 border border-slate-700">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-white text-center mb-2">Delete Recognition</h3>
            <p className="text-sm text-slate-300 text-center mb-6">
              Are you sure you want to delete this special recognition? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-slate-300 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}