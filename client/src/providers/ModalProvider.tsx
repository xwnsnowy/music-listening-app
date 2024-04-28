"use client";

import ArtistModal from "@/components/Modal/ArtistModal/ArtistModal";
import AuthModal from "@/components/Modal/AuthModal/AuthModal";
import SongModal from "@/components/Modal/SongModal/SongModal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <ArtistModal />
      <SongModal />
    </>
  );
};

export default ModalProvider;
