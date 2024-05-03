import { useAuthContext } from "@/hooks/useAuthContext";
import {
  checkIsFavorite,
  addToFavorite,
  removeFromFavorite,
} from "@/services/favoriteServices";
import { Songs } from "@/types/types";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoHeartOutline } from "react-icons/io5";

interface LikeButtonProps {
  song: Songs;
}

const LikeButton: React.FC<LikeButtonProps> = ({ song }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchIsFavorite = async () => {
      try {
        const { isFavorite } = await checkIsFavorite({
          userId: user?._id,
          song: song,
        });
        setIsLiked(isFavorite);
      } catch (error) {
        console.error("Error checking if song is liked:", error);
      }
    };

    fetchIsFavorite();
  }, [song]);

  console.log(isLiked);

  const handleClick = async () => {
    if (isLiked) {
      await removeFromFavorite(user?._id!, song._id);
      console.log("UnLike");
    } else {
      console.log("like");
      await addToFavorite({ userId: user?._id!, song: song });
    }
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  const Icon = isLiked ? FaHeart : IoHeartOutline;

  return (
    <button
      title="Like Button"
      onClick={handleClick}
      className="cursor-pointer z-50 ml-auto hover:opacity-75 transition"
    >
      <Icon
        className={`text-lg ${
          isLiked ? "text-emerald-400" : "text-neutral-400"
        }`}
      />
    </button>
  );
};

export default LikeButton;
