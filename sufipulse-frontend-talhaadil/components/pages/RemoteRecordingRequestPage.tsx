'use client';

import React, { useState } from 'react';
import { Wifi, Calendar, CheckCircle, Info, Music } from 'lucide-react';
import RemoteRecordingRequestForm from './RemoteRecordingRequestForm';
import MyRemoteRequestsList from './MyRemoteRequestsList';

type ViewType = 'form' | 'my-requests';

const RemoteRecordingRequest: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('form');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setCurrentView('my-requests');
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Wifi className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Remote Recording Request
              <span className="block text-emerald-400 mt-2">Remote Production</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Request remote production for your approved lyric. Record from your own studio
              and collaborate with the SufiPulse team remotely.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setCurrentView('form')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                currentView === 'form'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Music className="w-5 h-5" />
              <span>New Request</span>
            </button>
            <button
              onClick={() => setCurrentView('my-requests')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                currentView === 'my-requests'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>My Requests</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'form' ? (
          <RemoteRecordingRequestForm onSuccess={handleSuccess} />
        ) : (
          <MyRemoteRequestsList key={refreshKey} />
        )}
      </div>

      {/* Info Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-emerald-50 rounded-2xl p-6 sm:p-8 border border-emerald-100">
          <div className="flex items-start space-x-4">
            <Info className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">What Happens Next?</h3>
              <ul className="space-y-2 text-sm sm:text-base text-slate-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>After submission, your request will be reviewed by our production team</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>You'll receive technical guidelines and quality requirements</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Once approved, the lyric will be assigned to your profile</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span>Submit your recording by the target date for production review</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RemoteRecordingRequest;
