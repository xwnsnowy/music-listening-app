import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3;
const ACCEPTED_FILE_TYPES = ["png", "jpeg", "jpg"];

export const artistSchema = z.object({
  name: z.string().min(1),
  picture: z
    .unknown()
    .transform((value) => {
      return value instanceof File ? value : null;
    })
    .refine(
      (file) => {
        if (!file) {
          return true;
        }

        const fileExtension = file.name.split(".").pop()?.toLowerCase();

        return !!fileExtension && ACCEPTED_FILE_TYPES.includes(fileExtension);
      },
      { message: `Valid types: ${ACCEPTED_FILE_TYPES.join(", ")}` }
    )
    .refine(
      (file) => {
        if (!file) {
          return true;
        }

        return toMb(file.size) <= MAX_UPLOAD_SIZE;
      },
      {
        message: `File size must be less than ${
          MAX_UPLOAD_SIZE / (1024 * 1024)
        }MB`,
      }
    ),
  description: z.string().optional(),
  followers: z.number().int().nonnegative().default(0),
  facebook: z.string().url({ message: "Invalid Facebook URL" }).optional(),
  twitter: z.string().url({ message: "Invalid Twitter URL" }).optional(),
  instagram: z.string().url({ message: "Invalid Instagram URL" }).optional(),
  linkedin: z.string().url({ message: "Invalid LinkedIn URL" }).optional(),
});

function toMb(size) {
  return size / (1024 * 1024);
}
