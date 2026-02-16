'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, RefreshCw } from 'lucide-react'
import Button from '../ui/Button'
import FormCard from '../ui/FormCard'
import { useRouter } from 'next/navigation'
import { verifyOtp, resendOtp } from '@/services/auth'
import Cookies from 'js-cookie'
import { useToast } from '@/context/ToastContext'
interface OTPVerificationProps {
  email: string
  onVerified: () => void
  onBack: () => void
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ email, onVerified, onBack }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()
  const { showToast } = useToast()
  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus()
  }, [])

  useEffect(() => {
    // Countdown timer for resend
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return // Prevent multiple characters

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all fields are filled
    if (newOtp.every(digit => digit !== '') && value) {
      handleVerifyOTP(newOtp.join(''))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    const newOtp = [...otp]

    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i]
    }

    setOtp(newOtp)

    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex(digit => digit === '')
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex
    inputRefs.current[focusIndex]?.focus()

    // Auto-submit if all fields are filled
    if (newOtp.every(digit => digit !== '')) {
      handleVerifyOTP(newOtp.join(''))
    }
  }

  const handleVerifyOTP = async (otpCode?: string) => {
    const code = otpCode || otp.join('')

    if (code.length !== 6) {
      showToast('Please enter the complete 6-digit code')
      return
    }


    setLoading(true)

    try {
      const response = await verifyOtp(email, code)
      console.log(response)
      if (response.data) {
        const data = response.data;
        console.log(data)
        console.log("User data:", response.data);

        Cookies.set("access_token", data.access_token, {
          path: "/",
          sameSite: "Strict",
          secure: process.env.NODE_ENV === "production",
        });
        Cookies.set("refresh_token", data.refresh_token, {
          path: "/",
          sameSite: "Strict",
          secure: process.env.NODE_ENV === "production",
        });
        Cookies.set("user_role", data.user.role);
        Cookies.set("user_id", data.user.id.toString());
        Cookies.set("is_registered", data.user.is_registered.toString());
        Cookies.set("city", data.user.city);
        Cookies.set("country", data.user.country);
        Cookies.set("name", data.user.name);
        Cookies.set("email", data.user.email);
        Cookies.set("info_submitted", data.info_submitted)
        Cookies.set("permissions", JSON.stringify(data.user.permissions))

        // Redirect based on user role
        const userRole = data.user.role;
        if (userRole === 'blogger') {
          if (data.info_submitted) {
            router.push("/blogger/dashboard"); // Go to dashboard if profile is complete
          } else {
            router.push("/blogger/profile"); // Go to profile to complete registration
          }
        } else if (userRole === 'writer') {
          if (data.info_submitted) {
            router.push("/writer/dashboard"); // Go to dashboard if profile is complete
          } else {
            router.push("/writer/profile"); // Go to profile to complete registration
          }
        } else if (userRole === 'vocalist') {
          if (data.info_submitted) {
            router.push("/vocalist/dashboard"); // Go to dashboard if profile is complete
          } else {
            router.push("/vocalist/profile"); // Go to profile to complete registration
          }
        } else {
          // Default fallback
          router.push("/");
        }
      }


    } catch (error: any) {
      showToast(error.response?.data?.detail || 'Invalid OTP. Please try again.')
      setOtp(['', '', '', '', '', '']) // Clear OTP on error
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    if (timeLeft > 0) return

    setResending(true)

    try {
      await resendOtp(email)
      showToast('OTP resent successfully!')
      setTimeLeft(60) // Reset timer
    } catch (error: any) {
      console.log(error)
      showToast(error.response?.data?.detail || 'Failed to resend OTP. Please try again.')
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <FormCard
            title="Verify Your Email"
            subtitle={`We've sent a 6-digit code to ${email}`}
            className="text-center"
          >
            <div className="space-y-6">
              {/* Email Icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Mail className="w-8 h-8 text-emerald-600" />
                </div>
              </div>

              {/* OTP Input */}
              <div className="space-y-4">
                <div className="flex justify-center space-x-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={el => { inputRefs.current[index] = el }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleInputChange(index, e.target.value)}
                      onKeyDown={e => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className="w-7 h-7 md:w-12 md:h-12 text-center text-xl font-semibold border-2 border-slate-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-colors"
                      disabled={loading}
                    />
                  ))}
                </div>

                <p className="text-sm text-slate-600">
                  Enter the 6-digit code sent to your email
                </p>
              </div>

              {/* Verify Button */}
              <Button
                onClick={() => handleVerifyOTP()}
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full"
                disabled={otp.some(digit => digit === '')}
              >
                Verify Email
              </Button>

              {/* Resend Code */}
              <div className="space-y-3">
                <p className="text-sm text-slate-600">
                  Didn't receive the code?
                </p>

                <Button
                  onClick={handleResendOTP}
                  variant="outline"
                  size="sm"
                  loading={resending}
                  disabled={timeLeft > 0}
                  className="w-full"
                >
                  {timeLeft > 0 ? (
                    `Resend in ${timeLeft}s`
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Resend Code
                    </>
                  )}
                </Button>
              </div>

              {/* Back Button */}
              <button
                onClick={onBack}
                className="flex items-center justify-center space-x-2 text-sm text-slate-600 hover:text-slate-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to registration</span>
              </button>
            </div>
          </FormCard>
        </motion.div>
      </div>
    </div>
  )
}

export default OTPVerification