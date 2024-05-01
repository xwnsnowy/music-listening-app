"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaHeartbeat } from "react-icons/fa";

import Box from "../../Box/Box";
import SiderbarItem from "../Item/SiderbarItem";
import Library from "../../Library/Library";
import { HiHome } from "react-icons/hi";

const LeftSidebar = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: pathname === "/" ? HiHome : GoHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: pathname === "/search" ? BsFillSearchHeartFill : BiSearch,
        label: "Search",
        href: "/search",
        active: pathname === "/search",
      },
      {
        icon: pathname === "/favorites" ? FaHeartbeat : IoMdHeartEmpty,
        label: "Favorites",
        href: "/favorites",
        active: pathname === "/favorites",
      },
    ],
    [pathname]
  );

  return (
    <nav className="flex h-screen">
      <div className="hidden h-full w-[420px] min-w-[280px] flex-col gap-y-2  px-1 py-2 font-circular text-base font-semibold md:flex">
        <Box>
          <div className="flex flex-col gap-y-3 px-5 py-4">
            {routes.map((item) => (
              <SiderbarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="flex h-full flex-col justify-between overflow-y-auto">
          <Library />
          {/* <SiderbarFooter /> */}
        </Box>
      </div>
    </nav>
  );
};

export default LeftSidebar;
