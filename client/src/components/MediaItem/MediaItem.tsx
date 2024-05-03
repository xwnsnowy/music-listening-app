import LikeButton from "@/components/Button/LikeButton";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Artists, Songs } from "@/types/types";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface MediaItemProps {
  data: Songs;
  artist: Artists;
  className?: string;
  onClick: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({
  data,
  artist,
  className,
  onClick,
}) => {
  const { user } = useAuthContext();

  const handleClick = () => {
    if (onClick) {
      return onClick(data._id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={twMerge(
        "flex w-full z-10 items-center justify-start px-4 py-2 rounded-md bg-neutral-400/10 drop-shadow-md gap-4 cursor-pointer opacity-70 hover:opacity-100 font-circular",
        className
      )}
    >
      <div className="aspect-square w-24 h-16 rounded-md overflow-hidden relative">
        <Image
          fill
          className="object-cover w-full h-full"
          src={data.picture || "/public/images/liked.png"}
          alt={data.name}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col items-start justify-start gap-y-1">
        <span className="w-full md:w-44 truncate font-semibold">
          {data.name}
        </span>

        {artist && (
          <div className="w-full flex items-center justify-start gap-2">
            <div className="w-6 min-w-6 h-6 flex items-center justify-center bg-neutral-400 rounded-md relative overflow-hidden">
              <Image
                fill
                className="object-cover"
                src={artist.picture || "/images/liked.png"}
                alt={artist.name}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
              />
            </div>
            <span className="truncate text-xs w-full font-semibold text-secondaryColor">
              {artist?.name}
            </span>
          </div>
        )}
      </div>

      {user && <LikeButton song={data} />}
    </div>
  );
};

export default MediaItem;
