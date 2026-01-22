'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Mountain, 
  Heart, 
  Star, 
  BookOpen, 
  Users, 
  Globe, 
  Award, 
  Eye,
  ArrowRight,
  Calendar,
  MapPin,
  Compass,
  Shield,
  Leaf,
  Crown,
  Lightbulb,
  CheckCircle,
  Play
} from 'lucide-react';

const LegacyOfDrKumar = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeTimeline, setActiveTimeline] = useState(0);

  const legacyAspects = [
    {
      icon: Mountain,
      title: "The Qalandar Path",
      description: "14 years of silence in Ganderbal jungles, emerging as a wandering light of Kashmir",
      impact: "Transformed from doctor to divine guide",
      details: [
        "Renounced worldly success for spiritual truth",
        "Lived in complete absorption (Muraqaba)",
        "Emerged as a presence beyond ordinary consciousness",
        "Became a beacon for broken hearts seeking healing"
      ]
    },
    {
      icon: Heart,
      title: "Sacred Service",
      description: "Banday Bagh spiritual station serving seekers with langar, lodging, and guidance",
      impact: "Thousands of hearts touched and transformed",
      details: [
        "Free sacred meals for body and soul",
        "Sanctuary for meditation and dhikr",
        "Open doors for all spiritual travelers",
        "Direct transmission of divine presence"
      ]
    },
    {
      icon: Lightbulb,
      title: "Modern Mysticism",
      description: "Bridging ancient Sufi wisdom with contemporary scientific understanding",
      impact: "New paradigm for spiritual education",
      details: [
        "Scientific approach to mystical experience",
        "Sanctification of intellect and reason",
        "Integration of modern knowledge with divine wisdom",
        "Accessible language for new generation seekers"
      ]
    },
    {
      icon: Globe,
      title: "Global Influence",
      description: "Inspiring spiritual movements and guiding institutions across cultures and continents.",
      impact: "Worldwide network of spiritual seekers",
      details: [
        "Dr. Kumar Foundation USA established",
        "Sufi Science Center research initiatives",
        "SufiPulse global platform inspiration",
        "International community of practitioners"
      ]
    }
  ];

  const timelineEvents = [
    {
      period: "Early Life",
      title: "Medical Training & Service",
      description: "Trained at Government Medical College Srinagar, Kashmir India served as Medical Officer at Department of Health Services Government of J&K.",
      significance: "Foundation of service to humanity",
      icon: Shield
    },
    {
      period: "The Great Turning",
      title: "Renunciation & Seeking",
      description: "Left worldly success to answer the call of Divine Love (Ishq-e-Haqiqi)",
      significance: "Complete surrender to spiritual path",
      icon: Heart
    },
    {
      period: "14 Years",
      title: "Sacred Silence",
      description: "Lived in Muraqaba in Ganderbal jungles - absorption, poverty, truth",
      significance: "Transformation into spiritual presence",
      icon: Mountain
    },
    {
      period: "Emergence",
      title: "Birth of Qalandar",
      description: "Returned as detached, unveiled presence filled with divine fragrance",
      significance: "Became living example of spiritual realization",
      icon: Star
    },
    {
      period: "Service",
      title: "Banday Bagh Station",
      description: "Established spiritual sanctuary at Banday Bagh Ganderbal Kashmir India serving seekers from around the world",
      significance: "Practical manifestation of divine service",
      icon: Compass
    },
    {
      period: "Legacy",
      title: "Global Inspiration",
      description: "Inspiring institutions, movements, and platforms worldwide",
      significance: "Continuing influence across continents",
      icon: Globe
    }
  ];

  const testimonials = [
    {
      name: "Dr. Zarf-e-Noori",
      location: "USA",
      role: "Founder, SufiPulse",
      quote: "Dr. Kumar's legacy lives in every sacred production we create. His example of serving the divine without commercialization guides our every decision.",
      image: "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Dr. Amara Kumar",
      location: "USA",
      role: "Director, Dr. Kumar Foundation",
      quote: "His transformation from worldly success to spiritual service shows us that true fulfillment comes from surrendering to the Divine Will.",
      image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Prof. Hassan Al-Sufi",
      location: "USA",
      role: "Sufi Science Center",
      quote: "Dr. Kumar's integration of scientific thinking with mystical realization provides a model for contemporary spiritual education.",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200"
    }
  ];

  const currentEvent = timelineEvents[activeTimeline];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-600 rounded-lg sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6">
              Legacy of Dr. Kumar
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-emerald-300 font-light italic mb-6 sm:mb-8">
              Qalandar-i-Kashmir – The Wandering Light, The Hidden Pearl of Kashmir
            </h2>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-emerald-500/20 max-w-4xl sm:max-w-5xl mx-auto">
              <p className="text-sm sm:text-base lg:text-xl text-slate-300 leading-relaxed mb-4 sm:mb-6">
                Dr. Ghulam Mohammad Kumar's legacy transcends the boundaries of time and space. 
                From the sacred valleys of Kashmir to institutions across the globe, his spiritual 
                influence continues to guide seekers toward divine realization.
              </p>
              <blockquote className="text-lg sm:text-xl lg:text-2xl font-light italic text-emerald-300 mb-3 sm:mb-4">
                "More than a man, more than a mystic he is a presence."
              </blockquote>
              <p className="text-sm sm:text-base text-slate-300">
                A wandering flame of Haqiqat, a silent earthquake in the hearts of seekers. 
                He lives not to be followed, but to awaken.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy Aspects */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">
              Dimensions of His Legacy
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
              The multifaceted impact of Dr. Kumar's spiritual realization on individuals and institutions worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {legacyAspects.map((aspect, index) => {
              const Icon = aspect.icon;
              return (
                <div key={index} className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 shadow-md sm:shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 mb-2 sm:mb-3">{aspect.title}</h3>
                      <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-2 sm:mb-3">{aspect.description}</p>
                      <div className="text-xs sm:text-sm font-medium text-emerald-600 bg-emerald-50 px-2 sm:px-3 py-1 rounded-full inline-block mb-3 sm:mb-4">
                        {aspect.impact}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {aspect.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mt-0.5" />
                        <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Spiritual Timeline */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 sm:mb-4">
              Sacred Journey Timeline
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
              The transformative stages of Dr. Kumar's spiritual evolution
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
            {/* Timeline Navigation */}
            <div className="space-y-3 sm:space-y-4">
              {timelineEvents.map((event, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTimeline(index)}
                  className={`w-full text-left p-4 sm:p-6 rounded-lg sm:rounded-xl transition-all duration-200 ${
                    activeTimeline === index
                      ? 'bg-emerald-50 border-2 border-emerald-200'
                      : 'bg-white border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
                      activeTimeline === index
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      <event.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-medium text-emerald-600">{event.period}</div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-800">{event.title}</h3>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Timeline Content */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 shadow-md sm:shadow-lg border border-slate-100">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-100 rounded-lg sm:rounded-2xl flex items-center justify-center">
                  <currentEvent.icon className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-medium text-emerald-600 mb-1">{currentEvent.period}</div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800">{currentEvent.title}</h3>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-4 sm:mb-6">{currentEvent.description}</p>
              <div className="bg-emerald-50 rounded-lg p-3 sm:p-4">
                <h4 className="font-bold text-emerald-800 mb-2 text-sm sm:text-base">Spiritual Significance</h4>
                <p className="text-emerald-700 text-xs sm:text-sm">{currentEvent.significance}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sacred Declaration */}
      <section className="py-12 sm:py-16 lg:py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-6 sm:mb-8">
              Eternal Presence
            </h2>
            <div className="max-w-4xl mx-auto">
              <blockquote className="text-lg sm:text-xl lg:text-2xl font-light italic text-slate-700 leading-relaxed mb-6 sm:mb-8">
                "He left the jungle with no shoes, but with a message for the world: Serve Allah's sound with silence, not sales."
              </blockquote>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed mb-6 sm:mb-8">
                Dr. Kumar's legacy is not confined to the past—it is a living presence that continues 
                to guide and inspire. Through the institutions he has influenced and the hearts he has 
                touched, his light continues to illuminate the path for seekers worldwide.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md sm:shadow-lg">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600 mb-3 sm:mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2 text-sm sm:text-base">Living Example</h3>
                  <p className="text-xs sm:text-sm text-slate-600">Demonstrating complete surrender to divine will</p>
                </div>
                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md sm:shadow-lg">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600 mb-3 sm:mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2 text-sm sm:text-base">Continuing Influence</h3>
                  <p className="text-xs sm:text-sm text-slate-600">Inspiring institutions and movements globally</p>
                </div>
                <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md sm:shadow-lg">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600 mb-3 sm:mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2 text-sm sm:text-base">Eternal Guidance</h3>
                  <p className="text-xs sm:text-sm text-slate-600">Providing direction for future generations</p>
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
            Continue the Sacred Legacy
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 mb-6 sm:mb-8 leading-relaxed">
            Dr. Kumar's example shows us that true service to the Divine requires complete surrender 
            of worldly ambitions. Join our mission to serve sacred sound with silence, not sales.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/dr-kumar-foundation"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
            >
              <Mountain className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Dr. Kumar Foundation</span>
            </Link>
            <Link
              href="/join"
              className="inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Join Sacred Service</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 border-2 border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base"
            >
              <Leaf className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Seek Guidance</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LegacyOfDrKumar;
