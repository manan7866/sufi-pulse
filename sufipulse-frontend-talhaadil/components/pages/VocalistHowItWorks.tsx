'use client'
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from 'next/link';
import {
  UserPlus,
  CheckCircle,
  Mic,
  Eye,
  Music,
  Headphones,
  Youtube,
  Globe,
  ArrowDown,
  Users,
  Award,
  Clock,
  Heart,
} from 'lucide-react';
import { incrementWeekly } from '@/lib/increment';
import { useCMSPage } from '@/hooks/useCMSPage';
import { aboutPageFallbackData } from '@/lib/cmsFallbackData';

const VocalistHowItWorks = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const processSteps = [
    {
      number: 1,
      title: "Join Artist Pool",
      subtitle: "Create your free vocalist profile on SufiPulse",
      description: "Submit your vocal range, languages, and sample recordings to join our global pool.",
      icon: UserPlus,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      details: [
        "Complete vocalist profile setup",
        "Upload vocal samples",
        "Specify languages and styles",
        "Join global vocalist community"
      ]
    },
    {
      number: 2,
      title: "Profile Review",
      subtitle: "Our team evaluates your vocal abilities",
      description: "We assess your vocal quality, spiritual alignment, and technical capabilities.",
      icon: CheckCircle,
      color: "from-slate-600 to-slate-700",
      bgColor: "bg-slate-50",
      iconColor: "text-slate-600",
      details: [
        "Vocal quality assessment",
        "Spiritual alignment evaluation",
        "Technical capability review",
        "Welcome to vocalist pool"
      ]
    },
    {
      number: 3,
      title: "Project Assignment",
      subtitle: "Get matched with perfect kalam projects",
      description: "Our team assigns you to kalam that matches your voice, language, and style.",
      icon: Music,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      details: [
        "Perfect voice-kalam matching",
        "Language compatibility",
        "Style alignment",
        "Sacred content pairing"
      ]
    },
    {
      number: 4,
      title: "Kalam Review",
      subtitle: "Study the sacred poetry and musical direction",
      description: "Receive the kalam, musical arrangement, and spiritual context for your performance.",
      icon: Eye,
      color: "from-slate-600 to-slate-700",
      bgColor: "bg-slate-50",
      iconColor: "text-slate-600",
      details: [
        "Sacred poetry study",
        "Musical arrangement review",
        "Spiritual context understanding",
        "Performance preparation"
      ]
    },
    {
      number: 5,
      title: "Recording Session",
      subtitle: "Professional recording at our studio or remotely",
      description: "Record your vocals with our expert engineers, either in-person or through remote coordination.",
      icon: Mic,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      details: [
        "Professional studio recording",
        "Expert engineer guidance",
        "Remote recording support",
        "Multiple take options"
      ]
    },
    {
      number: 6,
      title: "Production & Mixing",
      subtitle: "Your vocals are professionally produced",
      description: "Our team handles all mixing, mastering, and final production work.",
      icon: Headphones,
      color: "from-slate-600 to-slate-700",
      bgColor: "bg-slate-50",
      iconColor: "text-slate-600",
      details: [
        "Professional mixing",
        "Audio mastering",
        "Quality enhancement",
        "Final production polish"
      ]
    },
    {
      number: 7,
      title: "Global Publication",
      subtitle: "Your performance reaches the world",
      description: "Published on YouTube and SufiPulse.com with full credit for your vocal contribution.",
      icon: Youtube,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      details: [
        "YouTube publication",
        "SufiPulse.com feature",
        "Full vocalist credit",
        "Professional presentation"
      ]
    },
    {
      number: 8,
      title: "Spiritual Impact",
      subtitle: "Your voice touches hearts globally",
      description: "Experience the joy of knowing your voice carries sacred words to souls worldwide.",
      icon: Globe,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      details: [
        "Global audience reach",
        "Spiritual impact tracking",
        "Community appreciation",
        "Sacred service fulfillment"
      ]
    }
  ];

  const highlights = [
    {
      icon: Mic,
      title: "100% Free for Vocalists",
      description: "Professional recording and production services at no cost",
      stats: "0 fees, 100% free"
    },
    {
      icon: Users,
      title: "Global Writer Pool",
      description: "Collaborate with sacred poets from around the world",
      stats: "89+ writers worldwide"
    },
    {
      icon: Award,
      title: "Full Credit Always",
      description: "Your vocal contribution prominently displayed everywhere",
      stats: "100% attribution guarantee"
    }
  ];
// These  fields data comming from database cms
const { data: cmsData } = useCMSPage({
  pageSlug: 'vocalist-how-it-works',
  fallbackData: aboutPageFallbackData,
  enabled: true
});
const pageData = cmsData || aboutPageFallbackData;


const stats =  (pageData.stats && pageData.stats.length > 0)
? pageData.stats.map((stat: any) => ({
    number: stat.stat_number,
    label: stat.stat_label,
    icon: stat.stat_icon === 'CheckCircle' ? CheckCircle :
          stat.stat_icon === 'Clock' ? Clock :
          stat.stat_icon === 'Award' ? Award :
          stat.stat_icon === 'Heart' ? Heart : CheckCircle // Default icon
  }))
 :  [
    { number: "8", label: "Simple Steps", icon: CheckCircle },
    { number: "4-6", label: "Weeks Timeline", icon: Clock },
    { number: "100%", label: "Free Service", icon: Award },
    { number: `${incrementWeekly(200)}+`, label: "Successful Collaborations", icon: Heart }
  ];

  const faqs = [
    {
      question: "How long does the vocalist journey take?",
      answer: "From assignment to publication typically takes 4-6 weeks, depending on recording complexity and your availability for sessions."
    },
    {
      question: "Can I suggest changes to the musical arrangement?",
      answer: "Yes! We welcome your input on musical arrangements. Our team values your expertise and will consider suggestions that enhance the spiritual message."
    },
    {
      question: "What if I need multiple recording sessions?",
      answer: "We provide as many sessions as needed to achieve the perfect recording. Quality and spiritual authenticity are more important than speed."
    },
    {
      question: "Do I get to approve the final mix?",
      answer: "Absolutely. You'll receive the final mix for review and approval before publication. We want you to be completely satisfied with the result."
    },
    {
      question: "What languages and styles do you work with?",
      answer: "We work with vocalists in 15+ languages and all styles from traditional Qawwali to contemporary spiritual anthems and whisper kalam."
    },
    {
      question: "Is there really no cost for vocalists?",
      answer: "Completely free. All recording, production, and distribution costs are covered by SufiPulse as our sacred service to the global ummah."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-50">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 to-emerald-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-4 sm:mb-6">
              How It Works for Vocalists
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 mb-3 sm:mb-4 max-w-4xl mx-auto">
              Your Sacred Journey from Voice to Global Spiritual Impact
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-slate-500 max-w-3xl mx-auto mb-6 sm:mb-8">
              Discover the complete SufiPulse vocalist experience—from joining our pool to touching hearts worldwide
            </p>
          </div>
        </div>
      </div>

      {/* Process Timeline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">The Complete Vocalist Journey</h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto">
            Every step designed to honor your sacred voice while providing world-class production support
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-6 sm:left-8 top-0 w-1 h-full bg-gradient-to-b from-emerald-200 to-slate-200 hidden sm:block"></div>

          <div className="space-y-8 sm:space-y-12 lg:space-y-16">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="relative flex items-start">
                  <div className="absolute left-0 sm:left-2 top-4 sm:top-6 w-8 sm:w-10 h-8 sm:h-10 bg-white rounded-full border-4 border-emerald-200 flex items-center justify-center z-10 shadow-md">
                    <span className="text-xs sm:text-sm font-bold text-emerald-600">{step.number}</span>
                  </div>

                  <div className="ml-12 sm:ml-16 w-full">
                    <div className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border border-slate-100 overflow-hidden transform hover:scale-105 transition-all duration-300">
                      <div className={`bg-gradient-to-r ${step.color} p-4 sm:p-5 lg:p-6 text-white`}>
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center">
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-xs sm:text-sm font-medium bg-white/20 px-2 py-1 rounded-full">
                                Step {step.number}
                              </span>
                            </div>
                            <h3 className="text-base sm:text-lg lg:text-xl font-bold">{step.title}</h3>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 sm:p-5 lg:p-6">
                        <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-slate-800 mb-2 sm:mb-3">
                          {step.subtitle}
                        </h4>
                        <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed mb-3 sm:mb-4">
                          {step.description}
                        </p>
                        <ul className="space-y-2">
                          {step.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-center space-x-2 text-xs sm:text-sm text-slate-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {index < processSteps.length - 1 && (
                    <div className="hidden sm:block absolute left-6 sm:left-8 top-full mt-2 sm:mt-4">
                      <ArrowDown className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-300" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enroll or Proceed Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-emerald-50 to-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">
              Begin Your Sacred Vocal Journey
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Join SufiPulse as a vocalist and let your voice carry divine poetry to hearts across the globe.
            </p>
          </div>

          <div className="relative max-w-md mx-auto group">
            <div className="relative z-10">
              <Link
                href="/register"
                className="inline-flex items-center space-x-2 sm:space-x-3 bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-2xl"
              >
                <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Join the Vocalist Pool</span>
              </Link>
            </div>
            <div className="absolute inset-0 bg-emerald-200/30 rounded-lg sm:rounded-xl blur-2xl transform scale-110 group-hover:scale-125 transition-transform duration-500"></div>
          </div>

          <div className="mt-6 sm:mt-8 text-xs sm:text-sm lg:text-base text-slate-500 max-w-lg mx-auto">
            Create your free profile, share your vocal range and samples, and start your sacred journey with SufiPulse today.
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <div className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">
              Why Vocalists Choose SufiPulse
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto">
              Experience the complete journey from sacred voice to global spiritual impact
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-100 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 mb-2 sm:mb-3">{highlight.title}</h3>
                  <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed mb-2 sm:mb-3">{highlight.description}</p>
                  <div className="text-xs sm:text-sm font-medium text-emerald-600 bg-emerald-50 px-2 sm:px-3 py-1 rounded-full inline-block">
                    {highlight.stats}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 ">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-slate-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-slate-50 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600">
              Common questions about the SufiPulse vocalist journey
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg sm:rounded-xl border border-slate-100 shadow-md sm:shadow-lg"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-4 sm:p-6 text-left"
                >
                  <span className="text-sm sm:text-base lg:text-lg font-bold text-slate-800">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                  )}
                </button>

                {openIndex === index && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sacred Promise */}
      <div className="bg-slate-800 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-slate-700 rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">Our Sacred Promise to Vocalists</h2>
            <blockquote className="text-lg sm:text-xl lg:text-2xl text-emerald-300 italic mb-3 sm:mb-4 leading-relaxed">
              "Your voice is a sacred trust. We honor it with world-class production and global reach."
            </blockquote>
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed mb-6 sm:mb-8">
              Every step of this journey is designed to honor your sacred voice while providing the
              technical excellence and spiritual reverence your performance deserves. From assignment
              to global publication, we handle everything while ensuring your vocal contribution is
              always prominently credited.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-200"
              >
                <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Begin Your Journey</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Summary */}
      <div className="bg-emerald-50 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-3 sm:mb-4">Journey Timeline</h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600">Typical timeframes for each stage of the vocalist process</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 lg:gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md">
                  <span className="text-xs sm:text-sm font-bold text-emerald-600">{step.number}</span>
                </div>
                <h4 className="text-xs sm:text-sm font-medium text-slate-800 mb-1">{step.title}</h4>
                <div className="flex items-center justify-center space-x-1 text-xs sm:text-sm text-slate-500">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
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

export default VocalistHowItWorks;