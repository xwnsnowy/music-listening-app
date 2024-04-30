import Button from "@/components/Button/Button";
import { FaPlay } from "react-icons/fa";

const PlayButton = () => {
  return (
    <Button className="rounded-full bg-[#1FDF64] sm:p-6 lg:p-5 xl:p-4 opacity-0 drop-shadow-md translate-y-1/4 group-hover:opacity-100 hover:scale-110">
      <FaPlay color="black" />
    </Button>
  );
};

export default PlayButton;
