import { z } from "zod";

// Step 1: Email Schema
export const emailSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }).min(1).max(255),
});

// Step 2: Password Schema
export const passwordSchema = z.object({
  password: z.string().min(3, { message: "Password must be at least 3 characters long" }).max(30, { message: "Password must be at most 30 characters long" }),
});

// Step 3: Personal Information Schema
export const personalInfoSchema = z.object({
  name: z.string().min(1).max(255),
  dob: z.string(),
  gender: z.enum(['male', 'female', 'other']),
});

// Step 4: Terms & Conditions Schema 
export const termsAndConditionsSchema = z.object({
  agreed: z.boolean().refine(value => value === true, { message: "You must agree to the terms and conditions" }),
});

export const loginSchema = z.object({
  email: z.string()
    .email({ message: "Invalid email format" }).min(1).max(255),
  password: z.string()
    .min(3, { message: "Password must be at least 3 characters long" })
    .max(30, { message: "Password must be at most 30 characters long" }),
});
