"use client";

import SongItem from "@/components/Song/Item/SongItem";
import { Artists, Songs } from "@/types/types";

interface MainContentProps {
  songs: Songs[];
  artists: Artists[];
}

const MainContent: React.FC<MainContentProps> = ({ songs, artists }) => {
  return (
    <div className="text-primaryColor">
      <div className="mb-7 mt-2 px-6 font-circular text-2xl font-semibold text-primaryColor">
        <h1 className="hover:underline">Popular Radio</h1>
      </div>
      {artists.length === 0 ? (
        <h3 className="text-2xl font-semibold text-center mt-10 text-red-600">
          No songs available
        </h3>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 mt-4 px-4 gap-4">
          {songs?.map((song) => {
            const artist = artists?.find(
              (artist) => artist._id === song.artistId
            );
            return artist ? (
              <SongItem
                key={song._id}
                onClick={() => {}}
                data={song}
                artist={artist}
              />
            ) : null;
          })}
        </div>
      )}
    </div>
  );
};

export default MainContent;
