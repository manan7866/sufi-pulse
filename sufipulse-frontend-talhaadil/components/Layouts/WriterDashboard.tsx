"use client"

import { useEffect, useState } from "react"
import type React from "react"
import { PenTool, BookOpen, Menu, X, User2, ArrowLeft, Bell, Mail } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { useAuth } from "@/context/AuthContext"
import NotificationDropdown from "./NotficationDropdown"
import { checkWriterRegistration } from "@/services/writer"
import WriterRegistrationForm from "../pages/WriterRegistrationForm"
import { i } from "framer-motion/m"
import { BiLogIn } from "react-icons/bi"
import Cookie from "js-cookie"

interface WriterDashboardLayoutProps {
  children: React.ReactNode
}

const WriterDashboardLayout: React.FC<WriterDashboardLayoutProps> = ({ children }) => {
  const info_submitted = Cookies.get("info_submitted") 
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const [name, setName] = useState("")
  const auth = useAuth()
  const logout = auth?.logout ?? (() => {})

  const [isRegistered, setIsRegistered] = useState<boolean | null>(null)
  const [checkingRegistration, setCheckingRegistration] = useState(true)

  useEffect(() => {
    const profile = Cookies.get("name")
    setName(profile ?? "")
  }, [])

  useEffect(() => {
    const checkRegistration = async () => {
      try {
        console.log("[v0] Checking writer registration status...")
        const response = await checkWriterRegistration()
        console.log("[v0] Registration check response:", response.data)
        setIsRegistered(response.data.is_registered)
      } catch (error) {
        console.error("[v0] Registration check failed:", error)
        setIsRegistered(false)
      } finally {
        setCheckingRegistration(false)
      }
    }

    checkRegistration()
  }, [])

  const handleRegistrationComplete = () => {
    console.log("[v0] Registration completed, redirecting to writer profile...")
    setIsRegistered(true)
    router.push("/writer/profile")
  }

  if (checkingRegistration) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Checking registration status...</p>
        </div>
      </div>
    )
  }

  if (info_submitted === "false") {
    return <WriterRegistrationForm onRegistrationComplete={handleRegistrationComplete} />
  }

  const navigation = [
    {
      name: "Submit Kalam",
      href: "/writer/submit",
      icon: PenTool,
      current: pathname === "/writer/submit",
    },
    {
      name: "My Kalams",
      href: "/writer/kalams",
      icon: BookOpen,
      current: pathname === "/writer/kalams",
    },
    {
      name:"Profile",
      href:"/writer/profile",
      icon: User2,
      current:pathname === "/writer/profile",
    },
    {
      name: "Blogs",
      href: "/writer/blog",
      icon: BiLogIn,
      current: pathname === "/writer/blog",
    },
    {
      name:'Notifications',
      href:'/writer/notification',
      icon: Bell,
      current : pathname === '/writer/notification',
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-3/4 sm:w-64 max-w-xs bg-slate-900 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-64 lg:max-w-none`}
        aria-hidden={!sidebarOpen}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 sm:p-6 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <PenTool className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-base sm:text-lg">SufiPulse Writer</h1>
                <p className="text-slate-400 text-xs sm:text-sm">Dashboard</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 sm:p-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 sm:px-4 sm:py-3 rounded-lg transition-colors text-sm sm:text-base ${
                    item.current ? "bg-emerald-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          <div className="p-4 sm:p-6 border-t border-slate-800">
            <a
              href="mailto:writer@sufipulse.com"
              className="w-full flex items-center space-x-3 px-3 py-2 sm:px-4 sm:py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors text-sm sm:text-base mb-2"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Send Email</span>
            </a>
            <button
              onClick={logout}
              className="w-full flex items-center space-x-3 px-3 py-2 sm:px-4 sm:py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors text-sm sm:text-base"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-60 z-30 lg:hidden blur-2xl"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Content */}
      <div>
        <header className="bg-white shadow-sm border-b border-slate-200 px-4 sm:px-6 py-4 lg:ml-64">
          <div className="flex items-center justify-between">
            {/* Left side: Sidebar toggle + Back button + Heading */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg shadow-sm"
                aria-label={sidebarOpen ? "Close menu" : "Open menu"}
              >
                {sidebarOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
                )}
              </button>

              <div className="flex items-center space-x-3">
                {/* Back Button */}
                <Link
                  href="/"
                  className="flex items-center px-3 py-1.5 rounded-full bg-emerald-50 text-slate-600 hover:bg-emerald-600 hover:text-white shadow-sm transition-all duration-200"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  <span className="hidden lg:flex text-sm font-medium">Back</span>
                </Link>

                {/* Heading + Subtext */}
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">
                    {pathname === "/writer/submit" ? "Submit Kalam" : "My Kalams"}
                  </h2>
                  <p className="hidden lg:flex text-xs sm:text-sm text-slate-600">
                    {pathname === "/writer/submit" ? "Submit a new kalam for review" : "Manage your submitted kalams"}
                  </p>
                </div>
              </div>
            </div>

            {/* Right side: Notifications + User info */}
            <div className="flex items-center space-x-3">
              {!pathname.includes("/notification") && <NotificationDropdown />}

              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                <User2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="hidden lg:flex text-sm sm:text-base font-medium text-gray-800">{name}</span>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 lg:ml-64">{children}</main>
      </div>
    </div>
  )
}

export default WriterDashboardLayout