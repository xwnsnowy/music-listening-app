"use client"

import { getSongByName } from '@/services/songServices';
import { Songs } from '@/types/types';
import { useState, useEffect } from 'react';


export const useFetchSongByName = (searchParams: string) => {
  const [songs, setSongs] = useState<Songs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true); 
        const data = await getSongByName(searchParams);
        setSongs(data.data);
      } catch (err) {
        setError("Error fetching songs");
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [searchParams]);

  return { songs, loading, error };
};
