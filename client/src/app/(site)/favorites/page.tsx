"use client";

import { useState, useEffect } from "react";
import { Songs } from "@/types/types";
import FavoriteContent from "@/components/Favorite/FavoriteContent";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useFetchAllFavorite } from "@/hooks/useGetAllFavorite";
import { FaHeart } from "react-icons/fa";
import { getSongById } from "@/services/songServices";
import { useFetchAllArtists } from "@/hooks/useGetAllArtists";

const Favorities = () => {
  const { user } = useAuthContext();
  const userId = user?._id || "";

  const { favorites } = useFetchAllFavorite(userId);
  const { artists } = useFetchAllArtists();

  const [favoriteSongs, setFavoriteSongs] = useState<Songs[]>([]);

  useEffect(() => {
    if (user) {
      const fetchFavoriteSongs = async () => {
        try {
          const songPromises = favorites.map(async (favorite) => {
            const songId = favorite.songId!;
            const song = await getSongById(songId);
            return song.data;
          });

          const fetchedSongs = await Promise.all(songPromises);
          const flatFetchedSongs = fetchedSongs.flat();

          setFavoriteSongs(flatFetchedSongs);
        } catch (error) {
          console.error("Error fetching favorite songs:", error);
        }
      };

      fetchFavoriteSongs();
    }
  }, [favorites]);

  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto px-6 py-2 font-circular">
      <div className="flex flex-col md:flex-row items-center justify-start gap-4 mt-10">
        <div className="w-24 h-24 rounded-md lg:w-32 lg:h-32 flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-700 to-gray-500 trasition">
          <FaHeart className="text-3xl text-white" />
        </div>

        <div className="flex flex-col items-center justify-center lg:items-start lg:justify-start transition">
          <span className="hidden lg:block text-secondaryColor font-semibold">
            Play List
          </span>
          <span className="text-primaryColor text-3xl lg:text-4xl font-bold">
            Favorite Songs
          </span>
        </div>
      </div>

      <div className="w-full flex-1">
        <FavoriteContent songs={favoriteSongs} artists={artists} />
      </div>
    </div>
  );
};

export default Favorities;
