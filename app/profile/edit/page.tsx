// /app/profile/edit/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../hooks/useUser';
import toast from 'react-hot-toast';

export default function EditProfilePage() {
  const router = useRouter();
  const user = useUser();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [contact, setContact] = useState(user.contact);
  const [photo, setPhoto] = useState(user.photo);

  const handleSave = async () => {
    const updatedUser = { name, email, contact, photo };

    try {
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully');
      router.push('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const handleDeleteAccount = () => {
    const confirmDelete = confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmDelete) {
      localStorage.removeItem('user'); // Remove user from local storage
      toast.success('Account deleted successfully');
      router.push('/login'); // Redirect to login page
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 mb-4">
            <img
              src={photo || '/avatars/default.jpg'}
              alt="Profile Picture"
              className="rounded-full object-cover"
            />
          </div>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handlePhotoUpload} 
            aria-label="Upload Profile Picture" 
            title="Upload Profile Picture"
          />
        </div>

        <div className="text-left space-y-4">
          <div>
            <label className="text-gray-700" htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded mt-1"
              placeholder="Enter your name"
              aria-label="Name"
              title="Name"
            />
          </div>
          <div>
            <label className="text-gray-700" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded mt-1"
              placeholder="Enter your email"
              aria-label="Email"
              title="Email"
            />
          </div>
          <div>
            <label className="text-gray-700" htmlFor="contact">Contact</label>
            <input
              id="contact"
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full px-4 py-2 border rounded mt-1"
              placeholder="Enter your contact number"
              aria-label="Contact Number"
              title="Contact Number"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 space-y-4">
          <button
            onClick={handleSave}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            aria-label="Save Changes"
            title="Save Changes"
          >
            Save Changes
          </button>
          <button
            onClick={() => router.push('/profile')}
            className="w-full bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
            aria-label="Cancel"
            title="Cancel"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteAccount}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            aria-label="Delete Account"
            title="Delete Account"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
