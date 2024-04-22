"use client";

import { useRouter } from "next/navigation";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import Button from "../Button/Button";
import Link from "next/link";
import { useAuthContext } from "@/hooks/useAuthContext";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();

  const { user, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-slate-700 p-6`,
        className
      )}
    >
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="hidden items-center gap-x-2 md:flex">
          <button
            onClick={() => router.back()}
            title="Arrow Left"
            className="flex items-center justify-center rounded-full bg-black transition hover:opacity-75"
          >
            <RxCaretLeft size={35} className="text-primaryColor" />
          </button>
          <button
            onClick={() => router.forward()}
            title="Arrow Left"
            className="flex items-center justify-center rounded-full bg-black transition hover:opacity-75"
          >
            <RxCaretRight size={35} className="text-primaryColor" />
          </button>
        </div>
        {/* Icon Home Mobile */}
        <div className="flex items-center gap-x-2 md:hidden">
          <button
            title="Home Mobile"
            className="flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75"
          >
            <HiHome size={20} className="text-black" />
          </button>
          <button
            title="Search Mobile"
            className="flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75"
          >
            <BsFillSearchHeartFill size={20} className="text-black" />
          </button>
        </div>
        {user === null && (
          <div className="flex items-center justify-between gap-x-4">
            <Link href="/signup">
              <Button className="transform bg-transparent px-4 text-primaryColor hover:scale-110">
                Sign Up
              </Button>
            </Link>
            <Link href="/login">
              <Button className="transform px-10 py-3 hover:scale-110">
                Log In
              </Button>
            </Link>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default Header;
