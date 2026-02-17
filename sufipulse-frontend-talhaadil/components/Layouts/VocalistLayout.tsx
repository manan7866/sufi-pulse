"use client";

import { useState, useEffect } from "react";
import type React from "react";
import { User, Music, Menu, X, LogOut, User2, ArrowLeft, Bell, Mail, Mic, Wifi } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { checkVocalistRegistration } from "@/services/vocalist";
import SubmitSampleClip from "../pages/SubmitSampleClip";
import { useAuth } from "@/context/AuthContext";
import Cookies from "js-cookie";
import NotificationDropdown from "./NotficationDropdown";
import { BiLogIn } from "react-icons/bi";
import path from "path";

interface VocalistLayoutProps {
  children: React.ReactNode;
}

const VocalistLayout: React.FC<VocalistLayoutProps> = ({ children }) => {
  const info_submitted = Cookies.get("info_submitted");
  console.log(info_submitted)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const pathname = usePathname();
  const auth = useAuth();
  const logout = auth?.logout ?? (() => {});

  const [name, setName] = useState("");

  useEffect(() => {
    const profile = Cookies.get("name");
    setName(profile ?? "");
  }, []);

  useEffect(() => {
    const fetchRegistrationStatus = async () => {
      try {
        const response = await checkVocalistRegistration();
        setIsRegistered(response.data.is_registered);
      } catch (error) {
        console.error("Failed to check vocalist registration:", error);
        setIsRegistered(false);
      }
    };
    fetchRegistrationStatus();
  }, []);

  const navigation = [
    {
      name: "Profile",
      href: "/vocalist/profile",
      icon: User,
      current: pathname === "/vocalist/profile",
    },
    {
      name: "Kalam",
      href: "/vocalist/kalam",
      icon: Music,
      current: pathname === "/vocalist/kalam",
    },
    {
      name: "Studio Recording",
      href: "/vocalist/recording-requests/studio",
      icon: Mic,
      current: pathname === "/vocalist/recording-requests/studio",
    },
    {
      name: "Remote Recording",
      href: "/vocalist/recording-requests/remote",
      icon: Wifi,
      current: pathname === "/vocalist/recording-requests/remote",
    },
    {
      name: "Blog",
      href: "/vocalist/blog",
      icon: BiLogIn,
      current: pathname === "/vocalist/blog",
    },
    {
      name: "Notifications",
      href:"/vocalist/notification",
      icon : Bell,
      current: pathname === "/vocalist/notification",
    }
  ];

  // Loader component
  if (isRegistered === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-medium">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (info_submitted === "false") return <SubmitSampleClip />;

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
                <Music className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-base sm:text-lg">
                  Vocalist
                </h1>
                <p className="text-slate-400 text-xs sm:text-sm">Dashboard</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 sm:p-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 sm:px-4 sm:py-3 rounded-lg transition-colors text-sm sm:text-base ${
                    item.current
                      ? "bg-emerald-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 sm:p-6 border-t border-slate-800">
            <a
              href="mailto:vocalist@sufipulse.com"
              className="w-full flex items-center space-x-3 px-3 py-2 sm:px-4 sm:py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors text-sm sm:text-base mb-2"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Send Email</span>
            </a>
            <button
              onClick={logout}
              className="w-full flex items-center space-x-3 px-3 py-2 sm:px-4 sm:py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors text-sm sm:text-base"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
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
            {/* Left section: Sidebar toggle + Back button + Heading */}
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

              {/* Back button + heading */}
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
                  {pathname === "/vocalist/profile" ? "Profile" : 
                   pathname === "/vocalist/recording-requests/studio" ? "Studio Recording Request" :
                   pathname === "/vocalist/recording-requests/remote" ? "Remote Recording Request" :
                   "Kalam Management"}
                </h2>
                <p className="hidden sm:flex text-xs sm:text-sm text-slate-600">
                  {pathname === "/vocalist/profile"
                    ? "View your vocalist profile and kalams"
                    : pathname === "/vocalist/recording-requests/studio"
                    ? "Request in-person studio sessions for approved lyrics"
                    : pathname === "/vocalist/recording-requests/remote"
                    ? "Request remote production for approved lyrics"
                    : "Manage kalam approvals and recording requests"}
                </p>
              </div>
            </div>

            </div>

            {/* Right section: Notifications + User info */}
            <div className="flex items-center space-x-3">
              {!pathname.includes("/notification") && <NotificationDropdown />}

              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                <User2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="hidden lg:flex text-sm sm:text-base font-medium text-gray-800">
                {name}
              </span>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 lg:ml-64">{children}</main>
      </div>
    </div>
  );
};

export default VocalistLayout;