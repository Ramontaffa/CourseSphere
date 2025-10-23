import { Navbar } from '@organisms/Navbar/Navbar';
import React from 'react';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto px-6 sm:px-8 lg:px-10 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}