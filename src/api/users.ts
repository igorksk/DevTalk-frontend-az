import apiClient from './client';
import type { User } from '../types';

export async function getUserById(id: number): Promise<User> {
  const response = await apiClient.get<User>(`/users/${id}`);
  return response.data;
}
