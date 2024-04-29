"use client";

import { Artists, Songs } from "@/types/types";

interface MainContentProps {
  songs: Songs[];
  artists: Artists[];
}

const MainContent: React.FC<MainContentProps> = ({ songs, artists }) => {
  return <div className=""></div>;
};

export default MainContent;
