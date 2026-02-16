"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { User, Mail, Lock, PenTool, Mic, Globe, Award, ArrowLeft } from "lucide-react"
import Input from "../ui/Input"
import Button from "../ui/Button"
import FormCard from "../ui/FormCard"
import PasswordStrength from "../ui/PasswordStrength"
import OTPVerification from "./OtpVerify"
import { signin } from "@/services/auth" // Adjust the import path based on your project structure
import { GoogleLogin } from "@react-oauth/google"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useToast } from "@/context/ToastContext"
import { incrementWeekly,incrementMonthly } from "@/lib/increment"

const Register = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "writer", // Default to writer, but can be changed to any valid option
    acceptTerms: false,
    country: "",
    city: "",
  })
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showOTPVerification, setShowOTPVerification] = useState(false)
  const [userEmail, setUserEmail] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

  

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      showToast("Please fix the errors below")
      return
    }
    setLoading(true)
    try {
      // Assuming you want to pass a default country and city, or get them from additional form fields
      // If you have country and city inputs, add them to formData and pass them here
      const response = await signin(
        formData.fullName,
        formData.email,
        formData.password,
        formData.userType,
        formData.country, // Replace with actual country if available
        formData.city, // Replace with actual city if available
      )

      setUserEmail(formData.email)
      setShowOTPVerification(true)
      console.log(response.data)
      showToast("Registration successful! Please verify your OTP.")
    } catch (error: any) {
      console.log(error)
      setLoading(false)
      showToast(error.response?.data?.detail || "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleOTPVerified = async () => {
    setShowOTPVerification(false)
    showToast("Email verified successfully!")

  }

  const handleBackToHome = () => {
    router.push("/");
  };

  const stats = [
    { number: `${incrementWeekly(89)}`, label: "Writers Joined", icon: PenTool },
    { number: `${incrementWeekly(43)}`, label: "Vocalists", icon: Mic },
    { number: `${incrementMonthly(43,200)}+`, label: "Countries", icon: Globe },
    { number: "100%", label: "Free Service", icon: Award },
  ]

  const userTypes = [
    {
      id: "writer",
      label: "Writer",
      icon: PenTool,
      description: "Share your sacred poetry",
    },
    {
      id: "vocalist",
      label: "Vocalist",
      icon: Mic,
      description: "Lend your voice to divine words",
    },
    {
      id: "blogger",
      label: "Blogger",
      icon: PenTool, // Using PenTool for blogger as well
      description: "Share your spiritual insights",
    },
  ]

  if (showOTPVerification) {
    return (
      <OTPVerification email={userEmail} onVerified={handleOTPVerified} onBack={() => setShowOTPVerification(false)} />
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20" />

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-10 right-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -8, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute bottom-10 left-20 w-56 h-56 bg-slate-500/10 rounded-full blur-xl"
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onClick={handleBackToHome}
          className="fixed top-4 left-4 z-50 flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg p-3 border border-white/20 text-white hover:text-emerald-300 transition-all duration-300 shadow-lg"
          aria-label="Back to home"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium hidden sm:block">Home</span>
        </motion.button>

        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Welcome Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-8"
          >
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl lg:text-6xl font-bold leading-tight"
              >
                Join Our Sacred
                <span className="block text-emerald-400">Community</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl text-slate-300 leading-relaxed"
              >
                Begin your spiritual journey with SufiPulse. Share your divine poetry, connect with global voices, and
                experience world-class production.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20"
            >
              <p className="text-emerald-300 font-medium mb-2">Sacred Commitment</p>
              <blockquote className="text-lg italic">"We don't sell divine lyrics. We amplify them."</blockquote>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20"
                  >
                    <Icon className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-sm text-slate-300">{stat.label}</div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Right Side - Register Form */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <FormCard title="Create Account" subtitle="Join our global spiritual community" className="max-w-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">I want to join as a:</label>

                  <div className="flex flex-col md:flex-row bg-slate-100 rounded-lg p-1 gap-4">
                    {userTypes.map((type) => {
                      const Icon = type.icon
                      return (
                        <motion.button
                          key={type.id}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFormData((prev) => ({ ...prev, userType: type.id }))}
                          className={`
                            flex-1 p-3 rounded-md text-sm font-medium transition-all duration-200
                            ${formData.userType === type.id
                              ? "bg-emerald-700 text-white shadow-sm border"
                              : "text-slate-600 hover:text-emerald-600"
                            }
                          `}
                        >
                          <div className="flex items-center justify-center space-x-2">
                            <Icon className="w-4 h-4" />
                            <span>{type.label}</span>
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>
                </div>

                <Input
                  label="Full Name"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  icon={<User className="w-5 h-5" />}
                  error={errors.fullName}
                  required
                />

                <Input
                  label="Country"
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Enter your country"
                  icon={<Globe className="w-5 h-5" />}
                  error={errors.country}
                  required
                />

                <Input
                  label="City"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter your city"
                  icon={<Globe className="w-5 h-5" />}
                  error={errors.city}
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  icon={<Mail className="w-5 h-5" />}
                  error={errors.email}
                  required
                />

                <div>
                  <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a strong password"
                    icon={<Lock className="w-5 h-5" />}
                    showPasswordToggle
                    onTogglePassword={() => setShowPassword(!showPassword)}
                    showPassword={showPassword}
                    error={errors.password}
                    required
                  />
                  <PasswordStrength password={formData.password} className="mt-3" />
                </div>

                <Input
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  icon={<Lock className="w-5 h-5" />}
                  showPasswordToggle
                  onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                  showPassword={showConfirmPassword}
                  error={errors.confirmPassword}
                  required
                />

                
                <Button
                  disabled={formData.userType === ""}
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={loading}
                  className="w-full"
                >
                  Create Account
                </Button>
                {formData.userType !== "" && (
                  <GoogleLogin
                    width="100%"
                    onSuccess={async (credentialResponse) => {
                      setLoading(true)
                      try {
                        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/google-auth`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            token: credentialResponse.credential,
                            role: formData.userType,
                          }),
                        })
                        const data = await res.json()
                        console.log(data)
                        Cookies.set("access_token", data.access_token, {
                          path: "/",
                          sameSite: "Strict",
                          secure: process.env.NODE_ENV === "production",
                        })
                        Cookies.set("refresh_token", data.refresh_token, {
                          path: "/",
                          sameSite: "Strict",
                          secure: process.env.NODE_ENV === "production",
                        })
                        Cookies.set("user_role", data.user.role)
                        Cookies.set("user_id", data.user.id.toString())
                        Cookies.set("is_registered", data.user.is_registered.toString())
                        Cookies.set("city", data.user.city)
                        Cookies.set("country", data.user.country)
                        Cookies.set("name", data.user.name)
                        Cookies.set("email", data.user.email)
                        Cookies.set("info_submitted",data.info_submitted)

                        router.push("/")

                        console.log(data)
                      } catch (error) {
                        console.log(error)
                        showToast("Google login failed. Please try again.")
                        console.error("Login failed:", error)
                      } finally {
                        setLoading(false)
                      }
                    }}
                    text="signup_with"
                  />
                )}

                <div className="text-center pt-4 border-t border-slate-200">
                  <p className="text-slate-600">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </form>
            </FormCard>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Register
