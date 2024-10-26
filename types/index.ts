export interface User {
    id: string;
    name: string;
    email: string;
    contact: string;
    photo: string;
    role: 'admin' | 'user';
    createdAt: string;
    password?: string;
  }

  export interface UsersData {
    users: User[];
  }
  
  export interface AuthResponse {
    success: boolean;
    message: string;
    token?: string;
    user?: Omit<User, 'password'>;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
  }

