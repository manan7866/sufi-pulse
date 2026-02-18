'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Music, 
  Heart, 
  Volume2, 
  Waves, 
  Mic, 
  Users,
  ArrowRight,
  CheckCircle,
  Globe,
  Star,
  BookOpen,
  Award,
  Play,
  Headphones
} from 'lucide-react';
import { incrementMonthly,incrementYearly ,incrementWeekly} from '@/lib/increment';
import { useCMSPage } from '@/hooks/useCMSPage';
import { aboutPageFallbackData } from '@/lib/cmsFallbackData';

const MusicStyleSelection = () => {
  const [activeStyle, setActiveStyle] = useState('qawwali');

  const musicStyles = [
    {
      id: 'qawwali',
      title: 'Qawwali',
      description: 'Traditional Sufi devotional music with powerful vocals and rhythmic accompaniment',
      characteristics: [
        'Powerful lead vocals with backing chorus',
        'Traditional tabla and harmonium',
        'Call and response patterns',
        'Spiritual ecstasy and elevation',
        'Classical Urdu/Arabic poetry'
      ],
      bestFor: [
        'Classical Urdu poetry',
        'Traditional spiritual themes',
        'Devotional expressions',
        'Mystical love poetry',
        'Sacred remembrance'
      ],
      examples: ['Ishq-e-Haqiqi', 'Kashmir\'s Call', 'Divine Unity'],
      duration: '4-8 minutes',
      complexity: 'High',
      languages: ['Urdu', 'Arabic', 'Persian'],
      image: '/pics/Music3.webp'
    },
    {
      id: 'chant',
      title: 'Sacred Chant',
      description: 'Meditative chanting that elevates the soul and connects hearts to the Divine',
      characteristics: [
        'Repetitive melodic patterns',
        'Meditative and contemplative',
        'Minimal instrumentation',
        'Focus on breath and rhythm',
        'Spiritual transcendence'
      ],
      bestFor: [
        'Dhikr and remembrance',
        'Meditative poetry',
        'Contemplative verses',
        'Spiritual healing',
        'Sacred repetition'
      ],
      examples: ['Path of Fanaa', 'Zikr of the Heart', 'Silent Dhikr'],
      duration: '3-6 minutes',
      complexity: 'Medium',
      languages: ['Arabic', 'English', 'Multilingual'],
      image: '/pics/Music2.webp'
    },
    {
      id: 'anthem',
      title: 'Spiritual Anthem',
      description: 'Contemporary spiritual songs that inspire unity and divine connection',
      characteristics: [
        'Modern musical arrangements',
        'Uplifting and inspiring',
        'Full instrumental backing',
        'Contemporary production',
        'Universal appeal'
      ],
      bestFor: [
        'Contemporary spiritual themes',
        'Unity and peace messages',
        'Environmental spirituality',
        'Modern mysticism',
        'Cross-cultural poetry'
      ],
      examples: ['Wahdat Symphony', 'Climate Awakening', 'Unity in Silence'],
      duration: '4-7 minutes',
      complexity: 'High',
      languages: ['English', 'Multilingual', 'Contemporary'],
      image: '/pics/Music1.webp'
    },
    {
      id: 'whisper',
      title: 'Whisper Kalam',
      description: 'Intimate whispered vocals for deep contemplation and inner reflection',
      characteristics: [
        'Soft, intimate delivery',
        'Minimal background music',
        'Focus on words and meaning',
        'Contemplative atmosphere',
        'Personal connection'
      ],
      bestFor: [
        'Personal reflection poetry',
        'Intimate spiritual moments',
        'Contemplative verses',
        'Healing and comfort',
        'Sacred secrets'
      ],
      examples: ['Sacred Breath', 'Whispers of Love', 'Inner Light'],
      duration: '2-5 minutes',
      complexity: 'Low',
      languages: ['Any language', 'Multilingual'],
      image: '/pics/Music4.webp'
    }
  ];

  const selectionProcess = [
    {
      step: 1,
      title: 'Kalam Analysis',
      description: 'Our team analyzes the spiritual content, emotional depth, and linguistic structure of your poetry',
      icon: BookOpen
    },
    {
      step: 2,
      title: 'Cultural Context',
      description: 'We consider the cultural background and traditional associations of your kalam\'s themes',
      icon: Globe
    },
    {
      step: 3,
      title: 'Spiritual Resonance',
      description: 'We determine which musical style will best amplify the spiritual message and emotional impact',
      icon: Heart
    },
    {
      step: 4,
      title: 'Technical Matching',
      description: 'We match the rhythm, meter, and flow of your poetry with the most suitable musical framework',
      icon: Music
    }
  ];
// These  fields data comming from database cms
const { data: cmsData } = useCMSPage({
  pageSlug: 'music-style-selection',
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
        case 'Music':
          return Music;
        case 'Heart':
          return Heart;
        case 'Volume2':
          return Volume2;
        case 'Waves':
          return Waves;
        case 'Mic':
          return Mic;
        case 'Users':
          return Users;
        case 'ArrowRight':
          return ArrowRight;
        case 'CheckCircle':
          return CheckCircle;
        case 'Globe':
          return Globe;
        case 'Star':
          return Star;
        case 'BookOpen':
          return BookOpen;
        case 'Award':
          return Award;
        default:
          return Music; // Default icon if no match
      }
    })()
  }))
:  [
    { number: `${incrementYearly(4)}+`, label: "Musical Styles", icon: Music },
    { number: `${incrementWeekly(300)}+`, label: "Style Selections", icon: CheckCircle },
    { number: `${incrementMonthly(17,50)}+`, label: "Languages Adapted", icon: Globe },
    { number: "100%", label: "Spiritual Alignment", icon: Heart }
  ];

  const currentStyle = musicStyles.find(style => style.id === activeStyle);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <div className="w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Music className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              How We Select
              <span className="block text-emerald-400">Music Style</span>
            </h1>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20 max-w-4xl mx-auto">
              <p className="text-xl text-slate-300 leading-relaxed mb-6">
                Discover the sacred art of matching divine poetry with perfect musical expression. 
                Our expert team carefully selects the ideal style to amplify your kalam's spiritual message.
              </p>
              <blockquote className="text-2xl font-light italic text-emerald-300 mb-4">
                "Every kalam has its perfect musical soul mate"
              </blockquote>
              <p className="text-slate-300">
                From traditional Qawwali to contemporary anthems - we find the style that serves your sacred words.
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

      {/* Selection Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Our Selection Process
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              How our expert team determines the perfect musical style for your sacred poetry
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {selectionProcess.map((process, index) => {
              const Icon = process.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-10 h-10 text-emerald-600" />
                  </div>
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{process.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{process.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Music Styles Explorer */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Explore Our Musical Styles
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover the four main musical styles we use to bring sacred poetry to life
            </p>
          </div>

          {/* Style Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {musicStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => setActiveStyle(style.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeStyle === style.id
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'
                }`}
              >
                {style.title}
              </button>
            ))}
          </div>

          {/* Style Details */}
          {currentStyle && (
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative">
                  <img
                    src={currentStyle.image}
                    alt={currentStyle.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-white text-2xl font-bold mb-2">{currentStyle.title}</h3>
                    <p className="text-slate-200 text-sm">{currentStyle.description}</p>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-emerald-50 rounded-lg p-4">
                      <h4 className="font-bold text-emerald-800 mb-1">Duration</h4>
                      <p className="text-emerald-700 text-sm">{currentStyle.duration}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <h4 className="font-bold text-slate-800 mb-1">Complexity</h4>
                      <p className="text-slate-700 text-sm">{currentStyle.complexity}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-slate-800 mb-3">Musical Characteristics</h4>
                      <div className="space-y-2">
                        {currentStyle.characteristics.map((char, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                            <span className="text-sm text-slate-600">{char}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-800 mb-3">Best Suited For</h4>
                      <div className="space-y-2">
                        {currentStyle.bestFor.map((use, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <Star className="w-4 h-4 text-emerald-500 mt-0.5" />
                            <span className="text-sm text-slate-600">{use}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-800 mb-3">Example Productions</h4>
                      <div className="flex flex-wrap gap-2">
                        {currentStyle.examples.map((example, index) => (
                          <span key={index} className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-800 mb-3">Common Languages</h4>
                      <div className="flex flex-wrap gap-2">
                        {currentStyle.languages.map((language, index) => (
                          <span key={index} className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Sacred Promise */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-8">
              Our Sacred Promise
            </h2>
            <div className="max-w-4xl mx-auto">
              <blockquote className="text-2xl lg:text-3xl font-light italic text-slate-700 leading-relaxed mb-8">
                "We don't impose musical styles - we discover the style that already lives within your kalam."
              </blockquote>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Every musical decision is made in service of your sacred words. Our team's expertise ensures 
                that the chosen style enhances rather than overshadows the spiritual message, creating a 
                perfect harmony between poetry and music.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2">Spiritual First</h3>
                  <p className="text-sm text-slate-600">Music serves the sacred message, never the reverse</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2">Cultural Authenticity</h3>
                  <p className="text-sm text-slate-600">Respecting traditional forms while embracing innovation</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mb-4" />
                  <h3 className="font-bold text-slate-800 mb-2">Perfect Harmony</h3>
                  <p className="text-sm text-slate-600">Creating seamless unity between words and music</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Trust Our Musical Expertise
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Submit your kalam and let our expert team discover its perfect musical expression. 
            We handle the technical decisions so you can focus on the sacred poetry.
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
              href="/gallery"
              className="inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <Play className="w-5 h-5" />
              <span>Hear Examples</span>
            </Link>
            <Link
              href="/studio"
              className="inline-flex items-center space-x-2 border-2 border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <Headphones className="w-5 h-5" />
              <span>Visit Studio</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MusicStyleSelection;