"use client";

import MainContent from "@/components/MainContent/MainContent";
import { useFetchAllArtists } from "@/hooks/useGetAllArtists";
import { useFetchAllSongs } from "@/hooks/useGetAllSongs";

export default function Home() {
  const { artists } = useFetchAllArtists();
  const { songs } = useFetchAllSongs();
  return (
    <div className="w-full flex-1 text-primaryColor">
      <MainContent songs={songs} artists={artists} />
    </div>
  );
}
