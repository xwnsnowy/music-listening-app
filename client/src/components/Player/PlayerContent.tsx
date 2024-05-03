import React, { useState, useRef } from "react";
import MediaItem from "@/components/MediaItem/MediaItem";
import { useFetchAllArtists } from "@/hooks/useGetAllArtists";
import { Songs } from "@/types/types";
import ReactPlayer from "react-player";
import { FaPause, FaPlay } from "react-icons/fa";
import { FaBackwardStep, FaForwardStep } from "react-icons/fa6";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { Slider } from "@/components/ui/slider";
import usePlayer from "@/hooks/usePlayer";

interface PlayerContentProps {
  song: Songs;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const { artists } = useFetchAllArtists();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const playerRef = useRef<ReactPlayer | null>(null);

  // console.log(
  //   ReactPlayer.canPlay("https://www.youtube.com/watch?v=M-mtdN6R3bQ")
  // );

  console.log(isPlaying);
  console.log(volume);
  const PlayIcon = isPlaying ? FaPause : FaPlay;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  // play before song
  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  // play next song
  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    setVolume(volume === 0 ? 1 : 0);
  };

  const handleProgress = (state: { played: number }) => {
    // Here you can handle the progress of the song if needed
  };

  const handleVolumeChange = (newVolume: number[]) => {
    const volumeValue = newVolume[0];
    setVolume(volumeValue / 100);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full text-primaryColor">
      <div className="w-full flex justify-start items-start">
        <MediaItem
          className="bg-transparent w-auto"
          onClick={() => {}}
          artist={artists.filter((artist) => artist._id === song.artistId)[0]}
          data={song}
        />
      </div>

      {/* Mobile Controller */}
      <div className="flex md:hidden col-auto justify-end items-center">
        <div
          onClick={handlePlay}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1  cursor-pointer"
        >
          <PlayIcon className="text-black" size={20} />
        </div>
      </div>

      {/* Desktop Controller */}
      <div className="hidden h-full md:flex justify-center items-center w-full max-w-[720px] gap-x-6">
        <FaBackwardStep
          size={20}
          onClick={onPlayPrevious}
          className="text-secondaryColor cursor-pointer hover:text-primaryColor transition"
        />
        <div
          onClick={handlePlay}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-secondaryColor hover:bg-primaryColor p-1  cursor-pointer"
        >
          <PlayIcon className="text-black" size={20} />
        </div>
        <FaForwardStep
          size={20}
          onClick={onPlayNext}
          className="text-secondaryColor cursor-pointer hover:text-primaryColor transition"
        />
      </div>

      {/* Volume  */}
      <div className="hidden md:flex justify-end w-full ">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            size={25}
            onClick={handleMute}
            className="text-secondaryColor cursor-pointer hover:text-primaryColor transition"
          />
          <Slider
            defaultValue={[volume * 100]}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
          />
        </div>
      </div>

      {/* React Player */}
      <ReactPlayer
        url="https://www.youtube.com/watch?v=M-mtdN6R3bQ"
        playing={isPlaying}
        volume={volume}
        ref={playerRef}
        onEnded={onPlayNext}
        width={0}
        height={0}
        style={{ display: "none" }}
        onProgress={handleProgress}
      />
    </div>
  );
};

export default PlayerContent;
