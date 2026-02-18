'use client';

import React from 'react';
import { PenTool, Mic, Music, Globe, BookOpen, Heart, Users, Satellite, Leaf, Shield, Code, Building, Star, MapPin, Sparkles, Quote } from 'lucide-react';
import { incrementMonthly,incrementWeekly } from '@/lib/increment';
import { useCMSPage } from '@/hooks/useCMSPage';
import { founderPageFallbackData } from '@/lib/cmsFallbackData';

const Founder = () => {

  // Fetch CMS data with fallback
  const { data: cmsData } = useCMSPage({
    pageSlug: 'founder',
    fallbackData: founderPageFallbackData,
    enabled: true
  });

  const pageData = cmsData || founderPageFallbackData;

  // Helper to get icon component
  const getIconComponent = (iconName: string | null | undefined, defaultIcon: any) => {
    const iconMap: Record<string, any> = {
      'PenTool': PenTool,
      'Music': Music,
      'Mic': Mic,
      'Users': Users,
      'Satellite': Satellite,
      'Leaf': Leaf,
      'Shield': Shield,
      'Code': Code,
      'Building': Building,
      'MapPin': MapPin,
      'Sparkles': Sparkles,
      'Globe': Globe,
      'Quote': Quote,
      'Heart': Heart,
      'Star': Star,
    };
    return iconName && iconMap[iconName] ? iconMap[iconName] : defaultIcon;
  };

  // These fields data coming from database cms - Roles (from sections)
  const rolesSection = pageData.sections?.find((s: any) => s.section_name === 'Creative Roles');
  const roles = (rolesSection && rolesSection.items && rolesSection.items.length > 0)
    ? rolesSection.items.map((item: any) => ({
        icon: getIconComponent(item.item_icon, PenTool),
        title: item.item_title,
        description: item.item_description
      }))
    : [
        { icon: PenTool, title: "Writer", description: "Crafting sacred Sufi poetry with deep spiritual insight" },
        { icon: Music, title: "Lyricist", description: "Creating divine verses that resonate with the soul" },
        { icon: Mic, title: "Composer", description: "Harmonizing words with melodies for spiritual elevation" },
        { icon: Users, title: "Creative Director", description: "Guiding SufiPulse's artistic vision and mission" }
      ];

  // These fields data coming from database cms - Expertise (from sections)
  const expertiseSection = pageData.sections?.find((s: any) => s.section_name === 'Professional Expertise');
  const expertise = (expertiseSection && expertiseSection.items && expertiseSection.items.length > 0)
    ? expertiseSection.items.map((item: any) => ({
        icon: getIconComponent(item.item_icon, Satellite),
        title: item.item_title,
        field: item.item_field || item.item_subtitle
      }))
    : [
        { icon: Satellite, title: "Remote Sensing Interpreter", field: "Geospatial Analysis" },
        { icon: Leaf, title: "Environmental Scientist", field: "Ecological Research" },
        { icon: Shield, title: "Emergency Planner", field: "Crisis Management" },
        { icon: Code, title: "SaaS Developer", field: "Technology Solutions" },
        { icon: Building, title: "Entrepreneur", field: "Business Innovation" }
      ];

  // These fields data coming from database cms - Achievements (placeholder - not in schema yet)
  const achievements = [
    {
      category: "Spiritual Leadership",
      items: [
        "Founded SufiPulse as a global platform for Sufi collaboration",
        "Bridged traditional Kashmiri Sufi poetry with contemporary expression",
        "Established non-commercial model for sacred art preservation",
        "First global digital platform for Sufi kalam collaboration"
      ]
    },
    {
      category: "Cultural Bridge",
      items: [
        "Connected Kashmiri-American heritage with global Sufi community",
        "Promoted cross-cultural understanding through spiritual poetry",
        "Preserved and modernized traditional Sufi literary forms",
        "Facilitated collaborations across 50+ countries"
      ]
    },
    {
      category: "Technical Innovation",
      items: [
        "Developed SaaS solutions for creative collaboration",
        "Applied remote sensing technology to environmental projects",
        "Created emergency planning systems for community safety",
        "Pioneered tech-enabled spiritual content distribution"
      ]
    }
  ];

  // These fields data coming from database cms - Personal Journey (placeholder)
  const personalJourney = [
    {
      phase: "Kashmiri Roots",
      description: "Born into the mystical tradition of Kashmir's sacred valleys, inheriting centuries of Sufi wisdom",
      icon: MapPin
    },
    {
      phase: "American Innovation",
      description: "Embracing American technological innovation and entrepreneurial spirit",
      icon: Sparkles
    },
    {
      phase: "Global Vision",
      description: "Synthesizing Eastern spirituality with Western innovation to serve the global ummah",
      icon: Globe
    }
  ];

  // These fields data coming from database cms - Quotes (from testimonials)
  const quotes = (pageData.testimonials && pageData.testimonials.length > 0)
    ? pageData.testimonials.map((t: any) => ({
        text: t.testimonial_quote,
        context: t.testimonial_role,
        icon: Quote
      }))
    : [
        {
          text: "We don't sell divine lyrics. We amplify them.",
          context: "Core Philosophy",
          icon: Quote
        },
        {
          text: "Technology should serve the sacred, not the other way around.",
          context: "On Innovation",
          icon: Quote
        },
        {
          text: "From Kashmir's valleys to the world's heart - every soul deserves to hear the divine pulse.",
          context: "Mission Statement",
          icon: Quote
        }
      ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-6">
            <div className="w-32 h-32 bg-slate-700 rounded-full flex items-center justify-center mx-auto">
              <div className="text-center text-white">
                <Heart className="w-12 h-12 mx-auto mb-2" />
                <div className="text-xs font-medium">Founder</div>
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-white fill-current" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            Dr. Zarf-e-Noori
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-6">
            Founder & Visionary of SufiPulse - Bridging the sacred valleys of Kashmir with the global spiritual community
          </p>
          {/* // These  fields data comming from database cms  */}
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">Writer</span>
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">Lyricist</span>
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">Composer</span>
            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full">Creative Director</span>
            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full">Kashmiri-American</span>
          </div>
        </div>

        {/* Hero Section */}
        
        <section className="mb-20">
          <div className="bg-slate-800 rounded-2xl p-8 lg:p-12 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Visionary Behind SufiPulse</h2>
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  Dr. Zarf-e-Noori embodies the unique fusion of ancient spiritual wisdom and modern innovation. 
                  As a Kashmiri-American citizen, he bridges two worlds—carrying the mystical poetry of Kashmir's 
                  sacred valleys to the global stage through cutting-edge technology and heartfelt dedication.
                </p>
                <p className="text-slate-300 leading-relaxed mb-6">
                  His multidisciplinary expertise spans from environmental science to SaaS development, 
                  yet his heart remains devoted to preserving and amplifying the divine voices of Sufi tradition 
                  for the global ummah.
                </p>
                <div className="bg-slate-700 rounded-xl p-4">
                  <blockquote className="text-emerald-300 italic text-lg">
                    "Through SufiPulse, we create a bridge where the ancient wisdom of Kashmir's Sufi masters 
                    meets the global hunger for spiritual connection."
                  </blockquote>
                </div>
              </div>
              <div className="space-y-6">
                {quotes.map((quote, index) => {
                  const Icon = quote.icon;
                  return (
                    <div key={index} className="bg-slate-700 rounded-xl p-6 flex items-start space-x-4">
                      <Icon className="w-6 h-6 text-emerald-300 flex-shrink-0 mt-1" />
                      <div>
                        <blockquote className="text-white text-lg italic mb-3">
                          "{quote.text}"
                        </blockquote>
                        <cite className="text-emerald-300 text-sm">— {quote.context}</cite>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Personal Journey */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Personal Journey</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              The unique path that shaped Dr. Zarf-e-Noori's vision for global spiritual unity
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {personalJourney.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">{phase.phase}</h3>
                  <p className="text-slate-600 leading-relaxed">{phase.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Creative Roles */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Creative Leadership</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Dr. Zarf-e-Noori's multifaceted creative roles in shaping SufiPulse's artistic vision
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {roles.map((role, index) => {
              const Icon = role.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-3">{role.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{role.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Professional Expertise */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Professional Expertise</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              A unique blend of technical expertise and entrepreneurial vision supporting the spiritual mission
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {expertise.map((exp, index) => {
              const Icon = exp.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-slate-100 text-center group hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-slate-100 group-hover:bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-3 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-slate-600 group-hover:text-emerald-600 transition-colors duration-300" />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-1 text-sm">{exp.title}</h3>
                  <p className="text-slate-500 text-xs">{exp.field}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Achievements & Impact */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Achievements & Impact</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Dr. Zarf-e-Noori's contributions across spiritual, cultural, and technical domains
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-emerald-100">
                  {achievement.category}
                </h3>
                <ul className="space-y-3">
                  {achievement.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-600 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Kashmiri-American Heritage */}
        <section className="mb-20">
          <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Kashmiri-American Heritage</h2>
              <p className="text-slate-600 max-w-3xl mx-auto">
                Bridging the mystical valleys of Kashmir with the diverse landscape of America
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">Kashmiri Roots</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Deeply connected to the rich Sufi tradition of Kashmir, carrying forward centuries of mystical 
                  poetry and spiritual wisdom from the sacred valleys to the global community. The valley's tradition 
                  of Rishis and Sufi saints flows through his work.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-slate-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">American Innovation</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Leveraging American technological innovation and entrepreneurial spirit to create platforms 
                  that preserve and amplify sacred traditions for the modern world. Combining Silicon Valley 
                  innovation with spiritual service.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Metrics */}
        <section className="mb-20">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Measurable Impact</h2>
              <p className="text-slate-600">
                The tangible results of Dr. Zarf-e-Noori's vision for global spiritual unity
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">{incrementWeekly(300)}+</div>
                <div className="text-sm text-slate-600">Sacred Collaborations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">{incrementMonthly(43,200)}+</div>
                <div className="text-sm text-slate-600">Countries Connected</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">{incrementMonthly(17,50)}+`</div>
                <div className="text-sm text-slate-600">Languages Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">100%</div>
                <div className="text-sm text-slate-600">Free Service</div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Statement */}
        <section className="text-center">
          <div className="bg-slate-800 rounded-2xl p-8 lg:p-12 text-white">
            <h2 className="text-3xl font-bold mb-6">Vision for Global Spiritual Unity</h2>
            <div className="flex justify-center mb-8">
              <Quote className="w-8 h-8 text-emerald-300" />
            </div>
            <blockquote className="text-2xl font-light italic text-emerald-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              "Through SufiPulse, we create a bridge where the ancient wisdom of Kashmir's Sufi masters 
              meets the global hunger for spiritual connection. Technology serves the sacred, 
              not the other way around."
            </blockquote>
            <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Dr. Zarf-e-Noori's vision extends beyond mere preservation—it's about creating living, 
              breathing connections between souls across continents, languages, and cultures, 
              all united in the pursuit of divine love and spiritual truth.
            </p>
            <div className="bg-slate-700 rounded-xl p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-bold text-emerald-300 mb-3">The SufiPulse Promise</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                "Every kalam submitted is treated as a sacred trust. Every collaboration is approached with spiritual reverence. 
                Every production serves the divine purpose of connecting hearts across the world."
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Founder;
