import { UserService } from './user.service';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';
import { Prisma } from '@prisma/client';

export class AuthService {
  static async register(data: Prisma.UserCreateInput) {
    const existingUser = await UserService.getUserByEmail(data.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const user = await UserService.createUser({ ...data, password: hashedPassword });
    const token = generateToken(user.id);

    return { user, token };
  }

  static async login(data: any) {
    const user = await UserService.getUserByEmail(data.email);

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new Error('Invalid email or password');
    }

    const token = generateToken(user.id);
    const userWithoutPassword = {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return { user: userWithoutPassword, token };
  }
}
