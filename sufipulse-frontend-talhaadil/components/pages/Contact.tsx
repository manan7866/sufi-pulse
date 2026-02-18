'use client'

import React, { useState } from 'react';
import {
  Mail,
  MessageSquare,
  Users,
  Building2,
  Globe,
  Send,
  MapPin,
  Clock,
  HeartHandshake,
  Music,
  Sparkles
} from 'lucide-react';
import { useCMSPage } from '@/hooks/useCMSPage';
import { contactPageFallbackData } from '@/lib/cmsFallbackData';

const Contact = () => {
  const [activeForm, setActiveForm] = useState('general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch CMS data with fallback
  const { data: cmsData } = useCMSPage({
    pageSlug: 'contact',
    fallbackData: contactPageFallbackData,
    enabled: true
  });

  const pageData = cmsData || contactPageFallbackData;

  const contactTypes = [
    {
      id: 'general',
      icon: MessageSquare,
      title: 'General Inquiry',
      description: 'Questions about our mission, services, or platform'
    },
    {
      id: 'writer',
      icon: Music,
      title: 'Writer Submission',
      description: 'Submit your sacred kalam for consideration'
    },
    {
      id: 'vocalist',
      icon: Users,
      title: 'Vocalist Application',
      description: 'Join our global pool of spiritual voices'
    },
    {
      id: 'visit',
      icon: Building2,
      title: 'Studio Visit Request',
      description: 'Schedule a visit to our recording facilities'
    },
    {
      id: 'media',
      icon: Globe,
      title: 'Media & Press',
      description: 'Press inquiries and media collaboration'
    },
    {
      id: 'partnership',
      icon: Mail,
      title: 'Partnership Proposal',
      description: 'Institutional or organizational collaboration'
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us ',
      details: 'connect@sufipulse.com',
      description: 'Primary contact for all inquiries'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'SufiPulse Studio - USA',
      description: 'Dr. Kumar Foundation Campus'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: 'Mon-Fri: 9AM-6PM EST',
      description: 'Weekend by appointment'
    }
  ];

// These fields data coming from database cms
  const globalHubs = (pageData.hubs && pageData.hubs.length > 0)
    ? pageData.hubs.map((hub: any) => ({
        icon: hub.hub_icon === 'MapPin' ? MapPin : hub.hub_icon === 'Music' ? Music : Mail,
        title: hub.hub_title,
        details: hub.hub_details,
        description: hub.hub_description
      }))
    : [
        {
          icon: MapPin,
          title: 'Global Creative Hub',
          details: 'SufiPulse Studio, Virginia, USA',
          description: 'Our main creative center'
        },
        {
          icon: MapPin,
          title: 'Spiritual Heritage Hub',
          details: 'SufiPulse – Kashmir, Srinagar, Jammu & Kashmir, India',
          description: 'Rooted in spiritual tradition'
        },
        {
          icon: Music,
          title: 'Remote Vocalist Recording Hubs',
          details: 'Srinagar, Kashmir – India\nDubai – UAE\nMumbai – India\nIstanbul – Turkey',
          description: 'Global recording facilities'
        },
        {
          icon: Mail,
          title: 'Email Us',
          details: 'connect@sufipulse.com',
          description: 'Connect with us globally'
        }
      ];

  const socialLinks = [
    { name: 'YouTube', href: '#', color: 'text-red-600 hover:text-red-700' },
    { name: 'Instagram', href: '#', color: 'text-pink-600 hover:text-pink-700' },
    { name: 'Twitter', href: '#', color: 'text-blue-600 hover:text-blue-700' },
    { name: 'LinkedIn', href: '#', color: 'text-blue-700 hover:text-blue-800' }
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      // Use the backend API endpoint
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000';
      const response = await fetch(`${baseUrl}/public/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus('Message sent successfully! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus(result.detail || result.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderForm = () => {
    return (
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Your Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Subject *</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
            placeholder="What is your inquiry about?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Message *</label>
          <textarea
            rows={6}
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
            placeholder="Please share your message, questions, or how we can assist you..."
          ></textarea>
        </div>

        {status && (
          <div
            className={`text-sm p-4 rounded-lg ${
              status.includes('successfully')
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {status}
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
              isSubmitting
                ? 'bg-slate-500 text-white cursor-not-allowed'
                : 'bg-slate-800 hover:bg-slate-700 text-white'
            }`}
          >
            <Send className="w-5 h-5" />
            <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <div className="w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <HeartHandshake className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Connect With Our
              <span className="block text-emerald-400">Sacred Community</span>
            </h1>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20 max-w-4xl mx-auto">
              <p className="text-xl text-slate-300 leading-relaxed mb-6">
                Ready to share your divine Sufi kalam or collaborate with our global spiritual community?
                From Kashmir's mystical valleys to the world — we'd love to hear from you.
              </p>
              <blockquote className="text-2xl font-light italic text-emerald-300 mb-4">
                "Every connection is a bridge between hearts seeking the Divine"
              </blockquote>
              <p className="text-slate-300">
                Choose your path of collaboration and let's amplify sacred voices together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <div className="bg-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Contact Form */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Sufi Pulse
                  </h2>
                  <p className="text-slate-600">How can we help you today</p>
                </div>

                {renderForm()}

              </div>
            </div>

            {/* Global Hubs Section */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Contact Us – SufiPulse</h3>
                <p className="text-slate-600 mb-6">How can we help you today?</p>
                <div className="grid grid-cols-1 gap-6">
                  {globalHubs.map((hub, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <hub.icon className="w-8 h-8 text-emerald-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-slate-800">{hub.title }</h4>
                        <p className="text-slate-600 whitespace-pre-line">{hub.details}</p>
                        <p className="text-sm text-slate-500">{hub.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-slate-600 mt-6 italic">
                  From divine inspiration to global impact — we bring your kalam to life everywhere.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Reminder */}
          <div className="mt-20 text-center">
            <div className="bg-slate-800 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Our Sacred Promise to Writers</h3>
              <p className="text-slate-300 max-w-2xl mx-auto mb-6">
                Submit your kalam and we handle everything else—musical direction, vocalist selection, professional recording,
                and global distribution. Your sacred words deserve world-class treatment, and we provide it completely free
                while ensuring your authorship is always honored.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-700 rounded-xl p-4 flex flex-col items-center">
                  <Sparkles className="w-8 h-8 text-emerald-400 mb-3" />
                  <h4 className="font-bold text-emerald-400 mb-1">100% Free</h4>
                  <p className="text-sm text-slate-300">Complete production services at no cost</p>
                </div>
                <div className="bg-slate-700 rounded-xl p-4 flex flex-col items-center">
                  <Globe className="w-8 h-8 text-emerald-400 mb-3" />
                  <h4 className="font-bold text-emerald-400 mb-1">Global Reach</h4>
                  <p className="text-sm text-slate-300">Your kalam shared worldwide</p>
                </div>
                <div className="bg-slate-700 rounded-xl p-4 flex flex-col items-center">
                  <Music className="w-8 h-8 text-emerald-400 mb-3" />
                  <h4 className="font-bold text-emerald-400 mb-1">Full Credit</h4>
                  <p className="text-sm text-slate-300">Your authorship always honored</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Contact;