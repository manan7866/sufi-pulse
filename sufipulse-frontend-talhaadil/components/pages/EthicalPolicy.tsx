"use client"

import React from "react";
import Link from "next/link";
import {
  Shield,
  Heart,
  Users,
  Award,
  BookOpen,
  CheckCircle,
  FileText,
  Feather
} from "lucide-react";
import { incrementWeekly,incrementMonthly } from "@/lib/increment";
import { useCMSPage } from '@/hooks/useCMSPage';
import { aboutPageFallbackData } from '@/lib/cmsFallbackData';


const EthicalPolicy = () => {
  const ethicalPrinciples = [
    {
      icon: Shield,
      title: "Non-commercial Promise",
      description:
        "We do not accept advertising, sell content, or seek monetization through views or streaming platforms.",
      policies: [
        "No advertising revenue accepted",
        "No content sales or subscriptions",
        "No monetization through streaming",
        "Complete freedom from commercial interests",
      ],
    },
    {
      icon: Award,
      title: "Credit with Integrity",
      description:
        "Every contributor whether a writer, vocalist, or sound engineer is credited with transparency and honor.",
      policies: [
        "Full authorship credit on all platforms",
        "Transparent contributor recognition",
        "Honor for all creative contributions",
        "No hidden or diminished credits",
      ],
    },
    {
      icon: Users,
      title: "Consent Before Creation",
      description:
        "No kalam is altered, recorded, or released without the explicit agreement of its writer.",
      policies: [
        "Explicit consent required for all changes",
        "Writer approval before recording",
        "No unauthorized alterations",
        "Transparent communication throughout",
      ],
    },
    {
      icon: Heart,
      title: "Safe for the Soul",
      description:
        "All content undergoes spiritual, lyrical, and philosophical review to ensure alignment with Sufi ethics and soundness.",
      policies: [
        "Spiritual integrity maintained",
        "Lyrical authenticity preserved",
        "Philosophical soundness verified",
        "Sufi ethics strictly followed",
      ],
    },
  ];

  const adabPrinciples = [
    {
      title: "Adab (Respect)",
      description:
        "Treating every sacred submission with the highest reverence and spiritual courtesy",
      examples: [
        "Respectful handling of religious themes",
        "Cultural sensitivity in all productions",
        "Honor for traditional forms",
        "Reverence for spiritual content",
      ],
    },
    {
      title: "Ikhlas (Sincerity)",
      description:
        "Operating with pure intention, free from commercial motives or hidden agendas",
      examples: [
        "Pure spiritual intention",
        "No commercial exploitation",
        "Transparent operations",
        "Sincere service to the divine",
      ],
    },
    {
      title: "Amanah (Trust)",
      description:
        "Honoring the sacred trust placed in us by writers and the global spiritual community",
      examples: [
        "Protecting writer rights",
        "Maintaining content integrity",
        "Faithful representation",
        "Sacred responsibility",
      ],
    },
  ];
// These  fields data comming from database cms
const { data: cmsData } = useCMSPage({
  pageSlug: 'ethical-policy',
  fallbackData: aboutPageFallbackData,
  enabled: true
});
const pageData = cmsData || aboutPageFallbackData;




  const stats =    (pageData.stats && pageData.stats.length > 0)
  ? pageData.stats.map((stat: any) => ({
      number: stat.stat_number,
      label: stat.stat_label,
      description: stat.stat_description,
      
    }))
  : [
    {
      number: "100%",
      label: "Free Service",
      description: "No cost to writers ever",
    },
    {
      number: `${incrementWeekly(300)}+`,
      label: "Sacred Collaborations",
      description: "Handled with ethical care",
    },
    {
      number: "0",
      label: "Commercial Exploitation",
      description: "Zero monetization of sacred content",
    },
    {
      number: `${incrementMonthly(43,200)}+`,
      label: "Countries",
      description: "Ethical standards maintained globally",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
    {/* Hero Section */}
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          <div className="w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Feather className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
            Ethical Policy
          </h1>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20 max-w-5xl mx-auto">
            <p className="text-xl text-slate-300 leading-relaxed mb-6">
              At SufiPulse, our ethical framework is guided by{" "}
              <strong className="text-emerald-300">adab</strong> (respect),
              <strong className="text-emerald-300"> ikhlas</strong>{" "}
              (sincerity), and{" "}
              <strong className="text-emerald-300">amanah</strong> (trust).
            </p>
            <blockquote className="text-2xl font-light italic text-emerald-300 mb-4">
              "This is sacred ground. We treat it as such."
            </blockquote>
            <p className="text-slate-300">
              Our unwavering commitment to ethical practices in handling
              sacred content, protecting contributor rights, and maintaining
              spiritual integrity in all our work.
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
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-slate-800 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-slate-600">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* Core Ethical Framework */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Our Ethical Framework
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Guided by Islamic principles of respect, sincerity, and trust in
              all our sacred work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {adabPrinciples.map((principle, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-100"
              >
                <h3 className="text-xl font-bold text-slate-800 mb-4">
                  {principle.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {principle.description}
                </p>
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-800 text-sm mb-3">
                    Examples:
                  </h4>
                  {principle.examples.map((example, exampleIndex) => (
                    <div
                      key={exampleIndex}
                      className="flex items-start space-x-2"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                      <span className="text-sm text-slate-600 leading-relaxed">
                        {example}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Ethical Principles */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Four Pillars of Ethics
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The fundamental ethical standards that guide every aspect of our
              sacred work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ethicalPrinciples.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-800 mb-3">
                        {principle.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-slate-800 text-sm mb-3">
                      Our Commitments:
                    </h4>
                    {principle.policies.map((policy, policyIndex) => (
                      <div
                        key={policyIndex}
                        className="flex items-start space-x-2"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                        <span className="text-sm text-slate-600 leading-relaxed">
                          {policy}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sacred Commitment */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-8">
              Our Sacred Commitment
            </h2>
            <div className="max-w-4xl mx-auto">
              <blockquote className="text-2xl lg:text-3xl font-light italic text-slate-700 leading-relaxed mb-8">
                "This is sacred ground. We treat it as such."
              </blockquote>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                This ethical policy is not merely a document—it is our sacred
                covenant with the global community. We commit to upholding these
                principles in every interaction, every production, and every
                decision, ensuring that SufiPulse remains a trusted guardian of
                sacred expression.
              </p>
              <div className="bg-slate-800 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold text-emerald-300 mb-4">
                  Contact for Ethical Concerns
                </h3>
                <p className="text-slate-300 mb-4">
                  If you have any ethical concerns or questions about our
                  practices, please reach out to our Ethics Committee directly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:ethics@sufipulse.com"
                    className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    <FileText className="w-4 h-4" />
                    <span>ethics@sufipulse.com</span>
                  </a>
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
            Trust in Our Ethical Foundation
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Our ethical policy ensures that your sacred contributions are
            handled with the respect and integrity they deserve. Join our
            community with confidence in our commitment to spiritual values.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dr-kumar-foundation"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
            >
              <BookOpen className="w-5 h-5" />
              <span>Dr. Kumar Foundation</span>
            </Link>
            <Link
              href="/join"
              className="inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <Users className="w-5 h-5" />
              <span>Join With Confidence</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 border-2 border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 px-8 py-4 rounded-xl font-semibold transition-all duration-200"
            >
              <Heart className="w-5 h-5" />
              <span>Ask Questions</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EthicalPolicy;
