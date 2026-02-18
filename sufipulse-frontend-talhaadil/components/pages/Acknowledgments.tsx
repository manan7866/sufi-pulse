'use client'

import React from 'react';
import Link from 'next/link'
import { 
  Heart, 
  Users, 
  Globe, 
  Award, 
  Star, 
  BookOpen, 
  ArrowRight,
  Handshake,
  Crown,
  Gift,
  Compass,
  Shield,
  CheckCircle,
  Music,
  Mic,
  PenTool,
  Eye,
  Headphones
} from 'lucide-react';
import { incrementMonthly,incrementWeekly } from '@/lib/increment';
import { useCMSPage } from '@/hooks/useCMSPage';
import { aboutPageFallbackData } from '@/lib/cmsFallbackData';
import { useState, useEffect } from 'react';
import { getAllSpecialRecognitions } from '@/services/recognition';


interface SpecialRecognition {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  achievement: string;
}

const Acknowledgments = () => {
  const gratitudeCategories = [
    {
      icon: PenTool,
      title: "To the Faqeers, Writers, and Seekers",
      description: "Who trusted us with their sacred kalam",
      recognition: "The heart of our mission - without their sacred words, SufiPulse would not exist",
      count: `${incrementWeekly(89)} Sacred Voices`
    },
    {
      icon: Mic,
      title: "To Vocalists, Musicians & Producers",
      description: "Who pour soul into every track",
      recognition: "The soul of our productions - transforming words into spiritual experiences",
      count: `${incrementWeekly(43)} Divine Voices`
    },
    {
      icon: Headphones,
      title: "To the Engineers and Editors",
      description: "Who polish the noor without dimming its spirit",
      recognition: "The craft behind the sacred - ensuring technical excellence serves spiritual purpose",
      count: "Professional Team"
    },
    {
      icon: Shield,
      title: "To the Dr. Kumar Foundation",
      description: "For their spiritual and financial backing",
      recognition: "The foundation that makes our sacred service possible",
      count: "Institutional Support"
    },
    {
      icon: Globe,
      title: "To the Global Listeners and Lovers of Haqq",
      description: "Who carry these words further than we ever could",
      recognition: "The purpose of our work - connecting souls across continents through divine poetry",
      count: "127K+ Hearts Touched"
    }
  ];

  const [specialRecognitions, setSpecialRecognitions] = useState<SpecialRecognition[]>([]);

  useEffect(() => {
    const fetchRecognitions = async () => {
      try {
        const response = await getAllSpecialRecognitions();
        setSpecialRecognitions(response.data);
      } catch (error) {
        console.error("Failed to fetch special recognitions:", error);
      }
    };
    fetchRecognitions();
  }, []);

  const { data: cmsData } = useCMSPage({
       pageSlug: 'acknowledgments',
       fallbackData: aboutPageFallbackData,
       enabled: true
     });
  const pageData = cmsData || aboutPageFallbackData;

// These  fields data comming from database cms
  const stats =  (pageData.stats && pageData.stats.length > 0)
     ? pageData.stats.map((stat: any) => ({
         number: stat.stat_number,
         label: stat.stat_label,
         description: stat.stat_description,
         
       }))
     : [
    { number: `${incrementWeekly(300)}+`, label: "Collaborations", description: "Sacred productions completed" },
    { number: `${incrementMonthly(43,200)}+`, label: "Countries", description: "Global community reach" },
    { number: `${incrementMonthly(17,50)}+`, label: "Languages", description: "Diverse linguistic representation" },
    { number: "∞", label: "Gratitude", description: "For every contribution" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <div className="w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Handshake className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Acknowledgments
            </h1>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20 max-w-5xl mx-auto">
              <p className="text-xl text-slate-300 leading-relaxed mb-6">
                We extend heartfelt gratitude to the voices behind the veil every soul who contributes to 
                amplifying divine voices across the world through SufiPulse's sacred mission.
              </p>
              <blockquote className="text-2xl font-light italic text-emerald-300 mb-4">
                "Every echo that reaches a heart is not ours. It is His."
              </blockquote>
              <p className="text-slate-300">
                With deep gratitude, we honor all the souls who make SufiPulse possible—from institutional 
                partners to individual contributors, each playing a sacred role in our global mission.
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

      {/* Special Recognitions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Special Recognitions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Honoring the foundational souls and traditions that make our sacred mission possible
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialRecognitions.map((recognition, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 text-center group">
                <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Crown className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{recognition.title}</h3>
                <p className="text-emerald-600 font-medium mb-3">{recognition.subtitle}</p>
                <p className="text-slate-600 leading-relaxed mb-4">{recognition.description}</p>
                <div className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                  {recognition.achievement}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gratitude Categories */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Voices Behind the Veil
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Acknowledging every soul who contributes to our sacred mission
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gratitudeCategories.slice(0, 3).map((category, index) => {
              const Icon = category.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                  <div className="text-center mb-6">
                    <Icon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-slate-800 mb-2">{category.title}</h3>
                    <p className="text-slate-600 text-sm">{category.description}</p>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-4 mb-4">
                    <p className="text-emerald-800 text-sm font-medium italic">"{category.recognition}"</p>
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                      {category.count}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {gratitudeCategories.slice(3).map((category, index) => {
              const Icon = category.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                  <div className="text-center mb-6">
                    <Icon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-slate-800 mb-2">{category.title}</h3>
                    <p className="text-slate-600 text-sm">{category.description}</p>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-4 mb-4">
                    <p className="text-emerald-800 text-sm font-medium italic">"{category.recognition}"</p>
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                      {category.count}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sacred Gratitude */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-8">
              Sacred Gratitude
            </h2>
            <div className="max-w-4xl mx-auto">
              <blockquote className="text-2xl lg:text-3xl font-light italic text-slate-700 leading-relaxed mb-8">
                "Every echo that reaches a heart is not ours. It is His."
              </blockquote>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Every name mentioned here represents a soul who has contributed to amplifying divine voices 
                across the world. We are deeply grateful for each contribution, whether large or small, 
                visible or hidden, as all are essential to our sacred mission.
              </p>
              <div className="bg-slate-800 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold text-emerald-300 mb-4">A Living Document</h3>
                <p className="text-slate-300 leading-relaxed">
                  This acknowledgment page is a living document that grows with our community. 
                  If you have contributed to SufiPulse and are not mentioned here, please reach out—
                  every contribution deserves recognition in our sacred record of gratitude.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Become Part of Our Gratitude
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Join our global community and become part of the sacred work we acknowledge here. 
            Whether as a writer, vocalist, or supporter, your contribution will be honored and celebrated.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/join"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <Users className="w-5 h-5" />
              <span>Join Our Community</span>
            </Link>
            <Link
              href="/who-we-are"
              className="inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <BookOpen className="w-5 h-5" />
              <span>Learn About Us</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 border-2 border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <Heart className="w-5 h-5" />
              <span>Express Gratitude</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Acknowledgments;
