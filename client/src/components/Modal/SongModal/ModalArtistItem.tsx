import Image from "next/image";

interface Artists {
  _id: string;
  name: string;
  picture?: string | null;
  description?: string | null;
  followers?: number | null;
  facebook?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
}

interface ModalAritstItemProps {
  data: Artists;
  onClick: (id: string) => void;
  selected: boolean;
}

export const ModalAritstItem: React.FC<ModalAritstItemProps> = ({
  data,
  onClick,
  selected,
}) => {
  return (
    <div
      className={`flex items-center justify-center px-2 py-1 rounded-md gap-2 ${
        selected ? "border-emerald-100 border-4" : "border-emerald-400 border-2"
      }`}
      onClick={() => onClick(data._id)}
    >
      <div className="w-6 h-6 flex items-center justify-center bg-neutral-400 rounded-md relative overflow-hidden ">
        <Image
          fill
          className="object-cover"
          src={data.picture || "../../../../public/images/liked.png"}
          alt={data.name}
          loading="lazy"
        />
      </div>
      <span className="text-sm text-neutral-400 w-full truncate">
        {data.name}
      </span>
    </div>
  );
};
