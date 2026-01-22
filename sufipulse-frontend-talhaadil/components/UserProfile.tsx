"use client"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { Lock, User2 } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

export function UserProfileDisplay({
  userName,
  userAvatarSrc,
  role,
}: {
  userName: string
  userAvatarSrc: string
  role: string
}) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const auth = useAuth()
  const logout = auth?.logout ?? (() => { })



  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative pl-30 inline-block text-left" ref={dropdownRef}>
      <motion.button
        className="flex items-center space-x-2 cursor-pointer group "
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.95 }}
        aria-label={`View profile for ${userName}`}
      >
        <div className="h-8 w-8 rounded-full bg-emerald-900 flex items-center justify-center shadow-sm">
          <User2 className="text-white text-sm" />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-slate-900 text-md font-medium group-hover:text-emerald-900 transition-colors duration-300 hidden md:inline">
            {userName}
          </span>
          <span className="text-slate-900 text-xs font-medium group-hover:text-emerald-900 transition-colors duration-300 hidden md:inline">
            {role}
          </span>
        </div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg z-50 overflow-hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => {

                if (role?.toLowerCase() === "vocalist") {
                  router.push("/vocalist/profile")
                } else if (role?.toLowerCase() === "writer") {
                  router.push("/writer/kalams")
                } else {
                  router.push("/admin")
                }

                setOpen(false)
              }}
              className="w-full text-left px-4 py-2 text-sm text-slate-900 hover:bg-slate-50 flex items-center gap-2 disabled:opacity-50"
            >
              Dashboard
            </button>

            <button
              onClick={() => {
                setOpen(false)
                logout()
              }}
              className="block w-full text-left px-4 py-2 text-sm text-emerald-900 hover:bg-emerald-50"
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
