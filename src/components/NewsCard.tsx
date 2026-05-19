import { Link } from 'react-router-dom';
import type { NewsArticle } from '../types';
import styles from './NewsCard.module.css';

interface Props {
  article: NewsArticle;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function NewsCard({ article }: Props) {
  return (
    <article className={styles.card}>
      <div className={styles.meta}>
        <span className={styles.category}>{article.category}</span>
        <span className={styles.date}>{formatDate(article.publishedAt)}</span>
      </div>
      <h3 className={styles.title}>
        <Link to={`/news/${article.id}`}>{article.title}</Link>
      </h3>
      <p className={styles.summary}>{article.summary}</p>
      <div className={styles.footer}>
        <span className={styles.author}>{article.authorName}</span>
        <span className={styles.views}>👁 {article.viewCount}</span>
      </div>
    </article>
  );
}
