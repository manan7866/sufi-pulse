"use client";

import React from 'react';
import Link from 'next/link';
import { Heart, Globe, Users, Award, BookOpen, Star, ArrowRight, Shield, Zap, Target } from 'lucide-react';
import { useCMSPage } from '@/hooks/useCMSPage';
import { aboutPageFallbackData } from '@/lib/cmsFallbackData';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Spiritual Integrity",
      description: "Every project is approached with deep reverence for the sacred nature of Sufi poetry and spiritual expression."
    },
    {
      icon: Globe,
      title: "Global Unity",
      description: "Bridging cultures and languages through the universal language of divine love and spiritual awakening."
    },
    {
      icon: Shield,
      title: "Non-Commercial Service",
      description: "We serve the sacred, not profit. All our services are provided freely to uplift the spiritual community."
    },
    {
      icon: Award,
      title: "Excellence in Craft",
      description: "Combining technical mastery with spiritual sensitivity to create productions worthy of the divine message."
    }
  ];

  const founders = [
    {
      name: "Dr. Zarf-e-Noori",
      role: "Founder & Visionary",
      organization: "SufiPulse Global",
      bio: "Kashmiri-American visionary bridging ancient Sufi wisdom with modern innovation. Writer, Lyricist, Composer, and Creative Director.",
      image: "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=200",
      featured: true
    },
    {
      name: "Dr. Amara Kumar",
      role: "Spiritual Director",
      organization: "Dr. Kumar Foundation",
      bio: "Renowned scholar of comparative mysticism and founder of the Dr. Kumar Foundation, dedicated to preserving spiritual wisdom.",
      image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Prof. Hassan Al-Sufi",
      role: "Academic Advisor",
      organization: "Sufi Science Center USA",
      bio: "Leading authority on Sufi literature and Islamic spirituality, bringing decades of scholarly research to our mission.",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200"
    }
  ];

  const milestones = [
    {
      year: "2022",
      title: "Vision Conceived",
      description: "Dr. Zarf-e-Noori envisions a global platform for Sufi collaboration, inspired by Kashmir's mystical heritage"
    },
    {
      year: "2023",
      title: "Foundation Established",
      description: "SufiPulse launched as a joint initiative of Dr. Kumar Foundation and Sufi Science Center USA"
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Connected writers and vocalists from 50+ countries for sacred kalam productions"
    },
    {
      year: "2024",
      title: "Studio Development",
      description: "Established world-class recording facilities with specialized acoustic treatment for spiritual music"
    },
    {
      year: "2025",
      title: "Digital Platform Launch",
      description: "Launched comprehensive online platform for global Sufi collaboration and sharing"
    }
  ];

  const { data: cmsData } = useCMSPage({
    pageSlug: 'about',
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
    { number: "300+", label: "Sacred Collaborations", description: "Divine kalam brought to life" },
    { number: "89", label: "Writers", description: "From 50+ countries" },
    { number: "43", label: "Vocalists", description: "Diverse spiritual voices" },
    { number: "25+", label: "Languages", description: "Bridging cultural divides" },
    { number: "127K+", label: "Global Views", description: "Hearts touched worldwide" },
    { number: "100%", label: "Free Service", description: "No cost to writers ever" }
  ];

  const principles = [
    {
      icon: Target,
      title: "Sacred Purpose",
      description: "Every action guided by spiritual intention and service to the divine"
    },
    {
      icon: Zap,
      title: "Innovation in Service",
      description: "Using cutting-edge technology to amplify ancient wisdom"
    },
    {
      icon: Users,
      title: "Community First",
      description: "Building bridges between hearts across all boundaries"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            Our Sacred Mission
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Serving the divine through the preservation, production, and global sharing of sacred Sufi kalam
          </p>
        </div>

        {/* Mission Statement */}
        <section className="mb-20">
          <div className="bg-slate-800 rounded-2xl p-8 lg:p-12 text-white">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Our Commitment</h2>
              <blockquote className="text-2xl lg:text-3xl font-light italic leading-relaxed mb-8">
                "We do not monetize the sacred. We serve it."
              </blockquote>
              <p className="text-slate-300 text-lg leading-relaxed">
                SufiPulse exists as a spiritual service to the global ummah, providing a platform where sacred Sufi words 
                meet divine voices. Our mission transcends commercial interests—we are dedicated to amplifying the 
                timeless wisdom of Sufi poetry, with particular reverence for the mystical tradition of Kashmiri Sufism, through world-class production, fostering unity across cultures, 
                languages, and borders in service of the Divine. From the sacred valleys of Kashmir to the global stage, we handle all aspects of production, from musical 
                arrangement to vocalist selection, ensuring each kalam receives the sacred treatment it deserves.
              </p>
            </div>
          </div>
        </section>

        {/* Founder Spotlight */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-emerald-50 to-slate-50 rounded-2xl p-8 lg:p-12 border border-emerald-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-800 mb-6">Founded by Dr. Zarf-e-Noori</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  Kashmiri-American visionary bridging ancient Sufi wisdom with modern innovation. 
                  Writer, Lyricist, Composer, and Creative Director dedicated to amplifying sacred voices globally.
                </p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  His multidisciplinary expertise spans from environmental science to SaaS development, 
                  yet his heart remains devoted to preserving and amplifying the divine voices of Sufi tradition 
                  for the global ummah.
                </p>
                <Link
                  href="/founder"
                  className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  <span>Learn About Our Founder</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="relative">
                <div className="aspect-square bg-slate-700 rounded-2xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-24 h-24 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-12 h-12 text-white" />
                    </div>
                    <p className="font-medium text-lg">"We don't sell divine lyrics.<br />We amplify them."</p>
                    <p className="text-slate-300 text-sm mt-2">- Dr. Zarf-e-Noori</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Our Values</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              The principles that guide every aspect of our work and spiritual service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-3">{value.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Impact Statistics */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Our Global Impact</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Measuring our service to the global spiritual community
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-slate-100 text-center hover:shadow-xl transition-all duration-300">
                <div className="text-3xl font-bold text-emerald-600 mb-2">{stat.number}</div>
                <div className="text-sm font-medium text-slate-800 mb-1">{stat.label}</div>
                <div className="text-xs text-slate-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Vision & Principles */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Vision for Global Spiritual Unity</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  In an increasingly fragmented world, SufiPulse serves as a bridge—connecting hearts through the 
                  universal language of divine love. We envision a global community where spiritual seekers from 
                  all backgrounds can contribute to and benefit from the collective wisdom of Sufi tradition.
                </p>
                <p>
                  Writers submit their sacred words in any language, and we handle everything else—from translation services 
                  (if needed) to musical direction and Urdu/English vocalist assignment to professional recording and global distribution. 
                  This allows poets to focus purely on their spiritual craft while we ensure their message reaches the world with 
                  the highest production quality.
                </p>
                <p>
                  Through technology in service of the sacred, we are building the world's most comprehensive 
                  archive of contemporary Sufi kalam, ensuring these divine messages reach and inspire future 
                  generations.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              {principles.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-slate-100">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 mb-2">{principle.title}</h3>
                        <p className="text-sm text-slate-600">{principle.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Leadership & Affiliations</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Institutional partners and dedicated practitioners united in service of the sacred tradition
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <div key={index} className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border ${
                founder.featured ? 'border-emerald-200 ring-2 ring-emerald-100' : 'border-slate-100'
              }`}>
                {founder.featured && (
                  <div className="bg-emerald-600 text-white text-center py-2">
                    <span className="text-sm font-medium">Founder & Visionary</span>
                  </div>
                )}
                <div className="p-6">
                  <div className="text-center mb-4">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-20 h-20 rounded-full object-cover mx-auto mb-4 ring-4 ring-emerald-100"
                    />
                    <h3 className="text-lg font-bold text-slate-800 mb-1">{founder.name}</h3>
                    <p className="text-emerald-600 font-medium text-sm mb-2">{founder.role}</p>
                    <p className="text-slate-500 text-xs font-medium mb-3">{founder.organization}</p>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{founder.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Journey & Milestones */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Our Journey</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Key milestones in our mission to serve the global spiritual community
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-emerald-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center relative ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100">
                      <div className="text-2xl font-bold text-emerald-600 mb-2">{milestone.year}</div>
                      <h3 className="text-lg font-bold text-slate-800 mb-2">{milestone.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-emerald-600 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Affiliations */}
        <section className="mb-20">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Our Affiliations</h2>
              <p className="text-slate-600">
                SufiPulse operates under the spiritual guidance and institutional support of established organizations 
                dedicated to preserving and promoting spiritual wisdom.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Dr. Kumar Foundation</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  A non-profit organization dedicated to interfaith dialogue, comparative mysticism, 
                  and the preservation of spiritual traditions across cultures.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Sufi Science Center USA</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Academic institution focused on the scholarly study of Sufi literature, philosophy, 
                  and practices, ensuring authenticity in all our spiritual productions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-slate-800 rounded-2xl p-8 lg:p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Join Our Sacred Mission</h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
              Whether you are a writer with divine words to share, a vocalist ready to lend your voice to the sacred, 
              or simply a seeker wishing to support our mission—you have a place in our global spiritual community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact?type=writer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors duration-200"
              >
                Submit Your Kalam
              </Link>
              <Link
                href="/contact?type=vocalist"
                className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors duration-200"
              >
                Join 
              </Link>
              <Link
                href="/contact"
                className="border-2 border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 px-8 py-4 rounded-xl font-semibold transition-all duration-200"
              >
                Connect With Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;