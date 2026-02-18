# 🎯 All 13 Remaining Pages - Complete CMS Integration

## Page Slugs List

1. **Acknowledgments** → `pageSlug: 'acknowledgments'`
2. **EthicalPolicy** → `pageSlug: 'ethical-policy'`
3. **HowItWorks** → `pageSlug: 'how-it-works'`
4. **Partnership** → `pageSlug: 'partnership'`
5. **GuestBlogs** → `pageSlug: 'guest-blogs'`
6. **MusicStyleSelection** → `pageSlug: 'music-style-selection'`
7. **KalamLibrary** → `pageSlug: 'kalam-library'`
8. **WriterFAQs** → `pageSlug: 'writer-faqs'`
9. **Studio** → `pageSlug: 'studio'`
10. **StudioEngineers** → `pageSlug: 'studio-engineers'`
11. **SufiScienceCenter** → `pageSlug: 'sufi-science-center'`
12. **SufiMusicTheory** → `pageSlug: 'sufi-music-theory'`
13. **VocalistHowItWorks** → `pageSlug: 'vocalist-how-it-works'`

---

## Standard Implementation Pattern (for all pages)

### Step 1: Add Imports
```typescript
import { useCMSPage } from '@/hooks/useCMSPage';
import { aboutPageFallbackData } from '@/lib/cmsFallbackData';
```

### Step 2: Add CMS Hook
```typescript
const { data: cmsData } = useCMSPage({
  pageSlug: '[PAGE_SLUG_HERE]',
  fallbackData: aboutPageFallbackData,
  enabled: true
});

const pageData = cmsData || aboutPageFallbackData;
```

### Step 3: Update Stats
```typescript
// These fields data coming from database cms
const stats = (pageData.stats && pageData.stats.length > 0)
  ? pageData.stats.map((stat: any) => ({
      number: stat.stat_number,
      label: stat.stat_label,
      description: stat.stat_description,
      icon: stat.stat_icon
    }))
  : [
      // ... original fallback stats here
    ];
```

---

## Database Seed Data

Add these to `sql/cms_pages_schema.sql`:

```sql
-- Acknowledgments Page
INSERT INTO cms_pages (page_name, page_title, page_slug, meta_description)
VALUES ('Acknowledgments', 'Acknowledgments - SufiPulse', 'acknowledgments', 
        'Acknowledging all contributors to the SufiPulse mission');

-- Ethical Policy Page
INSERT INTO cms_pages (page_name, page_title, page_slug, meta_description)
VALUES ('Ethical Policy', 'Ethical Policy - SufiPulse', 'ethical-policy',
        'Our ethical guidelines and principles');

-- How It Works Page
INSERT INTO cms_pages (page_name, page_title, page_slug, meta_description)
VALUES ('How It Works', 'How It Works - SufiPulse', 'how-it-works',
        'Learn how SufiPulse works');

-- Partnership Page
INSERT INTO cms_pages (page_name, page_title, page_slug, meta_description)
VALUES ('Partnership', 'Partnership - SufiPulse', 'partnership',
        'Partnership opportunities with SufiPulse');

-- Guest Blogs Page
INSERT INTO cms_pages (page_name, page_title, page_slug, meta_description)
VALUES ('Guest Blogs', 'Guest Blogs - SufiPulse', 'guest-blogs',
        'Guest blog posts from our community');

-- Music Style Selection Page
INSERT INTO cms_pages (page_name, page_title, page_slug, meta_description)
VALUES ('Music Style Selection', 'Music Style Selection - SufiPulse', 'music-style-selection',
        'Choose your musical style');

-- Kalam Library Page
INSERT INTO cms_pages (page_name, page_title, page_slug, meta_description)
VALUES ('Kalam Library', 'Kalam Library - SufiPulse', 'kalam-library',
        'Browse our library of kalam');

-- Writer FAQs Page
INSERT INTO cms_pages (page_name, page_title, page_slug, meta_description)
VALUES ('Writer FAQs', 'Writer FAQs - SufiPulse', 'writer-faqs',
        'Frequently asked questions for writers');

-- Studio Page
INSERT INTO cms_pages (page_name, page_title, page_slug, meta_description)
VALUES ('Studio', 'Studio - SufiPulse', 'studio',
        'SufiPulse recording studio');

-- Studio Engineers Page
INSERT INTO cms_pages (page_name, page_title, page_slug, meta_description)
VALUES ('Studio Engineers', 'Studio Engineers - SufiPulse', 'studio-engineers',
        'Meet our studio engineering team');

-- Sufi Science Center Page
INSERT INTO cms_pages (page_name, page_title, page_slug, meta_description)
VALUES ('Sufi Science Center', 'Sufi Science Center - SufiPulse', 'sufi-science-center',
        'Sufi Science Center research and education');

-- Sufi Music Theory Page
INSERT INTO cms_pages (page_name, page_title, page_slug, meta_description)
VALUES ('Sufi Music Theory', 'Sufi Music Theory - SufiPulse', 'sufi-music-theory',
        'Learn about Sufi music theory');

-- Vocalist How It Works Page
INSERT INTO cms_pages (page_name, page_title, page_slug, meta_description)
VALUES ('Vocalist How It Works', 'Vocalist How It Works - SufiPulse', 'vocalist-how-it-works',
        'How the vocalist journey works');
```

---

## Fallback Data Updates

Add to `lib/cmsFallbackData.ts`:

```typescript
export const acknowledgmentsPageFallbackData = {
  page_id: 8,
  page_name: "Acknowledgments",
  page_title: "Acknowledgments - SufiPulse",
  page_slug: "acknowledgments",
  stats: [
    { stat_number: "300+", stat_label: "Collaborations", stat_description: "Sacred productions completed" },
    { stat_number: "43+", stat_label: "Countries", stat_description: "Global community reach" },
    { stat_number: "17+", stat_label: "Languages", stat_description: "Diverse linguistic representation" },
    { stat_number: "∞", stat_label: "Gratitude", stat_description: "For every contribution" }
  ]
};

export const ethicalPolicyPageFallbackData = {
  page_id: 9,
  page_name: "Ethical Policy",
  page_title: "Ethical Policy - SufiPulse",
  page_slug: "ethical-policy",
  stats: [
    { stat_number: "100%", stat_label: "Free Service", stat_description: "No cost to writers ever" },
    { stat_number: "300+", stat_label: "Sacred Collaborations", stat_description: "Handled with ethical care" },
    { stat_number: "0", stat_label: "Commercial Exploitation", stat_description: "Zero monetization" },
    { stat_number: "43+", stat_label: "Countries Served", stat_description: "Global ethical standards" }
  ]
};

export const howItWorksPageFallbackData = {
  page_id: 10,
  page_name: "How It Works",
  page_title: "How It Works - SufiPulse",
  page_slug: "how-it-works",
  stats: [
    { stat_number: "8", stat_label: "Simple Steps", stat_icon: "CheckCircle" },
    { stat_number: "4-8", stat_label: "Weeks Timeline", stat_icon: "Clock" },
    { stat_number: "100%", stat_label: "Free Service", stat_icon: "Award" },
    { stat_number: "300+", stat_label: "Successful Journeys", stat_icon: "Heart" }
  ]
};

export const partnershipPageFallbackData = {
  page_id: 11,
  page_name: "Partnership",
  page_title: "Partnership - SufiPulse",
  page_slug: "partnership",
  stats: [
    { stat_number: "15+", stat_label: "Global Partners", stat_icon: "Globe" },
    { stat_number: "43+", stat_label: "Countries Connected", stat_icon: "Users" },
    { stat_number: "17+", stat_label: "Languages Served", stat_icon: "BookOpen" },
    { stat_number: "100%", stat_label: "Sacred Focus", stat_icon: "Award" }
  ]
};

export const guestBlogsPageFallbackData = {
  page_id: 12,
  page_name: "Guest Blogs",
  page_title: "Guest Blogs - SufiPulse",
  page_slug: "guest-blogs",
  stats: [
    { stat_number: "15", stat_label: "Guest Contributors", stat_icon: "Users" },
    { stat_number: "25", stat_label: "Published Articles", stat_icon: "BookOpen" },
    { stat_number: "12+", stat_label: "Countries Represented", stat_icon: "Globe" },
    { stat_number: "100%", stat_label: "Free Service", stat_icon: "Award" }
  ]
};

export const musicStyleSelectionPageFallbackData = {
  page_id: 13,
  page_name: "Music Style Selection",
  page_title: "Music Style Selection - SufiPulse",
  page_slug: "music-style-selection",
  stats: [
    { stat_number: "4+", stat_label: "Musical Styles", stat_icon: "Music" },
    { stat_number: "300+", stat_label: "Style Selections", stat_icon: "CheckCircle" },
    { stat_number: "17+", stat_label: "Languages Adapted", stat_icon: "Globe" },
    { stat_number: "100%", stat_label: "Spiritual Alignment", stat_icon: "Heart" }
  ]
};

export const kalamLibraryPageFallbackData = {
  page_id: 14,
  page_name: "Kalam Library",
  page_title: "Kalam Library - SufiPulse",
  page_slug: "kalam-library",
  stats: [
    { stat_number: "300+", stat_label: "Sacred Texts", stat_icon: "BookOpen" },
    { stat_number: "17+", stat_label: "Languages", stat_icon: "Globe" },
    { stat_number: "89+", stat_label: "Contributing Writers", stat_icon: "Users" },
    { stat_number: "100%", stat_label: "Free Service", stat_icon: "Award" }
  ]
};

export const writerFAQsPageFallbackData = {
  page_id: 15,
  page_name: "Writer FAQs",
  page_title: "Writer FAQs - SufiPulse",
  page_slug: "writer-faqs",
  stats: [
    { stat_number: "89+", stat_label: "Active Writers", stat_icon: "Users" },
    { stat_number: "300+", stat_label: "Kalam Published", stat_icon: "BookOpen" },
    { stat_number: "17+", stat_label: "Languages", stat_icon: "Globe" },
    { stat_number: "100%", stat_label: "Free Service", stat_icon: "Award" }
  ]
};

export const studioPageFallbackData = {
  page_id: 16,
  page_name: "Studio",
  page_title: "Studio - SufiPulse",
  page_slug: "studio",
  stats: [
    { stat_number: "300+", stat_label: "Recordings Made", stat_icon: "Music" },
    { stat_number: "43+", stat_label: "Active Vocalists", stat_icon: "Users" },
    { stat_number: "17+", stat_label: "Languages", stat_icon: "Globe" },
    { stat_number: "100%", stat_label: "Free Service", stat_icon: "Award" }
  ]
};

export const studioEngineersPageFallbackData = {
  page_id: 17,
  page_name: "Studio Engineers",
  page_title: "Studio Engineers - SufiPulse",
  page_slug: "studio-engineers",
  stats: [
    { stat_number: "6", stat_label: "Expert Engineers", stat_icon: "Users" },
    { stat_number: "300+", stat_label: "Productions", stat_icon: "Music" },
    { stat_number: "17+", stat_label: "Languages", stat_icon: "Globe" },
    { stat_number: "15+", stat_label: "Years Experience", stat_icon: "Award" }
  ]
};

export const sufiScienceCenterPageFallbackData = {
  page_id: 18,
  page_name: "Sufi Science Center",
  page_title: "Sufi Science Center - SufiPulse",
  page_slug: "sufi-science-center",
  stats: [
    { stat_number: "2025", stat_label: "Established", stat_description: "Founded as research center" },
    { stat_number: "25+", stat_label: "Research Projects", stat_description: "Active investigations" },
    { stat_number: "100+", stat_label: "Publications", stat_description: "Scientific papers" },
    { stat_number: "∞", stat_label: "Discoveries", stat_description: "Ongoing revelations" }
  ]
};

export const sufiMusicTheoryPageFallbackData = {
  page_id: 19,
  page_name: "Sufi Music Theory",
  page_title: "Sufi Music Theory - SufiPulse",
  page_slug: "sufi-music-theory",
  stats: [
    { stat_number: "1000+", stat_label: "Years of Tradition", stat_icon: "BookOpen" },
    { stat_number: "25+", stat_label: "Musical Modes", stat_icon: "Music" },
    { stat_number: "50+", stat_label: "Rhythmic Patterns", stat_icon: "Heart" },
    { stat_number: "∞", stat_label: "Spiritual Applications", stat_icon: "Star" }
  ]
};

export const vocalistHowItWorksPageFallbackData = {
  page_id: 20,
  page_name: "Vocalist How It Works",
  page_title: "Vocalist How It Works - SufiPulse",
  page_slug: "vocalist-how-it-works",
  stats: [
    { stat_number: "8", stat_label: "Simple Steps", stat_icon: "CheckCircle" },
    { stat_number: "4-6", stat_label: "Weeks Timeline", stat_icon: "Clock" },
    { stat_number: "100%", stat_label: "Free Service", stat_icon: "Award" },
    { stat_number: "200+", stat_label: "Successful Collaborations", stat_icon: "Heart" }
  ]
};
```

---

## ✅ Complete Checklist

- [ ] 1. Acknowledgments - `pageSlug: 'acknowledgments'`
- [ ] 2. EthicalPolicy - `pageSlug: 'ethical-policy'`
- [ ] 3. HowItWorks - `pageSlug: 'how-it-works'`
- [ ] 4. Partnership - `pageSlug: 'partnership'`
- [ ] 5. GuestBlogs - `pageSlug: 'guest-blogs'`
- [ ] 6. MusicStyleSelection - `pageSlug: 'music-style-selection'`
- [ ] 7. KalamLibrary - `pageSlug: 'kalam-library'`
- [ ] 8. WriterFAQs - `pageSlug: 'writer-faqs'`
- [ ] 9. Studio - `pageSlug: 'studio'`
- [ ] 10. StudioEngineers - `pageSlug: 'studio-engineers'`
- [ ] 11. SufiScienceCenter - `pageSlug: 'sufi-science-center'`
- [ ] 12. SufiMusicTheory - `pageSlug: 'sufi-music-theory'`
- [ ] 13. VocalistHowItWorks - `pageSlug: 'vocalist-how-it-works'`

**Total: 13 pages**

---

## 🎯 Summary

**All Pages with CMS Integration:**
- ✅ Completed: 6 pages (Home, WhoWeAre, OurMission, Contact, Founder, Gallery)
- ⏳ Remaining: 13 pages (listed above)
- 📊 **Total: 19 pages**

**All Page Slugs:**
1. `home`
2. `about`
3. `our-mission`
4. `who-we-are`
5. `founder`
6. `contact`
7. `gallery`
8. `acknowledgments`
9. `ethical-policy`
10. `how-it-works`
11. `partnership`
12. `guest-blogs`
13. `music-style-selection`
14. `kalam-library`
15. `writer-faqs`
16. `studio`
17. `studio-engineers`
18. `sufi-science-center`
19. `sufi-music-theory`
20. `vocalist-how-it-works`

---

**Status**: Ready for implementation  
**Date**: February 17, 2026
