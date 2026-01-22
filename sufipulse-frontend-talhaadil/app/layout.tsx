import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/Layouts/LayoutWrapper";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/context/AuthContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { ToastProvider } from "@/context/ToastContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SufiPulse | Soulful Kalams & Spiritual Poetry",
  description:
    "SufiPulse is your gateway to soulful Kalams, Qawwalis, and timeless Sufi poetry. Discover mystical words, spiritual devotion, and divine inspiration.",
  icons : {
    icon : "/Untitled (250 x 250 px) (1).png",
  }
  
  }
  
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ToastProvider>
          <NotificationProvider>
            <AuthProvider>
              <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
                <LayoutWrapper>
                  {children}
                </LayoutWrapper>
              </GoogleOAuthProvider>
            </AuthProvider>
          </NotificationProvider>
        </ToastProvider>
      </body>
    </html>
  );
}