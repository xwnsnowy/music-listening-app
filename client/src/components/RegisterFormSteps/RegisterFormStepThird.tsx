"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  setCurrentStep,
  setEmail,
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

import { personalInfoSchema } from "@/schemas/auth";

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
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: "",
      dob: {},
      gender: undefined,
    },
  });

  const { register } = form;
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      // Xử lý validation
      // await form.trigger();

      // Nếu không có lỗi validation, gọi dispatch và setCurrentStep
      // if (form.formState.isValid) {
      console.log("Submitting form with data:", data);
      // dispatch(setEmail(data.email));
      dispatch(setCurrentStep(2));
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
        className="space-y-4 min-w-72 flex flex-col text-primaryColor "
      >
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col gap-2">
                <FormLabel className="text-primaryColor">Name</FormLabel>
                <FormLabel className="text-[#a7a7a7] font-light">
                  This name will appear on your profile
                </FormLabel>
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
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col gap-2">
                <FormLabel className="text-primaryColor">
                  Date of birth
                </FormLabel>
                <FormLabel className="text-[#a7a7a7] font-light">
                  Why do we need your date of birth?
                  <Link href="/">Learn more.</Link>
                </FormLabel>
              </div>
              <FormControl className="flex gap-2">
                {/* Day */}
                <div className="flex gap-1 max-w-[288px]">
                  <Input
                    placeholder="Day"
                    {...register("dob.day")}
                    className="bg-transparent text-primaryColor rounded-none min-h-12 flex-1"
                    name="day"
                  />
                  {/* Month */}
                  <Select {...register("dob.month")}>
                    <SelectTrigger className="bg-transparent text-primaryColor font-normal rounded-none min-h-12 w-36 placeholder:text-secondaryColor">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent className="bg-black text-primaryColor">
                      <SelectItem value="01">January</SelectItem>
                      <SelectItem value="02">February</SelectItem>
                      <SelectItem value="03">March</SelectItem>
                      <SelectItem value="04">April</SelectItem>
                      <SelectItem value="05">May</SelectItem>
                      <SelectItem value="06">June</SelectItem>
                      <SelectItem value="07">July</SelectItem>
                      <SelectItem value="08">August</SelectItem>
                      <SelectItem value="09">September</SelectItem>
                      <SelectItem value="10">October</SelectItem>
                      <SelectItem value="11">November</SelectItem>
                      <SelectItem value="12">December</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* Year */}
                  <Input
                    placeholder="Year"
                    {...register("dob.year")}
                    className="bg-transparent text-primaryColor rounded-none min-h-12 flex-1"
                    name="year"
                  />
                </div>
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
