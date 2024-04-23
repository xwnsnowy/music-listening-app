import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3;
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

const SOCIAL_MEDIA_URLS = {
  facebook: /^https?:\/\/(www\.)?facebook\.com\/.*/,
  twitter: /^https?:\/\/(www\.)?twitter\.com\/.*/,
  instagram: /^https?:\/\/(www\.)?instagram\.com\/.*/,
  linkedin: /^https?:\/\/(www\.)?linkedin\.com\/.*/,
};

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
  followers: z
    .any()
    .refine(
      (value) => {
        if (typeof value !== 'string') {
          return typeof value === 'number' && value >= 0;
        }
        return !isNaN(Number(value)) && Number(value) >= 0;
      },
      {
        message: 'Vui lòng nhập một số dương hoặc 0.',
        path: [],
      }
    )
    .transform((value) => {
      if (typeof value === 'string') {
        return Number(value);
      }
      return value;
    })
    .optional()
    .default(0),
  facebook: z
    .string()
    .refine((value) => SOCIAL_MEDIA_URLS.facebook.test(value), {
      message: "Invalid Facebook URL",
    })
    .optional(),
  twitter: z
    .string()
    .refine((value) => SOCIAL_MEDIA_URLS.twitter.test(value), {
      message: "Invalid Twitter URL",
    })
    .optional(),
  instagram: z
    .string()
    .refine((value) => SOCIAL_MEDIA_URLS.instagram.test(value), {
      message: "Invalid Instagram URL",
    })
    .optional(),
  linkedin: z
    .string()
    .refine((value) => SOCIAL_MEDIA_URLS.linkedin.test(value), {
      message: "Invalid LinkedIn URL",
    })
    .optional(),
});
