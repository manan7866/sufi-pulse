"use client"

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Users, Heart, Globe, Award, Key, ArrowLeft } from "lucide-react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import FormCard from "../ui/FormCard";
import { login, forgotPassword, resetPassword } from "@/services/auth";
import Cookies from "js-cookie";
import { GoogleLogin } from "@react-oauth/google";
import { useToast } from "@/context/ToastContext";
import { incrementMonthly,incrementWeekly } from "@/lib/increment";

const Login = () => {
  const { showToast } = useToast()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };


  const handleForgotPasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForgotPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateLoginForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForgotPasswordForm = () => {
    const newErrors: Record<string, string> = {};

    if (!forgotPasswordData.email) {
      newChanges.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(forgotPasswordData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateResetPasswordForm = () => {
    const newErrors: Record<string, string> = {};

    if (!forgotPasswordData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(forgotPasswordData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!forgotPasswordData.otp) {
      newErrors.otp = "OTP is required";
    }

    if (!forgotPasswordData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (forgotPasswordData.newPassword.length < 6) {
      newErrors.newPassword = "New password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateLoginForm()) {
      showToast("Please fix the errors below");
      return;
    }

    setLoading(true);

    try {
      const response = await login(formData.email, formData.password);

      if (response.data) {
        const data = response.data;
        

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
        Cookies.set("info_submitted",data.info_submitted)
        Cookies.set("permissions",JSON.stringify(data.user.permissions))

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
      if (error.response.data.detail) {
        console.log(error)
        showToast(error.response.data.detail);
      } else {
        showToast("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForgotPasswordForm()) {
      return;
    }

    setLoading(true);

    try {
      await forgotPassword(forgotPasswordData.email);
      showToast("OTP sent to your email!");
      setShowForgotPassword(false);
      setShowResetPassword(true);
    } catch (error: any) {
      if (error.response?.data?.detail) {
        showToast(error.response.data.message);
      } else {
        showToast("Failed to send OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateResetPasswordForm()) {
      showToast("Please fix the errors below");
      return;
    }

    setLoading(true);

    try {
      await resetPassword(forgotPasswordData.email, forgotPasswordData.otp, forgotPasswordData.newPassword);
      showToast("Password reset successfully! Please log in.");
      setShowResetPassword(false);
      setForgotPasswordData({ email: "", otp: "", newPassword: "" });
    } catch (error: any) {
      if (error.response?.data?.detail) {
        showToast(error.response.data.message);
      } else {
        showToast("Failed to reset password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  const stats = [
    { number: `${incrementWeekly(89)}`, label: "Active Writers", icon: Users },
    { number: `${incrementWeekly(43)}`, label: "Vocalists", icon: Heart },
    { number: `${incrementMonthly(43,200)}+`, label: "Countries", icon: Globe },
    { number: `${incrementWeekly(300)}+`, label: "Collaborations", icon: Award },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20" />
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 right-10 w-48 h-48 bg-slate-500/10 rounded-full blur-xl"
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
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium hidden sm:block">Home</span>
        </motion.button>

        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                Welcome Back to
                <span className="block text-emerald-400">SufiPulse</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl text-slate-300 leading-relaxed"
              >
                Continue your sacred journey. Access your dashboard, track your
                submissions, and connect with our global spiritual community.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20"
            >
              <p className="text-emerald-300 font-medium mb-2">
                Sacred Community Access
              </p>
              <blockquote className="text-lg italic">
                "Your spiritual journey continues where you left off"
              </blockquote>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20"
                  >
                    <Icon className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-slate-300">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {!showForgotPassword && !showResetPassword ? (
              <FormCard
                title="Sign In"
                subtitle="Access your sacred creative space"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    icon={<Mail className="w-5 h-5" />}
                    error={errors.email}
                    required
                  />

                  <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    icon={<Lock className="w-5 h-5" />}
                    showPasswordToggle
                    onTogglePassword={() => setShowPassword(!showPassword)}
                    showPassword={showPassword}
                    error={errors.password}
                    required
                  />

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    loading={loading}
                    className="w-full"
                  >
                    Sign In to SufiPulse
                  </Button>

                  <div className="w-full">
                    <GoogleLogin
                      width="100%"
                      onSuccess={async (credentialResponse) => {
                        setLoading(true);
                        try {
                          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/google-auth`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              token: credentialResponse.credential,
                            }),
                          });

                          const data = await res.json();
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
                          Cookies.set("info_submitted",data.info_submitted)
                          Cookies.set("email", data.user.email);

                          router.push("/");
                          console.log(data);
                        } catch (error: any) {
                          console.log(error.message)
                          if (error.message === "Cannot read properties of undefined (reading 'role')") {
                            showToast("Please Signup with google first then try to login.");
                          } else {
                            showToast("Google login failed. Please try again.");
                          }
                        } finally {
                          setLoading(false);
                        }
                      }}
                    />
                  </div>

                  <div className="text-center pt-4 border-t border-slate-200">
                    <p className="text-slate-600">
                      Don't have an account?{" "}
                      <Link
                        href="/register"
                        className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                      >
                        Create one here
                      </Link>
                    </p>
                  </div>
                </form>
              </FormCard>
            ) : showForgotPassword ? (
              <FormCard
                title="Forgot Password"
                subtitle="Enter your email to receive a reset OTP"
              >
                <form onSubmit={handleForgotPasswordSubmit} className="space-y-6">
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={forgotPasswordData.email}
                    onChange={handleForgotPasswordInputChange}
                    placeholder="your.email@example.com"
                    icon={<Mail className="w-5 h-5" />}
                    error={errors.email}
                    required
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={loading}
                    className="w-full"
                  >
                    Send OTP
                  </Button>

                  <div className="text-center pt-4">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(false)}
                      className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                    >
                      Back to Sign In
                    </button>
                  </div>
                </form>
              </FormCard>
            ) : (
              <FormCard
                title="Reset Password"
                subtitle="Enter the OTP and your new password"
              >
                <form onSubmit={handleResetPasswordSubmit} className="space-y-6">
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={forgotPasswordData.email}
                    onChange={handleForgotPasswordInputChange}
                    placeholder="your.email@example.com"
                    icon={<Mail className="w-5 h-5" />}
                    error={errors.email}
                    required
                  />

                  <Input
                    label="OTP"
                    type="text"
                    name="otp"
                    value={forgotPasswordData.otp}
                    onChange={handleForgotPasswordInputChange}
                    placeholder="Enter the OTP"
                    icon={<Key className="w-5 h-5" />}
                    error={errors.otp}
                    required
                  />

                  <Input
                    label="New Password"
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    value={forgotPasswordData.newPassword}
                    onChange={handleForgotPasswordInputChange}
                    placeholder="Enter your new password"
                    icon={<Lock className="w-5 h-5" />}
                    showPasswordToggle
                    onTogglePassword={() => setShowPassword(!showPassword)}
                    showPassword={showPassword}
                    error={errors.newPassword}
                    required
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    loading={loading}
                    className="w-full"
                  >
                    Reset Password
                  </Button>

                  <div className="text-center pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowResetPassword(false);
                        setShowForgotPassword(false);
                      }}
                      className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                    >
                      Back to Sign In
                    </button>
                  </div>
                </form>
              </FormCard>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;