// /app/dashboard/page.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUser } from '../hooks/useUser';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const router = useRouter();
  const user = useUser();

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm text-center">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 mb-4">
            <Image
              src={user.photo || '/avatars/default.jpg'} // Default if no photo
              alt="Profile Picture"
              width={96}
              height={96}
              className="rounded-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">{user.name || 'User'}</h2>
          
          <div className="mt-6 space-y-4">
            <button
              onClick={() => router.push('/profile')}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              View Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
