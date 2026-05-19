import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTopicById, addComment } from '../api/topics';
import CommentItem from '../components/CommentItem';
import { useAuth } from '../context/AuthContext';
import type { ForumTopic, Comment } from '../types';
import styles from './TopicDetailPage.module.css';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default function TopicDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [topic, setTopic] = useState<(ForumTopic & { comments: Comment[] }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentBody, setCommentBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const { user, isLoggedIn } = useAuth();

  useEffect(() => {
    if (!id) return;
    getTopicById(Number(id))
      .then(setTopic)
      .catch(() => setError('Topic not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !topic) return;
    setSubmitting(true);
    try {
      const newComment = await addComment(topic.id, commentBody, user.id);
      setTopic(prev => prev ? { ...prev, comments: [...prev.comments, newComment] } : prev);
      setCommentBody('');
    } catch {
      setError('Failed to post comment.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className={styles.loading}>Loading…</div>;
  if (error || !topic) return <div className={styles.error}>{error || 'Topic not found.'}</div>;

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link to="/forum">Forum</Link> / <span>{topic.category}</span>
      </nav>

      {/* Topic */}
      <article className={styles.topic}>
        <div className={styles.topicMeta}>
          <span className={styles.category}>{topic.category}</span>
          <span className={styles.date}>{formatDate(topic.createdAt)}</span>
        </div>
        <h1 className={styles.title}>{topic.title}</h1>
        <div className={styles.authorLine}>
          by <strong>{topic.authorUsername}</strong>
          <span className={styles.views}> · 👁 {topic.viewCount} views</span>
        </div>
        <div className={styles.body}>{topic.body}</div>
      </article>

      {/* Comments section */}
      <section className={styles.comments}>
        <h2>{topic.comments.length} Comment{topic.comments.length !== 1 ? 's' : ''}</h2>

        {topic.comments.length === 0 && (
          <p className={styles.noComments}>No comments yet. Be the first!</p>
        )}

        {topic.comments.map(c => <CommentItem key={c.id} comment={c} />)}

        {/* Add comment form */}
        {isLoggedIn ? (
          <form className={styles.commentForm} onSubmit={handleAddComment}>
            <h3>Add a Comment</h3>
            <textarea
              className={styles.textarea}
              placeholder="Share your thoughts…"
              value={commentBody}
              onChange={e => setCommentBody(e.target.value)}
              rows={4}
              required
            />
            <button className={styles.submitBtn} type="submit" disabled={submitting}>
              {submitting ? 'Posting…' : 'Post Comment'}
            </button>
          </form>
        ) : (
          <p className={styles.loginPrompt}>
            <Link to="/login">Log in</Link> to leave a comment.
          </p>
        )}
      </section>
    </div>
  );
}
