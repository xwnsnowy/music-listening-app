"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useState } from "react";

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

import { registerSchema } from "@/schemas/auth";

interface IFormInput {
  email: string;
  password: string;
}

interface RegisterFormStepThirdProps {
  onNextStep: () => void;
}

export default function RegisterFormStepThird({
  onNextStep,
}: RegisterFormStepThirdProps) {
  const form = useForm<IFormInput>({
    resolver: joiResolver(registerSchema),
  });

  const [submitting, setSubmitting] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // Simulate form submission
    setSubmitting(true);
    console.log("Submitting form with data:", data);
    // Perform your actual form submission logic here
    // For example, make an API call to your server
    // After successful submission, reset form and state
    setSubmitting(false); // Gọi hàm callback để chuyển sang bước tiếp theo
    onNextStep();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 min-w-72 flex flex-col text-primaryColor "
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primaryColor">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="tienthanhcute2k2@gmail.com"
                  {...field}
                  className="bg-transparent text-primaryColor rounded-none min-h-12"
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <span className="font-light">Remember me</span>
        <Button
          type="submit"
          className="text-bgBase text-base bg-[#1ed760] rounded-full hover:bg-[#1ed760] transform hover:scale-105 font-semibold min-h-12"
        >
          Log in
        </Button>
      </form>
    </Form>
  );
}
