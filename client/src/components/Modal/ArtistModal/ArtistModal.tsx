"use client";

import Modal from "../Modal";
import useArtistModal from "@/hooks/useArtistModal";
import { SubmitHandler, useForm } from "react-hook-form";
import { artistSchema } from "@/validations/artist";
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
import { createArtist } from "@/services/artistServices";
import "react-toastify/dist/ReactToastify.css";
import { useToast } from "@/hooks/useToastProvider";

interface IFormInput {
  name: string;
  picture?: FileList | null;
  description?: string | null;
  followers?: number | null;
  facebook?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
}

const ArtistModal = () => {
  const { showToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const { onClose, isOpen } = useArtistModal();

  const onChange = () => {
    form.reset();
    onClose();
  };

  const form = useForm<z.infer<typeof artistSchema>>({
    resolver: zodResolver(artistSchema),
    defaultValues: {
      name: "",
      picture: undefined,
      description: "",
      followers: 0,
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
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

      formData.append("description", data.description || "");
      formData.append("followers", String(data.followers || 0));
      formData.append("facebook", data.facebook || "");
      formData.append("twitter", data.twitter || "");
      formData.append("instagram", data.instagram || "");
      formData.append("linkedin", data.linkedin || "");

      const response = await createArtist(formData);

      showToast("success", "Artist Created !");

      console.log("Form Data:", formData);
      console.log("response:", response);
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast("error", "Submission failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const fileRef = form.register("picture");

  return (
    <Modal
      title="Add a new Artist"
      description="Create your own artist over here"
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
                    placeholder="Artist Name"
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
                    {...fileRef}
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Description"
                    disabled={isLoading}
                    {...field}
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
            name="followers"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Number of Followers"
                    disabled={isLoading}
                    {...field}
                    className="bg-transparent border-none placeholder:text-secondaryColor bg-neutral-700 text-primaryColor rounded-md min-h-9"
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="facebook"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="https://www.facebook.com/"
                    disabled={isLoading}
                    {...field}
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
            name="twitter"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="https://www.twitter.com/"
                    disabled={isLoading}
                    {...field}
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
            name="instagram"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="https://www.instagram.com/"
                    disabled={isLoading}
                    {...field}
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
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="https://www.linkedin.com/"
                    disabled={isLoading}
                    {...field}
                    className="bg-transparent border-none mb-2 placeholder:text-secondaryColor bg-neutral-700 text-primaryColor rounded-md min-h-9"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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

export default ArtistModal;
