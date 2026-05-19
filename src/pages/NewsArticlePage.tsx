import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNewsById } from '../api/news';
import type { NewsArticle } from '../types';
import styles from './NewsArticlePage.module.css';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default function NewsArticlePage() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    getNewsById(Number(id))
      .then(setArticle)
      .catch(() => setError('Article not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className={styles.loading}>Loading…</div>;
  if (error || !article) return <div className={styles.error}>{error || 'Article not found.'}</div>;

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link to="/news">News</Link> / <span>{article.category}</span>
      </nav>

      <article className={styles.article}>
        <div className={styles.meta}>
          <span className={styles.category}>{article.category}</span>
          <span className={styles.date}>{formatDate(article.publishedAt)}</span>
        </div>
        <h1 className={styles.title}>{article.title}</h1>
        <div className={styles.authorLine}>
          by <strong>{article.authorName}</strong>
          <span className={styles.views}> · 👁 {article.viewCount} views</span>
        </div>
        <p className={styles.summary}>{article.summary}</p>
        <div className={styles.body}>{article.body}</div>
      </article>

      <Link to="/news" className={styles.backLink}>← Back to News</Link>
    </div>
  );
}
