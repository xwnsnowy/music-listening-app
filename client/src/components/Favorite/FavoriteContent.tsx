import MediaItem from "@/components/MediaItem/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Artists, Songs } from "@/types/types";

interface FavoriteContentProps {
  songs: Songs[];
  artists: Artists[];
}

const FavoriteContent: React.FC<FavoriteContentProps> = ({
  songs,
  artists,
}) => {
  const onPlay = useOnPlay(songs);

  return (
    <div className="text-primaryColor">
      {songs.length === 0 ? (
        <h3 className="text-2xl font-semibold text-center mt-10 text-red-600">
          No songs found
        </h3>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 mt-4 gap-4">
          {songs?.map((song) => {
            const artist = artists?.find(
              (artist) => artist._id === song.artistId
            );
            return artist ? (
              <MediaItem
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

export default FavoriteContent;
