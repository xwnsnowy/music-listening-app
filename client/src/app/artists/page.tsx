"use client";

import { useEffect, useState } from "react";
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

const Artists = () => {
  const [artists, setArtists] = useState<Artists[]>([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await getAllArtists();
        console.log(data);
        setArtists(data.data);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div className="text-primaryColor">
      {artists.map((artist) => (
        <div key={artist._id}>
          <p>{artist.name}</p>
          {artist.picture && <img src={artist.picture} alt={artist.name} />}
          {artist.description && <p>Description: {artist.description}</p>}
          {artist.followers && <p>Followers: {artist.followers}</p>}
          {artist.facebook && <p>Facebook: {artist.facebook}</p>}
          {artist.twitter && <p>Twitter: {artist.twitter}</p>}
          {artist.instagram && <p>Instagram: {artist.instagram}</p>}
          {artist.linkedin && <p>LinkedIn: {artist.linkedin}</p>}
        </div>
      ))}
    </div>
  );
};

export default Artists;
