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
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { PasswordInput } from "../ui/password-input";
import { Button } from "@/components/ui/button";

import { passwordSchema } from "@/schemas/auth";
import { ChangeEvent, useState } from "react";

interface IFormInput {
  password: string;
}

export default function RegisterFormStepSecond() {
  const router = useRouter();

  const [hasLetter, setHasLetter] = useState(false);
  const [hasNumberOrSpecial, setHasNumberOrSpecial] = useState(false);
  const [hasMinLength, setHasMinLength] = useState(false);

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    // Kiểm tra từng điều kiện riêng lẻ và cập nhật trạng thái của biểu tượng checkmark
    setHasLetter(/[a-zA-Z]/.test(newPassword));
    setHasNumberOrSpecial(
      /[\d!@#$%^&*()_+[\]{};':"\\|,.<>/?~]/.test(newPassword)
    );
    setHasMinLength(newPassword.length >= 10);
  };

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
      dispatch(setCurrentStep(3));
      const forwardUrl = encodeURIComponent("http://localhost:3000/");
      router.push(`/signup?forward_url=${forwardUrl}&step=3`);
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
        className="space-y-4 min-w-[312px] flex flex-col text-primaryColor "
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primaryColor">Password</FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  type="text"
                  className="bg-transparent text-primaryColor rounded-none min-h-12"
                  onChange={(e) => {
                    field.onChange(e);
                    handlePasswordChange(e);
                  }}
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
      <div className="space-y-4 min-w-[312px] flex flex-col text-primaryColor text-sm">
        <span className="text-primaryColor font-bold">
          Your password must contain at least:
        </span>
        <ul className="space-y-2">
          <li className="flex items-center">
            {hasLetter ? (
              <svg
                className="w-4 h-4 mr-2 text-[#1ed760]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.293 5.293a1 1 0 011.414 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L7 11.586l6.293-6.293z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4 mr-2"
                width="12"
                height="12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="6"
                  cy="6"
                  rx="5.5"
                  ry="5.5"
                  stroke="#A7A7A7"
                  strokeWidth="1"
                ></ellipse>
              </svg>
            )}
            <span>1 letter</span>
          </li>
          {/* Repeat similar logic for other criteria */}
          {/* Checkmark SVG for 1 number or special character */}
          <li className="flex items-center">
            {hasNumberOrSpecial ? (
              <svg
                className="w-4 h-4 mr-2 text-green-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.293 5.293a1 1 0 011.414 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L7 11.586l6.293-6.293z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4 mr-2"
                width="12"
                height="12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="6"
                  cy="6"
                  rx="5.5"
                  ry="5.5"
                  stroke="#A7A7A7"
                  strokeWidth="1"
                ></ellipse>
              </svg>
            )}
            <span>1 number or special character</span>
          </li>
          {/* Checkmark SVG for 10 characters */}
          <li className="flex items-center">
            {/* Checkmark SVG for 10 characters */}
            {hasMinLength ? (
              <svg
                className="w-4 h-4 mr-2 text-green-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.293 5.293a1 1 0 011.414 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L7 11.586l6.293-6.293z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4 mr-2"
                width="12"
                height="12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="6"
                  cy="6"
                  rx="5.5"
                  ry="5.5"
                  stroke="#A7A7A7"
                  strokeWidth="1"
                ></ellipse>
              </svg>
            )}
            <span>10 characters</span>
          </li>
        </ul>
      </div>
    </Form>
  );
}
