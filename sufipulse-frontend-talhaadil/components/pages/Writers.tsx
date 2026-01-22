'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Languages, Filter } from 'lucide-react';
import { getAllWritersForPublic } from '@/services/admin';

// Define the Writer interface for type safety
interface Writer {
  id: string;
  user_name: string;
  user_city: string;
  user_country: string;
  writing_styles: string[];
  languages: string[];
  experience_background: string;
  availability: string;
  portfolio: string;
}

// Define the API response interface
interface ApiResponse {
  data: Writer[];
}

const Writers: React.FC = () => {
  const [writers, setWriters] = useState<Writer[]>([]);
  const [filteredWriters, setFilteredWriters] = useState<Writer[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [skip, setSkip] = useState<number>(0);
  const [limit] = useState<number>(6);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch writers from API
  const fetchWriters = async (reset: boolean = false) => {
    setLoading(true);
    try {
      const response = await getAllWritersForPublic(reset ? 0 : skip, limit) as ApiResponse;
      const newWriters = response.data.map((writer) => ({
        ...writer,
        languages: writer.languages.map((lang) => lang.toLowerCase()), // Normalize languages
      }));
      setWriters((prev) => (reset ? newWriters : [...prev, ...newWriters]));
      setHasMore(newWriters.length === limit);
      setSkip((prev) => (reset ? limit : prev + limit));
    } catch (error) {
      console.error('Error fetching writers:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchWriters(true);
  }, []);

  // Filter writers based on active language
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredWriters(writers);
    } else if (activeFilter === 'multilingual') {
      setFilteredWriters(writers.filter((writer) => writer.languages.length > 2));
    } else {
      setFilteredWriters(
        writers.filter((writer) =>
          writer.languages.includes(activeFilter.toLowerCase())
        )
      );
    }
  }, [writers, activeFilter]);

  // Generate unique filters from API data
  const filters: { id: string; label: string; count: number }[] = [
    { id: 'all', label: 'All Writers', count: writers.length },
    ...[...new Set(writers.flatMap((writer) => writer.languages))]
      .map((lang) => ({
        id: lang.toLowerCase(),
        label: lang.charAt(0).toUpperCase() + lang.slice(1), // Capitalize for display
        count: writers.filter((writer) => writer.languages.includes(lang)).length,
      }))
      .sort((a, b) => a.label.localeCompare(b.label)), // Sort alphabetically
    {
      id: 'multilingual',
      label: 'Multilingual',
      count: writers.filter((writer) => writer.languages.length > 2).length,
    },
  ];

  // Handle Load More
  const handleLoadMore = () => {
    fetchWriters();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Writers
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-6">
              Discover writers from around the world sharing their unique voices and styles.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800">Browse All Writers</h3>
            <div className="text-sm text-slate-600">
              {filteredWriters.length} of {writers.length} writers
            </div>
          </div>
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-slate-500 flex-shrink-0" />
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all duration-200 ${
                  activeFilter === filter.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600'
                }`}
              >
                <span>{filter.label}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    activeFilter === filter.id ? 'bg-white/20' : 'bg-slate-300'
                  }`}
                >
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Writers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredWriters.map((writer) => (
            <div key={writer.id} className="group">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-5 border border-slate-100 flex flex-col h-[350px]">
                <div className="mb-4">
                  <h3 className="font-bold text-slate-800 mb-1 truncate">{writer.user_name}</h3>
                  <div className="flex items-center space-x-1 text-xs text-slate-500 mb-1">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">
                      {writer.user_city}, {writer.user_country}
                    </span>
                  </div>
                </div>

                <div className="mb-3">
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full line-clamp-1">
                    {writer.writing_styles.join(', ')}
                  </span>
                </div>

                <div className="mb-3">
                  <div className="flex items-center space-x-1 mb-2">
                    <Languages className="w-3 h-3 text-slate-500" />
                    <span className="text-xs font-medium text-slate-700">Languages</span>
                  </div>
                  <div className="flex flex-wrap gap-1 max-h-12 overflow-y-auto">
                    {writer.languages.map((lang, index) => (
                      <span
                        key={`${writer.id}-${lang}-${index}`}
                        className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full"
                      >
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-600 mb-3 leading-relaxed line-clamp-3 flex-grow">
                  {writer.experience_background}
                </p>

                <div className="mb-4">
                  <div className="text-xs font-medium text-slate-700 mb-2">Availability:</div>
                  <div className="text-sm font-medium text-emerald-600 truncate">{writer.availability}</div>
                </div>

                <button className="w-full bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 py-2 rounded-lg font-medium transition-all duration-200 text-sm mt-auto">
                  <Link href={writer.portfolio} target="_blank" className="block w-full">
                    View Portfolio
                  </Link>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-8 text-center">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                loading
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Writers;