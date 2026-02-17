'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, Loader2, Music, AlertCircle, Wifi } from 'lucide-react';
import { getMyRemoteRequests, RemoteRecordingRequestResponse } from '@/services/recordingRequests';
import { useToast } from '@/context/ToastContext';
import toast from 'react-hot-toast';

const MyRemoteRequestsList: React.FC = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<RemoteRecordingRequestResponse[]>([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await getMyRemoteRequests();
      setRequests(response.data.requests || []);
    } catch (error: any) {
      console.error('Error fetching remote requests:', error);
      showToast(error.response?.data?.detail || 'Failed to load your requests');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; label: string; icon: React.ReactNode }> = {
      under_review: {
        color: 'bg-amber-100 text-amber-700 border-amber-200',
        label: 'Under Review',
        icon: <Clock className="w-3 h-3" />,
      },
      approved: {
        color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        label: 'Approved',
        icon: <CheckCircle className="w-3 h-3" />,
      },
      rejected: {
        color: 'bg-red-100 text-red-700 border-red-200',
        label: 'Rejected',
        icon: <XCircle className="w-3 h-3" />,
      },
      completed: {
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        label: 'Completed',
        icon: <CheckCircle className="w-3 h-3" />,
      },
    };

    const config = statusConfig[status] || statusConfig.under_review;
    return (
      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        {config.icon}
        <span>{config.label}</span>
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        <p className="ml-3 text-slate-600">Loading your requests...</p>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 sm:p-12 text-center">
        <Wifi className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-900 mb-2">No Remote Requests Yet</h3>
        <p className="text-slate-600 mb-6">
          You haven't submitted any remote recording requests. Create your first request to get started!
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-left max-w-md mx-auto">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Note:</p>
              <p>You can only request remote recording for approved lyrics that you've accepted.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900">Your Remote Recording Requests</h2>
          <p className="text-sm text-slate-600 mt-1">
            Total: {requests.length} request{requests.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="divide-y divide-slate-200">
          {requests.map((request) => (
            <div key={request.id} className="p-6 hover:bg-slate-50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{request.lyric_title}</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                      {request.lyric_language}
                    </span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                      Writer: {request.lyric_writer}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {getStatusBadge(request.status)}
                  <span className="text-xs text-slate-500">
                    #{request.id}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-slate-600 mb-1">Target Submission Date</p>
                  <p className="font-medium text-slate-900 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                    {new Date(request.target_submission_date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Recording Environment</p>
                  <p className="font-medium text-slate-900">{request.recording_environment}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-slate-600 mb-1 text-sm">Interpretation Notes</p>
                <p className="text-slate-700 text-sm leading-relaxed line-clamp-2">
                  {request.interpretation_notes}
                </p>
              </div>

              <div className="mt-3 text-xs text-slate-500">
                Submitted: {new Date(request.created_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyRemoteRequestsList;
