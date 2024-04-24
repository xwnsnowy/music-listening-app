"use client";

import Image from "next/image";
import React from "react";

interface Artist {
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

interface ArtistsItemProps {
  data: Artist;
  onClick: (id: string) => void;
}

const ArtistItem: React.FC<ArtistsItemProps> = ({ data, onClick }) => {
  const handleClick = (id: string) => {
    console.log(id);
    onClick(data._id);
  };
  return (
    <div
      onClick={() => handleClick(data._id)}
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-4  cursor-pointer hover:bg-[#1a1a1a] transition p-2"
    >
      <div className="relative flex flex-col aspect-square w-full h-full rounded-md overflow-hidden ">
        <Image
          fill
          className="object-cover"
          src={data.picture || "../../../../public/images/liked.png"}
          alt={data.name}
          loading="lazy"
        />
      </div>
      <span className="truncate text-sm w-full font-semibold text-center">
        {data?.name}
      </span>
    </div>
  );
};

export default ArtistItem;
