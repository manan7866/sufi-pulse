"use client";

import { useState } from "react";
import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutDashboard, Mic, PenTool, BookText, Building, Wifi, User2, LogOut, Handshake, Bell, Trophy, FileText } from "lucide-react";
import { BiLogIn } from "react-icons/bi";
import Cookies from "js-cookie";

interface AdminLayoutProps {
  children: React.ReactNode;
}


const menuItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard, permissionKey: "dashboard" },
  { name: "Writers", href: "/admin/writers", icon: PenTool, permissionKey: "writer" },
  { name: "Kalams", href: "/admin/kalams", icon: BookText, permissionKey: "kalams" },
  { name: "Vocalists", href: "/admin/vocalists", icon: Mic, permissionKey: "vocalist" },
  { name: "Studio Requests", href: "/admin/recording-requests/studio", icon: Building, permissionKey: "requests" },
  { name: "Remote Requests", href: "/admin/recording-requests/remote", icon: Wifi, permissionKey: "requests" },
  { name: "Bloggers", href: "/admin/bloggers", icon: PenTool, permissionKey: "blogger" },
  { name: "Blogs", href: "/admin/blogs", icon: BiLogIn, permissionKey: "blog" },
  { name: "Partnership", href: "/admin/partnership", icon: Handshake, permissionKey: "partnership_proposal" },
  { name: "Special Recognition", href: "/admin/special", icon: Trophy, permissionKey: "recognitions" },
  { name: "Notification", href: "/admin/notifications", icon: Bell, permissionKey: "notification" },
  { name: "Sub Admins", href: "/admin/other-admins", icon: User2, permissionKey: "sub_admins" },
  { name: "CMS Pages", href: "/admin/cms", icon: FileText, permissionKey: "cms" },


];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const permissions = JSON.parse(Cookies.get("permissions") || "{}") as Record<string, string[]>;
  const user_role = Cookies.get("user_role");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const currentPage = menuItems.find((item) => pathname === item.href);

  function handleLogout() {
    Cookies.remove("access_token", { path: "/" })
    Cookies.remove("refresh_token", { path: "/" })
    Cookies.remove("user_role", { path: "/" })
    Cookies.remove("user_id", { path: "/" })
    Cookies.remove("is_registered", { path: "/" })
    Cookies.remove("city", { path: "/" })
    Cookies.remove("country", { path: "/" })
    Cookies.remove("name", { path: "/" })
    Cookies.remove("email", { path: "/" })
    Cookies.remove("permissions", { path: "/" })

    window.location.href = "/aLogin";
  }

  // Filter menu items based on user_role and permissions
  const filteredMenuItems = user_role === "admin"
    ? menuItems
    : menuItems.filter((item) => {
      const permission = permissions[item.permissionKey];
      return permission && permission.includes("view");
    });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-3/4 sm:w-64 max-w-xs bg-slate-900 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:w-64 lg:max-w-none`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 bg-slate-800 border-b border-slate-700">
            <Link href="/admin">
              <h1 className="text-lg sm:text-xl font-bold text-emerald-50 hover:text-emerald-400 transition-colors duration-200 cursor-pointer">
                Admin Dashboard
              </h1>
            </Link>
          </div>
          {/* Nav */}
          <nav className="flex-1 p-4 sm:p-6 space-y-2">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 sm:px-4 sm:py-3 rounded-lg transition-colors text-sm sm:text-base ${isActive ? "bg-emerald-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 sm:p-6 border-t border-slate-800">
            <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-3 py-2 sm:px-4 sm:py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors text-sm sm:text-base">
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div>
        <header className="bg-white shadow-sm border-b border-slate-200 px-4 sm:px-6 py-4 lg:ml-64">
          <div className="flex items-center justify-between">
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
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">
                  {currentPage?.name || "Dashboard"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  {currentPage?.name
                    ? `Manage ${currentPage.name.toLowerCase()}`
                    : "Overview of platform activity"}
                </p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                <User2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-sm sm:text-base font-medium text-gray-800">
                Admin
              </span>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 lg:ml-64">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;