// app/signup/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    contact: string;
    photo: string | File;
    password: string;
    confirmPassword: string;
  }>({
    name: '',
    email: '',
    contact: '',
    photo: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        const userData = {
            name: formData.name,
            photo: formData.photo, // URL if the photo is uploaded
          };
          localStorage.setItem('user', JSON.stringify(userData));
          console.log("User data saved:", userData); // Log to verify
          
          toast.success('Sign up successful');
          router.push('/login');
        } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl text-black font-bold mb-6 text-center">Sign Up</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
            <input
              id="name"
              type="text"
              className="w-full p-2 border rounded"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your name"
              required
              aria-label="Name"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              id="email"
              type="email"
              className="w-full p-2 border rounded"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              required
              aria-label="Email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="contact" className="block text-gray-700 mb-2">Contact Info</label>
            <input
              id="contact"
              type="text"
              className="w-full p-2 border rounded"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              placeholder="Enter your contact number"
              required
              aria-label="Contact"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="photo" className="block text-gray-700 mb-2">Photo</label>
            <input
              id="photo"
              type="file"
              className="w-full p-2 border rounded"
              onChange={(e) => setFormData({ ...formData, photo: e.target.files?.[0] || '' })}
              aria-label="Photo"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              id="password"
              type="password"
              className="w-full p-2 border rounded"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your password"
              required
              aria-label="Password"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full p-2 border rounded"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="Confirm your password"
              required
              aria-label="Confirm Password"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
