'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  User,
  Globe,
  BookOpen,
  Calendar,
  MapPin,
  ExternalLink,
  Edit,
  PenTool,
  Award,
  Clock,
} from 'lucide-react';
import { getBloggerProfile } from '@/services/blogger';
import Cookies from 'js-cookie';

interface BloggerProfileData {
  id: number;
  user_id: number;
  author_name: string;
  author_image_url: string | null;
  short_bio: string;
  location: string;
  website_url: string;
  social_links: Record<string, string>;
  publish_pseudonym: boolean;
  original_work_confirmation: boolean;
  publishing_rights_granted: boolean;
  discourse_policy_agreed: boolean;
  created_at: string;
  updated_at: string;
  country: string;
  city: string;
}

interface BloggerProfileDisplayProps {
  onEditClick?: () => void;
}

const BloggerProfileDisplay = ({ onEditClick }: BloggerProfileDisplayProps) => {
  const [profile, setProfile] = useState<BloggerProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // Get user ID from cookies
        const userId = parseInt(Cookies.get('user_id') || '0');
        if (userId) {
          const response = await getBloggerProfile(userId);
          setProfile(response.data);
        } else {
          setError("User not authenticated");
        }
      } catch (err: any) {
        console.error("Error fetching blogger profile:", err);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-emerald-900 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-800 text-sm font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
        <div className="bg-white shadow-xl rounded-2xl p-6 text-center max-w-md w-full">
          <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-6 h-6 text-emerald-900" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Profile Not Found</h2>
          <p className="text-slate-800 text-sm">{error || "Unable to load profile data"}</p>
          <Link href="/blogger/profile" className="mt-3 inline-block px-4 py-2 bg-emerald-900 text-white rounded-lg hover:bg-emerald-800 transition-colors">
            Complete Profile
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <div className="relative h-40 sm:h-56 bg-gradient-to-r from-emerald-900 to-emerald-500">
        <button
          onClick={onEditClick}
          className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-sm transition"
        >
          <Edit className="w-4 h-4" />
          <span>Edit</span>
        </button>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto px-4 -mt-16 sm:-mt-20"
      >
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 relative">
          {/* Avatar + Header */}
          <div className="flex flex-col items-center text-center -mt-12">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-emerald-900 to-emerald-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg border-4 border-white">
              <User />
            </div>
            <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900">{profile.author_name || 'Blogger Profile'}</h1>

            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-3">
              <span className="px-2.5 py-1 rounded-full text-xs sm:text-sm font-medium bg-emerald-50 text-emerald-900 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {profile.city}, {profile.country}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs sm:text-sm font-medium bg-emerald-50 text-emerald-900 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Joined {formatDate(profile.created_at)}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs sm:text-sm font-medium bg-emerald-50 text-emerald-900 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Updated {formatDate(profile.updated_at)}
              </span>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* LEFT COLUMN */}
            <div className="space-y-8">
              {/* Bio */}
              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-900" /> About Me
                </h2>
                <p className="text-slate-800 text-sm sm:text-base leading-relaxed break-words">
                  {profile.short_bio || 'No bio provided yet.'}
                </p>
              </section>

              {/* Location */}
              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-900" /> Location
                </h2>
                <p className="text-slate-800 text-sm sm:text-base break-words">
                  {profile.location || 'Location not specified.'}
                </p>
              </section>

              {/* Pseudonym */}
              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-900" /> Publishing Identity
                </h2>
                <p className="text-slate-800 text-sm sm:text-base break-words">
                  {profile.publish_pseudonym ? "Publishing under pseudonym" : "Publishing under real name"}
                </p>
              </section>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-8">
              {/* Website */}
              {profile.website_url && (
                <section>
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                    <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-900" /> Website
                  </h2>
                  <a
                    href={profile.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-sm font-medium transition"
                  >
                    <span>Visit Website</span>
                    <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                </section>
              )}

              {/* Social Links */}
              {Object.keys(profile.social_links).some(key => profile.social_links[key]) && (
                <section>
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-900" /> Social Links
                  </h2>
                  <div className="space-y-2">
                    {Object.entries(profile.social_links).map(([platform, url], idx) => (
                      url && (
                        <a
                          key={idx}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 hover:bg-emerald-50 text-slate-800 text-xs sm:text-sm font-medium transition"
                        >
                          <span>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )
                    ))}
                  </div>
                </section>
              )}

              {/* Agreements */}
              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900 flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-900" /> Agreements
                </h2>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={profile.original_work_confirmation}
                      readOnly
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                    <span className="text-xs sm:text-sm text-slate-800">Original work confirmed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={profile.publishing_rights_granted}
                      readOnly
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                    <span className="text-xs sm:text-sm text-slate-800">Publishing rights granted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={profile.discourse_policy_agreed}
                      readOnly
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                    <span className="text-xs sm:text-sm text-slate-800">Discourse policy agreed</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BloggerProfileDisplay;