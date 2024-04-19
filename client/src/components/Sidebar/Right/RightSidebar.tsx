"use client";

import { BsMusicNoteList } from "react-icons/bs";
import { GiImperialCrown } from "react-icons/gi";

import { twMerge } from "tailwind-merge";

import Box from "../../Box";
import SiderbarItem from "../Item/SiderbarItem";
import Library from "../../Library";
import { HiHome } from "react-icons/hi";
import Button from "@/components/Button";
import { FaUser, FaUsers } from "react-icons/fa";
import Link from "next/link";

const RightSidebar = () => {
  return (
    <div className="flex flex-col items-center px-4 py-6 w-20 gap-6">
      {/* User Profile */}
      <div className="w-12 h-12 rounded-full bg-neutral-600  cursor-pointer flex items-center justify-center relative">
        {/* Image of the authenticated user or the first letter */}
      </div>
      <Button className="bg-emerald-500 flex items-center justify-center rounded-sm">
        <FaUser className="text-black" size={20} />
      </Button>
      {/* Admin Action */}
      <Link
        href="/artists"
        className="bg-transparent placeholder-zinc-200 py-2 hover:scale-110 transition"
      >
        <FaUsers size={20} className="text-neutral-400 text-2xl" />
      </Link>
      <Link
        href="/songs"
        className="bg-transparent placeholder-zinc-200 py-2 hover:scale-110 transition"
      >
        <BsMusicNoteList size={20} className="text-neutral-400 text-2xl" />
      </Link>
      {/* Premium User  */}
      <div className="flex flex-col items-center justify-center gap-y-2 mt-auto relative cursor-pointer ">
        <GiImperialCrown
          size={20}
          className="text-primaryColor hover:scale-110 transition"
        />
        <p className="whitespace-nowrap text-neutral-400 font-normal text-lg">
          Go <span className="text-primaryColor">Pro</span>
        </p>
      </div>
    </div>
  );
};

export default RightSidebar;
