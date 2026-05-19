import type { Comment } from '../types';
import styles from './CommentItem.module.css';

interface Props {
  comment: Comment;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('uk-UA', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function CommentItem({ comment }: Props) {
  return (
    <div className={styles.comment}>
      <div className={styles.header}>
        <span className={styles.author}>{comment.authorUsername}</span>
        <span className={styles.date}>{formatDate(comment.createdAt)}</span>
      </div>
      <p className={styles.body}>{comment.body}</p>
    </div>
  );
}
