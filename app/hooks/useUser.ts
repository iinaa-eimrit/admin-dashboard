import { useEffect, useState } from 'react';

export function useUser() {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    contact: string;
    photo: string | null;
  }>({
    name: '',
    email: '',
    contact: '',
    photo: null,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          name: parsedUser.name || 'User',
          email: parsedUser.email || '',
          contact: parsedUser.contact || '',
          photo: parsedUser.photo || '/avatars/default.jpg',
        });
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  return user;
}
