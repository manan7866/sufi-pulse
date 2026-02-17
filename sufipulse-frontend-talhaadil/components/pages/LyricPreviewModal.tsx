'use client';

import React from 'react';
import { X, User, MapPin, Calendar, Share2, Facebook, MessageCircle, Music, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LyricPreviewModalProps {
  lyric: {
    id: number;
    title: string;
    language: string;
    category: string;
    writer_name: string;
    kalam_text: string;
    description: string;
    posted_by?: string;
    location?: string;
    posted_date?: string;
    youtube_link?: string | null;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const LyricPreviewModal: React.FC<LyricPreviewModalProps> = ({ lyric, isOpen, onClose }) => {
  if (!lyric || !isOpen) return null;

  const handleShareFacebook = () => {
    const url = encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '');
    const quote = encodeURIComponent(`Check out this beautiful lyric: "${lyric.title}" by ${lyric.writer_name}`);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`, '_blank', 'width=600,height=400');
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Check out this beautiful lyric: "${lyric.title}" by ${lyric.writer_name}\n\n${lyric.description}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-slate-800 rounded-t-3xl px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Lyric Preview</h2>
                    <p className="text-emerald-200 text-xs">Read-only mode</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Title Section */}
                <div className="text-center pb-6 border-b border-slate-200">
                  <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
                    {lyric.title}
                  </h1>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                      {lyric.language}
                    </span>
                    <span className="px-4 py-1.5 bg-slate-100 text-slate-700 rounded-full text-sm font-semibold">
                      {lyric.category}
                    </span>
                  </div>
                </div>

                {/* Author Info Card */}
                <div className="bg-gradient-to-br from-emerald-50 to-slate-50 rounded-2xl p-6 border border-emerald-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Author */}
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-emerald-700" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Written By</p>
                        <p className="text-sm font-bold text-slate-900">{lyric.writer_name}</p>
                      </div>
                    </div>

                    {/* Posted By */}
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-700" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Posted By</p>
                        <p className="text-sm font-bold text-slate-900">{lyric.posted_by || 'Admin'}</p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-amber-700" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Location</p>
                        <p className="text-sm font-bold text-slate-900">{lyric.location || 'Not specified'}</p>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-purple-700" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Posted On</p>
                        <p className="text-sm font-bold text-slate-900">
                          {lyric.posted_date 
                            ? new Date(lyric.posted_date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })
                            : 'Not specified'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center">
                    <div className="w-1 h-6 bg-emerald-600 rounded-full mr-3"></div>
                    Description
                  </h3>
                  <p className="text-slate-700 leading-relaxed bg-slate-50 rounded-xl p-4 border border-slate-200">
                    {lyric.description}
                  </p>
                </div>

                {/* Lyric Text */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center">
                    <div className="w-1 h-6 bg-emerald-600 rounded-full mr-3"></div>
                    <Music className="w-5 h-5 mr-2 text-emerald-600" />
                    Lyric Text
                  </h3>
                  <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-6 border-2 border-emerald-200">
                    <p className="text-slate-800 italic leading-loose text-lg whitespace-pre-line">
                      {lyric.kalam_text}
                    </p>
                  </div>
                </div>

                {/* YouTube Link (if available) */}
                {lyric.youtube_link && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center">
                      <div className="w-1 h-6 bg-red-600 rounded-full mr-3"></div>
                      Watch on YouTube
                    </h3>
                    <a
                      href={lyric.youtube_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      <span>Watch Video</span>
                    </a>
                  </div>
                )}

                {/* Share Section */}
                <div className="pt-6 border-t border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center justify-center">
                    <Share2 className="w-5 h-5 mr-2 text-emerald-600" />
                    Share This Lyric
                  </h3>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={handleShareFacebook}
                      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl"
                    >
                      <Facebook className="w-5 h-5" />
                      <span>Facebook</span>
                    </button>
                    <button
                      onClick={handleShareWhatsApp}
                      className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>

                {/* Close Button */}
                <div className="pt-4">
                  <button
                    onClick={onClose}
                    className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LyricPreviewModal;
