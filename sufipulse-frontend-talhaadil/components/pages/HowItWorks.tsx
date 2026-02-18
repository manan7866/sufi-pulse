'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  UserPlus, 
  CheckCircle, 
  Upload, 
  Eye, 
  Music, 
  Headphones, 
  Youtube, 
  Globe,
  ArrowRight,
  PenTool,
  Users,
  Award,
  Clock,
  Star,
  Heart,
  Play
} from 'lucide-react';
import { incrementWeekly } from '@/lib/increment';
import { useCMSPage } from '@/hooks/useCMSPage';
import { aboutPageFallbackData } from '@/lib/cmsFallbackData';

const HowItWorks = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const processSteps = [
    {
      number: 1,
      title: "Create Writer Profile",
      description: "Sign up and create your free writer profile with your spiritual background and sample kalam.",
      icon: UserPlus,
      details: ["Free registration", "Profile setup", "Sample submission", "Community welcome"]
    },
    {
      number: 2,
      title: "Editorial Review",
      description: "Our team reviews your profile and sample for spiritual alignment and quality.",
      icon: CheckCircle,
      details: ["Quality assessment", "Spiritual alignment check", "Editorial feedback", "Approval process"]
    },
    {
      number: 3,
      title: "Submit Your Kalam",
      description: "Upload your divine poetry through our dashboard with theme and style preferences.",
      icon: Upload,
      details: ["Dashboard submission", "Theme selection", "Style preferences", "Optional audio"]
    }
  ];
// These  fields data comming from database cms

const { data: cmsData } = useCMSPage({
  pageSlug: 'how-it-works',
  fallbackData: aboutPageFallbackData,
  enabled: true
});
const pageData = cmsData || aboutPageFallbackData;



const stats =  (pageData.stats && pageData.stats.length > 0)
? pageData.stats.map((stat: any) => ({
    number: stat.stat_number,
    label: stat.stat_label,
    icon: (() => {
      switch (stat.icon_name) {
        case 'CheckCircle': return CheckCircle;
        case 'Clock': return Clock;
        case 'Award': return Award;
        case 'Heart': return Heart;
        default: return Star; // Default icon if no match
      }
    })()
  }))
: [
    { number: "8", label: "Simple Steps", icon: CheckCircle },
    { number: "4-8", label: "Weeks Timeline", icon: Clock },
    { number: "100%", label: "Free Service", icon: Award },
    { number: `${incrementWeekly(300)}+`, label: "Successful Journeys", icon: Heart }
  ];

  const highlights = [
    {
      icon: PenTool,
      title: "100% Free for Writers",
      description: "Complete production services at no cost to sacred poets",
      stats: "0 fees, 100% free"
    },
    {
      icon: Users,
      title: "Global Collaboration",
      description: "Connect with vocalists and audiences worldwide",
      stats: "50+ countries connected"
    },
    {
      icon: Award,
      title: "Full Attribution",
      description: "Your authorship prominently credited everywhere",
      stats: "100% attribution guarantee"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  How SufiPulse
                  <span className="block text-emerald-400">Works</span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed">
                  Your complete journey from sacred words to global spiritual impact. 
                  Discover the simple 8-step process that transforms divine poetry into worldwide inspiration.
                </p>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 border border-emerald-500/20">
                <p className="text-emerald-300 font-medium mb-2 text-sm sm:text-base">Sacred Journey Promise</p>
                <blockquote className="text-sm sm:text-base lg:text-lg italic">
                  "From divine inspiration to global hearts we handle everything"
                </blockquote>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
                >
                  <PenTool className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Start Your Journey</span>
                </Link>
                <Link
                  href="/gallery"
                  className="inline-flex items-center justify-center space-x-2 border-2 border-white/30 hover:border-emerald-400 text-white hover:text-emerald-400 px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Watch Examples</span>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] sm:aspect-video bg-slate-800 rounded-lg sm:rounded-xl overflow-hidden shadow-xl">
                <img
                  src="/pics/WRITER.jpg"
                  alt="SufiPulse Process"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                  <h3 className="text-white text-base sm:text-xl font-bold ">Complete Process Overview</h3>
                  <p className="text-slate-200 text-xs sm:text-sm">See how we transform sacred words into global inspiration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-1 sm:mb-2">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-slate-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">
              Your Sacred Journey in 8 Steps
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
              Every step designed to honor your sacred words while providing world-class production
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {processSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="group cursor-pointer">
                  <div className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-slate-100">
                    <div className="bg-gradient-to-r from-emerald-600 to-slate-700 p-4 sm:p-6 text-white">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center">
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-medium bg-white/20 px-2 py-1 rounded-full mb-1">
                            Step {step.number}
                          </div>
                          <h3 className="text-base sm:text-lg lg:text-xl font-bold">{step.title}</h3>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 sm:p-6">
                      <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center space-x-2 text-xs sm:text-sm text-slate-600">
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Link
              href="/process"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
            >
              <span>View Complete Process</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Enroll or Proceed Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-emerald-50 to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">
              Begin Your Sacred Writing Journey
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Join SufiPulse as a writer and let your sacred poetry inspire hearts across the globe.
            </p>
          </div>

          <div className="relative max-w-md mx-auto group">
            <div className="relative z-10">
              <Link
                href="/register"
                className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-2xl"
              >
                <PenTool className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Start Writing Now</span>
              </Link>
            </div>
            <div className="absolute inset-0 bg-emerald-200/30 rounded-full blur-2xl transform scale-110 group-hover:scale-125 transition-transform duration-500"></div>
          </div>

          <div className="mt-6 sm:mt-8 text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Create your free writer profile, share your spiritual background and sample kalam, and begin your journey with SufiPulse today.
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">
              Why Writers Choose SufiPulse
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
              Experience the complete journey from sacred words to global spiritual impact
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 rounded-lg sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 mb-2 sm:mb-3">{highlight.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-2 sm:mb-3">{highlight.description}</p>
                  <div className="text-xs sm:text-sm font-medium text-emerald-600 bg-emerald-50 px-2 sm:px-3 py-1 rounded-full inline-block">
                    {highlight.stats}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-12 sm:py-16 lg:py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-6 sm:mb-8">
              Our Sacred Process Promise
            </h2>
            <div className="max-w-4xl mx-auto">
              <blockquote className="text-lg sm:text-xl lg:text-2xl font-light italic text-slate-700 leading-relaxed mb-6 sm:mb-8">
                "Every step of this journey is designed to honor your sacred words while providing world-class production."
              </blockquote>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed mb-6 sm:mb-8">
                From the moment you submit your kalam to its global release, we handle everything—completely free—while 
                ensuring your authorship is always prominently credited. This is our sacred commitment to amplifying 
                divine voices and connecting hearts across cultures and continents.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md sm:shadow-lg">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600 mb-3 sm:mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2 text-sm sm:text-base">Complete Service</h3>
                  <p className="text-xs sm:text-sm text-slate-600">We handle every aspect from music to distribution</p>
                </div>
                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md sm:shadow-lg">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600 mb-3 sm:mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2 text-sm sm:text-base">Global Reach</h3>
                  <p className="text-xs sm:text-sm text-slate-600">Your kalam reaches hearts in 50+ countries</p>
                </div>
                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md sm:shadow-lg">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600 mb-3 sm:mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2 text-sm sm:text-base">Sacred Integrity</h3>
                  <p className="text-xs sm:text-sm text-slate-600">Every project approached with spiritual reverence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
            Ready to Begin Your Sacred Journey?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 mb-6 sm:mb-8 leading-relaxed">
            Join our global community of Sufi writers and experience the complete journey from sacred words 
            to worldwide spiritual impact. Your divine poetry deserves world-class treatment.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/writer/submit"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
            >
              <PenTool className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Submit Your Kalam</span>
            </Link>
            <Link
              href="/process"
              className="inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base"
            >
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>View Full Process</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;