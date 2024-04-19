import MainContent from "@/components/MainContent/MainContent";
import LeftSidebar from "@/components/Sidebar/Left/LeftSidebar";
import RightSidebar from "@/components/Sidebar/Right/RightSidebar";

export default function Home() {
  return (
    <div className="flex bg-[#000]">
      <LeftSidebar />
      <MainContent />
      <RightSidebar />
    </div>
  );
}
