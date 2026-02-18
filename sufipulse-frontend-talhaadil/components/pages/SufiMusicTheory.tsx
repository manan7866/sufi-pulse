'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Music,
  BookOpen,
  Waves,
  Heart,
  Brain,
  Volume2,
  ArrowRight,
  Play,
  Star,
  Eye,
  Clock,
  User,
  Headphones,
  Mic,
  Award,
  Globe,
  CheckCircle
} from 'lucide-react';
import { incrementYearly } from '@/lib/increment';
import { useCMSPage } from '@/hooks/useCMSPage';
import { aboutPageFallbackData } from '@/lib/cmsFallbackData';

const SufiMusicTheory = () => {
  const [activeTab, setActiveTab] = useState('fundamentals');
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const theoryTopics = [
    {
      id: 'fundamentals',
      title: 'Sacred Fundamentals',
      icon: Music,
      description: 'Core principles of Sufi musical expression and spiritual sound',
      content: {
        overview: "Sufi music theory transcends conventional musical analysis, incorporating spiritual dimensions that transform sound into a vehicle for divine connection.",
        principles: [
          "Intention (Niyyah) as the foundation of sacred sound",
          "Breath (Nafas) as the source of spiritual vibration",
          "Rhythm (Wazn) as the heartbeat of divine remembrance",
          "Melody (Lahn) as the pathway to transcendence"
        ],
        applications: [
          "Creating music that serves spiritual elevation",
          "Balancing technical excellence with sacred purpose",
          "Understanding the role of silence in sacred composition",
          "Harmonizing traditional forms with contemporary expression"
        ]
      }
    },
    {
      id: 'maqam',
      title: 'Maqam & Spiritual Modes',
      icon: Waves,
      description: 'How traditional modal systems serve spiritual transformation',
      content: {
        overview: "The maqam system in Sufi music serves not just as a melodic framework, but as a spiritual technology for inducing specific states of consciousness.",
        principles: [
          "Each maqam corresponds to different spiritual states",
          "Modal progression mirrors the journey of the soul",
          "Microtonal inflections carry emotional and spiritual weight",
          "Traditional modes preserve centuries of spiritual wisdom"
        ],
        applications: [
          "Selecting appropriate maqams for different kalam themes",
          "Using modal modulation to enhance spiritual narrative",
          "Preserving authentic traditional expressions",
          "Adapting classical modes for contemporary productions"
        ]
      }
    },
    {
      id: 'rhythm',
      title: 'Sacred Rhythms & Dhikr',
      icon: Heart,
      description: 'The spiritual science of rhythm in divine remembrance',
      content: {
        overview: "Rhythm in Sufi music mirrors the natural rhythms of creation—the heartbeat, the breath, the cosmic cycles—creating resonance between the human soul and divine order.",
        principles: [
          "Rhythmic patterns that synchronize with natural breathing",
          "Polyrhythmic structures reflecting cosmic harmony",
          "The role of acceleration in spiritual ecstasy",
          "Silence and space as integral rhythmic elements"
        ],
        applications: [
          "Designing rhythms that support meditative states",
          "Creating polyrhythmic textures for group dhikr",
          "Using tempo changes to guide spiritual journey",
          "Balancing complexity with accessibility"
        ]
      }
    },
    {
      id: 'acoustics',
      title: 'Sacred Acoustics',
      icon: Volume2,
      description: 'The physics and metaphysics of spiritual sound production',
      content: {
        overview: "Sacred acoustics combines scientific understanding of sound with metaphysical principles, creating environments where the divine can resonate through physical space.",
        principles: [
          "Frequency relationships that promote spiritual states",
          "Acoustic spaces designed for sacred resonance",
          "The role of overtones in mystical experience",
          "Harmonic series as reflection of divine order"
        ],
        applications: [
          "Studio design for optimal spiritual recording",
          "Frequency selection for maximum spiritual impact",
          "Creating acoustic environments for live performance",
          "Understanding the physics of vocal projection in sacred space"
        ]
      }
    }
  ];

  const testimonials = [
    {
      name: "Dr. Hassan Al-Sufi",
      location: "Cairo, Egypt",
      role: "Islamic Musicologist",
      quote: "This theoretical framework bridges the gap between traditional Sufi musical wisdom and contemporary production techniques. Essential reading for any serious practitioner.",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Sister Amina Wadud",
      location: "Istanbul, Turkey",
      role: "Sufi Music Teacher",
      quote: "The depth of understanding presented here honors both the sacred tradition and the needs of modern spiritual seekers. Beautifully comprehensive.",
      image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Prof. Maria Santos",
      location: "Barcelona, Spain",
      role: "Ethnomusicologist",
      quote: "A masterful synthesis of spiritual wisdom and musical science. This work will influence how we understand sacred music for generations to come.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200"
    }
  ];
// These  fields data comming from database cms
const { data: cmsData } = useCMSPage({
  pageSlug: 'sufi-music-theory',
  fallbackData: aboutPageFallbackData,
  enabled: true
});
const pageData = cmsData || aboutPageFallbackData;

const stats =  (pageData.stats && pageData.stats.length > 0)
? pageData.stats.map((stat: any) => ({
    number: stat.stat_number,
    label: stat.stat_label,
    icon: (() => {
      switch (stat.stat_icon) {
        case 'BookOpen': return BookOpen;
        case 'Music': return Music;
        case 'Heart': return Heart;
        case 'Star': return Star;
        case 'Waves': return Waves;
        case 'Brain': return Brain;
        case 'Volume2': return Volume2;
        case 'ArrowRight': return ArrowRight;
        case 'Play': return Play;
        case 'Eye': return Eye;
        case 'Clock': return Clock;
        case 'User': return User;
        case 'Headphones': return Headphones;
        case 'Mic': return Mic;
        case 'Award': return Award;
        case 'Globe': return Globe;
        default: return Music; // Default icon if none matches
      }
    })()
  }))
  :  [
    { number: `1000+`, label: "Years of Tradition", icon: BookOpen },
    { number: `${incrementYearly(25)}+`, label: "Musical Modes", icon: Music },
    { number: `${incrementYearly(50)}+`, label: "Rhythmic Patterns", icon: Heart },
    { number: "∞", label: "Spiritual Applications", icon: Star }
  ];

  const practicalApplications = [
    {
      title: "For Composers",
      description: "Apply sacred principles to create spiritually resonant compositions",
      techniques: ["Modal selection for spiritual themes", "Rhythmic patterns for dhikr", "Harmonic progressions for transcendence"]
    },
    {
      title: "For Vocalists",
      description: "Understand how vocal techniques serve spiritual expression",
      techniques: ["Breath control for sustained dhikr", "Microtonal inflection for emotional depth", "Vocal projection in sacred space"]
    },
    {
      title: "For Producers",
      description: "Technical approaches that honor sacred musical principles",
      techniques: ["Frequency selection for spiritual impact", "Reverb design for sacred space", "Dynamic range for spiritual journey"]
    }
  ];

  const currentTopic = theoryTopics.find(topic => topic.id === activeTab);

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
                  Sufi Music
                  <span className="block text-emerald-400">Theory</span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed">
                  Exploring the sacred science behind spiritual sound. Understanding how traditional
                  Sufi musical principles create pathways to divine connection.
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 border border-emerald-500/20">
                <p className="text-emerald-300 font-medium mb-2 text-sm sm:text-base">Sacred Sound Science</p>
                <blockquote className="text-sm sm:text-base lg:text-lg italic">
                  "Music is the bridge between the material and spiritual worlds"
                </blockquote>
                <cite className="text-emerald-300 text-xs sm:text-sm mt-2 block">— Hazrat Inayat Khan</cite>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/studio"
                  className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
                >
                  <Headphones className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Visit Our Studio</span>
                </Link>
                <Link
                  href="/gallery"
                  className="inline-flex items-center justify-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Hear Applications</span>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] sm:aspect-video bg-slate-800 rounded-lg sm:rounded-xl overflow-hidden shadow-xl">
                <img
                  src="/pics/writer3.jpg"
                  alt="Sufi Music Theory"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                  <h3 className="text-white text-base sm:text-xl font-bold">Sacred Sound Science</h3>
                  <p className="text-slate-200 text-xs sm:text-sm">Where ancient wisdom meets modern understanding</p>
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
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 ">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-slate-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Theory Topics */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">
              Sacred Music Theory Framework
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive exploration of the principles that guide spiritual musical expression
            </p>
          </div>

          {/* Topic Navigation */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
            {theoryTopics.map((topic) => {
              const Icon = topic.icon;
              return (
                <button
                  key={topic.id}
                  onClick={() => setActiveTab(topic.id)}
                  className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${
                    activeTab === topic.id
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{topic.title}</span>
                </button>
              );
            })}
          </div>

          {/* Topic Content */}
          {currentTopic && (
            <div className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-xl border border-slate-100 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-slate-700 p-4 sm:p-6 lg:p-8 text-white">
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <currentTopic.icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
                  <div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">{currentTopic.title}</h3>
                    <p className="text-emerald-100 text-sm sm:text-base">{currentTopic.description}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 lg:p-8">
                {/* Overview - full width */}
                <div className="mb-6 sm:mb-8 lg:mb-10">
                  <h4 className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 mb-3 sm:mb-4">Overview</h4>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{currentTopic.content.overview}</p>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-800 mb-3 sm:mb-4">Core Principles</h4>
                    <ul className="space-y-2 sm:space-y-3">
                      {currentTopic.content.principles.map((principle, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mt-0.5" />
                          <span className="text-slate-600 text-sm sm:text-base">{principle}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-800 mb-3 sm:mb-4">Practical Applications</h4>
                    <ul className="space-y-2 sm:space-y-3">
                      {currentTopic.content.applications.map((application, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Star className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mt-0.5" />
                          <span className="text-slate-600 text-sm sm:text-base">{application}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Practical Applications */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">
              Practical Applications
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
              How sacred music theory translates into real-world spiritual practice
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {practicalApplications.map((application, index) => (
              <div key={index} className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 shadow-md sm:shadow-lg border border-slate-100 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-100 rounded-lg sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  {index === 0 && <Music className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />}
                  {index === 1 && <Mic className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />}
                  {index === 2 && <Headphones className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />}
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 mb-3 sm:mb-4">{application.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-4 sm:mb-6">{application.description}</p>
                <div className="space-y-2">
                  {application.techniques.map((technique, techIndex) => (
                    <div key={techIndex} className="text-xs sm:text-sm text-slate-600 bg-slate-50 rounded-lg p-2">
                      {technique}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
            Apply Sacred Music Theory
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 mb-6 sm:mb-8 leading-relaxed">
            Experience how these theoretical principles come to life in our productions.
            Submit your kalam or join our community to participate in sacred musical collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/writer/submit"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
            >
              <Music className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Submit Your Kalam</span>
            </Link>
            <Link
              href="/studio"
              className="inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base"
            >
              <Headphones className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Visit Our Studio</span>
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center space-x-2 border-2 border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Hear Examples</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SufiMusicTheory;