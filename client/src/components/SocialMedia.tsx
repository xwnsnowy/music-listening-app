import Button from "./Button";
import Image from "next/image";
import googleIcon from "../../public/images/google-icon.svg";
import facebookIcon from "../../public/images/facebook-icon.svg";
import appleIcon from "../../public/images/apple-icon.svg";
import { twMerge } from "tailwind-merge";
interface SocialMediaProps {
  text?: string;
  className?: string;
}

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const SocialMedia: React.FC<SocialMediaProps> = ({ text, className }) => {
  return (
    <div className={twMerge(`flex flex-col gap-2`, className)}>
      <Button className="min-h-[48px] min-w-[288px] px-4 py-2 flex justify-center items-center bg-transparent text-primaryColor border border-secondaryColor/85 hover:border-primaryColor hover:opacity-100">
        <Image src={googleIcon} alt="Google Icon" className="w-6 h-6 mr-2" />
        <span className="m-auto">{text} with Google</span>
      </Button>
      <Button className="min-h-[48px] min-w-[288px] px-4 py-2 flex justify-center items-center bg-transparent text-primaryColor border border-secondaryColor/85 hover:border-primaryColor hover:opacity-100">
        <Image
          src={facebookIcon}
          alt="Facebook Icon"
          className="w-6 h-6 mr-2"
        />
        <span className="m-auto">{text} with Facebook</span>
      </Button>
      <Button className="min-h-[48px] min-w-[288px] px-4 py-2 flex justify-center items-center bg-transparent text-primaryColor border border-secondaryColor/85 hover:border-primaryColor hover:opacity-100">
        <Image src={appleIcon} alt="Apple Icon" className="w-6 h-6 mr-2" />
        <span className="m-auto">{text} with Apple</span>
      </Button>
      <Button className="min-h-[48px] min-w-[288px] px-4 py-2 flex justify-center items-center bg-transparent text-primaryColor border border-secondaryColor/85 hover:border-primaryColor hover:opacity-100">
        <span className="m-auto">{text} with phone number</span>
      </Button>
    </div>
  );
};

export default SocialMedia;
