import { jwtDecode } from "jwt-decode";
import { getCookie } from 'cookies-next';

/**
 * Lấy access token từ localStorage và cookie
 * @returns {string | null} - Trả về access token nếu có, ngược lại trả về null
 */
export const getAccessToken = (): string | null => {
  const tokenHeaderPayload = localStorage.getItem('accessTokenHeaderPayload');
  const tokenSignature = getCookie('accessTokenSignature');

  if (tokenHeaderPayload && tokenSignature) {
    return `${tokenHeaderPayload}.${tokenSignature}`;
  }

  return null;
};

/**
 * Kiểm tra xem access token có hợp lệ hay không
 * @returns {boolean} - Trả về true nếu access token hợp lệ, ngược lại trả về false
 */
export const isAccessTokenValid = (): boolean => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(accessToken);
    const currentTime = Math.floor(Date.now() / 1000);

    return decodedToken.exp ? decodedToken.exp >= currentTime : false;
  } catch (error) {
    console.error('Error decoding access token:', error);
    return false;
  }
};
