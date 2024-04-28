import { useState, useEffect } from 'react';
import { getAllArtists } from "@/services/artistServices";

interface Artists {
  _id: string;
  name: string;
  picture?: string | null;
  description?: string | null;
  followers?: number | null;
  facebook?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
}

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
