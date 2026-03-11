import { prisma } from '../config/db';
import { Prisma } from '@prisma/client';

export class UserService {
  static async createUser(data: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data,
      select: { id: true, email: true, name: true, createdAt: true, updatedAt: true },
    });
  }

  static async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  static async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, name: true, createdAt: true, updatedAt: true },
    });
  }
}
