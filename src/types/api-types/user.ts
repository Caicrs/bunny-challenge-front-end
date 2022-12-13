export interface User {
  email: string;
  password: string;
  confirmPassword: string;
  roles: string;
}

export interface UserResponse {
  id: string;
  password: string;
  email: string;
  roles: [string];
  active: boolean;
  CreditCard: [{}];
  updatedAt?: string;
  createdAt?: string;
}
