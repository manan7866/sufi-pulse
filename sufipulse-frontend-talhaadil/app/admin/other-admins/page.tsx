"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Users, Plus, Edit, Trash2, X } from "lucide-react"
import { registerSubadmin, deleteSubadmin, updateSubadmin, getAllSubadmins } from "@/services/auth"

interface Admin {
  id: number
  name: string
  email: string
  role: string
  permissions: {
    kalams: string[]
    requests: string[]
    partnership_proposal: string[]
    vocalist: string[]
    writer: string[]
    notification: string[]
    blog: string[]
    recognitions: string[]
  }
  created_at: string
}

interface AdminFormData {
  name: string
  email: string
  password: string
  permissions: {
    kalams: string[]
    requests: string[]
    partnership_proposal: string[]
    vocalist: string[]
    writer: string[]
    notification: string[]
    blog: string[]
    recognitions: string[]
  }
}

const permissionOptions = {
  kalams: ["view"],
  requests: ["view"],
  partnership_proposal: ["view"],
  vocalist: ["view"],
  writer: ["view"],
  notification: ["view"],
  blog: ["view"],
  recognitions: ["view"],
}

const defaultPermissions: AdminFormData["permissions"] = {
  kalams: [],
  requests: [],
  partnership_proposal: [],
  vocalist: [],
  writer: [],
  notification: [],
  blog: [],
  recognitions: [],
}

export default function OtherAdminsPage() {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null)
  const [getLoading, setGetLoading] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)
  const [formData, setFormData] = useState<AdminFormData>({
    name: "",
    email: "",
    password: "",
    permissions: { ...defaultPermissions },
  })

  useEffect(() => {
    const fetchAdmins = async () => {
      setGetLoading(true)
      try {
        const response = await getAllSubadmins()
        const subadmins: Admin[] = response.data.subadmins.map((a: any) => ({
          ...a,
          permissions: {
            ...defaultPermissions,
            ...a.permissions,
          },
        }))
        setAdmins(subadmins)
      } catch (error) {
        console.error("Failed to fetch admins:", error)
      } finally {
        setGetLoading(false)
      }
    }

    fetchAdmins()
  }, [])

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      permissions: { ...defaultPermissions },
    })
  }

  const handleAddNew = () => {
    resetForm()
    setEditingAdmin(null)
    setShowAddForm(true)
  }

  const handleEdit = (admin: Admin) => {
    setFormData({
      name: admin.name,
      email: admin.email,
      password: "",
      permissions: {
        ...defaultPermissions,
        ...admin.permissions,
      },
    })
    setEditingAdmin(admin)
    setShowAddForm(true)
  }

  const handleCancel = () => {
    setShowAddForm(false)
    setEditingAdmin(null)
    resetForm()
  }

  const handleDelete = async (adminId: number) => {
    setGetLoading(true)
    try {
      await deleteSubadmin(String(adminId))
      setAdmins(admins.filter((admin) => admin.id !== adminId))
    } catch (error) {
      console.error("Failed to delete admin:", error)
    } finally {
      setGetLoading(false)
    }

    setShowDeleteConfirm(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    if (editingAdmin) {
      try {
        const response = await updateSubadmin({ id: editingAdmin.id, ...formData })
        console.log(response)
        setAdmins(admins.map((admin) => (admin.id === editingAdmin.id ? { ...admin, ...formData } : admin)))
      } catch (err: any) {
        console.log(err.response?.data?.detail || err.message)
      } finally {
        setLoading(false)
      }
    } else {
      try {
        const response = await registerSubadmin(formData)
        console.log(response.data)
        const newAdmin: Admin = {
          ...response.data.user,
          role: "sub-admin",
          created_at: new Date().toISOString(),
          permissions: {
            ...defaultPermissions,
            ...response.data.user.permissions,
          },
        }
        setAdmins([...admins, newAdmin])
      } catch (err: any) {
        console.log(err.response?.data?.detail || err.message)
      } finally {
        setLoading(false)
      }
    }

    setShowAddForm(false)
    setEditingAdmin(null)
    resetForm()
  }

  const handlePermissionChange = (category: keyof typeof permissionOptions, permission: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [category]: checked
          ? [...(prev.permissions[category] || []), permission]
          : (prev.permissions[category] || []).filter((p) => p !== permission),
      },
    }))
  }

  const getPermissionsSummary = (permissions: Admin["permissions"]) => {
    if (!permissions) return "0 permissions"
    const totalPermissions = Object.values(permissions).flat().length
    return `${totalPermissions} permissions`
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
          input {
            color: white;
          }
          input::placeholder {
            color: white;
          }
        `}
      </style>
      <div className="bg-slate-800 shadow-sm border-b border-slate-700 px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Other Admins</h1>
              <p className="text-sm text-slate-300">Manage sub-admin accounts and permissions</p>
            </div>
          </div>
          {!showAddForm && (
            <button
              onClick={handleAddNew}
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-emerald-700 active:bg-emerald-800 transition-colors duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Admin
            </button>
          )}
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {showAddForm && (
          <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">{editingAdmin ? "Edit Admin" : "Add New Admin"}</h2>
              <button
                onClick={handleCancel}
                className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {!editingAdmin && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                        placeholder="Enter name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                      <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
                        placeholder="Enter password"
                      />
                    </div>
                  </>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Permissions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(permissionOptions).map(([category, permissions]) => (
                    <div key={category} className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-emerald-900 mb-3 capitalize">
                        {category.replace("_", " ")}
                      </h4>
                      <div className="space-y-2">
                        {permissions.map((permission) => (
                          <label key={permission} className="flex items-center space-x-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={formData.permissions[category as keyof typeof permissionOptions]?.includes(
                                permission
                              ) || false}
                              onChange={(e) =>
                                handlePermissionChange(
                                  category as keyof typeof permissionOptions,
                                  permission,
                                  e.target.checked,
                                )
                              }
                              className="w-4 h-4 text-emerald-600 border-emerald-300 rounded focus:ring-emerald-500 focus:ring-2"
                            />
                            <span className="text-sm text-emerald-800 capitalize group-hover:text-emerald-900 transition-colors">
                              {permission}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
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
                  {loading ? (editingAdmin ? "Updating..." : "Adding...") : editingAdmin ? "Update Admin" : "Add Admin"}
                </button>
              </div>
            </form>
          </div>
        )}

        {!showAddForm && (
          <>
            {admins.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white">No Sub-admins Found</h3>
                <p className="text-sm text-slate-300">
                  There are currently no sub-admins. Click "Add New Admin" to create one.
                </p>
              </div>
            ) : (
              <>
                <div className="hidden lg:block bg-slate-800 rounded-xl shadow-sm border border-slate-700 overflow-hidden">
                  <table className="min-w-full divide-y divide-slate-700">
                    <thead className="bg-emerald-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">
                          Admin Details
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">
                          Permissions
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-emerald-900 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-slate-800 divide-y divide-slate-700">
                      {admins.map((admin) => (
                        <tr key={admin.id} className="hover:bg-slate-700 transition-colors">
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-semibold text-white">{admin.name}</div>
                              <div className="text-sm text-slate-300">{admin.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                              {admin.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-slate-300">{getPermissionsSummary(admin.permissions)}</div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => handleEdit(admin)}
                                className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-900/20 rounded-lg transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setShowDeleteConfirm(admin.id)}
                                className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="lg:hidden space-y-4">
                  {admins.map((admin) => (
                    <div key={admin.id} className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{admin.name}</h3>
                          <p className="text-sm text-slate-300">{admin.email}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEdit(admin)}
                            className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-900/20 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(admin.id)}
                            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          {admin.role}
                        </span>
                        <span className="text-sm text-slate-300">{getPermissionsSummary(admin.permissions)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl shadow-xl max-w-md w-full p-6 border border-slate-700">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-white text-center mb-2">Delete Admin</h3>
            <p className="text-sm text-slate-300 text-center mb-6">
              Are you sure you want to delete this admin? This action cannot be undone.
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