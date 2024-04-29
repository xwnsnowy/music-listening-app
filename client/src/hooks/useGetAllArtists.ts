"use client"

import { useState, useEffect } from 'react';
import { getAllArtists } from "@/services/artistServices";
import { Artists } from '@/types/types';


export const useFetchAllArtists = () => {
  const [artists, setArtists] = useState<Artists[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        const data = await getAllArtists();
        setArtists(data.data);
      } catch (err) {
        setError("Error fetching artists");
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  return { artists, loading, error };
};
