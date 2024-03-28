"use client";

import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}

const SiderbarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  href,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `flex h-auto w-full cursor-pointer flex-row items-center gap-x-4 py-1 text-secondaryColor transition duration-200 ease-linear hover:text-primaryColor`,
        active && "text-primaryColor",
      )}
    >
      <Icon size={26} />
      <span>{label}</span>
    </Link>
  );
};

export default SiderbarItem;
