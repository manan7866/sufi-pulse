"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: "📊" },
  { name: "Vocalists", href: "/admin/vocalists", icon: "🎤" },
  { name: "Writers", href: "/admin/writers", icon: "✍️" },
  { name: "Kalams", href: "/admin/kalams", icon: "📝" },
  { name: "Studio Requests", href: "/admin/studio-requests", icon: "🏢" },
  { name: "Remote Requests", href: "/admin/remote-requests", icon: "🌐" },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-slate-900 text-white p-2 rounded-md"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 bg-slate-800 border-b border-slate-700">
            <h1 className="text-xl font-bold text-emerald-50">Admin Dashboard</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
                    ${
                      isActive
                        ? "bg-emerald-900 text-emerald-50"
                        : "text-slate-50 hover:bg-slate-800 hover:text-emerald-50"
                    }
                  `}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </>
  )
}
