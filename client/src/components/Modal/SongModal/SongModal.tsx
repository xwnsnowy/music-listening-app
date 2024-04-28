"use client";

import Modal from "../Modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { songSchema } from "@/validations/song";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useToast } from "@/hooks/useToastProvider";
import useSongModal from "@/hooks/useSongModal";
import { useFetchAllArtists } from "@/hooks/useGetAllArtists";
import { ModalAritstItem } from "./ModalArtistItem";
import { useAuthContext } from "@/hooks/useAuthContext";

interface IFormInput {
  name: string;
  picture?: FileList;
  song?: FileList;
  userId: string;
  artistId: string;
}

const SongModal = () => {
  const { artists, loading, error } = useFetchAllArtists();

  const { user } = useAuthContext();

  const { showToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const { onClose, isOpen } = useSongModal();

  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);

  const onChange = () => {
    form.reset();
    onClose();
  };

  const handleSelectArtist = (artistId: string) => {
    setSelectedArtistId((prevId) => (prevId === artistId ? null : artistId));
  };

  const form = useForm<z.infer<typeof songSchema>>({
    resolver: zodResolver(songSchema),
    defaultValues: {
      name: "",
      picture: undefined,
      song: undefined,
      userId: "",
      artistId: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setIsLoading(true);

      const formData = new FormData();

      formData.append("name", data.name);

      const pictureFile = data.picture?.[0];
      if (pictureFile) {
        formData.append("picture", pictureFile);
      }
      const songFile = data.song?.[0];
      if (songFile) {
        formData.append("song", songFile);
      }
      formData.append("userId", user?._id || "");
      formData.append("artistId", selectedArtistId || "");

      // const response = await createSong(formData);

      showToast("success", "Song Created !");

      console.log("Form Data:", formData);
      // console.log("response:", response);
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast("error", "Submission failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const pictureRef = form.register("picture");
  const songRef = form.register("song");

  return (
    <Modal
      title="Add a new Song"
      description="Create your own song"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 min-w-72 flex flex-col text-primaryColor "
          encType="multipart/form-data"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Song Name"
                    {...field}
                    disabled={isLoading}
                    className="bg-transparent border-none placeholder:text-secondaryColor bg-neutral-700 text-primaryColor rounded-md min-h-9"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="picture"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primaryColor">
                  Select an image file
                </FormLabel>
                <FormControl>
                  <Input
                    {...pictureRef}
                    accept="image/*"
                    disabled={isLoading}
                    className="bg-transparent border-none placeholder:text-secondaryColor bg-neutral-700 text-primaryColor rounded-md min-h-9"
                    type="file"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="song"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primaryColor">
                  Select an Song file
                </FormLabel>
                <FormControl>
                  <Input
                    {...songRef}
                    accept="song/*"
                    disabled={isLoading}
                    className="bg-transparent border-none placeholder:text-secondaryColor bg-neutral-700 text-primaryColor rounded-md min-h-9"
                    type="file"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-3 gap-2 py-4 cursor-pointer">
            {artists?.map((artist) => (
              <ModalAritstItem
                key={artist._id}
                data={artist}
                onClick={() => handleSelectArtist(artist._id)}
                selected={selectedArtistId === artist._id}
              />
            ))}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="text-bgBase text-base bg-[#1ed760] mt-10 rounded-md hover:bg-[#1ed760] transform w-full font-semibold min-h-10 mx-auto"
          >
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>
    </Modal>
  );
};

export default SongModal;
