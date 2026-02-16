// components/LayoutWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "../Navbar";
import Footer from "../Footer";
import VocalistLayout from "./VocalistLayout";
import WriterDashboardLayout from "./WriterDashboard";
import AdminLayout from "./AdminLayout";
import BloggerDashboardLayout from "./BloggerDashboard";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (
    pathname?.startsWith("/vocalist") &&
    pathname !== "/vocalist-how-it-works" &&
    pathname !== "/vocalists"
  ) {
    return <VocalistLayout>{children}</VocalistLayout>;
  }
  if (pathname?.startsWith("/writer") && pathname !== "/writer-faqs") {
    return <WriterDashboardLayout>{children}</WriterDashboardLayout>;
  }
  if (pathname?.startsWith("/blogger") && pathname !== "/blogger-how-it-works") {
    return <BloggerDashboardLayout>{children}</BloggerDashboardLayout>;
  }

  if (pathname?.startsWith("/admin")) {
    return <AdminLayout>{children}</AdminLayout>
  }
  if (pathname?.startsWith("/aLogin") || pathname?.startsWith("/login") || pathname?.startsWith("/register") || pathname?.startsWith("/forgotpass")) {
    return (<>
      {children}</>
    )
  }

  const showNavbarFooter = !pathname?.includes("dashboard");

  return (
    <>
      {showNavbarFooter && <Navbar />}
      {children}
      {showNavbarFooter && <Footer />}
    </>
  );
}
