"use client"

import React from 'react';
import Link from 'next/link';
import { 
  Heart, 
  Globe, 
  Users, 
  Award, 
  BookOpen, 
  Star, 
  ArrowRight, 
  Target,
  Compass,
  Shield,
  Music,
  CheckCircle,
  Mic
} from 'lucide-react';
import { incrementWeekly } from '@/lib/increment';
import { useCMSPage } from '@/hooks/useCMSPage';
import { ourMissionPageFallbackData } from '@/lib/cmsFallbackData';

const OurMission = () => {
  // Fetch CMS data with fallback
  const { data: cmsData } = useCMSPage({
    pageSlug: 'our-mission',
    fallbackData: ourMissionPageFallbackData,
    enabled: true
  });

  const pageData = cmsData || ourMissionPageFallbackData;

  const missionPillars = [
    {
      icon: Heart,
      title: "To Serve the Divine Word",
      description: "We do not monetize, modify, or exploit kalam. We protect its essence and amplify its reach.",
      stats: "300+ Kalam Protected",
      color: "text-emerald-600 bg-emerald-50"
    },
    {
      icon: Globe,
      title: "Unity Through Sound",
      description: "From Kashmir to Los Angeles, from Cairo to Kuala Lumpur we believe every soul carrying divine lyrics deserves a global stage.",
      stats: "50+ Countries Connected",
      color: "text-emerald-600 bg-emerald-50"
    },
    {
      icon: Shield,
      title: "To Produce With Purity",
      description: "No marketing agenda. No monetization. No fame game. Just sincere production powered by sincerity, silence, and surrender.",
      stats: "100% Pure Intention",
      color: "text-emerald-600 bg-emerald-50"
    }
  ];

  const visionElements = [
    {
      icon: Target,
      title: "Sacred Purpose",
      description: "To create the world's most comprehensive archive of contemporary Sufi kalam while honoring traditional forms"
    },
    {
      icon: Compass,
      title: "Spiritual Direction",
      description: "Guided by the principle that technology should serve the sacred, not commercialize it"
    },
    {
      icon: Heart,
      title: "Divine Service",
      description: "Operating as a spiritual offering to the global ummah, transcending commercial interests"
    }
  ];
// These fields data coming from database cms
  const stats = (pageData.stats && pageData.stats.length > 0)
    ? pageData.stats.map((stat: any) => ({
        number: stat.stat_number,
        label: stat.stat_label,
        description: stat.stat_description
      }))
    : [
        { number: `${incrementWeekly(89)}+`, label: "Writers", description: "Global contributors" },
        { number: "43", label: "Vocalists", description: "Sacred voices" },
        { number: "300+", label: "Collaborations", description: "Divine productions" },
        { number: "100%", label: "Free Service", description: "No cost to writers ever" }
      ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <div className="w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Our Mission
            </h1>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20 max-w-5xl mx-auto">
              <blockquote className="text-2xl lg:text-3xl font-light italic text-emerald-300 mb-6 leading-relaxed">
                "Our mission is rooted in three sacred vows"
              </blockquote>
              <p className="text-xl text-slate-300 leading-relaxed">
                Serving the divine through the preservation, production, and global sharing of sacred Sufi kalam, 
                guided by sincerity, silence, and surrender to the Divine Will.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-slate-800 mb-1">{stat.label}</div>
                <div className="text-sm text-slate-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Sacred Vows */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Shield className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Three Sacred Vows
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The foundational commitments that drive our sacred work and global impact
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {missionPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${pillar.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">{pillar.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">{pillar.description}</p>
                  <div className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                    {pillar.stats}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vision & Direction */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Compass className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Vision for Global Spiritual Unity
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our guiding vision for connecting hearts across the world through sacred expression
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {visionElements.map((element, index) => {
              const Icon = element.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{element.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{element.description}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
            <div className="text-center mb-8">
              <Music className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Our Complete Process</h3>
              <p className="text-slate-600 max-w-2xl mx-auto">
                From sacred submission to global inspiration - how we fulfill our mission
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">Receive Kalam</h4>
                <p className="text-sm text-slate-600">Writers submit sacred poetry</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Music className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">Create Music</h4>
                <p className="text-sm text-slate-600">Professional musical arrangement</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mic className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">Record Vocals</h4>
                <p className="text-sm text-slate-600">Global vocalists bring words to life</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">Share Globally</h4>
                <p className="text-sm text-slate-600">Worldwide distribution and impact</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sacred Promise */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Heart className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-8">
              Our Sacred Promise
            </h2>
            <div className="max-w-4xl mx-auto">
              <blockquote className="text-2xl lg:text-3xl font-light italic text-slate-700 leading-relaxed mb-8">
                "Our mission is not just to create it is to connect, awaken, and remind."
              </blockquote>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Every step of our mission is designed to honor sacred words while providing them with the 
                world-class production they deserve. From the moment kalam is submitted to its global release, 
                we handle everything—completely free—while ensuring the spiritual integrity remains intact.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2">Complete Service</h3>
                  <p className="text-sm text-slate-600">From musical arrangement to global distribution</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2">Spiritual Integrity</h3>
                  <p className="text-sm text-slate-600">Maintaining authenticity in every production</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2">Global Impact</h3>
                  <p className="text-sm text-slate-600">Reaching hearts in 50+ countries worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Be Part of Our Sacred Mission
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Understanding our mission is the first step. Now discover how you can contribute to this 
            global spiritual collaboration and help us amplify divine voices worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ethical-policy"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <Shield className="w-5 h-5" />
              <span>Our Ethical Policy</span>
            </Link>
            <Link
              href="/join"
              className="inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <Users className="w-5 h-5" />
              <span>Join Our Mission</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 border-2 border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <Heart className="w-5 h-5" />
              <span>Connect With Us</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurMission;
