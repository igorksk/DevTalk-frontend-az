import apiClient from './client';
import type { NewsArticle } from '../types';

export async function getNews(category?: string): Promise<NewsArticle[]> {
  const params = category ? { category } : {};
  const response = await apiClient.get<NewsArticle[]>('/news', { params });
  return response.data;
}

export async function getNewsById(id: number): Promise<NewsArticle> {
  const response = await apiClient.get<NewsArticle>(`/news/${id}`);
  return response.data;
}
