"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { z } from "zod";

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

import { loginSchema } from "@/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput } from "./ui/password-input";
import { login } from "@/services/authServices";
import { useRouter } from "next/navigation";
import { setCookie, getCookie } from "cookies-next";
import { useAuthContext } from "@/hooks/useAuthContext";

interface IFormInput {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();

  const authContext = useAuthContext();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      });
      console.log(response.accessToken);
      if (response?.accessToken) {
        // Lưu Header.Payload vào Local Storage
        localStorage.setItem(
          "accessTokenHeaderPayload",
          response.accessToken.split(".")[0] +
            "." +
            response.accessToken.split(".")[1]
        );

        // Lưu Signature vào Cookie sử dụng cookies() function của Next.js
        setCookie("accessTokenSignature", response.accessToken.split(".")[2]);

        // Them User va AccessToken vao AuthContext
        authContext.login(response.user, response.accessToken);

        router.push("/");
      } else {
        console.error("Login failed:", response?.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
