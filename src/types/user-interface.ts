export interface CreateUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: string;
}

export interface UpdateUser {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  status?: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface AuthPayload {
  token: string;
  user: {
    id: string;
    email: string;
    role: UserRole;
  };
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
