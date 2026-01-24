export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  status: 'active' | 'inactive';
  created_at?: string;
  updated_at?: string;
}

export interface UserFormData {
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  password?: string;
  status: 'active' | 'inactive';
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export interface UsersResponse {
  data: User[];
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}