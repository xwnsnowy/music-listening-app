import { z } from "zod";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 10;

const ACCEPTED_IMAGE_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
const ACCEPTED_SONG_FILE_TYPES = ['audio/mpeg', 'audio/mp3', 'audio/mp4'];

export const songSchema = z.object({
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

        if (!ACCEPTED_IMAGE_FILE_TYPES.includes(file.type)) {
          return false;
        }
      }

      return true;
    }, 'File(s) do not meet the requirements'),
  song: z
    .instanceof(FileList)
    .optional()
    .refine((fileList) => {
      if (!fileList) return true;

      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];

        if (file.size > MAX_UPLOAD_SIZE) {
          return false;
        }

        if (!ACCEPTED_SONG_FILE_TYPES.includes(file.type)) {
          return false;
        }
      }

      return true;
    }, 'File(s) do not meet the requirements'),
  userId: z.string().min(1),
  artistId: z.string().min(1),
});
