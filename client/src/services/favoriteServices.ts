import axiosConfig from './axiosConfig';

interface FavoriteData {
  userId?: string;
  songId?: string;
}

export function checkIsFavorite(data: FavoriteData) {
  return axiosConfig.post(`/favorite/check`, data)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

export function addToFavorite(data: FavoriteData) {
  return axiosConfig.post(`/favorite/add`, data)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

export function removeFromFavorite(userId: string, songId: string) {
  return axiosConfig.delete(`/favorite/remove/${userId}/${songId}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

