'use client';
import { useState, useEffect } from 'react';
import { Music, CheckCircle, XCircle, Building2, Wifi, ChevronDown, Search } from 'lucide-react';
import { approveOrRejectKalam, getKalamsByVocalist } from '@/services/vocalist';
import {
  createStudioVisitRequest,
  createRemoteRecordingRequest,
  getStudioVisitRequestsByVocalist,
  getRemoteRecordingRequestsByVocalist,
  checkRequestExists,
} from '@/services/requests';
import Cookies from 'js-cookie';
import StudioVisit from './StudioVisit';
import RemoteRecording from './RemoteRecording';
import { useToast } from '@/context/ToastContext';

interface Kalam {
  id: number;
  title: string;
  language: string;
  theme: string;
  kalam_text: string;
  description: string;
  sufi_influence: string;
  musical_preference: string;
  youtube_link: string;
  writer_id: number;
  vocalist_id: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  vocalist_approval_status: string;
  status: string;
}

const KalamApproval = () => {
  const {showToast} = useToast()
  const [kalams, setKalams] = useState<Kalam[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [selectedKalam, setSelectedKalam] = useState<number | null>(null);
  const [showRecordingOptions, setShowRecordingOptions] = useState<number | null>(null);
  const [studioRequests, setStudioRequests] = useState<any[]>([]);
  const [remoteRequests, setRemoteRequests] = useState<any[]>([]);
  const [currentView, setCurrentView] = useState<'kalams' | 'studio-requests' | 'remote-requests' | 'studio-form' | 'remote-form'>('kalams');
  const [formKalamId, setFormKalamId] = useState<number | null>(null);
  const [requestExistsMap, setRequestExistsMap] = useState<{ [key: number]: boolean }>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [expandedRequestId, setExpandedRequestId] = useState<number | null>(null);
  const userId = Cookies.get('user_id');

  useEffect(() => {
    if (currentView === 'kalams') {
      fetchKalams();
    }
  }, [currentView]);

  const fetchKalams = async () => {
    try {
      setLoading(true);
      const response = await getKalamsByVocalist();
      const kalamsData = response.data.kalams || [];
      setKalams(kalamsData);

      const requestStatusMap: { [key: number]: boolean } = {};
      for (const kalam of kalamsData) {
        const requestResponse = await checkRequestExists(userId ?? '', kalam.id.toString());
        requestStatusMap[kalam.id] = requestResponse.data.is_booked;
      }
      setRequestExistsMap(requestStatusMap);
    } catch (error: any) {
      console.error('❌ Kalams API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveReject = async (kalamId: number, action: 'approved' | 'rejected') => {
    const input = { status: action, comments: 'hello hi' };
    try {
      setActionLoading(kalamId);
      await approveOrRejectKalam(kalamId, input);
      if (action === 'approved') {
        const requestResponse = await checkRequestExists(userId ?? '', kalamId.toString());
        setRequestExistsMap((prev) => ({
          ...prev,
          [kalamId]: requestResponse.data.is_booked,
        }));
        if (!requestResponse.data.is_booked) {
          setShowRecordingOptions(kalamId);
        }
      }
      await fetchKalams();
    } catch (error: any) {
      console.error('❌ Approval API Error:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRecordingRequest = (type: 'studio' | 'remote', kalamId: number) => {
    setFormKalamId(kalamId);
    setCurrentView(type === 'studio' ? 'studio-form' : 'remote-form');
    setShowRecordingOptions(null);
  };

  const handleStudioFormSubmit = async (formData: any) => {
    if (!formKalamId) return;
    try {
      if (!userId) {
        throw new Error('User ID is missing');
      }
      const requestData = {
        vocalist_id: Number(userId),
        kalam_id: formKalamId,
        name: formData.fullName,
        email: formData.email,
        organization: formData.organization,
        contact_number: formData.contactNumber,
        preferred_date: formData.visitDate,
        preferred_time: formData.preferredTime,
        purpose: formData.visitPurpose,
        number_of_visitors: Number(formData.numberOfVisitors),
        additional_details: formData.additionalDetails,
        special_requests: formData.specialRequests,
      };
      await createStudioVisitRequest(requestData);
      setFormKalamId(null);
      setCurrentView('kalams');
      setRequestExistsMap((prev) => ({ ...prev, [formKalamId]: true }));
      await fetchKalams();
    } catch (error: any) {
      showToast(error.response.data.detail);
    }
  };

  const handleRemoteFormSubmit = async (formData: any) => {
    if (!formKalamId) return;
    try {
      const requestData = {
        vocalist_id: Number(userId),
        kalam_id: formKalamId,
        name: formData.fullName,
        email: formData.email,
        city: formData.location,
        country: formData.country,
        time_zone: formData.timezone,
        role: formData.role,
        project_type: formData.projectType,
        recording_equipment: formData.equipment,
        internet_speed: formData.internetSpeed,
        preferred_software: formData.preferredSoftware,
        availability: formData.availability,
        recording_experience: formData.experience,
        technical_setup: formData.technicalSetup,
        additional_details: formData.additionalDetails,
      };
      await createRemoteRecordingRequest(requestData);
      setFormKalamId(null);
      setCurrentView('kalams');
      setRequestExistsMap((prev) => ({ ...prev, [formKalamId]: true }));
      await fetchKalams();
    } catch (error: any) {
      showToast(error.response.data.detail);
      console.error('❌ Remote Request API Error:', error);
    }
  };

  const fetchStudioRequests = async () => {
    try {
      const response = await getStudioVisitRequestsByVocalist();
      setStudioRequests(response.data || []);
    } catch (error: any) {
      console.error('❌ Studio Requests API Error:', error);
    }
  };

  const fetchRemoteRequests = async () => {
    try {
      const response = await getRemoteRecordingRequestsByVocalist();
      setRemoteRequests(response.data || []);
    } catch (error: any) {
      console.error('❌ Remote Requests API Error:', error);
    }
  };

  const filteredKalams = kalams.filter((kalam) => {
    const matchesSearch = kalam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kalam.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || kalam.vocalist_approval_status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredStudioRequests = studioRequests.filter((request) =>
    request.id.toString().includes(searchQuery) ||
    new Date(request.created_at).toLocaleDateString().includes(searchQuery)
  );

  const filteredRemoteRequests = remoteRequests.filter((request) =>
    request.id.toString().includes(searchQuery) ||
    new Date(request.created_at).toLocaleDateString().includes(searchQuery)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-base sm:text-lg text-slate-600">Loading kalams...</p>
        </div>
      </div>
    );
  }

  const renderKalams = () => (
    <div className="space-y-4 sm:space-y-6">
      {filteredKalams.map((kalam) => (
        <div
          key={kalam.id}
          className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 truncate">
                {kalam.title}
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2 sm:px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs sm:text-sm font-medium">
                  {kalam.language}
                </span>
                <span className="px-2 sm:px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs sm:text-sm font-medium">
                  {kalam.theme}
                </span>
                {kalam.status === "posted" && kalam.youtube_link && (
                  <a
                    href={kalam.youtube_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 sm:px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs sm:text-sm font-medium hover:bg-red-100"
                  >
                    YouTube Link
                  </a>
                )}
              </div>
            </div>
            <div
              className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium mt-2 sm:mt-0 ${
                kalam.vocalist_approval_status === 'approved'
                  ? 'bg-emerald-100 text-emerald-800'
                  : kalam.vocalist_approval_status === 'rejected'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {kalam.vocalist_approval_status}
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-600 mb-4 leading-relaxed line-clamp-3">
            {kalam.description}
          </p>

          {kalam.kalam_text && (
            <div className="mb-4 p-3 sm:p-4 bg-slate-50 rounded-lg">
              <p className="text-sm sm:text-base text-slate-800 italic leading-relaxed line-clamp-4">
                {kalam.kalam_text}
              </p>
            </div>
          )}

          {kalam.vocalist_approval_status === 'pending' && (
            <div className="flex flex-col sm:flex-row sm:space-x-4 mt-4 gap-2">
              <button
                onClick={() => handleApproveReject(kalam.id, 'approved')}
                disabled={actionLoading === kalam.id}
                className="flex items-center justify-center space-x-2 px-4 py-2 sm:px-6 sm:py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors text-sm sm:text-base"
              >
                {actionLoading === kalam.id ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
                <span>Accept</span>
              </button>
              <button
                onClick={() => handleApproveReject(kalam.id, 'rejected')}
                disabled={actionLoading === kalam.id}
                className="flex items-center justify-center space-x-2 px-4 py-2 sm:px-6 sm:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors text-sm sm:text-base"
              >
                <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Reject</span>
              </button>
            </div>
          )}

          {(kalam.vocalist_approval_status === 'approved' && !requestExistsMap[kalam.id]) ||
            showRecordingOptions === kalam.id ? (
            <div className="mt-4 p-3 sm:p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 className="font-medium text-emerald-800 mb-2 sm:mb-3 text-sm sm:text-base">
                Choose Recording Option:
              </h4>
              <div className="flex flex-col sm:flex-row sm:space-x-4 gap-2">
                <button
                  onClick={() => handleRecordingRequest('studio', kalam.id)}
                  className="flex items-center justify-center space-x-2 px-4 py-2 sm:px-6 sm:py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors text-sm sm:text-base"
                >
                  <Building2 className="hidden lg:flex w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Studio Visit Request</span>
                </button>
                <button
                  onClick={() => handleRecordingRequest('remote', kalam.id)}
                  className="flex items-center justify-center space-x-2 px-4 py-2 sm:px-6 sm:py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm sm:text-base"
                >
                  <Wifi className="hidden lg:flex w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Remote Recording Request</span>
                </button>
              </div>
            </div>
          ) : null}
        </div>
      ))}
      {filteredKalams.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <p className="text-base sm:text-lg text-slate-500">No kalams match your search or filters</p>
        </div>
      )}
    </div>
  );

  const renderRequests = (requests: any[], type: 'studio' | 'remote') => (
    <div className="space-y-4">
      {requests.length > 0 ? (
        requests.map((request, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6"
          >
            <div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 cursor-pointer"
              onClick={() => setExpandedRequestId(expandedRequestId === request.id ? null : request.id)}
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                {type === 'studio' ? (
                  <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
                ) : (
                  <Wifi className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                )}
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {type === 'studio' ? 'Studio Visit' : 'Remote Recording'} Request
                </h3>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4 mt-2 sm:mt-0">
                <ChevronDown
                  className={`w-5 h-5 text-slate-600 transition-transform ${expandedRequestId === request.id ? 'rotate-180' : ''}`}
                />
              </div>
            </div>
            <div className="text-sm sm:text-base text-slate-600 mb-4">
              <p>
                <strong>Request ID:</strong> {request.id}
              </p>
              <p>
                <strong>Created:</strong> {new Date(request.created_at).toLocaleDateString()}
              </p>
              {request.message && (
                <p>
                  <strong>Message:</strong> {request.message}
                </p>
              )}
            </div>
            {expandedRequestId === request.id && (
              <div className="mt-4 p-4 bg-slate-50 rounded-lg text-sm sm:text-base text-slate-600 space-y-2">
                <p><strong>Name:</strong> {request.name}</p>
                <p><strong>Email:</strong> {request.email}</p>
                {type === 'studio' ? (
                  <>
                    <p><strong>Organization:</strong> {request.organization}</p>
                    <p><strong>Contact Number:</strong> {request.contact_number}</p>
                    <p><strong>Preferred Date:</strong> {request.preferred_date}</p>
                    <p><strong>Preferred Time:</strong> {request.preferred_time}</p>
                    <p><strong>Purpose:</strong> {request.purpose}</p>
                    <p><strong>Number of Visitors:</strong> {request.number_of_visitors}</p>
                    <p><strong>Additional Details:</strong> {request.additional_details}</p>
                    <p><strong>Special Requests:</strong> {request.special_requests}</p>
                  </>
                ) : (
                  <>
                    <p><strong>City:</strong> {request.city}</p>
                    <p><strong>Country:</strong> {request.country}</p>
                    <p><strong>Time Zone:</strong> {request.time_zone}</p>
                    <p><strong>Role:</strong> {request.role}</p>
                    <p><strong>Project Type:</strong> {request.project_type}</p>
                    <p><strong>Recording Equipment:</strong> {request.recording_equipment}</p>
                    <p><strong>Internet Speed:</strong> {request.internet_speed}</p>
                    <p><strong>Preferred Software:</strong> {request.preferred_software}</p>
                    <p><strong>Availability:</strong> {request.availability}</p>
                    <p><strong>Recording Experience:</strong> {request.recording_experience}</p>
                    <p><strong>Technical Setup:</strong> {request.technical_setup}</p>
                    <p><strong>Additional Details:</strong> {request.additional_details}</p>
                  </>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="text-center py-8 sm:py-12">
          {type === 'studio' ? (
            <Building2 className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 mx-auto mb-4" />
          ) : (
            <Wifi className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 mx-auto mb-4" />
          )}
          <p className="text-base sm:text-lg text-slate-500">No {type} requests found</p>
        </div>
      )}
    </div>
  );

  const renderForm = (type: 'studio' | 'remote') => (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4">
       
        <button
          onClick={() => setCurrentView('kalams')}
          className="text-slate-500 hover:text-slate-700"
        >
          <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
      {type === 'studio' && <StudioVisit onSubmit={handleStudioFormSubmit} />}
      {type === 'remote' && <RemoteRecording onSubmit={handleRemoteFormSubmit} />}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-full sm:max-w-4xl lg:max-w-5xl mx-auto">
        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row sm:space-x-4 gap-2">
              <button
                onClick={() => setCurrentView('kalams')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base w-full sm:w-auto ${
                  currentView === 'kalams' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Kalams
              </button>
              <button
                onClick={() => {
                  setCurrentView('studio-requests');
                  fetchStudioRequests();
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base w-full sm:w-auto ${
                  currentView === 'studio-requests' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Studio Requests
              </button>
              <button
                onClick={() => {
                  setCurrentView('remote-requests');
                  fetchRemoteRequests();
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base w-full sm:w-auto ${
                  currentView === 'remote-requests' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Remote Requests
              </button>
            </div>
            {currentView === 'kalams' && (
              <div className="flex flex-col sm:flex-row sm:space-x-4 gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as 'all' | 'pending' | 'approved' | 'rejected')}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium text-sm sm:text-base w-full sm:w-auto"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6 lg:p-8">
          <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
            {currentView === 'kalams' && <Music className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />}
            {currentView === 'studio-requests' && (
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
            )}
            {currentView === 'remote-requests' && (
              <Wifi className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
            )}
            {(currentView === 'studio-form' || currentView === 'remote-form') && (
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
            )}
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900">
              {currentView === 'kalams' && 'Kalam Approvals'}
              {currentView === 'studio-requests' && 'Studio Visit Requests'}
              {currentView === 'remote-requests' && 'Remote Recording Requests'}
              {currentView === 'studio-form' && 'Studio Visit Request'}
              {currentView === 'remote-form' && 'Remote Recording Request'}
            </h2>
          </div>
          {currentView !== 'studio-form' && currentView !== 'remote-form' && (
            <div className="mb-4 sm:mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 sm:py-3 bg-slate-100 text-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 pl-10 sm:pl-12"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
            </div>
          )}

          {currentView === 'kalams' && renderKalams()}
          {currentView === 'studio-requests' && renderRequests(filteredStudioRequests, 'studio')}
          {currentView === 'remote-requests' && renderRequests(filteredRemoteRequests, 'remote')}
          {currentView === 'studio-form' && renderForm('studio')}
          {currentView === 'remote-form' && renderForm('remote')}
        </div>
      </div>
    </div>
  );
};

export default KalamApproval;