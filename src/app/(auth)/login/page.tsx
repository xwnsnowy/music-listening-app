import Button from "@/components/Button";
import LoginForm from "@/components/LoginForm";
import SocialMedia from "@/components/SocialMedia";
import Link from "next/link";

const Login = () => {
  return (
    <div className="max-w-[734px] w-full rounded-lg bg-bgBase flex flex-col items-center justify-center py-8  font-circular">
      {/* Title Login */}
      <h1 className="text-primaryColor text-5xl font-black py-10 cursor-default select-none">
        Log in to Spotify
      </h1>
      {/* Login Social Media */}
      <SocialMedia text="Continue" />

      <hr className="my-8 border border-tintedBase w-9/12" />

      <LoginForm />

      <Link
        href="forgot-password"
        className="font-light text-primaryColor underline mt-8"
      >
        Forgot your password?
      </Link>

      <hr className="my-8 border border-tintedBase w-9/12" />

      <div className="text-primaryColor py-8 font-light gap-1 flex">
        <span className="text-secondaryColor">Already have an account?</span>
        <Link href="/signup" className="underline">
          Log in here.
        </Link>
      </div>
    </div>
  );
};

export default Login;
