import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import User from '@/models/User';
import { hashPassword } from '@/lib/utils/helpers';
import { UserRole } from '@/types';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { email, password, name, role = UserRole.CUSTOMER, phone, company } = body;

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      role,
      phone,
      company,
      isActive: true,
    });

    // Remove password from response
    const userResponse = {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone,
      company: user.company,
      isActive: user.isActive,
    };

    return NextResponse.json(
      { success: true, data: userResponse, message: 'User registered successfully' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration Error:', error);
    return NextResponse.json(
      { success: false, error: 'Registration failed' },
      { status: 500 }
    );
  }
}
