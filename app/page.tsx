// app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl text-black font-bold mb-8">Welcome to Admin Dashboard</h1>
      <div className="space-x-4">
        <Link 
          href="/login" 
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Login
        </Link>
        <Link 
          href="/signup" 
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}