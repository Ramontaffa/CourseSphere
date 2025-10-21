'use client';

import { createContext, useContext, ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { api } from '@/lib/api';
import { toast } from 'react-hot-toast';
import type { User, AuthContextType, LoginCredentials } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const login = async ({ email, password }: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await api.get('/users', {
        params: { email, password },
      });

      const usersFound: User[] = response.data;

      if (usersFound.length > 0) {
        const loggedUser = usersFound[0];
        
        setUser(loggedUser);
        
        Cookies.set('auth.token', String(loggedUser.id), {
          expires: 7,
          path: '/',
        });

        toast.success(`Bem-vindo de volta, ${loggedUser.name}!`);
        router.push('/');
      } else {
        toast.error('Email ou senha inválidos.');
        throw new Error('Email ou senha inválidos.');
      }
    } catch (error) {
      console.error('Falha no login', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('auth.token', { path: '/' });
    toast.success('Até breve!');
    router.push('/login');
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}