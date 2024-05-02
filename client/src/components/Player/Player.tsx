"use client";

import PlayerContent from "@/components/Player/PlayerContent";
import { useFetchSongById } from "@/hooks/useGetSongById";
import usePlayer from "@/hooks/usePlayer";

const Player = () => {
  const player = usePlayer();
  const { song } = useFetchSongById(player.activeId!);
  
  const songUrl = song?.song;

  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <div className="fixed bottom-0 bg-black backdrop-blur-md w-full py-2 px-4">
      <PlayerContent song={song} songUrl={songUrl} key={songUrl} />
    </div>
  );
};

export default Player;
