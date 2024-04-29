"use client"

import { getAllSongs } from '@/services/songServices';
import { Songs } from '@/types/types';
import { useState, useEffect } from 'react';

export const useFetchAllSongs = () => {
  const [songs, setSongs] = useState<Songs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        const data = await getAllSongs();
        setSongs(data.data);
      } catch (err) {
        setError("Error fetching songs");
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  return { songs, loading, error };
};
