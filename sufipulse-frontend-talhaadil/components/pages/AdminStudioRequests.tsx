'use client';

import React, { useState, useEffect } from 'react';
import { Mic, Calendar, CheckCircle, XCircle, Clock, Search, Filter, Eye, MessageSquare, Users } from 'lucide-react';
import { getAllStudioRequests, updateStudioRequestStatus, StudioRecordingRequest } from '@/services/adminRecordingRequests';
import { useToast } from '@/context/ToastContext';
import toast from 'react-hot-toast';

const AdminStudioRequests: React.FC = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<StudioRecordingRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<StudioRecordingRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedRequestId, setExpandedRequestId] = useState<number | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<StudioRecordingRequest | null>(null);
  const [adminComments, setAdminComments] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    filterRequests();
  }, [requests, searchQuery, statusFilter]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await getAllStudioRequests();
      setRequests(response.data.requests || []);
    } catch (error: any) {
      console.error('Error fetching studio requests:', error);
      showToast(error.response?.data?.detail || 'Failed to load studio requests');
    } finally {
      setLoading(false);
    }
  };

  const filterRequests = () => {
    let filtered = [...requests];

    if (searchQuery) {
      filtered = filtered.filter(req =>
        req.lyric_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.lyric_writer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.id.toString().includes(searchQuery)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(req => req.status === statusFilter);
    }

    setFilteredRequests(filtered);
  };

  const handleStatusUpdate = async (requestId: number, status: string) => {
    try {
      setUpdatingId(requestId);
      await updateStudioRequestStatus(requestId, status, adminComments);
      showToast(`Request ${status} successfully!`);
      setShowCommentModal(false);
      setSelectedRequest(null);
      setAdminComments('');
      await fetchRequests();
    } catch (error: any) {
      showToast(error.response?.data?.detail || 'Failed to update request status');
    } finally {
      setUpdatingId(null);
    }
  };

  const openStatusModal = (request: StudioRecordingRequest, action: string) => {
    setSelectedRequest({ ...request });
    setAdminComments('');
    setShowCommentModal(true);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; label: string; icon: React.ReactNode }> = {
      pending_review: {
        color: 'bg-amber-100 text-amber-700 border-amber-200',
        label: 'Pending Review',
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

    const config = statusConfig[status] || statusConfig.pending_review;
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
        <Clock className="w-8 h-8 animate-spin text-emerald-600" />
        <p className="ml-3 text-slate-600">Loading studio requests...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Studio Recording Requests</h1>
          <p className="text-slate-600 mt-1">Manage all in-person studio session requests</p>
        </div>
        <div className="flex items-center space-x-2">
          <Mic className="w-6 h-6 text-emerald-600" />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, writer, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Status</option>
              <option value="pending_review">Pending Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
          <p className="text-sm text-slate-600">
            Total: {filteredRequests.length} request{filteredRequests.length !== 1 ? 's' : ''}
          </p>
        </div>

        {filteredRequests.length === 0 ? (
          <div className="p-12 text-center">
            <Mic className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">No studio requests found</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {filteredRequests.map((request) => (
              <div key={request.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-bold text-slate-900">{request.lyric_title}</h3>
                      {getStatusBadge(request.status)}
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-slate-600">
                      <span className="flex items-center space-x-1">
                        <span className="font-medium">Writer:</span>
                        <span>{request.lyric_writer || 'N/A'}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span className="font-medium">Language:</span>
                        <span>{request.lyric_language || 'N/A'}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span className="font-medium">Category:</span>
                        <span>{request.lyric_category || 'N/A'}</span>
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-slate-500">
                    <p>ID: #{request.id}</p>
                    <p>{new Date(request.created_at).toLocaleDateString()}</p>
                  </div>
                </div>

                <button
                  onClick={() => setExpandedRequestId(expandedRequestId === request.id ? null : request.id)}
                  className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                >
                  <Eye className="w-4 h-4" />
                  <span>{expandedRequestId === request.id ? 'Hide Details' : 'View Details'}</span>
                </button>

                {expandedRequestId === request.id && (
                  <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">
                    {/* Submitter Information */}
                    <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-4 border border-emerald-200">
                      <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center">
                        <Users className="w-4 h-4 mr-2 text-emerald-600" />
                        Submitter Information
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs font-medium text-slate-600">Name</p>
                          <p className="text-sm font-semibold text-slate-900">{request.submitter_name || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-600">Email</p>
                          <p className="text-sm font-semibold text-slate-900">{request.submitter_email || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-600">WhatsApp</p>
                          <p className="text-sm font-semibold text-slate-900">{request.whatsapp_number || 'N/A'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-slate-600 mb-1">Preferred Date</p>
                        <p className="text-slate-900">{new Date(request.preferred_session_date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-600 mb-1">Time Block</p>
                        <p className="text-slate-900">{request.preferred_time_block}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-600 mb-1">Duration</p>
                        <p className="text-slate-900">{request.estimated_studio_duration}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-600 mb-1">Submitted</p>
                        <p className="text-slate-900">{new Date(request.created_at).toLocaleString()}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-600 mb-2">Performance Direction</p>
                      <p className="text-slate-700 bg-slate-50 rounded-lg p-3">{request.performance_direction}</p>
                    </div>

                    {request.admin_comments && (
                      <div>
                        <p className="text-sm font-medium text-slate-600 mb-2 flex items-center">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Admin Comments
                        </p>
                        <p className="text-slate-700 bg-amber-50 rounded-lg p-3">{request.admin_comments}</p>
                      </div>
                    )}

                    {request.status === 'pending_review' && (
                      <div className="flex flex-wrap gap-3 pt-4">
                        <button
                          onClick={() => openStatusModal(request, 'approve')}
                          disabled={updatingId === request.id}
                          className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => openStatusModal(request, 'reject')}
                          disabled={updatingId === request.id}
                          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Reject</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Comment Modal */}
      {showCommentModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              {adminComments ? 'Add' : 'Add'} Admin Comments
            </h3>
            <textarea
              value={adminComments}
              onChange={(e) => setAdminComments(e.target.value)}
              placeholder="Add comments (optional)..."
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowCommentModal(false);
                  setSelectedRequest(null);
                  setAdminComments('');
                }}
                className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleStatusUpdate(selectedRequest.id, 'approved')}
                className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                Approve
              </button>
              <button
                onClick={() => handleStatusUpdate(selectedRequest.id, 'rejected')}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStudioRequests;
