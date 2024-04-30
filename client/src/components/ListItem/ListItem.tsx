"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

const ListItem: React.FC<ListItemProps> = ({ image, name, href }) => {
  const router = useRouter();

  const onClick = () => {
    // Add authencation before push
    router.push(href);
  };

  return (
    <button
      className="group relative flex cursor-pointer items-center gap-x-4 overflow-hidden rounded-md bg-neutral-100/10 pr-4 transition hover:bg-neutral-100/20"
      title="abc"
    >
      <div className="relative min-h-16 min-w-16">
        <Image
          className="object-cover"
          fill
          src={image}
          alt="Image"
          sizes="16"
        />
      </div>
      <p className="truncate py-5 font-medium">{name}</p>
      <div
        className="transition hover:scale-110 absolute right-5 flex items-center justify-center rounded-full bg-green-500 p-4 opacity-0 drop-shadow-md group-hover:opacity-100
        "
      >
        <FaPlay className="text-black" />
      </div>
    </button>
  );
};

export default ListItem;
