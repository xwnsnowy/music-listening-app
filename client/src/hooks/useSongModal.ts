import { create } from "zustand";

interface UseSongModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSongModal = create<UseSongModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSongModal;