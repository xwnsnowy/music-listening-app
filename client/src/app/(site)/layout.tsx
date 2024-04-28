import Header from "@/components/Header/Header";
import LeftSidebar from "@/components/Sidebar/Left/LeftSidebar";
import RightSidebar from "@/components/Sidebar/Right/RightSidebar";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex bg-[#000]">
      <LeftSidebar />
      <main className="h-full flex-1 overflow-y-auto px-1 py-2">
        <div className="h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-bgBase">
          <Header />
          {children}
        </div>
      </main>
      <RightSidebar />
    </div>
  );
}
