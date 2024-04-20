"use client";

import { useRef, useState } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import Button from "../Button/Button";
import { BiSearch } from "react-icons/bi";
import { HiMiniBarsArrowDown, HiMiniBarsArrowUp } from "react-icons/hi2";
import { motion } from "framer-motion";

const Library = () => {
  const [isBarsUp, setIsBarsUp] = useState(true);
  const [inputVisible, setInputVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickBars = () => {
    setIsBarsUp((prevIsUp) => !prevIsUp);
  };

  const handleSearchLibrary = () => {
    setInputVisible(!inputVisible);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const onClick = () => {
    //   upload later
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pb-1 pt-4">
        {/* Title Library */}
        <div className="flex cursor-pointer gap-x-2 text-secondaryColor transition duration-200 ease-linear hover:text-primaryColor">
          <TbPlaylist size={26} />
          <span>Your Library</span>
        </div>
        <div className="flex gap-x-4">
          <AiOutlinePlus
            onClick={onClick}
            size={20}
            className="cursor-pointer text-secondaryColor hover:text-primaryColor"
          />
          <IoArrowForwardOutline
            onClick={onClick}
            size={20}
            className="cursor-pointer text-secondaryColor hover:text-primaryColor"
          />
        </div>
      </div>
      {/* List of Songs! */}
      <div className="my-2 flex flex-col gap-y-2 px-3 text-primaryColor">
        <button className="w-fit items-center bg-transparent">
          <span className="rounded-full bg-tintedBase px-3 py-2 text-sm  font-normal transition duration-200 ease-in-out hover:bg-tintedHighLight">
            List of Songs!
          </span>
        </button>
      </div>

      {/* Logging */}
      <div className="flex max-h-8 justify-between px-3 pt-1">
        <div className="relative flex items-center justify-center">
          <Button
            onClick={handleSearchLibrary}
            className="pointer-events-auto absolute left-0 top-0 flex h-min w-min cursor-pointer items-center border-0 bg-transparent p-2 hover:bg-tintedHighLight"
          >
            <BiSearch
              size={16}
              className="text-secondaryColor hover:text-primaryColor"
            />
          </Button>
          <motion.input
            ref={inputRef}
            type="text"
            initial="hidden"
            animate={{
              opacity: inputVisible ? 1 : 0,
              x: inputVisible ? "0%" : "0%",
              width: inputVisible ? "188px" : "0",
            }}
            transition={{
              duration: 0.3,
              ease: [0.3, 0, 0.4, 1],
              delay: inputVisible ? 0.1 : 0,
            }}
            className={`${
              inputVisible ? "px-8 py-2" : ""
            } relative h-8 overflow-ellipsis rounded bg-tintedHighLight text-sm font-light text-primaryColor outline-none transition-width placeholder:text-xs placeholder:text-secondaryColor`}
            maxLength={80}
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            placeholder="Search in Your Library"
            onBlur={() => setInputVisible(false)}
          />
        </div>

        <Button
          className="transitions flex w-auto transform items-center justify-center gap-x-1 bg-transparent p-2 font-light text-secondaryColor duration-[33ms] ease-out hover:scale-[1.04] hover:text-primaryColor"
          onClick={handleClickBars}
        >
          <span className="font-circular">Recents</span>
          {isBarsUp ? (
            <HiMiniBarsArrowUp size={20} className="mt-1" />
          ) : (
            <HiMiniBarsArrowDown size={20} className="mt-1" />
          )}
        </Button>
      </div>

      <div className="flex flex-col gap-y-3 px-2 ">
        <div className="my-2 flex flex-col gap-y-5 rounded-lg bg-bgElevatedBase px-5 py-4">
          <div className="flex flex-col gap-y-2 font-circular text-primaryColor">
            <span className="text-base font-black">
              Create your first playlist
            </span>
            <span className="text-sm font-normal">
              It&apos;s easy, we&apos;ll help you
            </span>
          </div>
          <Button
            onClick={() => {}}
            className="w-32 transform py-1 hover:scale-105"
          >
            <span className="text-sm">Create PlayList</span>
          </Button>
        </div>

        <div className="my-2 flex flex-col gap-y-5 rounded-lg bg-bgElevatedBase px-5 py-4">
          <div className="flex flex-col gap-y-2 font-circular text-primaryColor">
            <span className="text-base font-black">
              Let&apos;s find some podcasts to follow
            </span>
            <span className="text-sm font-normal">
              We&apos;ll keep you updated on new episodes
            </span>
          </div>
          <Button
            onClick={() => {}}
            className="w-32 transform py-1 hover:scale-105"
          >
            <span className="text-sm">Browse podcasts</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Library;
