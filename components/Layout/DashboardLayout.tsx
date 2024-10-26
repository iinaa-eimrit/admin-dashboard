// components/Layout/DashboardLayout.tsx
import React from 'react';
import Navbar from './Navbar';
import { User } from '@/types';

export default function DashboardLayout({
  children,
  user
}: {
  children: React.ReactNode;
  user?: User;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} />
      <main className="container mx-auto py-8 px-4">
        {children}
      </main>
    </div>
  );
}