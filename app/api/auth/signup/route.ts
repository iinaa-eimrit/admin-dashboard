import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, generateToken } from '@/utils/auth';
import usersData from '@/data/users.json';
import { AuthResponse, User, UsersData } from '@/types';
import fs from 'fs/promises';
import path from 'path';

const users = usersData as UsersData;

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, contact } = await req.json();

    if (users.users.some((u) => u.email === email)) {
      return NextResponse.json<AuthResponse>({
        success: false,
        message: 'Email already exists'
      }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    const newUser: User = {
      id: String(users.users.length + 1),
      name,
      email,
      password: hashedPassword,
      contact,
      photo: '/avatars/default.jpg',
      role: 'user',
      createdAt: new Date().toISOString()
    };

    users.users.push(newUser);
    await fs.writeFile(
      path.join(process.cwd(), 'data/users.json'),
      JSON.stringify(users, null, 2)
    );

    const token = await generateToken(newUser);

    return NextResponse.json<AuthResponse>({
      success: true,
      message: 'Signup successful',
      token,
      user: newUser
    }, {
      status: 201,
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
