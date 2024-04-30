"use client";

import SearchContent from "@/components/SearchContent/SearchContent";
import SearchInput from "@/components/SearchInput/SearchInput";
import { useFetchAllArtists } from "@/hooks/useGetAllArtists";
import { useFetchSongByName } from "@/hooks/useGetSongByName";
import { useEffect, useState } from "react";

interface SearchProps {
  searchParams: {
    name: string;
  };
}

export const revalidate = 0;

const Search = ({ searchParams }: SearchProps) => {
  const { name } =
    searchParams && searchParams.name ? searchParams : { name: "" };

  const { songs } = useFetchSongByName(name);
  const { artists } = useFetchAllArtists();

  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto px-6 py-2">
      <h2 className="my-4 text-xl font-bold text-neutral-400">
        Search here by song title
      </h2>
      <SearchInput />

      <div className="w-full flex-1">
        <SearchContent songs={songs} artists={artists} />
      </div>
    </div>
  );
};

export default Search;
