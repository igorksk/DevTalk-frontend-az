import apiClient from './client';
import type { ForumTopic, Comment } from '../types';

export async function getTopics(): Promise<ForumTopic[]> {
  const response = await apiClient.get<ForumTopic[]>('/topics');
  return response.data;
}

export async function getTopicById(id: number): Promise<ForumTopic & { comments: Comment[] }> {
  const response = await apiClient.get<ForumTopic & { comments: Comment[] }>(`/topics/${id}`);
  return response.data;
}

export async function createTopic(
  title: string,
  body: string,
  category: string,
  authorId: number
): Promise<ForumTopic> {
  const response = await apiClient.post<ForumTopic>('/topics', { title, body, category, authorId });
  return response.data;
}

export async function addComment(
  topicId: number,
  body: string,
  authorId: number
): Promise<Comment> {
  const response = await apiClient.post<Comment>(`/topics/${topicId}/comments`, { body, authorId });
  return response.data;
}
