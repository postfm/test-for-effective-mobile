export interface CreateUser {
  name: string;
  birthday: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UpdateUser {
  name?: string;
  birthday?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  status?: UserStatus;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface AuthPayload {
  token: string;
  user: {
    id: string;
    name: string | null;
    birthday: string | null;
    email: string;
    role: UserRole;
    status: UserStatus;
  };
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  NOT_ACTIVE = 'NOT_ACTIVE',
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
