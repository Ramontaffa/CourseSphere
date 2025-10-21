'use client';

import { SWRConfig } from 'swr';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context';
import { ReactNode } from 'react';
import { api } from './api';


const fetcher = (url: string) => api.get(url).then(res => res.data);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <AuthProvider>
        <Toaster position="top-right" />
        
        {children}
      </AuthProvider>
    </SWRConfig>
  );
}