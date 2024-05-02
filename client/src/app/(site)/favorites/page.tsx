"use client";

import { useEffect } from "react";
import FavoriteContent from "@/components/Favorite/FavoriteContent";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useFetchAllFavorite } from "@/hooks/useGetAllFavorite";
import { FaHeart } from "react-icons/fa";
import { useFetchAllArtists } from "@/hooks/useGetAllArtists";
import useAuthModal from "@/hooks/useAuthModal";
import { useRouter } from "next/navigation";

const Favorities = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const userId = user?._id || "";

  const { favorites } = useFetchAllFavorite(userId);
  const { artists } = useFetchAllArtists();

  const authModal = useAuthModal();
  
  const songs = favorites.map((favorite) => favorite.song!).filter(Boolean);

  useEffect(() => {
    if (!user) {
      authModal.onOpen();
      router.replace("/");
    }
  }, [user]);

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
        <FavoriteContent songs={songs} artists={artists} />
      </div>
    </div>
  );
};

export default Favorities;
