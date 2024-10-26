// components/Layout/Navbar.tsx
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

interface NavbarProps {
  user?: {
    name: string;
    role: string;
  };
}

export default function Navbar({ user }: NavbarProps) {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie('token');
    router.push('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Admin Dashboard
        </Link>
        
        {user ? (
          <div className="flex items-center gap-4">
            <span>Welcome, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link href="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link href="/signup" className="hover:text-gray-300">
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}