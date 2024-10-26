import { NextRequest, NextResponse } from 'next/server';
import { comparePasswords, generateToken } from '@/utils/auth';
import usersData from '@/data/users.json';
import { AuthResponse, User, UsersData } from '@/types';

const users = usersData as UsersData;

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = users.users.find((u) => u.email === email) as User | undefined;
    if (!user) {
      return NextResponse.json<AuthResponse>({
        success: false,
        message: 'Invalid credentials'
      }, { status: 401 });
    }

    const isValidPassword = await comparePasswords(password, user.password!);
    if (!isValidPassword) {
      return NextResponse.json<AuthResponse>({
        success: false,
        message: 'Invalid credentials'
      }, { status: 401 });
    }

    const token = await generateToken(user);
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json<AuthResponse>({
      success: true,
      message: 'Login successful',
      token,
      user: userWithoutPassword
    }, {
      status: 200,
      headers: {
        'Set-Cookie': `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`
      }
    });
  } catch (error) {
    return NextResponse.json<AuthResponse>({
      success: false,
      message: 'Internal server error'
    }, { status: 500 });
  }
}
