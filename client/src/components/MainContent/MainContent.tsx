"use client";

import ListItem from "@/components/ListItem/ListItem";
import SongItem from "@/components/Song/Item/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Artists, Songs } from "@/types/types";

interface MainContentProps {
  songs: Songs[];
  artists: Artists[];
}

const MainContent: React.FC<MainContentProps> = ({ songs, artists }) => {
  const onPlay = useOnPlay(songs);

  return (
    <div className="text-primaryColor">
      <div className="grid grid-cols-1 px-6 gap-3 text-primaryColor sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <ListItem image="/images/liked.png" name="Liked Song" href="liked" />
      </div>
      <div className="my-4 px-6 font-circular text-2xl font-semibold text-primaryColor">
        <h1 className="hover:underline">Popular Radio</h1>
      </div>
      {artists.length === 0 ? (
        <h3 className="text-2xl font-semibold text-center mt-10 text-red-600">
          No songs available
        </h3>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-4 px-4 gap-4">
          {songs?.map((song) => {
            const artist = artists?.find(
              (artist) => artist._id === song.artistId
            );
            return artist ? (
              <SongItem
                key={song._id}
                onClick={(id: string) => onPlay(id)}
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
