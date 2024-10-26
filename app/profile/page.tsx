// app/profile/page.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUser } from '../hooks/useUser';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const router = useRouter();
  const user = useUser();

  const handleEdit = () => {
    // Redirect to the edit profile page (to be created)
    router.push('/profile/edit');
  };

  const handleDeleteAccount = async () => {
    // Confirm deletion with the user
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      // Call API to delete account, if implemented
      const res = await fetch('/api/auth/delete-account', {
        method: 'DELETE',
      });

      if (res.ok) {
        localStorage.removeItem('user'); // Remove user data from localStorage
        toast.success('Account deleted successfully');
        router.push('/signup'); // Redirect to signup page after deletion
      } else {
        toast.error('Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error('An error occurred while deleting your account');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
        
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 mb-4">
            <Image
              src={user.photo || '/avatars/default.jpg'}
              alt="Profile Picture"
              width={96}
              height={96}
              className="rounded-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
        </div>

        {/* User Credentials */}
        <div className="text-left">
          <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
          <p className="text-gray-700"><strong>Contact:</strong> {user.contact}</p>
        </div>

        {/* Buttons */}
        <div className="mt-6 space-y-4">
          <button
            onClick={handleEdit}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
          <button
            onClick={handleDeleteAccount}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
