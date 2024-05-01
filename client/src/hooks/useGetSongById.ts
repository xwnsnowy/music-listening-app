"use client"

import { getSongById } from '@/services/songServices';
import { Songs } from '@/types/types';
import { useState, useEffect } from 'react';

export const useFetchSongByid = (songId: string) => {
  const [song, setSong] = useState<Songs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongById = async () => {
      try {
        setLoading(true);
        const data = await getSongById(songId);
        setSong(data.data);
      } catch (err) {
        setError("Error fetching song by Id");
      } finally {
        setLoading(false);
      }
    };

    fetchSongById();
  }, []);

  return { song, loading, error };
};
