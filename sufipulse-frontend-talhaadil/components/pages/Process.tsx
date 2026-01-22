'use client'

import React from 'react';
import { useState } from 'react';
import {
  UserPlus,
  CheckCircle,
  Upload,
  Eye,
  Music,
  Headphones,
  Youtube,
  Globe,
  ArrowDown,
  PenTool,
  Users,
  Award,
  Clock,
  Star,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const Process = () => {

  const steps = [
    {
      number: 1,
      title: "Enroll as Writer",
      subtitle: "Create your free profile on SufiPulse",
      description: "Add your name, country, Sufi influence, and upload a sample kalam.",
      icon: UserPlus,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      details: [
        "Complete writer profile setup",
        "Share your spiritual background",
        "Upload sample kalam for review",
        "Connect with our community"
      ]
    },
    {
      number: 2,
      title: "Profile Approval",
      subtitle: "Our editorial team reviews your submission",
      description: "Only spiritually aligned writers are accepted.",
      icon: CheckCircle,
      color: "from-slate-600 to-slate-700",
      bgColor: "bg-slate-50",
      iconColor: "text-slate-600",
      details: [
        "Editorial team review process",
        "Spiritual alignment assessment",
        "Quality and authenticity check",
        "Welcome to the community"
      ]
    },
    {
      number: 3,
      title: "Submit Your Lyrics",
      subtitle: "Upload your divine kalam via dashboard",
      description: "Add theme, vocal style, and optional audio.",
      icon: Upload,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      details: [
        "Easy dashboard submission",
        "Multiple language support",
        "Theme and style selection",
        "Optional melody upload"
      ]
    },
    {
      number: 4,
      title: "Lyrics Reviewed",
      subtitle: "Lyrics reviewed for rhythm, depth & clarity",
      description: "We may suggest edits for spiritual-musical adaptation.",
      icon: Eye,
      color: "from-slate-600 to-slate-700",
      bgColor: "bg-slate-50",
      iconColor: "text-slate-600",
      details: [
        "Professional editorial review",
        "Rhythm and flow analysis",
        "Spiritual depth assessment",
        "Collaborative refinement"
      ]
    },
    {
      number: 5,
      title: "Music & Singer Assigned",
      subtitle: "SufiPulse creates studio-grade music",
      description: "We assign either a local or global Urdu/English vocalist to bring your kalam to life. Translation provided if needed.",
      icon: Music,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      details: [
        "Professional musical arrangement",
        "Perfect vocalist matching",
        "Translation services available",
        "Studio-grade production"
      ]
    },
    {
      number: 6,
      title: "Final Production",
      subtitle: "You receive the full final track for review",
      description: "You can approve or suggest small changes.",
      icon: Headphones,
      color: "from-slate-600 to-slate-700",
      bgColor: "bg-slate-50",
      iconColor: "text-slate-600",
      details: [
        "High-quality preview delivery",
        "Your approval required",
        "Minor adjustments possible",
        "Final quality assurance"
      ]
    },
    {
      number: 7,
      title: "Publish on Our Channel",
      subtitle: "Song is published with your full credit",
      description: "Your name appears as Lyricist / Writer / Composer on YouTube & SufiPulse.com.",
      icon: Youtube,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      details: [
        "Full authorship credit",
        "YouTube channel publication",
        "SufiPulse.com feature",
        "Professional presentation"
      ]
    },
    {
      number: 8,
      title: "Global Exposure",
      subtitle: "Shared with the world through our network",
      description: "No fees. No monetization. Just sacred sharing.",
      icon: Globe,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      details: [
        "Worldwide distribution",
        "Social media promotion",
        "Community sharing",
        "Spiritual impact tracking"
      ]
    }
  ];

  const highlights = [
    {
      icon: PenTool,
      title: "100% Free for Writers",
      description: "Complete production services at no cost",
      stats: "0 fees, 100% free"
    },
    {
      icon: Users,
      title: "Global Vocalist Pool",
      description: "Matched with the perfect voice for your kalam",
      stats: "43+ vocalists worldwide"
    },
    {
      icon: Award,
      title: "Full Credit Always",
      description: "Your authorship prominently displayed everywhere",
      stats: "100% attribution guarantee"
    }
  ];

  const testimonials = [
    {
      name: "Amina Rahman",
      location: "Karachi, Pakistan",
      quote: "The process was seamless and respectful. My kalam reached audiences I never imagined possible.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Dr. Sarah Ahmed",
      location: "London, UK",
      quote: "SufiPulse handled everything professionally while maintaining the spiritual integrity of my work.",
      image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200"
    }
  ];

  const faqs = [
    {
      question: "How long does the entire process take?",
      answer: "From submission to publication typically takes 4-8 weeks, depending on the complexity of musical arrangement and vocalist availability."
    },
    {
      question: "Can I suggest a specific vocalist?",
      answer: "You can express preferences, but our team makes the final selection based on what best serves your kalam's spiritual message and musical requirements."
    },
    {
      question: "What if I want to make changes after production?",
      answer: "You'll receive the final track for review before publication. Minor adjustments can be made, though major changes may require restarting the production process."
    },
    {
      question: "Do I retain rights to my lyrics?",
      answer: "Yes, you retain full authorship of your original lyrics. SufiPulse receives a non-commercial license to produce and share the musical adaptation globally."
    },
    {
      question: "What languages do you accept?",
      answer: "We accept kalam in any language. Our translation team can create faithful Urdu or English adaptations while preserving the spiritual essence."
    },
    {
      question: "Is there really no cost involved?",
      answer: "Absolutely none. This is our sacred service to the global ummah. All production, recording, and distribution costs are covered by SufiPulse."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? null : index)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-50">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 to-emerald-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 mb-6">
              How It Works
            </h1>
            <p className="text-xl lg:text-2xl text-slate-600 mb-4 max-w-4xl mx-auto">
              Your Sacred Journey from Divine Words to Global Voice
            </p>
            <p className="text-lg text-slate-500 max-w-3xl mx-auto mb-8">
              Discover the complete SufiPulse writer experience—from enrollment to worldwide spiritual impact
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105">
                Start Your Journey
              </button>
              <button className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Process Timeline */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">The Complete Journey</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Every step designed to honor your sacred words while providing world-class production
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald-200 to-slate-200 hidden lg:block"></div>

          <div className="space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div key={step.number} className={`relative flex items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white rounded-full border-4 border-emerald-200 items-center justify-center z-10 hidden lg:flex shadow-lg">
                    <span className="text-2xl font-bold text-emerald-600">{step.number}</span>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full lg:w-5/12 ${isEven ? 'lg:pr-16' : 'lg:pl-16'}`}>
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden transform hover:scale-105 transition-all duration-300">
                      {/* Card Header */}
                      <div className={`bg-gradient-to-r ${step.color} p-6 text-white`}>
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded-full">
                                Step {step.number}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold">{step.title}</h3>
                          </div>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6">
                        <h4 className="text-lg font-semibold text-slate-800 mb-3">
                          {step.subtitle}
                        </h4>
                        <p className="text-slate-600 leading-relaxed mb-4">
                          {step.description}
                        </p>
                        <ul className="space-y-2">
                          {step.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-center space-x-2 text-sm text-slate-600">
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Timeline Indicator */}
                  <div className="lg:hidden absolute -left-4 top-8 w-8 h-8 bg-white rounded-full border-4 border-emerald-200 flex items-center justify-center shadow-lg">
                    <span className="text-sm font-bold text-emerald-600">{step.number}</span>
                  </div>

                  {/* Arrow for larger screens */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-full mt-8">
                      <ArrowDown className="w-6 h-6 text-emerald-300" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Key Highlights */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Why Writers Choose SufiPulse
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experience the complete journey from sacred words to global spiritual impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{highlight.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-3">{highlight.description}</p>
                  <div className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                    {highlight.stats}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

     
      {/* FAQ Section */}
      <div className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600">Common questions about the SufiPulse writer journey</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-xl border border-slate-100"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-6 text-left"
                >
                  <span className="text-lg font-semibold text-slate-800">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-slate-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-600" />
                  )}
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      );

      {/* Sacred Promise */}
      <div className="bg-slate-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-slate-700 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Our Sacred Promise</h2>
            <blockquote className="text-2xl text-emerald-300 italic mb-6 leading-relaxed">
              "We don't sell divine lyrics. We amplify them. Submit your kalam. Let the ummah hear its pulse."
            </blockquote>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              Every step of this journey is designed to honor your sacred words while providing them with the
              world-class production they deserve. From the moment you submit your kalam to its global release,
              we handle everything—completely free—while ensuring your authorship is always prominently credited.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/login'}

                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors duration-200">
                Begin Your Journey
              </button>
              <button
                onClick={
                  () => window.location.href = '/gallery'
                }
                className="bg-slate-600 hover:bg-slate-500 text-white px-8 py-4 rounded-xl font-semibold transition-colors duration-200">
                View Sample Works
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Summary */}
      <div className="bg-emerald-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Journey Timeline</h2>
            <p className="text-slate-600">Typical timeframes for each stage of the process</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <span className="text-sm font-bold text-emerald-600">{step.number}</span>
                </div>
                <h4 className="text-xs font-medium text-slate-800 mb-1">{step.title}</h4>
                <div className="flex items-center justify-center space-x-1 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>
                    {index < 2 ? '1-2 days' :
                      index < 4 ? '3-5 days' :
                        index < 6 ? '1-2 weeks' : '1-3 days'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;