"use client";

import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  setCurrentStep,
  setEmail,
  setPersonalInfo,
} from "@/lib/features/register/registerSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { personalInfoSchema } from "@/validations/auth";
import { format } from "path/posix";
import { useEffect } from "react";

interface IFormInput {
  name: string;
  dob: {
    day: string;
    month: string;
    year: string;
  };
  gender: string;
}

export default function RegisterFormStepThird() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: "",
      dob: { day: "", month: undefined, year: "" },
      gender: undefined,
    },
  });

  const { register } = form;
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      console.log("Submitting form with data:", data);
      dispatch(
        setPersonalInfo({
          name: data.name,
          dob: {
            day: data.dob.day,
            month: data.dob.month,
            year: data.dob.year,
          },
          gender: data.gender,
        })
      );
      dispatch(setCurrentStep(4));
      const forwardUrl = encodeURIComponent("http://localhost:3000/");
      router.push(`/signup?forward_url=${forwardUrl}&step=4`);
      // }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        // onSubmit={() => console.log("abc")}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-[312px] flex flex-col text-primaryColor "
      >
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col gap-2 max-w-[312px]">
                <FormLabel className="text-primaryColor">Name</FormLabel>
                <FormDescription className="text-[#a7a7a7] font-light">
                  This name will appear on your profile
                </FormDescription>
              </div>
              <FormControl>
                <Input
                  placeholder="Your Name"
                  {...field}
                  className="bg-transparent text-primaryColor rounded-none min-h-12"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Date of birth */}
        <div className="flex w-full gap-2">
          <FormField
            control={form.control}
            name="dob.day"
            render={({ field }) => (
              <FormItem className="flex-1">
                <div className="flex flex-col gap-2">
                  <FormLabel className="text-primaryColor">Day</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="dd"
                      {...field}
                      className="bg-transparent text-primaryColor rounded-none min-h-12"
                    />
                  </FormControl>
                </div>
                <FormMessage className="max-w-16" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dob.month"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-2">
                  <FormLabel className="text-primaryColor">Month</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="bg-transparent text-primaryColor font-normal rounded-none min-h-12 max-w-40 w-40 placeholder:text-secondaryColor">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent className="bg-black text-primaryColor">
                        <SelectItem value="January">January</SelectItem>
                        <SelectItem value="February">February</SelectItem>
                        <SelectItem value="March">March</SelectItem>
                        <SelectItem value="April">April</SelectItem>
                        <SelectItem value="May">May</SelectItem>
                        <SelectItem value="June">June</SelectItem>
                        <SelectItem value="July">July</SelectItem>
                        <SelectItem value="August">August</SelectItem>
                        <SelectItem value="September">September</SelectItem>
                        <SelectItem value="October">October</SelectItem>
                        <SelectItem value="November">November</SelectItem>
                        <SelectItem value="December">December</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dob.year"
            render={({ field }) => (
              <FormItem className="flex-1">
                <div className="flex flex-col gap-2">
                  <FormLabel className="text-primaryColor">Year</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="yyyy"
                      {...field}
                      className="bg-transparent text-primaryColor rounded-none min-h-12 flex-1"
                    />
                  </FormControl>
                </div>
                <FormMessage className="max-w-16" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col gap-2 max-w-[312px]">
                <FormLabel className="text-primaryColor">Gender</FormLabel>
                <FormDescription className="text-[#a7a7a7] font-light text-wrap">
                  We use your gender to help personalize our content
                  recommendations and ads for you.
                </FormDescription>
              </div>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex space-x-4 mt-2">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="male" />
                      </FormControl>
                      <FormLabel className="font-normal">Male</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="female" />
                      </FormControl>
                      <FormLabel className="font-normal">Female</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="non-binary" />
                      </FormControl>
                      <FormLabel className="font-normal">Non-binary</FormLabel>
                    </FormItem>
                  </div>

                  <div className="flex space-x-4">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="something-else" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Something else
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="prefer-not-to-say" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Prefer not to say
                      </FormLabel>
                    </FormItem>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="text-bgBase text-base bg-[#1ed760] rounded-full hover:bg-[#1ed760] transform hover:scale-105 font-semibold min-h-12"
        >
          Next
        </Button>
      </form>
    </Form>
  );
}
