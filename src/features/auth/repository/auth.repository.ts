import { CreateUser, UserRole } from '../../user/types/user-interface';
import prisma from '../../../prisma/prisma';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../../utils/jwt';

export const authRepository = {
  async register(data: CreateUser) {
    const { name, email, password, role, status } = data;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: (role.toUpperCase() as UserRole) || UserRole.USER,
        status,
      },
    });

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role as UserRole,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    };
  },

  async login(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    const token = generateToken({
      userId: user?.id as string,
      email: user?.email as string,
      role: user?.role as UserRole,
    });

    return {
      token,
      user: {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        role: user?.role,
        status: user?.status,
      },
    };
  },
};
