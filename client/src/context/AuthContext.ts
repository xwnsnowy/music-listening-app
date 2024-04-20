"use client"

import { createContext } from 'react';

interface User {
  _id: string;
  email: string;
  password: string;
  dob?: {
    day: string;
    month: string;
    year: string;
  };
  gender?: "male" | "female" | "non-binary" | "something-else" | "prefer-not-to-say";
  role: "member" | "admin" | "guest";
  phoneNumber?: string;
  address?: string;
  avatar?: string;
  refreshToken?: string | null;
}

interface AccessToken {
  accessToken: string;
}

export const AuthContext = createContext<{
  user: User | null;
  accessToken: string | null;
  login: (userData: User, accessToken: AccessToken) => void;
  logout: () => void;
}>({
  user: null,
  accessToken: null,
  login: () => { },
  logout: () => { },
});
