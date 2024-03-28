import { twMerge } from "tailwind-merge";
// import "../globals.css";

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        `w-full h-screen flex items-center justify-center bg-gradient-to-b from-bgElevatedBase to-black`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default AuthLayout;
