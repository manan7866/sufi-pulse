'use client'
import { useState, useEffect } from "react";
import { User, Globe, Award, MapPin, Mic, Clock, Calendar, Edit } from "lucide-react";
import Link from "next/link";
import { getVocalistProfile } from "@/services/vocalist";

interface VocalistProfileData {
  vocalist_id: string;
  user_id: number;
  vocal_range: string;
  languages: string[];
  sample_title: string;
  audio_sample_url: string;
  sample_description: string;
  experience_background: string;
  portfolio: string;
  availability: string;
  status: string;
  created_at: string;
  updated_at: string;
  country: string;
  city: string;
}

const VocalistProfile = () => {
  const [profileData, setProfileData] = useState<VocalistProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await getVocalistProfile(2);
      console.log("✅ Profile API Response:", response.data);
      setProfileData(response.data);
    } catch (error: any) {
      console.error("❌ Profile API Error:", error);
      setError(error.response?.data?.detail || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex flex-col items-center">
          <div className="w-10 sm:w-12 h-10 sm:h-12 border-4 border-emerald-900 border-t-transparent rounded-full animate-spin mb-3 sm:mb-4"></div>
          <p className="text-sm sm:text-base text-slate-800 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 text-center max-w-md sm:max-w-lg">
          <div className="w-12 sm:w-16 h-12 sm:h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <User className="w-6 sm:w-8 h-6 sm:h-8 text-emerald-900" />
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 mb-2">Profile Not Found</h2>
          <p className="text-sm sm:text-base text-slate-800">{error}</p>
          <button
            onClick={fetchProfile}
            className="mt-3 sm:mt-4 px-4 sm:px-6 py-2 sm:py-3 bg-emerald-900 text-white rounded-lg hover:bg-emerald-900/80 transition-all duration-300 ease-in-out transform hover:scale-105 text-sm sm:text-base"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 bg-gradient-to-r from-emerald-900 to-emerald-500">
        <Link
          href={`/vocalist/${profileData?.vocalist_id}/EditVocalistProfile`}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition text-sm sm:text-base"
        >
          <Edit className="w-3 sm:w-4 h-3 sm:h-4" />
          <span>Edit</span>
        </Link>
      </div>

      {/* Profile Card */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20">
        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 relative">
          {/* Avatar + Header */}
          <div className="flex flex-col items-center text-center -mt-12 sm:-mt-16">
            <div className="w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 rounded-full bg-gradient-to-br from-emerald-900 to-emerald-500 flex items-center justify-center text-3xl sm:text-4xl font-bold text-white shadow-lg border-4 border-white">
              <User />
            </div>
            <h1 className="mt-3 sm:mt-4 text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">Vocalist Profile</h1>
           
            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-3 sm:mt-4">
              <span className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-emerald-50 text-emerald-900 flex items-center gap-1 sm:gap-2">
                <MapPin className="w-3 sm:w-4 h-3 sm:h-4" /> {profileData?.city}, {profileData?.country}
              </span>
              <span className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-emerald-50 text-emerald-900 flex items-center gap-1 sm:gap-2">
                <Calendar className="w-3 sm:w-4 h-3 sm:h-4" /> Joined {new Date(profileData?.created_at || "").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
              <span className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-emerald-50 text-emerald-900 flex items-center gap-1 sm:gap-2">
                <Clock className="w-3 sm:w-4 h-3 sm:h-4" /> Updated {new Date(profileData?.updated_at || "").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 md:gap-10">
            {/* LEFT COLUMN */}
            <div className="space-y-8 sm:space-y-10">
              {/* Audio Sample */}
              {profileData?.audio_sample_url && (
                <section>
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900 flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                    <Mic className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-900" /> Featured Sample
                  </h2>
                  <div className="bg-slate-50 rounded-xl p-4 sm:p-5 hover:bg-emerald-50 transition">
                    <h3 className="text-base sm:text-lg font-bold text-slate-800">{profileData.sample_title}</h3>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed line-clamp-3">{profileData.sample_description}</p>
                    <audio
                      controls
                      className="w-full rounded-lg bg-emerald-50 p-2 mt-2 sm:mt-3"
                      style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
                    >
                      <source src={profileData.audio_sample_url} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </section>
              )}

              {/* Experience */}
              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900 flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                  <Award className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-900" /> Experience & Background
                </h2>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">{profileData?.experience_background}</p>
              </section>

              {/* Availability */}
              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900 flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                  <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-900" /> Availability
                </h2>
                <p className="text-xs sm:text-sm text-slate-800">{profileData?.availability}</p>
              </section>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-8 sm:space-y-10">
              {/* Portfolio */}
              {profileData?.portfolio && (
                <section>
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-900 flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                    <Globe className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-900" /> Portfolio
                  </h2>
                  <a
                    href={profileData.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 sm:gap-2 px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-medium transition text-xs sm:text-sm"
                  >
                    <span>View Portfolio</span>
                    <Globe className="w-3 sm:w-4 h-3 sm:h-4" />
                  </a>
                </section>
              )}

              {/* Vocal Range */}
              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900 flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                  <Mic className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-900" /> Vocal Range
                </h2>
                <span className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-emerald-50 text-emerald-900 hover:bg-emerald-100 transition">
                  {profileData?.vocal_range}
                </span>
              </section>

              {/* Languages */}
              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900 flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                  <Globe className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-900" /> Languages
                </h2>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {profileData?.languages.map((lang, idx) => (
                    <span
                      key={idx}
                      className="px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-slate-50 text-slate-800 hover:bg-emerald-50 transition"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocalistProfile;