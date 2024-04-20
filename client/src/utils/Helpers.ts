import { jwtDecode } from "jwt-decode";
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const tokenHeaderPayload = localStorage.getItem('accessTokenHeaderPayload');
    const tokenSignature = getCookie('accessTokenSignature');

    if (tokenHeaderPayload && tokenSignature) {
      return `${tokenHeaderPayload}.${tokenSignature}`;
    }
  } catch (error) {
    console.error('Error getting access token:', error);
  }

  return null;
};

export const isAccessTokenValid = (): boolean => {
  const accessToken = getAccessToken();

  if (accessToken === null) {
    return false;
  }

  try {
    const decodedToken = jwtDecode<{ exp?: number }>(accessToken);
    const currentTime = Math.floor(Date.now() / 1000);

    return decodedToken.exp ? decodedToken.exp >= currentTime : false;
  } catch (error) {
    console.error('Error decoding access token:', error);
    return false;
  }
};

export const removeAccessToken = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem('accessTokenHeaderPayload');
    deleteCookie('accessTokenSignature');
  } catch (error) {
    console.error('Error removing access token:', error);
  }
};

export const saveAccessToken = (token: string): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const [header, payload, signature] = token.split('.');
    const headerPayload = `${header}.${payload}`;

    localStorage.setItem('accessTokenHeaderPayload', headerPayload);
    setCookie('accessTokenSignature', signature);
  } catch (error) {
    console.error('Error saving access token:', error);
  }
};

