"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  selectDOB,
  selectEmail,
  selectGender,
  selectName,
  selectPassword,
} from "@/lib/features/register/registerSlice";
import { useAppSelector } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { termsAndConditionsSchema } from "@/validations/auth";
import Link from "next/link";
import { signup } from "@/services/authServices";
import { useRouter } from "next/navigation";
import { RegisterStepFourth } from "@/types/types";
import { useToast } from "@/hooks/useToastProvider";
import { Truculenta } from "next/font/google";
import { useState } from "react";

export default function RegisterFormStepFourth() {
  const router = useRouter();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const email = useAppSelector(selectEmail);
  const password = useAppSelector(selectPassword);
  const name = useAppSelector(selectName);
  const dob = useAppSelector(selectDOB);
  const gender = useAppSelector(selectGender);

  const form = useForm<z.infer<typeof termsAndConditionsSchema>>({
    resolver: zodResolver(termsAndConditionsSchema),
    defaultValues: {},
  });

  const userData = {
    email,
    password,
    name,
    dob,
    gender,
  };

  console.log(userData);

  const onSubmit: SubmitHandler<RegisterStepFourth> = async (data) => {
    try {
      setIsLoading(true);

      await signup(userData);
      console.log("Registration successful");

      router.push("/login");
      setIsLoading(false);
      showToast("success", "Singup Spotify account succesfully !");
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast("error", "Error while signup account !");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-[312px] flex flex-col text-primaryColor font-sans"
      >
        <FormField
          control={form.control}
          name="receiveMarketingMessages"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start w-[312px] mx-auto space-x-3 space-y-0 bg-tintedBase rounded-md py-4 px-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="ml-1"
                />
              </FormControl>
              <div className="leading-tight font-normal">
                <FormLabel>
                  I would prefer not to receive marketing messages from Spotify
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shareDataWithContentProviders"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start w-[312px] mx-auto space-x-3 space-y-0 bg-tintedBase rounded-md py-4 px-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="ml-1"
                />
              </FormControl>
              <div className="leading-tight font-normal">
                <FormLabel>
                  Share my registration data with Spotify&apos;s content
                  providers for marketing purposes.
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        <div className="w-[312px] space-y-2 text-sm font-normal">
          <p className="">
            <span>By clicking on sign-up, you agree to Spotify&apos;s </span>
            <Link href="/" className="text-[#1DB954] underline">
              Terms and Conditions of Use.
            </Link>
          </p>
          <p className="">
            <span>
              To learn more about how Spotify collects, uses, shares and
              protects your personal data, please see&nbsp;
            </span>
            <Link href="/" className="text-[#1DB954] underline">
              Spotify&apos;s Privacy Policy.
            </Link>
          </p>
        </div>
        <Button
          type="submit"
          className="text-bgBase text-base font-circular bg-[#1ed760] rounded-full hover:bg-[#1ed760] transform hover:scale-105 font-semibold min-h-12"
        >
          Sign up
        </Button>
      </form>
    </Form>
  );
}
