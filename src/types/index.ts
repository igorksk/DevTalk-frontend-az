// Shared TypeScript interfaces matching backend DTOs

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  topicCount: number;
  commentCount: number;
}

export interface ForumTopic {
  id: number;
  title: string;
  body: string;
  category: string;
  authorId: number;
  authorUsername: string;
  createdAt: string;
  viewCount: number;
  commentCount: number;
}

export interface Comment {
  id: number;
  body: string;
  authorId: number;
  authorUsername: string;
  topicId: number;
  createdAt: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  body: string;
  category: string;
  authorName: string;
  publishedAt: string;
  viewCount: number;
}

// Auth context shape
export interface AuthUser {
  id: number;
  username: string;
  email: string;
  role: string;
}
