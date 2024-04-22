"use client";

import { BsMusicNoteList } from "react-icons/bs";
import { GiImperialCrown } from "react-icons/gi";
import { LogOut } from "lucide-react";
import Button from "@/components/Button/Button";
import { FaUser, FaUsers } from "react-icons/fa";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import useAuthModal from "@/hooks/useAuthModal";
import { useAuthContext } from "@/hooks/useAuthContext";
import Image from "next/image";
import { PiMusicNotesPlusBold } from "react-icons/pi";
import useArtistModal from "@/hooks/useArtistModal";

const RightSidebar = () => {
  const { user, logout } = useAuthContext();

  const authModal = useAuthModal();
  const artistModal = useArtistModal();

  const isSuperAdmin = user?.role === "super-admin";

  const getNameAvatar = (name: string): string => {
    if (!name) return "";

    const lastName = name.split(" ").pop();
    if (!lastName) return "";

    return lastName.charAt(0).toUpperCase();
  };

  return (
    <div className="flex flex-col items-center px-4 py-6 w-20 gap-6">
      {/* User Profile */}
      {user ? (
        <div className="w-12 h-12 rounded-full bg-neutral-600  cursor-pointer flex items-center justify-center relative">
          {user?.avatar ? (
            <Image
              src={user?.avatar}
              alt=""
              fill
              className="w-full absolute h-full object-cover rounded-full"
            />
          ) : (
            <span className="text-primaryColor font-bold text-lg">
              {getNameAvatar(user?.name)}
            </span>
          )}
        </div>
      ) : (
        <Button
          className="bg-emerald-500 flex items-center justify-center rounded-sm"
          onClick={authModal.onOpen}
        >
          <FaUser className="text-black" size={20} />
        </Button>
      )}

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

      {/* Loading these option only if its matches the super admin id */}
      {/* {isSuperAdmin && ( */}
      <Button
        className="bg-transparent flex items-center justify-center rounded-sm py-2"
        onClick={artistModal.onOpen}
      >
        <UserPlus
          className="text-2xl text-neutral-400 hover:scale-110 transition"
          size={20}
        />
      </Button>
      {/* )} */}
      {isSuperAdmin && (
        <Button className="bg-transparent flex items-center justify-center rounded-sm py-2">
          <PiMusicNotesPlusBold
            className="text-2xl text-neutral-400 hover:scale-110 transition"
            size={20}
          />
        </Button>
      )}

      {/* Premium User  */}

      <div className="flex flex-col items-center justify-center gap-y-2 mt-auto relative cursor-pointer">
        <GiImperialCrown
          size={20}
          className="text-primaryColor hover:scale-110 transition"
        />
        <p className="whitespace-nowrap text-neutral-400 font-normal text-lg">
          Go <span className="text-primaryColor">Pro</span>
        </p>
      </div>

      {user && (
        <Button className="flex items-center justify-center rounded-sm bg-emerald-200">
          <LogOut
            className="text-black hover:scale-105"
            size={20}
            onClick={() => logout()}
          />
        </Button>
      )}
    </div>
  );
};

export default RightSidebar;
