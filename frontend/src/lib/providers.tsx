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
        <Toaster
          position="top-center"
          toastOptions={{
            // Global default options
            duration: 4000,
            style: {
              background: '#0f172a', // slate-900
              color: '#fff',
              padding: '12px 14px',
              borderRadius: '8px',
            },
            // Default options for specific types
            success: {
              duration: 3000,
              // icon can be a string or React node
              icon: '✅',
            },
            error: {
              duration: 6000,
              icon: '❌',
            },
          }}
        />

        {children}
      </AuthProvider>
    </SWRConfig>
  );
}