import { getSongById } from '@/services/songServices';
import { Songs } from '@/types/types';
import { useState, useEffect } from 'react';

export const useFetchSongsFavorites = (songIds: string[]) => {
  const [songs, setSongs] = useState<Songs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        const songsData = await Promise.all(songIds.map((songId) => getSongById(songId)));
        const songsList = songsData.map(song => song.data);
        setSongs(songsList);

      } catch (err) {
        setError("Error fetching songs");
      } finally {
        setLoading(false);
      }
    };
    if (songIds.length > 0) {
      fetchSongs();
    }
  }, []);

  return { songs, loading, error };
};
