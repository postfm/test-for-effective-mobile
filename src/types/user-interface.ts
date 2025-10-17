export interface CreateUser {
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
}

export interface UpdateUser {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  status?: string;
}
