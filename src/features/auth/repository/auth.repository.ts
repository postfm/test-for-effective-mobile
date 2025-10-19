import { CreateUser, UserRole, UserStatus } from '../../user/types/user-interface';
import prisma from '../../../prisma/prisma';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../../utils/jwt';

export const authRepository = {
  async register(data: CreateUser) {
    const { name, birthday, email, password, role } = data;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        birthday: new Date(birthday),
        email,
        password: hashedPassword,
        role: (role.toUpperCase() as UserRole) || UserRole.USER,
        status: UserStatus.ACTIVE,
      },
    });

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role as UserRole,
      status: user.status as UserStatus,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        birthday: user.birthday,
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
      status: user?.status as UserStatus,
    });

    return {
      token,
      user: {
        id: user?.id,
        name: user?.name,
        birthday: user?.birthday,
        email: user?.email,
        role: user?.role,
        status: user?.status,
      },
    };
  },
};
