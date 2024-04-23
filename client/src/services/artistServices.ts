import axiosConfig from './axiosConfig';

interface CreateArtist {
  name: string;
  picture?: File | null;
  description?: string | null;
  followers?: number | null;
  facebook?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
}

export function createArtist(formData: FormData) {
  return axiosConfig.post(`/artist/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "API-Key": "tien thanh",
    },
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}