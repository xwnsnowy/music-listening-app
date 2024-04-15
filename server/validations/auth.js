import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }).min(1).max(255),
  password: z
    .string()
    .min(10, { message: "Password must be at least 10 characters long" })
    .max(30, { message: "Password must be at most 30 characters long" }),
  name: z
    .string()
    .min(1, {
      message: "Enter a name for your profile.",
    })
    .max(255),
  dob: z.object({
    day: z.string().min(1, { message: "Enter day" }).max(2),
    month: z.enum([
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]),
    year: z
      .string()
      .min(4, { message: "Enter year" })
      .max(4)
      .refine((year) => parseInt(year) > 1900, {
        message: "Year must be greater than 1900",
      }),
  }),
  gender: z.enum([
    "male",
    "female",
    "non-binary",
    "something-else",
    "prefer-not-to-say",
  ]),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }).min(1).max(255),
  password: z
    .string()
    .min(1, {
      message: "Password must be at least 1 letter and 10 characters long",
    })
    .max(30, { message: "Password must be at most 30 characters long" }),
});
