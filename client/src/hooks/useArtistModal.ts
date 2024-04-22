import { create } from "zustand";

interface useArtistModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useArtistModal = create<useArtistModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useArtistModal;