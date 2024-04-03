"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  setCurrentStep,
  setEmail,
  setPassword,
} from "@/lib/features/register/registerSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Button } from "@/components/ui/button";

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

import { passwordSchema } from "@/schemas/auth";

interface IFormInput {
  password: string;
}

export default function RegisterFormStepSecond() {
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      // Xử lý validation
      // await form.trigger();

      // Nếu không có lỗi validation, gọi dispatch và setCurrentStep
      // if (form.formState.isValid) {
      console.log("Submitting form with data:", data);
      dispatch(setPassword(data.password));
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primaryColor">Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-transparent text-primaryColor rounded-none min-h-12"
                />
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
