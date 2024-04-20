import { twMerge } from "tailwind-merge";

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

const Box: React.FC<BoxProps> = ({ children, className }) => {
  return (
    <div className={twMerge(`bg-bgBase h-fit w-full rounded-lg`, className)}>
      {children}
    </div>
  );
};

export default Box;
