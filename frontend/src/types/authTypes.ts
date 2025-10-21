import { User } from './user';

export type SignUpCredentials = {
  name: string;
  email: string;
  password: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isHydrating: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  logout: () => void;
};