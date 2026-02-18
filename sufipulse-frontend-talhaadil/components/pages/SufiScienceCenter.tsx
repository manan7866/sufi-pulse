"use client"

import React from 'react';
import Link from 'next/link';
import {
  Star,
  BookOpen,
  Users,
  Award,
  Globe,
  Heart,
  ArrowRight,
  Microscope,
  GraduationCap,
  Library,
  Search,
  FileText,
  Lightbulb,
  CheckCircle,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Brain,
  Waves,
  Eye,
  Music,
  FlaskConical,
  Compass
} from 'lucide-react';
import { incrementWeekly } from '@/lib/increment';
import { useCMSPage } from '@/hooks/useCMSPage';
import { aboutPageFallbackData } from '@/lib/cmsFallbackData';



const SufiScienceCenter = () => {
  const researchAreas = [
    {
      icon: Music,
      title: "The Science of Zikr and Acoustic Healing",
      description: "Exploring the therapeutic and spiritual effects of sacred sound, rhythm, and repetitive remembrance practices.",
      focus: [
        "Acoustic healing properties of sacred chants",
        "Neurological effects of rhythmic zikr",
        "Sound frequency and spiritual states",
        "Therapeutic applications of Sufi music"
      ]
    },
    {
      icon: Brain,
      title: "Neuro-mysticism and Spiritual Frequency",
      description: "Investigating the intersection of neuroscience and mystical experience through modern scientific methods.",
      focus: [
        "Brain patterns during spiritual states",
        "Frequency analysis of mystical experiences",
        "Consciousness and divine connection",
        "Neuroplasticity and spiritual practice"
      ]
    },
    {
      icon: Waves,
      title: "Sound, Intention, and Consciousness",
      description: "Research into how intentional sound production affects consciousness and spiritual awareness.",
      focus: [
        "Intention's effect on sound waves",
        "Consciousness alteration through music",
        "Sacred geometry in sound patterns",
        "Vibrational healing methodologies"
      ]
    },
    {
      icon: Heart,
      title: "Sufi Psychology and Poetic Cognition",
      description: "Understanding the psychological and cognitive aspects of Sufi poetry and its impact on human consciousness.",
      focus: [
        "Poetry's effect on emotional states",
        "Cognitive processing of mystical language",
        "Therapeutic applications of sacred verse",
        "Memory and spiritual transformation"
      ]
    }
  ];

  const centerInitiatives = [
    {
      title: "Mystical Think Tank",
      description: "A spiritual research laboratory exploring the intersection of ancient wisdom and modern science",
      impact: "Bridging millennia of knowledge"
    },
    {
      title: "Technological Sanctuary",
      description: "Using cutting-edge technology to preserve and analyze sacred traditions",
      impact: "Digital preservation of wisdom"
    },
    {
      title: "Metaphysical Research Lab",
      description: "Scientific investigation into the nature of spiritual experience and divine connection",
      impact: "Quantifying the sacred"
    }
  ];

  const sufipulseGuidance = [
    {
      title: "Lyrical Vision",
      description: "Ensuring every kalam maintains spiritual authenticity and poetic integrity",
      methods: ["Spiritual content analysis", "Traditional form verification", "Cultural authenticity checks"]
    },
    {
      title: "Sonic Vision",
      description: "Guiding musical arrangements to enhance rather than overshadow sacred content",
      methods: ["Frequency optimization", "Acoustic healing principles", "Sacred sound design"]
    },
    {
      title: "Scientific Design",
      description: "Applying research findings to create productions that maximize spiritual impact",
      methods: ["Evidence-based production", "Consciousness-enhancing techniques", "Therapeutic sound application"]
    }
  ];
// These  fields data comming from database cms
const { data: cmsData } = useCMSPage({
  pageSlug: 'sufi-science-center',
  fallbackData: aboutPageFallbackData,
  enabled: true
});
const pageData = cmsData || aboutPageFallbackData;

const stats =  (pageData.stats && pageData.stats.length > 0)
? pageData.stats.map((stat: any) => ({
    number: stat.stat_number,
    label: stat.stat_label,
    description: stat.stat_description,
    
  }))
  :  [
    { number: "2025", label: "Established", description: "Founded as research center" },
    { number: `${incrementWeekly(25)}+`, label: "Research Projects", description: "Active investigations" },
    { number: `${incrementWeekly(100)}+`, label: "Publications", description: "Scientific papers" },
    { number: "∞", label: "Discoveries", description: "Ongoing revelations" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <div className="w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Microscope className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Sufi Science Center
            </h1>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20 max-w-5xl mx-auto">
              <p className="text-xl text-slate-300 leading-relaxed mb-6">
                The Sufi Science Center is the mystical think tank behind SufiPulse. Bridging ancient Sufi metaphysics
                with modern scientific thought, the center explores the profound connections between spirituality,
                consciousness, and sound.
              </p>
              <blockquote className="text-2xl font-light italic text-emerald-300 mb-4">
                "From the silence of the faqeer to the surge of the chorus we are led by science, but governed by silence."
              </blockquote>
              <p className="text-slate-300">
                The center mentors the lyrical and sonic vision of SufiPulse, ensuring that every production
                reflects both divine depth and scientific design.
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

      {/* Research Areas */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <div className="flex flex-col items-center mb-3 sm:mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-100 rounded-xl flex items-center justify-center">
                <FlaskConical className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mt-2 sm:mt-3">
                Research Areas
              </h2>
            </div>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto px-2 sm:px-0">
              Comprehensive scientific investigation into the mystical dimensions of sound, consciousness, and spiritual experience
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {researchAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-md sm:shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3">{area.title}</h3>
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{area.description}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-800 text-xs sm:text-sm mb-2 sm:mb-3">Research Focus:</h4>
                    {area.focus.map((focus, focusIndex) => (
                      <div key={focusIndex} className="flex items-start space-x-2">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500 mt-0.5" />
                        <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">{focus}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Center as Revolution */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FlaskConical className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              A Revolution in Thought
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              The Sufi Science Center was born as a spiritual think tank, a technological sanctuary, a metaphysical research lab.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {centerInitiatives.map((initiative, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 text-center">
                <Lightbulb className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-800 mb-3">{initiative.title}</h3>
                <p className="text-slate-600 text-sm mb-3 leading-relaxed">{initiative.description}</p>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  {initiative.impact}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="bg-slate-800 rounded-2xl p-8 text-white max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-emerald-300 mb-4">Sacred Declaration</h3>
              <p className="text-slate-300 font-medium">
                "The SSC is not just an institution. It is a metaphysical uprising."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SufiPulse Guidance */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Compass className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Guiding SufiPulse Productions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The center mentors the lyrical and sonic vision of SufiPulse, ensuring every production reflects both divine depth and scientific design
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {sufipulseGuidance.map((guidance, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                <h3 className="text-xl font-bold text-slate-800 mb-4">{guidance.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6">{guidance.description}</p>
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-800 text-sm mb-3">Methods:</h4>
                  {guidance.methods.map((method, methodIndex) => (
                    <div key={methodIndex} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                      <span className="text-sm text-slate-600 leading-relaxed">{method}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Sacred Science Declaration */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-8">
              Sacred Science Declaration
            </h2>
            <div className="max-w-4xl mx-auto">
              <blockquote className="text-2xl lg:text-3xl font-light italic text-slate-700 leading-relaxed mb-8">
                "From the silence of the faqeer to the surge of the chorus we are led by science, but governed by silence."
              </blockquote>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                The Sufi Science Center represents a revolutionary approach to understanding spirituality through
                scientific inquiry. We bridge the gap between ancient mystical wisdom and modern scientific
                understanding, creating a new paradigm for spiritual research and application.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2">Scientific Rigor</h3>
                  <p className="text-sm text-slate-600">Applying modern research methods to ancient wisdom</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2">Spiritual Integrity</h3>
                  <p className="text-sm text-slate-600">Maintaining reverence while pursuing understanding</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2">Practical Application</h3>
                  <p className="text-sm text-slate-600">Translating research into meaningful spiritual practice</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Beautiful Website Link Section */}
          <div className="bg-gradient-to-r from-emerald-600 to-slate-700 rounded-2xl p-8 mb-12 border border-emerald-500/20">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-2">Visit Our Official Website</h3>
                <p className="text-emerald-200">Explore the complete Sufi Science Center experience</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
              <p className="text-white text-lg mb-4">
                Discover our complete research archive, academic publications, and ongoing projects
                at the official Sufi Science Center website.
              </p>
              <div className="flex items-center justify-center space-x-2 text-emerald-200 mb-4">
                <Globe className="w-5 h-5" />
                <span className="font-mono text-sm lg:text-lg">sufisciencecenter.info</span>
              </div>
            </div>
            <a
              href="https://sufisciencecenter.info/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-xl"
            >
              <Globe className="hidden lg:flex w-6 h-6" />
              <span>Visit Sufi Science Center</span>
              <ArrowRight className="w-6 h-6" />
            </a>
            <p className="text-emerald-200 text-sm mt-4">
              Opens in new window • Official research portal
            </p>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Advance Sacred Science
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Join our research community or benefit from our scientific oversight through SufiPulse.
            Together, we ensure that sacred wisdom is preserved and shared with both spiritual reverence and scientific rigor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/acknowledgments"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <Award className="w-5 h-5" />
              <span>Acknowledgments</span>
            </Link>
            <Link
              href="/join"
              className="inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <Users className="w-5 h-5" />
              <span>Join SufiPulse</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 border-2 border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <Heart className="w-5 h-5" />
              <span>Research Inquiry</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SufiScienceCenter;