import axiosConfig from './axiosConfig';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY as string

interface CreateSong {
  name: string;
  picture: FileList | null;
  song: FileList | null;
  userId: string;
  artistId: string;
}



export function createSong(formData: FormData) {
  return axiosConfig.post(`/songs/create`, formData, {
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

export function getAllSongs() {
  return axiosConfig.get(`/songs`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}
