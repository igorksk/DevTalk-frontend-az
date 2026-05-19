import { Link } from 'react-router-dom';
import type { ForumTopic } from '../types';
import styles from './TopicCard.module.css';

interface Props {
  topic: ForumTopic;
}

// Formats a UTC date string to a readable local format
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function TopicCard({ topic }: Props) {
  return (
    <article className={styles.card}>
      <div className={styles.meta}>
        <span className={styles.category}>{topic.category}</span>
        <span className={styles.date}>{formatDate(topic.createdAt)}</span>
      </div>
      <h3 className={styles.title}>
        <Link to={`/forum/${topic.id}`}>{topic.title}</Link>
      </h3>
      <p className={styles.excerpt}>{topic.body.slice(0, 140)}{topic.body.length > 140 ? '…' : ''}</p>
      <div className={styles.footer}>
        <span className={styles.author}>by {topic.authorUsername}</span>
        <div className={styles.stats}>
          <span>👁 {topic.viewCount}</span>
          <span>💬 {topic.commentCount}</span>
        </div>
      </div>
    </article>
  );
}
