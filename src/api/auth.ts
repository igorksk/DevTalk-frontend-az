import apiClient from './client';
import type { AuthUser } from '../types';

export async function login(email: string, password: string): Promise<AuthUser> {
  const response = await apiClient.post<AuthUser>('/auth/login', { email, password });
  return response.data;
}
