# 📝 Remaining Pages CMS Integration Guide

## Pages That Need CMS Integration (13 pages)

All these pages have the comment `// These fields data comming from database cms` but only need **stats** data from CMS.

---

## ✅ Pattern for All Pages

Each page needs the same 3 changes:

### 1. Add Imports (after existing imports)
```typescript
import { useCMSPage } from '@/hooks/useCMSPage';
import { aboutPageFallbackData } from '@/lib/cmsFallbackData'; // or appropriate fallback
```

### 2. Add CMS Hook (at top of component)
```typescript
const { data: cmsData } = useCMSPage({
  pageSlug: 'page-slug-here',
  fallbackData: aboutPageFallbackData,
  enabled: true
});

const pageData = cmsData || aboutPageFallbackData;
```

### 3. Update Stats Array
**Replace:**
```typescript
// These fields data comming from database cms
const stats = [
  { number: "...", label: "...", ... }
];
```

**With:**
```typescript
// These fields data coming from database cms
const stats = (pageData.stats && pageData.stats.length > 0)
  ? pageData.stats.map((stat: any) => ({
      number: stat.stat_number,
      label: stat.stat_label,
      description: stat.stat_description,
      icon: stat.stat_icon // if has icon
    }))
  : [
      // ... original fallback stats
    ];
```

---

## 📋 Page-by-Page Instructions

### 1. Acknowledgments (`Acknowledgments.tsx`)
**Line:** 90
**Page Slug:** `'acknowledgments'`
**Fallback:** `aboutPageFallbackData`
**Stats:** 4 stats with description

### 2. EthicalPolicy (`EthicalPolicy.tsx`)
**Line:** 101
**Page Slug:** `'ethical-policy'`
**Fallback:** `aboutPageFallbackData`
**Stats:** 4 stats with description

### 3. HowItWorks (`HowItWorks.tsx`)
**Line:** 50
**Page Slug:** `'how-it-works'`
**Fallback:** `aboutPageFallbackData`
**Stats:** 4 stats with icon

### 4. Partnership (`Partnership.tsx`)
**Line:** 116
**Page Slug:** `'partnership'`
**Fallback:** `aboutPageFallbackData`
**Stats:** 4 stats with icon

### 5. GuestBlogs (`GuestBlogs.tsx`)
**Line:** 58
**Page Slug:** `'guest-blogs'`
**Fallback:** `aboutPageFallbackData`
**Stats:** 4 stats with icon

### 6. MusicStyleSelection (`MusicStyleSelection.tsx`)
**Line:** 150
**Page Slug:** `'music-style-selection'`
**Fallback:** `aboutPageFallbackData`
**Stats:** 4 stats with icon

### 7. KalamLibrary (`KalamLibrary.tsx`)
**Line:** 70
**Page Slug:** `'kalam-library'`
**Fallback:** `aboutPageFallbackData`
**Stats:** 4 stats with icon

### 8. WriterFAQs (`WriterFAQs.tsx`)
**Line:** 138
**Page Slug:** `'writer-faqs'`
**Fallback:** `aboutPageFallbackData`
**Stats:** 4 stats with icon

### 9. Studio (`Studio.tsx`)
**Line:** 244 (comment in JSX)
**Page Slug:** `'studio'`
**Fallback:** `aboutPageFallbackData`
**Stats:** 4 stats (inline in JSX)
**Note:** Stats are in JSX section, update inline

### 10. StudioEngineers (`StudioEngineers.tsx`)
**Line:** 107
**Page Slug:** `'studio-engineers'`
**Fallback:** `aboutPageFallbackData`
**Stats:** 4 stats with icon

### 11. SufiScienceCenter (`SufiScienceCenter.tsx`)
**Line:** 113
**Page Slug:** `'sufi-science-center'`
**Fallback:** `aboutPageFallbackData`
**Stats:** 4 stats with description

### 12. SufiMusicTheory (`SufiMusicTheory.tsx`)
**Line:** 140
**Page Slug:** `'sufi-music-theory'`
**Fallback:** `aboutPageFallbackData`
**Stats:** 4 stats with icon

### 13. VocalistHowItWorks (`VocalistHowItWorks.tsx`)
**Line:** 180
**Page Slug:** `'vocalist-how-it-works'`
**Fallback:** `aboutPageFallbackData`
**Stats:** 4 stats with icon

---

## 🎯 Quick Update Script

For each page, run these commands:

```bash
# 1. Add imports after line with 'increment' import
sed -i "/from '@\/lib\/increment';/a import { useCMSPage } from '@/hooks/useCMSPage';\nimport { aboutPageFallbackData } from '@/lib/cmsFallbackData';" components/pages/FILENAME.tsx

# 2. Add hook after component declaration
# (Manual - add after "const ComponentName = () => {")

# 3. Replace stats array
# (Manual - replace the stats array with CMS version)
```

---

## ✨ Example: Complete Update for Acknowledgments.tsx

**Step 1: Add imports (line 22)**
```typescript
import { incrementMonthly,incrementWeekly } from '@/lib/increment';
import { useCMSPage } from '@/hooks/useCMSPage';        // ADD
import { aboutPageFallbackData } from '@/lib/cmsFallbackData';  // ADD
```

**Step 2: Add hook in component (after line 40)**
```typescript
const Acknowledgments = () => {
  // ADD THESE:
  const { data: cmsData } = useCMSPage({
    pageSlug: 'acknowledgments',
    fallbackData: aboutPageFallbackData,
    enabled: true
  });
  
  const pageData = cmsData || aboutPageFallbackData;
  
  // ... rest of component
```

**Step 3: Update stats (line 90)**
```typescript
// REPLACE THIS:
// These  fields data comming from database cms
const stats = [
  { number: `${incrementWeekly(300)}+`, label: "Collaborations", description: "Sacred productions completed" },
  { number: `${incrementMonthly(43,200)}+`, label: "Countries", description: "Global community reach" },
  { number: `${incrementMonthly(17,50)}+`, label: "Languages", description: "Diverse linguistic representation" },
  { number: "∞", label: "Gratitude", description: "For every contribution" }
];

// WITH THIS:
// These fields data coming from database cms
const stats = (pageData.stats && pageData.stats.length > 0)
  ? pageData.stats.map((stat: any) => ({
      number: stat.stat_number,
      label: stat.stat_label,
      description: stat.stat_description
    }))
  : [
      { number: `${incrementWeekly(300)}+`, label: "Collaborations", description: "Sacred productions completed" },
      { number: `${incrementMonthly(43,200)}+`, label: "Countries", description: "Global community reach" },
      { number: `${incrementMonthly(17,50)}+`, label: "Languages", description: "Diverse linguistic representation" },
      { number: "∞", label: "Gratitude", description: "For every contribution" }
    ];
```

---

## 🎨 For Studio.tsx (Special Case)

Studio.tsx has stats in JSX, not as array. Update the section directly:

**Find (line 244):**
```typescript
{/*  These  fields data comming from database cms */}
<section className="py-12 sm:py-16 bg-slate-50">
  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
    <div className="text-center">
      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Music className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
      </div>
      <div className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">{incrementWeekly(300)}+</div>
      <div className="text-sm sm:text-base text-slate-600 font-medium">Recordings Made </div>
    </div>
    // ... more stats
```

**Replace with:**
```typescript
{/* These fields data coming from database cms */}
<section className="py-12 sm:py-16 bg-slate-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
      {(pageData.stats && pageData.stats.length > 0 ? pageData.stats : [
        { number: `${incrementWeekly(300)}+`, label: "Recordings Made", icon: "Music" },
        { number: `${incrementWeekly(43)}+`, label: "Active Vocalists", icon: "Users" },
        { number: `${incrementMonthly(17,50)}+`, label: "Languages", icon: "Globe" },
        { number: "100%", label: "Free Service", icon: "Award" }
      ]).map((stat, index) => {
        const IconComponent = stat.icon === 'Music' ? Music : stat.icon === 'Users' ? Users : stat.icon === 'Globe' ? Globe : Award;
        return (
          <div key={index} className="text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">{stat.number}</div>
            <div className="text-sm sm:text-base text-slate-600 font-medium">{stat.label}</div>
          </div>
        );
      })}
    </div>
  </div>
</section>
```

---

## ✅ Checklist

- [ ] Acknowledgments.tsx
- [ ] EthicalPolicy.tsx
- [ ] HowItWorks.tsx
- [ ] Partnership.tsx
- [ ] GuestBlogs.tsx
- [ ] MusicStyleSelection.tsx
- [ ] KalamLibrary.tsx
- [ ] WriterFAQs.tsx
- [ ] Studio.tsx (special case - JSX)
- [ ] StudioEngineers.tsx
- [ ] SufiScienceCenter.tsx
- [ ] SufiMusicTheory.tsx
- [ ] VocalistHowItWorks.tsx

**Total: 13 pages**

---

## 🚀 After Updates

1. Add fallback data to `lib/cmsFallbackData.ts` for each new page slug
2. Add page entries to database schema seed data
3. Test each page
4. Verify admin can edit stats in `/admin/cms`

---

**Status**: Ready for implementation  
**Difficulty**: Easy (copy-paste pattern)  
**Time Estimate**: 30 minutes for all 13 pages
