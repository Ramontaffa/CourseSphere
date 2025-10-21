import { User } from './user';

export type LoginCredentials = {
  email: string;
  password: string;
};

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
};