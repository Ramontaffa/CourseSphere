"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { api } from "@/lib/api";
import { toast } from "react-hot-toast";
import type {
  User,
  AuthContextType,
  LoginCredentials,
  SignUpCredentials,
} from "@/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHydrating, setIsHydrating] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get("auth.token");

      if (token) {
        try {
          const response = await api.get<User>(`/users/${token}`);
          if (response.data) {
            setUser(response.data);
          }
        } catch (error) {
          console.error("AUTH: Falha ao buscar utilizador pelo token!", error);
          Cookies.remove("auth.token");
        }
      } else {
        console.log("AUTH: Nenhum token encontrado.");
      }
      console.log("AUTH: Hidratação terminada.");
      setIsHydrating(false);
    }

    loadUserFromCookies();
  }, []);

  const login = async ({ email, password }: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await api.get("/users", {
        params: { email, password },
      });

      const usersFound: User[] = response.data;

      if (usersFound.length > 0) {
        const loggedUser = usersFound[0];
        setUser(loggedUser);
        Cookies.set("auth.token", String(loggedUser.id), {
          expires: 7,
          path: "/",
        });

        toast.success(`Bem-vindo de volta, ${loggedUser.name}!`);
        router.push("/");
      } else {
        toast.error("Email ou senha inválidos.");
        throw new Error("Email ou senha inválidos.");
      }
    } catch (error) {
      console.error("Falha no login", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async ({ name, email, password }: SignUpCredentials) => {
    setIsLoading(true);
    try {
      const existing = await api.get("/users", { params: { email } });
      if (existing.data && existing.data.length > 0) {
        toast.error("Já existe uma conta com esse email.");
        throw new Error("Email já registrado");
      }

      const response = await api.post("/users", {
        name,
        email,
        password,
      });

      const createdUser: User = response.data;
      setUser(createdUser);
      Cookies.set("auth.token", String(createdUser.id), {
        expires: 7,
        path: "/",
      });

      toast.success(`Conta criada! Bem-vindo, ${createdUser.name}!`);
      router.push("/");
    } catch (error) {
      console.error("Falha no signUp", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("auth.token", { path: "/" });
    toast.success("Até breve!");
    router.push("/login");
  };

  const value = {
    user,
    isLoading,
    isHydrating,
    login,
    signUp,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}