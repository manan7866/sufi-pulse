'use client'
import React from 'react';
import Link from 'next/link';
import {
  Heart, Globe, Users, Award, BookOpen, Star,
  Shield, Zap, Target, Building, Compass, Leaf
} from 'lucide-react';
import { incrementMonthly,incrementWeekly } from '@/lib/increment';
import { useCMSPage } from '@/hooks/useCMSPage';
import { aboutPageFallbackData } from '@/lib/cmsFallbackData';
const WhoWeAre = () => {
  // Fetch CMS data with fallback
  const { data: cmsData } = useCMSPage({
    pageSlug: 'who-we-are',
    fallbackData: aboutPageFallbackData,
    enabled: true
  });

  const pageData = cmsData || aboutPageFallbackData;

  const coreValues = [
    {
      icon: Heart,
      title: "Serve the Divine Word",
      description: "We do not monetize, modify, or exploit kalam. We protect its essence and amplify its reach.",
      color: "text-emerald-600 bg-emerald-50"
    },
    {
      icon: Globe,
      title: "Unite Ummah via Sound",
      description: "From Kashmir to Los Angeles, from Cairo to Kuala Lumpur every soul carrying divine lyrics deserves a global stage.",
      color: "text-emerald-600 bg-emerald-50"
    },
    {
      icon: Shield,
      title: "Produce With Purity",
      description: "No marketing agenda. No monetization. No fame game. Just sincere production powered by sincerity, silence, and surrender.",
      color: "text-emerald-600 bg-emerald-50"
    }
  ];

  const principles = [
    {
      icon: Target,
      title: "Sacred Purpose",
      description: "Every action guided by spiritual intention and service to the divine",
      stats: "100% spiritual focus"
    },
    {
      icon: Zap,
      title: "Innovation in Service",
      description: "Using cutting-edge technology to amplify ancient wisdom",
      stats: "Modern tools, timeless wisdom"
    },
    {
      icon: Users,
      title: "Community First",
      description: "Building bridges between hearts across all boundaries and cultures.",
      stats: "50+ countries connected"
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
        { number: `${incrementWeekly(300)}+`, label: "Sacred Collaborations", description: "Divine kalam brought to life" },
        { number: `${incrementWeekly(89)}+`, label: "Writers", description: "From 50+ countries" },
        { number: `${incrementWeekly(43)}+`, label: "Vocalists", description: "Diverse spiritual voices" },
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
              <Leaf className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Who We Are
            </h1>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20 max-w-5xl mx-auto">
              <p className="text-xl text-slate-300 leading-relaxed mb-6">
                SufiPulse is a spiritually-driven, non-commercial Sufi music production platform and collaboration hub for the global ummah. 
                Founded in the United States and inspired by the legacy of sacred sound, SufiPulse brings together divine writers, vocalists, 
                musicians, and producers in one purpose to amplify the timeless voice of Haqq.
              </p>
              <blockquote className="text-2xl font-light italic text-emerald-300 mb-4">
                "We are not a label. We are a legacy."
              </blockquote>
              <p className="text-slate-300">
                Every kalam submitted here is treated with reverence, every note produced with intention. 
                SufiPulse exists to preserve, elevate, and globally distribute sacred Sufi writings through 
                cinematic, studio-grade productions entirely free of charge.
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

      {/* Core Identity */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Our Sacred Identity
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Understanding who we are through our spiritual foundation and global mission
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-800">A Legacy of Sacred Sound</h3>
              <p className="text-slate-600 leading-relaxed">
                We are not a commercial enterprise seeking profit from sacred content. We are a spiritual service 
                dedicated to preserving and amplifying the divine wisdom of Sufi poetry through world-class production.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Every kalam that enters our platform is treated as a sacred trust. We provide complete production 
                services—from musical arrangement to global distribution—completely free, ensuring that divine poetry 
                reaches the world with the reverence it deserves.
              </p>
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                <h4 className="font-bold text-emerald-800 mb-3">Our Sacred Promise</h4>
                <p className="text-emerald-700 text-sm leading-relaxed">
                  "Our mission is not just to create it is to connect, awaken, and remind."
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-emerald-100 to-slate-100 rounded-2xl p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Compass className="w-12 h-12 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 mb-3">Guided by Sacred Purpose</h4>
                  <p className="text-slate-600 text-sm">
                    Every decision, every collaboration, every production guided by our commitment to serve the divine
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sacred Vows */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="hidden w-20 h-20 bg-emerald-100 rounded-2xl lg:flex items-center justify-center mx-auto mb-6">
              <Globe className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Our Sacred Vows
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our mission is rooted in three sacred vows that guide every aspect of our work
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 text-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${value.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">{value.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vision & Principles */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="hidden lg:flex w-20 h-20 bg-emerald-100 rounded-2xl items-center justify-center mx-auto mb-6">
              <Target className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Our Guiding Principles
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The principles that shape our approach to sacred collaboration
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{principle.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-3">{principle.description}</p>
                  <div className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                    {principle.stats}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sacred Declaration */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-8">
              Our Sacred Declaration
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-800 rounded-2xl p-8 lg:p-12 text-white">
                <blockquote className="text-2xl lg:text-3xl font-light italic text-emerald-300 mb-6 leading-relaxed">
                  "We are not a label. We are a legacy."
                </blockquote>
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  Every kalam submitted here is treated with reverence, every note produced with intention. 
                  SufiPulse exists to preserve, elevate, and globally distribute sacred Sufi writings through 
                  cinematic, studio-grade productions entirely free of charge.
                </p>
                <div className="bg-slate-700 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-emerald-300 mb-3">Our Sacred Promise</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    "Our mission is not just to create it is to connect, awaken, and remind."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Join Our Sacred Legacy
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Now that you know who we are, discover how you can be part of our global spiritual community. 
            Whether through sacred poetry or divine voice, you have a place in our legacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/our-mission"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <BookOpen className="w-5 h-5" />
              <span>Discover Our Mission</span>
            </Link>
            <Link
              href="/join"
              className="inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <Users className="w-5 h-5" />
              <span>Join Community</span>
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

export default WhoWeAre;
