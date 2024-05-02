"use client"

import { getAllFavorite } from '@/services/favoriteServices';
import { Favorites } from '@/types/types';
import { useState, useEffect } from 'react';

export const useFetchAllFavorite = (userId: string) => {
  const [favorites, setFavorites] = useState<Favorites[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const data = await getAllFavorite(userId);
        setFavorites(data.data);
      } catch (err) {
        setError("Error fetching songs");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchFavorites();
    }
  }, []);

  return { favorites, loading, error };
};
