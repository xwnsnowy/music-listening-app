"use client";

import { Artists, Songs } from "@/types/types";
import Image from "next/image";
import React from "react";

interface SongsItemProps {
  data: Songs;
  artist: Artists;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongsItemProps> = ({ data, artist, onClick }) => {
  const handleClick = (id: string) => {
    console.log(id);
    onClick(data._id);
  };

  return (
    <div
      onClick={() => handleClick(data._id)}
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-1  cursor-pointer hover:bg-[#1a1a1a] transition p-2 "
    >
      <div className="relative flex flex-col aspect-square w-full h-full rounded-md overflow-hidden ">
        <Image
          fill
          className="object-cover"
          src={data.picture || "../../../../public/images/liked.png"}
          alt={data.name}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col items-start w-full gap-1">
        <span className="truncate text-lg w-full font-semibold text-primaryColor">
          {data?.name}
        </span>

        <div className="w-full flex items-center justify-start gap-2">
          <div className="w-6 h-6 flex items-center justify-center bg-neutral-400 rounded-md relative overflow-hidden">
            <Image
              fill
              className="object-cover"
              src={artist.picture || "../../../../public/images/liked.png"}
              alt={artist.name}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />
          </div>
          <span className="truncate text-xs w-full font-semibold text-secondaryColor">
            {artist?.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SongItem;
