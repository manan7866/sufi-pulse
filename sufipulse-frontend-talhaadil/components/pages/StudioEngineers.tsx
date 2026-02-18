'use client'
import React from 'react';
import Link from 'next/link';
import {
  Headphones,
  Award,
  Star,
  Users,
  Music,
  Mic,
  ArrowRight,
  CheckCircle,
  Globe,
  Heart,
  BookOpen
} from 'lucide-react';
import { incrementMonthly, incrementWeekly, incrementYearly } from '@/lib/increment';
import { useCMSPage } from '@/hooks/useCMSPage';
import { aboutPageFallbackData } from '@/lib/cmsFallbackData';



const StudioEngineers = () => {
  const engineers = [
    {
      name: "Michael \"SufiPulse\" Hartman",
      role: "Lead Engineer & Studio Director",
      speciality: "High-fidelity world-fusion soundscapes & spiritual vocal engineering",
      experience: "15+ years",
      image: "/2-min.jpg",
      bio: "Master engineer specializing in high-fidelity world-fusion soundscapes and spiritual vocal engineering at SufiPulse Studio. Brings over 15 years of experience in sacred audio production.",
      achievements: [
        "Grammy-nominated engineer for spiritual music",
        "500+ sacred recordings produced",
        "Pioneer in sacred audio technology",
        "Specialist in multi-cultural sound design"
      ],
      philosophy: "Every sacred recording is a prayer in frequencies, a bridge between the earthly and divine.",
      projects: ["Ishq-e-Haqiqi", "Wahdat Symphony", "Path of Fanaa"],
      languages: ["English", "Basic Arabic", "Basic Urdu"]
    },
    {
      name: "Ryan Cole",
      role: "Mixing Engineer & Sound Designer",
      speciality: "Audio Mixing & Spiritual Sound Design",
      experience: "8+ years",
      image: "/3-min.jpg",
      bio: "Skilled mixing engineer ensuring every sacred kalam achieves perfect balance and spiritual resonance. Specializes in creating immersive soundscapes for spiritual enhancement.",
      achievements: [
        "200+ mixed tracks for SufiPulse",
        "Specialist in world music mixing",
        "Certified Pro Tools expert",
        "Sacred audio processing pioneer"
      ],
      philosophy: "Mixing is the art of creating space for the Divine to breathe through sound.",
      projects: ["Climate Awakening", "Zikr of the Heart", "Tawbah Gardens"],
      languages: ["English", "Spanish"]
    },
    {
      name: "Lucas Ray",
      role: "Vocal Recording Specialist",
      speciality: "Vocal Recording & Spiritual Voice Processing",
      experience: "10+ years",
      image: "/1-min.jpg",
      bio: "Expert vocal technician capturing the pure essence of spiritual voices with precision and care. Developed unique techniques for recording sacred vocals authentically.",
      achievements: [
        "Vocal recording specialist for 300+ tracks",
        "Multi-language recording expert",
        "Sacred voice preservation techniques",
        "Whisper kalam recording pioneer"
      ],
      philosophy: "The human voice is the most sacred instrument - our job is to capture its divine essence.",
      projects: ["Kashmir's Call", "Silent Dhikr", "Unity in Silence"],
      languages: ["English", "Basic Turkish", "Basic Persian"]
    },
    {
      name: "Elijah James",
      role: "Mastering Engineer & FX Designer",
      speciality: "Audio Mastering & Sacred Effects Design",
      experience: "12+ years",
      image: "/5-min.jpg",
      bio: "Mastering engineer and FX designer bringing final polish and spiritual depth to every production. Creates custom effects that enhance mystical qualities of sacred music.",
      achievements: [
        "Mastering specialist for all SufiPulse releases",
        "Custom sacred FX design",
        "Spiritual audio enhancement pioneer",
        "International mastering standards"
      ],
      philosophy: "Mastering is the final prayer - ensuring every frequency serves the sacred message.",
      projects: ["All SufiPulse Productions", "Sacred Frequency Research", "Mystical Audio Enhancement"],
      languages: ["English", "French"]
    },
    {
      name: "Arman Sayeed",
      role: "Session Manager & Cultural Coordinator",
      speciality: "Production Coordination & Cultural Sensitivity",
      experience: "6+ years",
      image: "/4-min.jpg",
      bio: "Session manager coordinating all aspects of production to ensure smooth spiritual collaborations. Specializes in cultural sensitivity and cross-cultural communication.",
      achievements: [
        "300+ sessions successfully managed",
        "Multi-cultural coordination specialist",
        "Spiritual project coordination expert",
        "Global time zone management"
      ],
      philosophy: "Every session is a sacred gathering - coordination is the art of creating harmony.",
      projects: ["Global Remote Sessions", "Cultural Collaboration Projects", "International Coordination"],
      languages: ["English", "Urdu", "Hindi", "Arabic"]
    }
  ];
// These  fields data comming from database cms
const { data: cmsData } = useCMSPage({
  pageSlug: 'studio-engineers',
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
        case 'Users':
          return Users;
        case 'Music':
          return Music;
        case 'Globe':
          return Globe;
        case 'Award':
          return Award;
        default:
          return Star; // Default icon if no match
      }
    })()
  }))
  :  [
    { number: "6", label: "Expert Engineers", icon: Users },
    { number: `${incrementWeekly(300)}+`, label: "Productions", icon: Music },
    { number: `${incrementMonthly(17, 50)}+`, label: "Languages", icon: Globe },
    { number: `${incrementYearly(15)}+`, label: "Years Experience", icon: Award }
  ];

  const expertise = [
    {
      title: "Sacred Audio Engineering",
      description: "Specialized techniques for capturing and enhancing spiritual music",
      icon: Headphones
    },
    {
      title: "Multi-Cultural Production",
      description: "Expert coordination of diverse cultural and linguistic collaborations",
      icon: Globe
    },
    {
      title: "Spiritual Sound Design",
      description: "Custom effects and processing that enhance mystical qualities",
      icon: Music
    },
    {
      title: "Global Coordination",
      description: "Seamless management of international recording sessions",
      icon: Users
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <div className="w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Headphones className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Meet Our
              <span className="block text-emerald-400">Engineers</span>
            </h1>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20 max-w-4xl mx-auto">
              <p className="text-xl text-slate-300 leading-relaxed mb-6">
                The dedicated professionals behind SufiPulse's world-class productions. Our team combines
                technical mastery with deep spiritual understanding to serve sacred music.
              </p>
              <blockquote className="text-2xl font-light italic text-emerald-300 mb-4">
                "Every engineer is a guardian of the sacred sound"
              </blockquote>
              <p className="text-slate-300">
                Meet the experts who bring divine kalam to life with technical excellence and spiritual reverence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div className="text-3xl font-bold text-slate-800 mb-2">{stat.number}</div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Expertise */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Our Expertise
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Specialized skills that make SufiPulse productions world-class
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {expertise.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{skill.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{skill.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Our Engineering Team
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              The masters behind every sacred production
            </p>
          </div>

          <div className="space-y-12">
            {engineers.map((engineer, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-8 items-start ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="relative h-fit w-full mb-10 lg:mb-0">
                    <img
                      src={engineer.image}
                      alt={engineer.name}
                      className="w-full h-full object-cover shadow-xl rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-transparent rounded-2xl"></div>
                    <div className="absolute top-3 left-3">
                      <span className="bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {engineer.experience}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="min-h-[400px] h-fit w-full flex flex-col space-y-4 justify-center">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-1">{engineer.name}</h3>
                      <p className="text-emerald-600 font-semibold text-base mb-1">{engineer.role}</p>
                      <p className="text-slate-600 font-medium text-sm">{engineer.speciality}</p>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed">{engineer.bio}</p>

                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                      <h4 className="font-bold text-emerald-800 text-sm mb-2">Philosophy</h4>
                      <blockquote className="text-emerald-700 italic text-sm">"{engineer.philosophy}"</blockquote>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-800 text-sm mb-2">Key Achievements</h4>
                      <div className="space-y-1">
                        {engineer.achievements.map((achievement, achIndex) => (
                          <div key={achIndex} className="flex items-start space-x-2">
                            <CheckCircle className="w-3 h-3 text-emerald-500 mt-0.5" />
                            <span className="text-xs text-slate-600">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm mb-1">Notable Projects</h4>
                        <div className="space-y-1">
                          {engineer.projects.map((project, projIndex) => (
                            <span
                              key={projIndex}
                              className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full inline-block mr-1 mb-1"
                            >
                              {project}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm mb-1">Languages</h4>
                        <div className="space-y-1">
                          {engineer.languages.map((language, langIndex) => (
                            <span
                              key={langIndex}
                              className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full inline-block mr-1 mb-1"
                            >
                              {language}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Work With Our Expert Team
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Experience the difference that dedicated, spiritually-minded engineers make.
            Submit your kalam and let our team bring it to life with world-class production.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/writer/submit"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <Music className="w-5 h-5" />
              <span>Submit Your Kalam</span>
            </Link>
            <Link
              href="/studio"
              className="inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <Headphones className="w-5 h-5" />
              <span>Visit Our Studio</span>
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center space-x-2 border-2 border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <Star className="w-5 h-5" />
              <span>Hear Our Work</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudioEngineers;