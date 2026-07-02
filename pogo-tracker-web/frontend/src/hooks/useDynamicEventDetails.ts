import { useState, useEffect } from 'react';
import type { SpecialEventDetails } from '../data/specialEvents';
import { API_BASE_URL } from '../config';

export function useDynamicEventDetails(eventID: string, link: string, isExpanded: boolean) {
  const [details, setDetails] = useState<SpecialEventDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isExpanded) return;

    // 1. Check local storage cache
    const cacheKey = `pogo_scraped_details_${eventID}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        setDetails(JSON.parse(cached));
        return;
      } catch (e) {
        console.error("Failed to parse cached details", e);
      }
    }

    // 2. Fetch from Backend API
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `${API_BASE_URL}/api/events/${eventID}/details?link=${encodeURIComponent(link)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Backend API request failed");
        
        const data = await res.json();
        
        if (data) {
          localStorage.setItem(cacheKey, JSON.stringify(data));
          setDetails(data);
        } else {
          setDetails(null);
        }
      } catch (err) {
        console.error("Failed to fetch event details from API:", err);
        setError("Failed to fetch event details");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [eventID, link, isExpanded]);

  return { details, loading, error };
}
