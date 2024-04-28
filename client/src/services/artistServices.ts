import axiosConfig from './axiosConfig';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY as string

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

interface AllArtists {
  name: string;
  picture?: string | null;
  description?: string | null;
  followers?: number | null;
  facebook?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
}

export function createArtist(formData: FormData) {
  return axiosConfig.post(`/artists/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      'API-Key': API_KEY
    },
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

export function getAllArtists() {
  return axiosConfig.get(`/artists`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}
