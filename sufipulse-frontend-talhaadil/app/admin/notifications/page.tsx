"use client"

import { getAllVocalists, getAllWriters, getAllBloggers } from "@/services/admin"
import { createNotification } from "@/services/notifications"
import type React from "react"
import { useState, useEffect } from "react"

interface User {
  id: number
  name: string
  email: string
  role: string
}

interface NotificationData {
  title: string
  message: string
  target_type: "all" | "vocalists" | "writers" | "bloggers" | "specific"
  target_user_ids: number[]
}

export default function Home() {
  const [formData, setFormData] = useState<NotificationData>({
    title: "",
    message: "",
    target_type: "all",
    target_user_ids: [],
  })

  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showUserSearch, setShowUserSearch] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  // Fetch users (vocalists, writers, and bloggers) from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [vocalistsResponse, writersResponse, bloggersResponse] = await Promise.all([
          getAllVocalists(),
          getAllWriters(),
          getAllBloggers(),
        ])

        const vocalists = (vocalistsResponse.data?.vocalists || []).map((v: any) => ({
          ...v,
          role: "vocalist",
        }))

        const writers = (writersResponse.data?.writers || []).map((w: any) => ({
          ...w,
          role: "writer",
        }))

        const bloggers = (bloggersResponse.data?.bloggers || []).map((b: any) => ({
          ...b,
          role: "blogger",
        }))

        const allUsers = [...vocalists, ...writers, ...bloggers]
        setUsers(allUsers)
        setFilteredUsers(allUsers)
        console.log(allUsers)
      } catch (error) {
        console.log("error is hereeeee", error)
        console.error("Failed to fetch users:", error)
      }
    }

    fetchUsers()
  }, [])
  
  // Filter users based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredUsers(filtered)
    } else {
      setFilteredUsers(users)
    }
  }, [searchTerm, users])

  const handleTargetTypeChange = (targetType: "all" | "vocalists" | "writers" | "bloggers" | "specific") => {
    if (targetType === "specific") {
      setFormData((prev) => ({ ...prev, target_type: "all", target_user_ids: [] }))
      setShowUserSearch(true)
    } else {
      setFormData((prev) => ({ ...prev, target_type: targetType, target_user_ids: [] }))
      setShowUserSearch(false)
      setSelectedUser(null)
    }
  }

  const handleUserSelect = (user: User) => {
    setSelectedUser(user)
    setFormData((prev) => ({ ...prev, target_user_ids: [user.id], target_type: "specific" }))
    setShowUserSearch(false)
    setSearchTerm("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await createNotification(formData)
      console.log(response.data)
      if (response.status >= 200 && response.status < 300) {
        setFormData({
          title: "",
          message: "",
          target_type: "all",
          target_user_ids: [],
        })
        setSelectedUser(null)
      }
    } catch (error) {
      console.error("Error sending notification:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-emerald-900 mb-6 sm:mb-8">
          Admin Notifications
        </h1>

        <div className="bg-white border-2 border-slate-800 rounded-lg p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-900 mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 border-2 border-slate-800 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-900 text-slate-900"
                placeholder="Enter notification title..."
                required
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-900 mb-2">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                className="w-full p-3 border-2 border-slate-800 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-900 text-slate-900"
                rows={4}
                placeholder="Enter your notification message..."
                required
              />
            </div>

            {/* Target Type Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">Target Audience</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="targetType"
                    value="ALL_USERS"
                    checked={formData.target_type === "all" && !selectedUser}
                    onChange={() => handleTargetTypeChange("all")}
                    className="mr-2 text-emerald-900 focus:ring-emerald-900"
                  />
                  <span className="text-slate-900">All Users</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="targetType"
                    value="VOCALISTS"
                    checked={formData.target_type === "vocalists"}
                    onChange={() => handleTargetTypeChange("vocalists")}
                    className="mr-2 text-emerald-900 focus:ring-emerald-900"
                  />
                  <span className="text-slate-900">Vocalists Only</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="targetType"
                    value="WRITERS"
                    checked={formData.target_type === "writers"}
                    onChange={() => handleTargetTypeChange("writers")}
                    className="mr-2 text-emerald-900 focus:ring-emerald-900"
                  />
                  <span className="text-slate-900">Writers Only</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="targetType"
                    value="BLOGGERS"
                    checked={formData.target_type === "bloggers"}
                    onChange={() => handleTargetTypeChange("bloggers")}
                    className="mr-2 text-emerald-900 focus:ring-emerald-900"
                  />
                  <span className="text-slate-900">Bloggers Only</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="targetType"
                    value="SPECIFIC_USER"
                    checked={selectedUser !== null}
                    onChange={() => handleTargetTypeChange("specific")}
                    className="mr-2 text-emerald-900 focus:ring-emerald-900"
                  />
                  <span className="text-slate-900">Specific User</span>
                </label>
              </div>
            </div>

            {/* User Search */}
            {showUserSearch && (
              <div>
                <label htmlFor="userSearch" className="block text-sm font-medium text-slate-900 mb-2">
                  Search User
                </label>
                <input
                  id="userSearch"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 border-2 border-slate-800 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-900 text-slate-900"
                  placeholder="Search by name or email..."
                />
                {filteredUsers.length > 0 && searchTerm && (
                  <div className="mt-2 max-h-40 overflow-y-auto border-2 border-slate-800 rounded-md">
                    {filteredUsers.map((user) => (
                      <div
                        key={user.id}
                        onClick={() => handleUserSelect(user)}
                        className="p-3 hover:bg-emerald-50 cursor-pointer border-b border-slate-800 last:border-b-0"
                      >
                        <div className="font-medium text-slate-900">{user.username}</div>
                        <div className="text-sm text-slate-800">{user.email}</div>
                        <div className="text-xs text-slate-800 capitalize">{user.role}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Selected User Display */}
            {selectedUser && (
              <div className="bg-slate-50 p-3 rounded-md border-2 border-slate-800">
                <div className="text-sm font-medium text-slate-900">Selected User:</div>
                <div className="font-medium text-slate-900">{selectedUser.username}</div>
                <div className="text-sm text-slate-800">{selectedUser.email}</div>
                <div className="text-xs text-slate-800 capitalize">{selectedUser.role}</div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedUser(null)
                    setFormData((prev) => ({ ...prev, target_user_ids: [], target_type: "all" }))
                  }}
                  className="mt-2 text-xs text-emerald-900 underline"
                >
                  Remove selection
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !formData.title.trim() || !formData.message.trim()}
              className="w-full bg-emerald-900 text-white py-3 px-4 rounded-md hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? "Sending..." : "Send Notification"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}