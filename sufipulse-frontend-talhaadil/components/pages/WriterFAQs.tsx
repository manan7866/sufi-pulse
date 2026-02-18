'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  BookOpen, 
  Users, 
  Award, 
  Globe,
  ArrowRight,
  CheckCircle,
  Heart,
  Play,
  PenTool
} from 'lucide-react';
import { incrementWeekly, incrementMonthly } from '@/lib/increment';
import { useCMSPage } from '@/hooks/useCMSPage';
import { aboutPageFallbackData } from '@/lib/cmsFallbackData';

const WriterFAQs = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const faqCategories = [
    {
      title: "Getting Started",
      icon: BookOpen,
      faqs: [
        {
          question: "How do I become a SufiPulse writer?",
          answer: "Simply create a free account, complete your writer profile with your spiritual background, and submit a sample kalam for review. Our editorial team will assess your submission for spiritual alignment and quality. Once approved, you can start submitting your sacred poetry through our dashboard."
        },
        {
          question: "What languages do you accept?",
          answer: "We accept kalam in any language! Our most common submissions are in Urdu, English, Arabic, Persian, Turkish, and Kashmiri. If your kalam is in a language we don't have vocalists for, our translation team can create faithful adaptations while preserving the spiritual essence."
        },
        {
          question: "Do I need any musical experience?",
          answer: "Not at all! You focus purely on the sacred poetry - we handle everything else. Our team takes care of musical arrangement, vocalist selection, recording, production, and distribution. Your role is to create beautiful, spiritually meaningful kalam."
        },
        {
          question: "Is there really no cost to writers?",
          answer: "Absolutely none. SufiPulse is a spiritual service to the global ummah. All production costs - from musical arrangement to professional recording to global distribution - are covered by our foundation. This is our sacred commitment to amplifying divine voices."
        }
      ]
    },
    {
      title: "Submission Process",
      icon: Users,
      faqs: [
        {
          question: "How long does the review process take?",
          answer: "Initial profile review typically takes 1-2 days. Once approved, individual kalam submissions are reviewed within 3-5 days. The complete journey from submission to publication usually takes 4-8 weeks, depending on musical complexity and vocalist availability."
        },
        {
          question: "Can I suggest a specific musical style?",
          answer: "Yes! When submitting your kalam, you can indicate preferences for Qawwali, Chant, Anthem, or Whisper Kalam styles. However, our musical directors make the final decision based on what best serves your kalam's spiritual message and emotional depth."
        },
        {
          question: "What if I want to make changes after submission?",
          answer: "Minor edits can be made during the editorial review phase. Once production begins, changes become more complex. You'll receive the final track for approval before publication, where small adjustments can still be requested."
        },
        {
          question: "Can I submit kalam I've published elsewhere?",
          answer: "We prefer original, unpublished work to ensure your SufiPulse collaboration is unique. If you have previously published kalam that you'd like to adapt or reimagine, please discuss this during submission."
        }
      ]
    },
    {
      title: "Rights & Recognition",
      icon: Award,
      faqs: [
        {
          question: "Do I retain rights to my lyrics?",
          answer: "Yes, you retain full authorship and copyright of your original lyrics. SufiPulse receives a non-commercial license to produce, publish, and promote the musical adaptation globally. Your name is prominently credited as the writer/lyricist across all platforms."
        },
        {
          question: "How is my authorship credited?",
          answer: "Your name appears prominently as 'Lyricist' or 'Writer' on YouTube, our website, and all promotional materials. We also include your location and brief bio when space permits. Full attribution is a core principle of our service."
        },
        {
          question: "Can I use the produced track for my own purposes?",
          answer: "Yes! You receive a high-quality copy of the final production for your personal use, sharing with family/friends, and non-commercial purposes. For any commercial use, please coordinate with our team."
        },
        {
          question: "What if my kalam becomes very popular?",
          answer: "We celebrate your success! Popular kalam may be featured more prominently on our platforms, included in special playlists, or highlighted in our community showcases. All recognition and credit remains with you as the original writer."
        }
      ]
    },
    {
      title: "Community & Support",
      icon: Globe,
      faqs: [
        {
          question: "How can I connect with other writers?",
          answer: "Our writer community connects through the dashboard messaging system, community forums, and occasional virtual gatherings. We also feature writer spotlights and collaborative opportunities for cross-cultural projects."
        },
        {
          question: "Do you provide feedback on rejected submissions?",
          answer: "Yes, we provide constructive feedback to help you understand our editorial perspective and improve future submissions. Our goal is to support your spiritual and artistic growth within the Sufi tradition."
        },
        {
          question: "Can I collaborate with specific vocalists?",
          answer: "While we make the final vocalist selection based on what best serves your kalam, you can express preferences. Our team considers your input alongside musical requirements, language needs, and spiritual alignment."
        },
        {
          question: "How do I track my submission's progress?",
          answer: "Your writer dashboard provides real-time updates on each submission's status - from editorial review through recording to final publication. You'll also receive email notifications at key milestones."
        }
      ]
    }
  ];

  const testimonials = [
    {
      name: "Amina Rahman",
      location: "Karachi, Pakistan",
      role: "Featured Writer",
      quote: "The FAQ section answered all my questions before I even started. The transparency and clarity made joining SufiPulse feel like coming home.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Dr. Sarah Ahmed",
      location: "London, UK",
      role: "Contemporary Poet",
      quote: "Having all the information upfront helped me understand the sacred commitment I was making. The process exceeded every expectation.",
      image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Ahmad Hassan",
      location: "Damascus, Syria",
      role: "Multilingual Writer",
      quote: "The FAQs showed me this wasn't just a platform, but a spiritual community dedicated to honoring sacred poetry.",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200"
    }
  ];
// These  fields data comming from database cms
const { data: cmsData } = useCMSPage({
  pageSlug: 'writer-faqs',
  fallbackData: aboutPageFallbackData,
  enabled: true
});
const pageData = cmsData || aboutPageFallbackData;


const stats =  (pageData.stats && pageData.stats.length > 0)
? pageData.stats.map((stat: any) => ({
    number: stat.stat_number,
    label: stat.stat_label,
    icon: stat.stat_icon === 'Users' ? Users :
          stat.stat_icon === 'BookOpen' ? BookOpen :
          stat.stat_icon === 'Globe' ? Globe :
          stat.stat_icon === 'Award' ? Award :
          Users // default icon
  }))
:  [
    { number: `${incrementWeekly(89)}+`, label: "Active Writers", icon: Users },
    { number: `${incrementWeekly(300)}+`, label: "Kalam Published", icon: BookOpen },
    { number: `${incrementMonthly(17,50)}+`, label: "Languages", icon: Globe },
    { number: "100%", label: "Free Service", icon: Award }
  ];

  const toggleFAQ = (categoryIndex: number, faqIndex: number) => {
    const globalIndex = categoryIndex * 100 + faqIndex;
    setOpenFAQ(openFAQ === globalIndex ? null : globalIndex);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  Writer
                  <span className="block text-emerald-400">FAQs</span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed">
                  Everything you need to know about joining our global community of Sufi writers. 
                  Your questions answered with transparency and care.
                </p>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-emerald-500/20">
                <p className="text-emerald-300 font-medium text-sm sm:text-base mb-2">Quick Start Guide</p>
                <blockquote className="text-sm sm:text-lg italic">
                  "Create profile → Submit sample → Get approved → Start your spiritual collaboration journey!"
                </blockquote>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/writer/submit"
                  className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
                >
                  <PenTool className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Submit Your Kalam</span>
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center space-x-2 border-2 border-white/30 hover:border-emerald-400 text-white hover:text-emerald-400 px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base"
                >
                  <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>How It Works</span>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-slate-800 rounded-xl overflow-hidden shadow-xl">
                <img
                  src="/pics/writer2.jpg"
                  alt="Writer Support"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                  <h3 className="text-white text-lg sm:text-xl font-bold ">Complete Writer Support</h3>
                  <p className="text-slate-200 text-xs sm:text-sm">All your questions answered with care and transparency</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-1 sm:mb-2">{stat.number}</div>
                  <div className="text-slate-600 text-sm sm:text-base font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
              Common questions about joining our global community of Sufi writers
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {faqCategories.map((category, categoryIndex) => {
              const Icon = category.icon;
              return (
                <div key={categoryIndex} className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100">
                  <div className="bg-gradient-to-r from-emerald-600 to-slate-700 p-4 sm:p-6 text-white">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      <h2 className="text-lg sm:text-xl font-bold">{category.title}</h2>
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    <div className="space-y-4">
                      {category.faqs.map((faq, faqIndex) => {
                        const globalIndex = categoryIndex * 100 + faqIndex;
                        const isOpen = openFAQ === globalIndex;
                        
                        return (
                          <div key={faqIndex} className="border border-slate-200 rounded-lg overflow-hidden">
                            <button
                              onClick={() => toggleFAQ(categoryIndex, faqIndex)}
                              className="w-full flex items-center justify-between p-3 sm:p-4 text-left hover:bg-slate-50 transition-colors duration-200"
                            >
                              <h3 className="font-semibold text-slate-800 pr-4 text-sm sm:text-base">{faq.question}</h3>
                              {isOpen ? (
                                <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 flex-shrink-0" />
                              ) : (
                                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 flex-shrink-0" />
                              )}
                            </button>
                            
                            {isOpen && (
                              <div className="px-3 sm:px-4 pb-4 border-t border-slate-100">
                                <p className="text-slate-600 leading-relaxed pt-3 sm:pt-4 text-sm sm:text-base">{faq.answer}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
            >
              <span>Still Have Questions? Contact Us</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">
              Quick Start Guide
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
              Ready to begin? Follow these simple steps to join our sacred community
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3">1. Create Profile</h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Sign up and complete your writer profile with spiritual background and sample kalam
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3">2. Get Approved</h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Our team reviews your submission for spiritual alignment and quality within 1-2 days
              </p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <PenTool className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3">3. Start Creating</h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Submit your sacred kalam and watch it transform into global spiritual inspiration
              </p>
            </div>
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Link
              href="/how-it-works"
              className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base"
            >
              <span>View Complete Process</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-12 sm:py-16 lg:py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-6 sm:mb-8">
              Our Sacred Promise to Writers
            </h2>
            <div className="max-w-4xl mx-auto">
              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-light italic text-slate-700 leading-relaxed mb-6 sm:mb-8">
                "Submit your kalam and we handle everything else—completely free while ensuring your authorship is always honored."
              </blockquote>
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed mb-6 sm:mb-8">
                Our FAQ section reflects our commitment to transparency and support. Every question answered here 
                represents our dedication to serving writers with clarity, respect, and spiritual integrity. 
                Your sacred words deserve world-class treatment, and we provide it completely free.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600 mb-3 sm:mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2 text-sm sm:text-base">Complete Transparency</h3>
                  <p className="text-xs sm:text-sm text-slate-600">Every aspect of our process clearly explained</p>
                </div>
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600 mb-3 sm:mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2 text-sm sm:text-base">Ongoing Support</h3>
                  <p className="text-xs sm:text-sm text-slate-600">Dedicated team available for all your questions</p>
                </div>
                <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600 mb-3 sm:mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2 text-sm sm:text-base">Sacred Commitment</h3>
                  <p className="text-xs sm:text-sm text-slate-600">Every interaction guided by spiritual principles</p>
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
            All your questions answered, all barriers removed. Join our global community of Sufi writers 
            and experience the complete journey from sacred words to worldwide spiritual impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/writer/submit"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
            >
              <PenTool className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Submit Your Kalam</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base"
            >
              <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Ask a Question</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WriterFAQs;