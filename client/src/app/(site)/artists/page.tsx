"use client";

import { useEffect, useState } from "react";
import { getAllArtists } from "@/services/artistServices";
import ArtistItem from "@/components/Artist/Item/ArtistItem";
import { useFetchAllArtists } from "@/hooks/useGetAllArtists";

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
  const { artists, loading, error } = useFetchAllArtists();

  return (
    <div className="text-primaryColor">
      <div className="mb-7 mt-2 px-6 font-circular text-2xl font-semibold text-primaryColor">
        <h1>Our Popular Artists</h1>
      </div>
      {artists.length === 0 ? (
        <h3 className="text-2xl font-semibold text-center mt-10 text-red-600">
          No artists available
        </h3>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 mt-4 px-4 gap-4">
          {artists.map((artist) => (
            <ArtistItem key={artist._id} onClick={() => {}} data={artist} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Artists;
