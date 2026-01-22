"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { login } from "@/services/auth"; // Adjust path to your auth service
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";

interface LoginData {
  email: string;
  password: string;
}

export default function AdminLoginPage() {
  const [formData, setFormData] = useState<LoginData>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        Cookies.set("permissions", JSON.stringify(data.user.permissions));

        router.push("/admin");
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
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-slate-900 p-4 sm:p-6 md:p-8">
      {/* Background Effects */}
      <style>
        {`
      input {
        color: black;
      }
      input::placeholder {
        color: gray;
      }
    `}
      </style>
      {/* Login Card */}
      <div className="relative z-10 w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl sm:max-w-md sm:p-8 md:p-10">
        <div className="text-center">
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-emerald-900 sm:text-xl md:text-2xl lg:text-3xl">
            Admin Login
          </h1>
          <p className="mb-6 text-base text-slate-800 sm:mb-8 sm:text-lg">
            Sign in to your admin account to manage the system.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-800">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="admin@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-xl border border-slate-50 bg-white p-3 text-slate-900 placeholder-slate-50 transition-all duration-300 focus:border-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-900"
              required
            />
          </div>

          {/* Password with Eye Icon */}
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-800">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full rounded-xl border border-slate-50 bg-white p-3 pr-12 text-slate-900 placeholder-slate-50 transition-all duration-300 focus:border-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-900"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-slate-800 hover:text-emerald-900 focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex items-center justify-between">
            <Link href="/forgot-password" className="text-sm font-medium text-emerald-900 hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl bg-emerald-900 p-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-900 focus:ring-offset-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}