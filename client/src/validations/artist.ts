import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3;
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

export const artistSchema = z.object({
  name: z.string().min(1),
  picture: z
    .instanceof(FileList)
    .optional()
    .refine((fileList) => {
      if (!fileList) return true;

      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];

        if (file.size > MAX_UPLOAD_SIZE) {
          return false;
        }

        if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
          return false;
        }
      }

      return true;
    }, 'File(s) do not meet the requirements'),
  description: z.string().optional(),
  followers: z.number().int().nonnegative().default(0),
  facebook: z.string().url({ message: "Invalid Facebook URL" }).optional(),
  twitter: z.string().url({ message: "Invalid Twitter URL" }).optional(),
  instagram: z.string().url({ message: "Invalid Instagram URL" }).optional(),
  linkedin: z.string().url({ message: "Invalid LinkedIn URL" }).optional(),
});
