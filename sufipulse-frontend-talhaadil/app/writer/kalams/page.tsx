'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, PenTool, Eye, Edit, Clock, CheckCircle, XCircle, AlertCircle, Search } from 'lucide-react';
import { getKalamsByWriter } from '@/services/writer';

interface Kalam {
  id: number;
  title: string;
  language: string;
  theme: string;
  kalam_text: string;
  description: string;
  sufi_influence: string;
  musical_preference: string;
  youtube_link: string | null;
  writer_id: number;
  vocalist_id: number | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

interface Submission {
  id: number;
  kalam_id: number;
  status: string;
  user_approval_status: string;
  admin_comments: string;
  writer_comments: string;
  created_at: string;
  updated_at: string;
  vocalist_approval_status: string;
}

interface KalamWithSubmission {
  kalam: Kalam;
  submission?: Submission;
}

export default function MyKalams() {
  const [kalams, setKalams] = useState<KalamWithSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchKalams();
  }, []);

  const fetchKalams = async () => {
    try {
      const response = await getKalamsByWriter();
      if (response.status === 200) {
        setKalams(response.data.kalams || []);
      }
    } catch (error) {
      console.error('Failed to fetch kalams:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-slate-600 bg-slate-100';
      case 'admin_approved':
        return 'text-emerald-900 bg-emerald-50';
      case 'final_approved':
        return 'text-emerald-900 bg-emerald-50';
      case 'complete_approved':
        return 'text-emerald-900 bg-emerald-50';
      case 'admin_rejected':
        return 'text-red-600 bg-red-50';
      case 'changes_requested':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-slate-600 bg-slate-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'admin_approved':
      case 'final_approved':
      case 'complete_approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'admin_rejected':
        return <XCircle className="w-4 h-4" />;
      case 'changes_requested':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const filteredKalams = kalams.filter((item) =>
    item.kalam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.kalam.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.kalam.theme.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-emerald-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your kalams...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Main content */}
      <div>
        {/* Top bar */}
        <div className="bg-white border-b border-slate-200 px-4 py-4 lg:px-8">
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    {/* Left Section */}
    <div className="flex-1">
      <h2 className="text-xl font-semibold text-slate-900">My Kalams</h2>

      {/* Search Box */}
      <div className="mt-3 lg:mt-4 relative max-w-md w-full">
        <input
          type="text"
          placeholder="Search kalams..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 bg-slate-100 text-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
      </div>
    </div>

    {/* Right Section (Button) */}
    <div className="flex lg:justify-end">
      <Link
        href="/writer/submit"
        className="px-4 py-2 bg-emerald-900 text-white rounded-lg hover:bg-emerald-800 transition-colors w-full lg:w-auto text-center"
      >
        Submit New
      </Link>
    </div>
  </div>
</div>


        {/* Kalams list */}
        <div className="p-4 lg:p-8">
          {filteredKalams.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No kalams found</h3>
              <p className="text-slate-600 mb-6">
                {searchQuery
                  ? 'No kalams match your search'
                  : 'Start by submitting your first sacred poetry'}
              </p>
              <Link
                href="/writer/submit"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-emerald-900 text-white rounded-lg hover:bg-emerald-800 transition-colors"
              >
                <PenTool className="w-5 h-5" />
                <span>Submit Kalam</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredKalams.map((item) => (
                <div key={item.kalam.id} className="bg-white rounded-lg border border-slate-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.kalam.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-2 py-1 bg-slate-100 text-slate-700 text-sm rounded">
                          {item.kalam.language}
                        </span>
                        <span className="px-2 py-1 bg-slate-100 text-slate-700 text-sm rounded">
                          {item.kalam.theme}
                        </span>
                        {item.submission && (
                          <span
                            className={`px-2 py-1 text-sm rounded flex items-center space-x-1 ${getStatusColor(item.submission.status)}`}
                          >
                            {getStatusIcon(item.submission.status)}
                            <span>{formatStatus(item.submission.status)}</span>
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 text-sm line-clamp-2">
                        {item.kalam.description || item.kalam.kalam_text.substring(0, 100) + '...'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-slate-500 text-sm">
                      Created {new Date(item.kalam.created_at).toLocaleDateString()}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/writer/kalams/${item.kalam.id}`}
                        className="inline-flex items-center space-x-1 px-3 py-2 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </Link>
                      {item.submission && !['final_approved', 'complete_approved'].includes(item.submission.status) && (
                        <Link
                          href={`/writer/kalams/${item.kalam.id}/edit`}
                          className="inline-flex items-center space-x-1 px-3 py-2 text-emerald-900 hover:text-emerald-800 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}