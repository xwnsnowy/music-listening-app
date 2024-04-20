"use client"

import { createContext } from 'react';

interface User {
  _id: string;
  email: string;
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
}

export const AuthContext = createContext<{
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}>({
  user: null,
  login: () => { },
  logout: () => { },
});
