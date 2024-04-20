"use client";

import { AuthContext } from "@/context/AuthContext";
import {
  getAccessToken,
  isAccessTokenValid,
  removeAccessToken,
} from "@/utils/Helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  email: string;
  password: string;
  dob?: {
    day: string;
    month: string;
    year: string;
  };
  gender?:
    | "male"
    | "female"
    | "non-binary"
    | "something-else"
    | "prefer-not-to-say";
  role: "member" | "admin" | "guest";
  phoneNumber?: string;
  address?: string;
  avatar?: string;
  refreshToken?: string | null;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkTokenValidity = () => {
      if (!isAccessTokenValid()) {
        logout();
        router.push("/login");
      }
    };

    checkTokenValidity();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);

    removeAccessToken();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
