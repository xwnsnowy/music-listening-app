import { z } from "zod";

export const songSchema = z.object({
  name: z.string().min(1),
});
