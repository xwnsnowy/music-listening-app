import { Songs } from '@/types/types';
import axiosConfig from './axiosConfig';

interface FavoriteData {
  userId?: string;
  song?: Songs;
}

export function getAllFavorite(userId: string) {
  return axiosConfig.get(`/favorites/${userId}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

export function checkIsFavorite(data: FavoriteData) {
  return axiosConfig.post(`/favorites/check`, data)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

export function addToFavorite(data: FavoriteData) {
  return axiosConfig.post(`/favorites/add`, data)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

export function removeFromFavorite(userId: string, songId: string) {
  return axiosConfig.delete(`/favorites/remove/${userId}/${songId}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}


