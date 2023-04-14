export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
}

export interface CreateUser extends Omit<User, 'id'> {}