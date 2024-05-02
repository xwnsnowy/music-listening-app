import { useAuthContext } from "@/hooks/useAuthContext";
import useAuthModal from "@/hooks/useAuthModal";
import usePlayer from "@/hooks/usePlayer";
import { Songs } from "@/types/types"

const useOnPlay = (songs: Songs[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();

  const { user } = useAuthContext();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }

    player.setId(id);
    player.setIds(songs.map((song) => song._id))
  };
  return onPlay;
}

export default useOnPlay;
