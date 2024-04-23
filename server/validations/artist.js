import { z } from "zod";

export const artistSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  followers: z.string().optional(),
});
