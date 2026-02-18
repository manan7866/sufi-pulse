/**
 * CMS Fallback Data for Home Page
 * This data is used when:
 * 1. CMS database is not available
 * 2. API call fails
 * 3. Page is loading
 * 
 * Admin can override this data via /admin/cms
 */

export const homePageFallbackData = {
  page_id: 1,
  page_name: "Home",
  page_title: "SufiPulse - Global Sufi Music Platform",
  page_slug: "home",
  meta_description: "SufiPulse is a global platform for Sufi music collaboration, connecting writers and vocalists worldwide to create sacred kalam.",
  meta_keywords: "sufi music, kalam, spiritual music, qawwali, sufism, global platform",
  hero_title: "Global Sufi Collaboration Studio",
  hero_subtitle: "From Kashmir's sacred valleys to the global ummah submit your Sufi kalam. Let the world hear its pulse.",
  hero_quote: "We don't sell divine lyrics. We amplify them.",
  hero_quote_author: "SufiPulse Promise",
  
  // Statistics
  stats: [
    {
      stat_number: "300+",
      stat_label: "Sacred Collaborations",
      stat_description: "Divine kalam brought to life",
      stat_icon: "Heart",
      stat_order: 1
    },
    {
      stat_number: "43+",
      stat_label: "Countries Represented",
      stat_description: "Global spiritual community",
      stat_icon: "Globe",
      stat_order: 2
    },
    {
      stat_number: "150+",
      stat_label: "Divine Kalam Created",
      stat_description: "Sacred productions",
      stat_icon: "Music",
      stat_order: 3
    },
    {
      stat_number: "100%",
      stat_label: "Free for Writers",
      stat_description: "No cost ever",
      stat_icon: "Award",
      stat_order: 4
    }
  ],

  // Testimonials (sample - truncated for brevity)
  testimonials: [
    {
      testimonial_name: "Amina Rahman",
      testimonial_location: "Delhi, India",
      testimonial_role: "Sufi Writer",
      testimonial_quote: "SufiPulse turned my kalam into a global spiritual experience with exceptional production quality.",
      testimonial_image_url: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200",
      testimonial_order: 1
    },
    {
      testimonial_name: "Omar Ali",
      testimonial_location: "London, UK",
      testimonial_role: "Sufi Devotee",
      testimonial_quote: "SufiPulse evokes the warmth of zikr circles, deepening my spiritual connection.",
      testimonial_image_url: "/pics/38-min.png",
      testimonial_order: 2
    },
    {
      testimonial_name: "Sofia Müller",
      testimonial_location: "Berlin, Germany",
      testimonial_role: "Spiritual Music Lover",
      testimonial_quote: "SufiPulse's harmonies create a sacred space, pure and deeply moving.",
      testimonial_image_url: "https://images.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg?auto=compress&cs=tinysrgb&w=200",
      testimonial_order: 3
    }
  ],

  // Values
  values: [
    {
      value_title: "Spiritual Integrity",
      value_description: "Every project is approached with deep reverence for the sacred nature of Sufi poetry and spiritual expression.",
      value_icon: "Heart",
      value_color: "emerald",
      value_order: 1
    },
    {
      value_title: "Global Unity",
      value_description: "Bridging cultures and languages through the universal language of divine love and spiritual awakening.",
      value_icon: "Globe",
      value_color: "emerald",
      value_order: 2
    }
  ],

  // Team members (if any for home page)
  team: [],

  // Timeline (if any for home page)
  timeline: [],

  // Hubs (if any for home page)
  hubs: [],

  // Sections (if any for home page)
  sections: []
}

/**
 * CMS Fallback Data for About Page
 */
export const aboutPageFallbackData = {
  page_id: 2,
  page_name: "About",
  page_title: "About SufiPulse - Our Story",
  page_slug: "about",
  meta_description: "Learn about SufiPulse mission to preserve and promote Sufi music through global collaboration.",
  meta_keywords: "about sufiPulse, our mission, sufi music platform, spiritual collaboration",
  hero_title: "Our Sacred Mission",
  hero_subtitle: "Serving the divine through the preservation, production, and global sharing of sacred Sufi kalam",
  hero_quote: null,
  hero_quote_author: null,

  stats: [
    {
      stat_number: "300+",
      stat_label: "Sacred Collaborations",
      stat_description: "Divine kalam brought to life",
      stat_order: 1
    },
    {
      stat_number: "89",
      stat_label: "Writers",
      stat_description: "From 50+ countries",
      stat_order: 2
    },
    {
      stat_number: "43",
      stat_label: "Vocalists",
      stat_description: "Diverse spiritual voices",
      stat_order: 3
    },
    {
      stat_number: "25+",
      stat_label: "Languages",
      stat_description: "Bridging cultural divides",
      stat_order: 4
    },
    {
      stat_number: "127K+",
      stat_label: "Global Views",
      stat_description: "Hearts touched worldwide",
      stat_order: 5
    },
    {
      stat_number: "100%",
      stat_label: "Free Service",
      stat_description: "No cost to writers ever",
      stat_order: 6
    }
  ],

  values: [
    {
      value_title: "Spiritual Integrity",
      value_description: "Every project is approached with deep reverence for the sacred nature of Sufi poetry and spiritual expression.",
      value_icon: "Heart",
      value_color: "emerald",
      value_order: 1
    },
    {
      value_title: "Global Unity",
      value_description: "Bridging cultures and languages through the universal language of divine love and spiritual awakening.",
      value_icon: "Globe",
      value_color: "emerald",
      value_order: 2
    },
    {
      value_title: "Non-Commercial Service",
      value_description: "We serve the sacred, not profit. All our services are provided freely to uplift the spiritual community.",
      value_icon: "Shield",
      value_color: "emerald",
      value_order: 3
    },
    {
      value_title: "Excellence in Craft",
      value_description: "Combining technical mastery with spiritual sensitivity to create productions worthy of the divine message.",
      value_icon: "Award",
      value_color: "emerald",
      value_order: 4
    }
  ],

  team: [
    {
      member_name: "Dr. Zarf-e-Noori",
      member_role: "Founder & Visionary",
      member_organization: "SufiPulse Global",
      member_bio: "Kashmiri-American visionary bridging ancient Sufi wisdom with modern innovation. Writer, Lyricist, Composer, and Creative Director.",
      member_image_url: "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=200",
      is_featured: true,
      member_order: 1
    },
    {
      member_name: "Dr. Amara Kumar",
      member_role: "Spiritual Director",
      member_organization: "Dr. Kumar Foundation",
      member_bio: "Renowned scholar of comparative mysticism and founder of the Dr. Kumar Foundation, dedicated to preserving spiritual wisdom.",
      member_image_url: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200",
      is_featured: false,
      member_order: 2
    },
    {
      member_name: "Prof. Hassan Al-Sufi",
      member_role: "Academic Advisor",
      member_organization: "Sufi Science Center USA",
      member_bio: "Leading authority on Sufi literature and Islamic spirituality, bringing decades of scholarly research to our mission.",
      member_image_url: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200",
      is_featured: false,
      member_order: 3
    }
  ],

  timeline: [
    {
      timeline_year: "2022",
      timeline_title: "Vision Conceived",
      timeline_description: "Dr. Zarf-e-Noori envisions a global platform for Sufi collaboration, inspired by Kashmir's mystical heritage",
      timeline_order: 1
    },
    {
      timeline_year: "2023",
      timeline_title: "Foundation Established",
      timeline_description: "SufiPulse launched as a joint initiative of Dr. Kumar Foundation and Sufi Science Center USA",
      timeline_order: 2
    },
    {
      timeline_year: "2024",
      timeline_title: "Global Expansion",
      timeline_description: "Connected writers and vocalists from 50+ countries for sacred kalam productions",
      timeline_order: 3
    },
    {
      timeline_year: "2024",
      timeline_title: "Studio Development",
      timeline_description: "Established world-class recording facilities with specialized acoustic treatment for spiritual music",
      timeline_order: 4
    },
    {
      timeline_year: "2025",
      timeline_title: "Digital Platform Launch",
      timeline_description: "Launched comprehensive online platform for global Sufi collaboration and sharing",
      timeline_order: 5
    }
  ],

  testimonials: [],
  hubs: [],
  sections: []
}

/**
 * CMS Fallback Data for Our Mission Page
 */
export const ourMissionPageFallbackData = {
  page_id: 3,
  page_name: "Our Mission",
  page_title: "Our Mission - SufiPulse Vision",
  page_slug: "our-mission",
  meta_description: "Discover the three sacred vows that guide SufiPulse in serving the divine word through music.",
  meta_keywords: "sufiPulse mission, vision, spiritual service, sufi music preservation",
  hero_title: "Our Mission",
  hero_subtitle: "Our mission is rooted in three sacred vows",
  hero_quote: "Our mission is rooted in three sacred vows",
  hero_quote_author: null,

  stats: [
    {
      stat_number: "300+",
      stat_label: "Writers",
      stat_description: "Global contributors",
      stat_order: 1
    },
    {
      stat_number: "43",
      stat_label: "Vocalists",
      stat_description: "Sacred voices",
      stat_order: 2
    },
    {
      stat_number: "300+",
      stat_label: "Collaborations",
      stat_description: "Divine productions",
      stat_order: 3
    },
    {
      stat_number: "100%",
      stat_label: "Free Service",
      stat_description: "No cost to writers ever",
      stat_order: 4
    }
  ],

  values: [
    {
      value_title: "To Serve the Divine Word",
      value_description: "We do not monetize, modify, or exploit kalam. We protect its essence and amplify its reach.",
      value_icon: "Heart",
      value_color: "emerald",
      value_order: 1
    },
    {
      value_title: "Unity Through Sound",
      value_description: "From Kashmir to Los Angeles, from Cairo to Kuala Lumpur we believe every soul carrying divine lyrics deserves a global stage.",
      value_icon: "Globe",
      value_color: "emerald",
      value_order: 2
    },
    {
      value_title: "To Produce With Purity",
      value_description: "No marketing agenda. No monetization. No fame game. Just sincere production powered by sincerity, silence, and surrender.",
      value_icon: "Shield",
      value_color: "emerald",
      value_order: 3
    }
  ],

  team: [],
  timeline: [],
  testimonials: [],
  hubs: [],
  sections: []
}

/**
 * CMS Fallback Data for Contact Page
 */
export const contactPageFallbackData = {
  page_id: 6,
  page_name: "Contact",
  page_title: "Contact SufiPulse - Connect With Us",
  page_slug: "contact",
  meta_description: "Get in touch with SufiPulse for writer submissions, vocalist applications, or partnership inquiries.",
  meta_keywords: "contact sufiPulse, submit kalam, join vocalist pool, partnership",
  hero_title: "Connect With Our Sacred Community",
  hero_subtitle: "Ready to share your divine Sufi kalam or collaborate with our global spiritual community?",
  hero_quote: "Every connection is a bridge between hearts seeking the Divine",
  hero_quote_author: null,

  stats: [],
  values: [],
  team: [],
  timeline: [],
  testimonials: [],

  hubs: [
    {
      hub_title: "Global Creative Hub",
      hub_details: "SufiPulse Studio, Virginia, USA",
      hub_description: "Our main creative center",
      hub_icon: "MapPin",
      hub_order: 1
    },
    {
      hub_title: "Spiritual Heritage Hub",
      hub_details: "SufiPulse – Kashmir, Srinagar, Jammu & Kashmir, India",
      hub_description: "Rooted in spiritual tradition",
      hub_icon: "MapPin",
      hub_order: 2
    },
    {
      hub_title: "Remote Vocalist Recording Hubs",
      hub_details: "Srinagar, Kashmir – India\nDubai – UAE\nMumbai – India\nIstanbul – Turkey",
      hub_description: "Global recording facilities",
      hub_icon: "Music",
      hub_order: 3
    },
    {
      hub_title: "Email Us",
      hub_details: "connect@sufipulse.com",
      hub_description: "Connect with us globally",
      hub_icon: "Mail",
      hub_order: 4
    }
  ],

  sections: []
}

/**
 * CMS Fallback Data for Founder Page
 */
export const founderPageFallbackData = {
  page_id: 5,
  page_name: "Founder",
  page_title: "Dr. Zarf-e-Noori - SufiPulse Founder",
  page_slug: "founder",
  meta_description: "Learn about Dr. Zarf-e-Noori, the visionary founder of SufiPulse Global.",
  meta_keywords: "Dr. Zarf-e-Noori, sufiPulse founder, sufi music visionary, kashmiri lyricist",
  hero_title: "Dr. Zarf-e-Noori",
  hero_subtitle: "Founder & Visionary of SufiPulse - Bridging the sacred valleys of Kashmir with the global spiritual community",
  hero_quote: null,
  hero_quote_author: null,

  stats: [],
  values: [],
  team: [],
  timeline: [],
  testimonials: [
    {
      testimonial_name: "Dr. Zarf-e-Noori",
      testimonial_location: null,
      testimonial_role: "Core Philosophy",
      testimonial_quote: "We don't sell divine lyrics. We amplify them.",
      testimonial_image_url: null,
      testimonial_order: 1
    },
    {
      testimonial_name: "Dr. Zarf-e-Noori",
      testimonial_location: null,
      testimonial_role: "On Innovation",
      testimonial_quote: "Technology should serve the sacred, not the other way around.",
      testimonial_image_url: null,
      testimonial_order: 2
    },
    {
      testimonial_name: "Dr. Zarf-e-Noori",
      testimonial_location: null,
      testimonial_role: "Mission Statement",
      testimonial_quote: "From Kashmir's valleys to the world's heart - every soul deserves to hear the divine pulse.",
      testimonial_image_url: null,
      testimonial_order: 3
    }
  ],

  hubs: [],
  sections: [
    {
      section_name: "Creative Roles",
      section_type: "roles",
      section_title: "Creative Leadership",
      section_subtitle: "Dr. Zarf-e-Noori's multifaceted creative roles in shaping SufiPulse's artistic vision",
      section_content: null,
      section_order: 1,
      items: [
        {
          item_title: "Writer",
          item_subtitle: null,
          item_description: "Crafting sacred Sufi poetry with deep spiritual insight",
          item_icon: "PenTool",
          item_field: null,
          item_order: 1
        },
        {
          item_title: "Lyricist",
          item_subtitle: null,
          item_description: "Creating divine verses that resonate with the soul",
          item_icon: "Music",
          item_field: null,
          item_order: 2
        },
        {
          item_title: "Composer",
          item_subtitle: null,
          item_description: "Harmonizing words with melodies for spiritual elevation",
          item_icon: "Mic",
          item_field: null,
          item_order: 3
        },
        {
          item_title: "Creative Director",
          item_subtitle: null,
          item_description: "Guiding SufiPulse's artistic vision and mission",
          item_icon: "Users",
          item_field: null,
          item_order: 4
        }
      ]
    }
  ]
}

/**
 * Map of all page fallback data
 */
export const allPagesFallbackData = {
  home: homePageFallbackData,
  about: aboutPageFallbackData,
  'our-mission': ourMissionPageFallbackData,
  contact: contactPageFallbackData,
  founder: founderPageFallbackData,
  // Add more pages as needed
}
