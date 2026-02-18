'use client'

import React from 'react';
import Link from 'next/link';
import { Mic, Headphones, Music, Users, Award, MapPin, Calendar, Clock, Star, Shield, Globe } from 'lucide-react';
import { incrementWeekly, incrementMonthly } from '@/lib/increment';
import Cookies from 'js-cookie';
import { useToast } from '@/context/ToastContext';
import { useCMSPage } from '@/hooks/useCMSPage';
import { aboutPageFallbackData } from '@/lib/cmsFallbackData';




const Studio = () => {
  const { showToast } = useToast();
  const userRole = Cookies.get("user_role");

  const handleButtonClick = () => {
    if (userRole === "vocalist") {
      window.location.href = "/vocalist/profile";
    } else {
      showToast("You must register first to access this feature.");
    }
  };

  const equipment = [
    {
      category: "Microphones",
      items: [
        "Neumann U87 Ai",
        "Shure SM7B",
        "AKG C414",
        "Rode NT1 / Procaster"
      ],
      image: "/pics/Microphones.webp"
    },
    {
      category: "Audio Interfaces",
      items: [
        "Universal Audio Apollo X / Twin",
        "RME Fireface",
        "Focusrite Scarlett / Clarett",
        "PreSonus Studio Series"
      ],
      image: "/pics/audi.webp"
    },
    {
      category: "Digital Audio Workstations",
      items: [
        "Pro Tools",
        "Logic Pro X",
        "Ableton Live",
        "Cubase"
      ],
      image: "/pics/digital-audio.webp"
    },
    {
      category: "Monitoring & Headphones",
      items: [
        "Genelec 8030",
        "Yamaha HS8",
        "Adam Audio A8H",
        "Beyerdynamic DT770/990"
      ],
      image: "/pics/monitor.webp"
    },
    {
      category: "Acoustic Treatment",
      items: [
        "Vocal Isolation Booths",
        "Acoustic Panels",
        "Bass Traps",
        "Diffusers"
      ],
      image: "/pics/treatment.webp"
    },
    {
      category: "Recording & Production Tools",
      items: [
        "Multi-track Recording",
        "MIDI Controllers",
        "Audio Plugins Suite",
        "Backup Systems"
      ],
      image: "/pics/tools.webp"
    },
    {
      category: "Guitars & Bass",
      items: [
        "Fender Stratocaster",
        "Gibson Les Paul",
        "Taylor Acoustic",
        "Fender Precision Bass"
      ],
      image: "/pics/bass.webp"
    },
    {
      category: "Keyboards & Synths",
      items: [
        "Nord Stage 3",
        "Yamaha Montage",
        "Roland Juno-DS",
        "NI Komplete Kontrol"
      ],
      image: "/pics/synths.webp"
    },
    {
      category: "Drums, Piano & Percussion",
      items: [
        "DW Collector’s Series (acoustic)",
        "Roland V-Drums TD-50X",
        "Yamaha C7 Grand Piano",
        "Tabla, Daf, Djembe, Cajón"
      ],
      image: "/pics/percussion.webp"
    }
  ];

  const team = [
    {
      name: "Michael \"SufiPulse\" Hartman",
      role: "Lead Engineer",
      speciality: "High-fidelity world-fusion soundscapes & spiritual vocal engineering",
      experience: "15+ years",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200",
      bio: "Master engineer specializing in high-fidelity world-fusion soundscapes and spiritual vocal engineering at SufiPulse Studio.",
      achievements: ["Grammy-nominated engineer", "500+ spiritual recordings", "Pioneer in sacred audio"]
    },
    {
      name: "Ryan Cole",
      role: "Mixing Assistant",
      speciality: "Audio Mixing & Sound Design",
      experience: "8+ years",
      image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200",
      bio: "Skilled mixing assistant ensuring every sacred kalam achieves perfect balance and spiritual resonance.",
      achievements: ["200+ mixed tracks", "Specialist in world music", "Certified Pro Tools expert"]
    },
    {
      name: "Lucas Ray",
      role: "Vocal Technician",
      speciality: "Vocal Recording & Processing",
      experience: "10+ years",
      image: "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=200",
      bio: "Expert vocal technician capturing the pure essence of spiritual voices with precision and care.",
      achievements: ["Vocal specialist", "Multi-language recording", "Sacred voice preservation"]
    },
    {
      name: "Elijah James",
      role: "Mastering & FX Design",
      speciality: "Audio Mastering & Effects",
      experience: "12+ years",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200",
      bio: "Mastering engineer and FX designer bringing final polish and spiritual depth to every production.",
      achievements: ["Mastering specialist", "Custom FX design", "Spiritual audio enhancement"]
    },
    {
      name: "Arman Sayeed",
      role: "Session Management",
      speciality: "Production Coordination",
      experience: "6+ years",
      image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=200",
      bio: "Session manager coordinating all aspects of production to ensure smooth spiritual collaborations.",
      achievements: ["300+ sessions managed", "Multi-cultural coordination", "Spiritual project specialist"]
    }
  ];

  const services = [
    {
      icon: Mic,
      title: "Complete Music Production",
      description: "We determine the best musical treatment (Qawwali, Chant, Anthem) and create professional compositions for your kalam in Urdu or English, with translation services available.",
      features: ["Musical arrangement", "Style selection", "Translation services", "Professional composition"]
    },
    {
      icon: Headphones,
      title: "Vocalist Assignment",
      description: "Our team selects the most suitable vocalist from our global talent pool based on language, emotion, and spiritual depth.",
      features: ["Global talent pool", "Perfect voice matching", "Spiritual alignment", "Professional vocalists"]
    },
    {
      icon: Music,
      title: "Global Distribution",
      description: "Professional marketing and publishing across YouTube, social media, and our sacred kalam library—all handled by SufiPulse.",
      features: ["YouTube publishing", "Social media promotion", "Global reach", "Professional marketing"]
    },
    {
      icon: Users,
      title: "Rights & Recognition",
      description: "Writers retain full authorship while we handle all production. Your name is prominently credited across all platforms.",
      features: ["Full authorship credit", "Rights protection", "Prominent attribution", "Legal safeguards"]
    }
  ];

  const studioSpaces = [
    {
      name: "Studio A - Main Recording",
      description: "SufiPulse Studio – USA, acoustically optimized for high-fidelity spiritual vocal recording",
      image: "/pics/StudioA.webp",
      features: ["Vocal isolation booth", "Live room", "Control room", "Acoustic treatment"]
    },
    {
      name: "Studio B - Mixing Suite",
      description: "Professional mixing environment with world-class monitoring and processing equipment",
      image: "/pics/StuddioB.webp",
      features: ["5.1 surround monitoring", "Analog mixing console", "Digital workstations", "Reference monitors"]
    },
    {
      name: "Studio C - Mastering Room",
      description: "Dedicated mastering suite for final polish and spiritual enhancement of sacred recordings",
      image: "/pics/StudioC.webp",
      features: ["Mastering grade monitors", "Analog processing", "Digital precision", "Quality assurance"]
    }
  ];


  // These  fields data comming from database cms

  const { data: cmsData } = useCMSPage({
    pageSlug: 'studio',
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
              case "Music":
                return Music;
              case "Users":
                return Users;
              case "Globe":
                return Globe;
              case "Award":
                return Award;
              default:
                return Star; // Default icon if none match
            }
          })()
       }))
     : [
          { number: incrementWeekly(300), label: "Recordings Made",  icon: Music },
          { number: 6, label: "Expert Engineers",  icon: Users },
          { number: incrementMonthly(17, 50), label: "Languages Recorded",  icon: Globe },
          { number: "100%", label: "Sacred Focus",  icon: Award }
     ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 xl:py-32">
          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Headphones className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
              SufiPulse Studio
              <span className="block text-emerald-400">USA</span>
            </h1>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-emerald-500/20 max-w-4xl mx-auto">
              <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed mb-6">
                Where Sacred Meets Technical Excellence. High-fidelity world-fusion soundscapes & 
                spiritual vocal engineering serving the global ummah through divine sound.
              </p>
              <blockquote className="text-lg sm:text-xl lg:text-2xl font-light italic text-emerald-300 mb-4">
                "Every recording session is a sacred ceremony, every mix a prayer in frequencies"
              </blockquote>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-xs sm:text-sm">
                <span className="bg-emerald-100/20 text-emerald-300 px-2 sm:px-3 py-1 rounded-full border border-emerald-400/30">Dr. Kumar Foundation</span>
                <span className="bg-slate-100/20 text-slate-300 px-2 sm:px-3 py-1 rounded-full border border-slate-400/30">Professional Studio</span>
                <span className="bg-emerald-100/20 text-emerald-300 px-2 sm:px-3 py-1 rounded-full border border-emerald-400/30">Spiritual Audio Specialists</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/*  These  fields data comming from database cms */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">{stat.number}</div>
                <div className="text-sm sm:text-base text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Main Studio Image */}
        <section className="mb-12 sm:mb-16 lg:mb-20">
          <div className="relative">
            <div className="aspect-[4/3] sm:aspect-video bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="SufiPulse Studio USA"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">SufiPulse USA</h2>
                  <p className="text-base sm:text-lg lg:text-xl mb-6">Where Divine Kalam Meets Technical Excellence</p>
                  <div className="bg-emerald-600/90 backdrop-blur-sm rounded-lg px-4 sm:px-6 py-2 sm:py-3 inline-block">
                    <p className="font-semibold text-sm sm:text-base">Sacred Audio Production Studio</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Studio Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16 lg:mb-20">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800">Where Sacred Meets Technical Excellence</h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              SufiPulse Studio – USA represents the harmonious fusion of cutting-edge audio technology with deep spiritual understanding. 
              Every element, from our acoustic design to our production philosophy, is crafted to serve the sacred purpose 
              of amplifying divine kalam for the global ummah. We handle all aspects of production—from musical direction 
              and vocalist selection to final mastering—completely free for writers.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white rounded-xl p-4 sm:p-6 border border-slate-100 shadow-lg">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2 text-base sm:text-lg">Complete Production</h3>
                <p className="text-xs sm:text-sm text-slate-600">From musical arrangement to vocalist assignment—we handle everything</p>
              </div>
              <div className="bg-white rounded-xl p-4 sm:p-6 border border-slate-100 shadow-lg">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2 text-base sm:text-lg">Spiritual Focus</h3>
                <p className="text-xs sm:text-sm text-slate-600">Every session guided by spiritual intention and cultural authenticity</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-emerald-50 rounded-xl p-4 sm:p-6 border border-emerald-100">
              <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-4">Studio Capabilities</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>High-fidelity world-fusion soundscapes</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>Spiritual vocal engineering</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>Multi-language recording support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>Sacred music production</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>Global distribution services</span>
                </li>
              </ul>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 sm:p-6 text-white">
              <h3 className="text-base sm:text-lg font-bold mb-4">Our Promise</h3>
              <blockquote className="italic text-emerald-300 text-sm sm:text-base">
                "Every kalam that enters our studio is treated as a sacred trust, 
                deserving of the highest technical and spiritual standards."
              </blockquote>
            </div>
          </div>
        </div>

        

        {/* Studio Spaces */}
        <section className="mb-12 sm:mb-16 lg:mb-20">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-4">Studio Spaces</h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Professional recording environments designed for optimal spiritual audio production
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {studioSpaces.map((space, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <img
                    src={space.image}
                    alt={space.name}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                    <h3 className="text-white font-bold text-base sm:text-lg">{space.name}</h3>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed line-clamp-2">{space.description}</p>
                  <div className="space-y-2">
                    {space.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2 text-xs sm:text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="mb-12 sm:mb-16 lg:mb-20">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-4">Our Services</h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Comprehensive production services designed to bring your sacred kalam to life with technical excellence and spiritual authenticity
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 mb-3">{service.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">{service.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2 text-xs sm:text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Equipment */}
        <section className="mb-12 sm:mb-16 lg:mb-20">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-4">Professional Equipment</h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              State-of-the-art recording and production equipment ensuring the highest quality capture and reproduction of sacred performances
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {equipment.map((category, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <img
                    src={category.image}
                    alt={category.category}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                    <h3 className="text-white font-bold text-base sm:text-lg">{category.category}</h3>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center space-x-2 text-xs sm:text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recording Options */}
        <section className="mb-12 sm:mb-16 lg:mb-20">
          <div className="bg-slate-800 rounded-2xl p-4 sm:p-6 lg:p-8 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Recording Sessions</h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                  SufiPulse Studio – USA offers both in-person and remote recording sessions to accommodate collaborators 
                  from around the world. Our expert team provides guidance throughout the entire process, ensuring each 
                  recording captures the spiritual essence of your kalam with our signature high-fidelity sound.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" />
                    <span className="text-sm sm:text-base text-slate-300">SufiPulse Studio – USA In-Person Sessions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" />
                    <span className="text-sm sm:text-base text-slate-300">Remote Recording Support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" />
                    <span className="text-sm sm:text-base text-slate-300">Flexible Scheduling</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-slate-700 rounded-xl p-4 sm:p-6">
                  <h3 className="font-bold mb-2 text-base sm:text-lg">In-Person Recording</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mb-4">Experience SufiPulse Studio with our full team and equipment</p>
                  <button
                    onClick={handleButtonClick}
                    className="bg-emerald-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-emerald-700 transition-all duration-300 text-sm sm:text-base"
                  >
                    Book In-Person Session
                  </button>
                </div>
                <div className="bg-slate-700 rounded-xl p-4 sm:p-6">
                  <h3 className="font-bold mb-2 text-base sm:text-lg">Remote Collaboration</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mb-4">High-quality remote recording with SufiPulse team support</p>
                  <button
                    onClick={handleButtonClick}
                    className="bg-emerald-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-emerald-700 transition-all duration-300 text-sm sm:text-base"
                  >
                    Start Remote Session
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Studio;