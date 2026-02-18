# 📄 CMS (Content Management System) - SufiPulse

## Overview

The SufiPulse CMS allows administrators to manage website page content dynamically through a user-friendly admin interface. Page data is stored in the database and can be updated without code changes.

## Features

✅ **Dynamic Page Content** - Manage text, stats, images, and more from database  
✅ **Admin Dashboard** - Beautiful UI for content management  
✅ **Fallback Support** - Pages work with hardcoded data if CMS is unavailable  
✅ **Multiple Content Types**:
- Statistics & Metrics
- Core Values & Principles
- Team Members & Bios
- Timeline/Milestones
- Testimonials & Quotes
- Location Hubs
- Custom Sections

## Database Schema

### Tables Created

1. **cms_pages** - Main page metadata
2. **cms_page_stats** - Statistics and numbers
3. **cms_page_values** - Core values and principles
4. **cms_page_team** - Team members and bios
5. **cms_page_timeline** - Milestones and history
6. **cms_page_testimonials** - Quotes and testimonials
7. **cms_page_hubs** - Locations and contact points
8. **cms_page_sections** - Custom content sections
9. **cms_page_section_items** - Items within sections

### Database Function

`get_cms_page_data(page_slug)` - Returns complete page data with all related content

## Setup Instructions

### 1. Apply Database Schema

```bash
cd sufipulse-backend-talhaadil
python apply_cms_schema.py
```

This will:
- Create all CMS tables
- Insert seed data for existing pages
- Create helper functions

### 2. Backend is Ready

The CMS API routes are already registered in `main.py`:
- `/cms/page/{slug}` - Get page data (public)
- `/cms/admin/*` - Admin management endpoints

### 3. Admin Access

Navigate to: `http://localhost:3000/admin/cms`

From here you can:
- View all pages
- Edit page details
- Manage statistics
- Update team members
- Edit testimonials
- And more!

## API Endpoints

### Public Endpoints

```
GET /cms/page/{page_slug}
- Returns complete page data
- No authentication required
- Response includes: page info, stats, values, team, timeline, testimonials, hubs

GET /cms/pages
- Returns list of all pages
- No authentication required
```

### Admin Endpoints (Require Authentication)

#### Page Management
```
GET    /cms/admin/pages              - List all pages
POST   /cms/admin/pages              - Create new page
PUT    /cms/admin/pages/{id}         - Update page
DELETE /cms/admin/pages/{id}         - Delete page
```

#### Statistics
```
GET    /cms/admin/pages/{id}/stats   - Get page stats
POST   /cms/admin/pages/{id}/stats   - Create stat
PUT    /cms/admin/stats/{id}         - Update stat
DELETE /cms/admin/stats/{id}         - Delete stat
```

#### Values
```
GET    /cms/admin/pages/{id}/values  - Get page values
POST   /cms/admin/pages/{id}/values  - Create value
PUT    /cms/admin/values/{id}        - Update value
DELETE /cms/admin/values/{id}        - Delete value
```

#### Team Members
```
GET    /cms/admin/pages/{id}/team    - Get team members
POST   /cms/admin/pages/{id}/team    - Create member
PUT    /cms/admin/team/{id}          - Update member
DELETE /cms/admin/team/{id}          - Delete member
```

#### Timeline
```
GET    /cms/admin/pages/{id}/timeline - Get timeline
POST   /cms/admin/pages/{id}/timeline - Create item
PUT    /cms/admin/timeline/{id}       - Update item
DELETE /cms/admin/timeline/{id}       - Delete item
```

#### Testimonials
```
GET    /cms/admin/pages/{id}/testimonials - Get testimonials
POST   /cms/admin/pages/{id}/testimonials - Create testimonial
PUT    /cms/admin/testimonials/{id}       - Update testimonial
DELETE /cms/admin/testimonials/{id}       - Delete testimonial
```

#### Hubs
```
GET    /cms/admin/pages/{id}/hubs    - Get hubs
POST   /cms/admin/pages/{id}/hubs    - Create hub
PUT    /cms/admin/hubs/{id}          - Update hub
DELETE /cms/admin/hubs/{id}          - Delete hub
```

## Frontend Integration

### Using the Hook

```typescript
import { useCMSPage } from '@/hooks/useCMSPage'

function MyPage() {
  // Define fallback data (hardcoded content)
  const fallbackData = {
    hero_title: "Default Title",
    hero_subtitle: "Default subtitle",
    stats: [
      { stat_number: "100+", stat_label: "Users" }
    ],
    // ... other fallback data
  }

  // Use CMS hook
  const { data, loading, error, hasData } = useCMSPage({
    pageSlug: 'my-page',
    fallbackData: fallbackData,
    enabled: true
  })

  if (loading) return <LoadingSpinner />
  
  // Use merged data (CMS data preferred, fallback as backup)
  const pageData = data || fallbackData

  return (
    <div>
      <h1>{pageData.hero_title}</h1>
      <p>{pageData.hero_subtitle}</p>
      
      {/* Render stats */}
      {pageData.stats.map((stat, index) => (
        <div key={index}>
          <span>{stat.stat_number}</span>
          <span>{stat.stat_label}</span>
        </div>
      ))}
    </div>
  )
}
```

### Manual Fetch

```typescript
import { getPageData } from '@/services/cms'

async function loadPageData() {
  try {
    const response = await getPageData('home')
    const data = response.data.data
    // Use data...
  } catch (error) {
    // Handle error or use fallback
  }
}
```

## Pages with CMS Support

### Currently Supported Pages

1. **Home** (`/`)
   - Hero section
   - Statistics
   - Testimonials
   - Featured content

2. **About** (`/about`)
   - Mission statement
   - Core values
   - Team members
   - Timeline
   - Statistics

3. **Our Mission** (`/our-mission`)
   - Sacred vows
   - Vision elements
   - Statistics

4. **Who We Are** (`/who-we-are`)
   - Identity content
   - Core values
   - Principles
   - Statistics

5. **Founder** (`/founder`)
   - Founder info
   - Creative roles
   - Professional expertise
   - Achievements
   - Quotes

6. **Contact** (`/contact`)
   - Global hubs
   - Contact information

7. **Gallery** (`/gallery`)
   - Statistics

## Admin UI Guide

### Accessing CMS

1. Login as admin
2. Navigate to `/admin/cms`
3. See list of all pages

### Editing Page Content

1. Click "Edit" button on any page
2. Use tabs to navigate between content types:
   - **Page Details** - Basic info, SEO, hero content
   - **Statistics** - Numbers and metrics
   - **Values** - Core principles
   - **Team** - Team members
   - **Timeline** - Milestones
   - **Testimonials** - Quotes
   - **Hubs** - Locations

3. Click "Save Changes" when done

### Adding New Content

Each tab has an "Add" button to create new items of that type.

## Data Structure

### Page Object
```json
{
  "page_id": 1,
  "page_name": "Home",
  "page_title": "SufiPulse - Home",
  "page_slug": "home",
  "meta_description": "...",
  "hero_title": "Global Sufi Collaboration Studio",
  "hero_subtitle": "...",
  "hero_quote": "...",
  "hero_quote_author": "...",
  "stats": [...],
  "values": [...],
  "team": [...],
  "timeline": [...],
  "testimonials": [...],
  "hubs": [...]
}
```

### Stat Object
```json
{
  "stat_number": "300+",
  "stat_label": "Sacred Collaborations",
  "stat_description": "Divine kalam brought to life",
  "stat_icon": "Heart",
  "stat_order": 1
}
```

### Value Object
```json
{
  "value_title": "Spiritual Integrity",
  "value_description": "...",
  "value_icon": "Heart",
  "value_color": "emerald",
  "value_order": 1
}
```

## Migration from Hardcoded Data

### Step 1: Identify Hardcoded Arrays

Look for comments in pages:
```typescript
// These fields data comming from database cms
const stats = [...]
const values = [...]
```

### Step 2: Create Fallback

Move hardcoded data to fallback object:
```typescript
const fallbackData = {
  stats: [...],
  values: [...],
}
```

### Step 3: Use Hook

```typescript
const { data } = useCMSPage({
  pageSlug: 'my-page',
  fallbackData: fallbackData
})

const pageData = data || fallbackData
```

## Benefits

✅ **Non-Technical Updates** - Admins can update content without coding  
✅ **Quick Changes** - Update in real-time  
✅ **Version Control** - Track changes in database  
✅ **Fallback Safety** - Site works even if CMS is down  
✅ **SEO Friendly** - Manage meta tags dynamically  

## Troubleshooting

### CMS Data Not Loading

1. Check if schema is applied: `python apply_cms_schema.py`
2. Verify API is running: `http://localhost:8000/docs`
3. Check browser console for errors
4. Ensure page slug matches database

### Admin Can't See CMS Menu

1. Login as admin (not sub-admin)
2. Check permissions in database
3. Clear browser cache

### Database Errors

1. Check PostgreSQL is running
2. Verify connection in `.env`
3. Check table exists: `\dt cms_*`

## Future Enhancements

- [ ] Image upload for team members
- [ ] Rich text editor for descriptions
- [ ] Page preview before save
- [ ] Version history/rollback
- [ ] Multi-language support
- [ ] Scheduled publishing
- [ ] SEO analysis tools

## Support

For issues or questions:
- Check API docs: `/docs`
- Review schema: `sql/cms_pages_schema.sql`
- Contact development team

---

**Last Updated**: February 17, 2026  
**Version**: 1.0.0  
**Status**: ✅ Production Ready
