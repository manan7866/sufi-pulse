"use client"

import { useState, useEffect } from "react"
import { getPageData } from "@/services/cms"

interface CMSPageData {
  page_id: number
  page_name: string
  page_title: string
  page_slug: string
  meta_description: string | null
  meta_keywords: string | null
  hero_title: string | null
  hero_subtitle: string | null
  hero_quote: string | null
  hero_quote_author: string | null
  stats: any[]
  values: any[]
  team: any[]
  timeline: any[]
  testimonials: any[]
  sections: any[]
  hubs: any[]
}

interface UseCMSPageOptions {
  pageSlug: string
  fallbackData?: any
  enabled?: boolean
}

export function useCMSPage({ pageSlug, fallbackData, enabled = true }: UseCMSPageOptions) {
  const [data, setData] = useState<CMSPageData | null>(null)
  const [loading, setLoading] = useState(enabled)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) return

    const fetchPageData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await getPageData(pageSlug)
        
        if (response.data?.success && response.data?.data) {
          setData(response.data.data)
        } else {
          // If API fails or returns no data, use fallback
          setData(fallbackData || null)
        }
      } catch (err: any) {
        console.error(`Error fetching CMS data for ${pageSlug}:`, err)
        setError(err.message || "Failed to load page data")
        // Use fallback data on error
        setData(fallbackData || null)
      } finally {
        setLoading(false)
      }
    }

    fetchPageData()
  }, [pageSlug, enabled])

  return { data, loading, error, hasData: !!data }
}

// Helper function to merge CMS data with fallback
export function mergeWithFallback(cmsData: any, fallbackData: any) {
  if (!cmsData) return fallbackData
  if (!fallbackData) return cmsData

  return {
    ...fallbackData,
    ...cmsData,
    // Merge arrays, preferring CMS data
    stats: cmsData?.stats?.length > 0 ? cmsData.stats : fallbackData?.stats || [],
    values: cmsData?.values?.length > 0 ? cmsData.values : fallbackData?.values || [],
    team: cmsData?.team?.length > 0 ? cmsData.team : fallbackData?.team || [],
    timeline: cmsData?.timeline?.length > 0 ? cmsData.timeline : fallbackData?.timeline || [],
    testimonials: cmsData?.testimonials?.length > 0 ? cmsData.testimonials : fallbackData?.testimonials || [],
    hubs: cmsData?.hubs?.length > 0 ? cmsData.hubs : fallbackData?.hubs || [],
  }
}
