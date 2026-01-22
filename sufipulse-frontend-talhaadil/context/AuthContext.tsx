"use client";
import { createContext, useContext } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type AuthContextType = {
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();

  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("user_role");
    Cookies.remove("user_id");
    Cookies.remove("is_registered");
    Cookies.remove("city");
    Cookies.remove("country");
    Cookies.remove("name");
    Cookies.remove("email");

    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
