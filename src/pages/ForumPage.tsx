import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTopics, createTopic } from '../api/topics';
import TopicCard from '../components/TopicCard';
import { useAuth } from '../context/AuthContext';
import type { ForumTopic } from '../types';
import styles from './ForumPage.module.css';

const CATEGORIES = ['All', 'General', '.NET', 'Frontend', 'Career', 'Gamedev'];

export default function ForumPage() {
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [filtered, setFiltered] = useState<ForumTopic[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // New topic form state
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [newCategory, setNewCategory] = useState('.NET');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getTopics()
      .then(data => {
        setTopics(data);
        setFiltered(data);
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter topics when category changes
  useEffect(() => {
    if (activeCategory === 'All') {
      setFiltered(topics);
    } else {
      setFiltered(topics.filter(t => t.category === activeCategory));
    }
  }, [activeCategory, topics]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setError('');
    setSubmitting(true);
    try {
      const created = await createTopic(newTitle, newBody, newCategory, user.id);
      setTopics(prev => [created, ...prev]);
      setShowForm(false);
      setNewTitle('');
      setNewBody('');
      navigate(`/forum/${created.id}`);
    } catch {
      setError('Failed to create topic. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className={styles.loading}>Loading topics…</div>;

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1>Forum</h1>
        {isLoggedIn && (
          <button className={styles.newTopicBtn} onClick={() => setShowForm(s => !s)}>
            {showForm ? 'Cancel' : '+ New Topic'}
          </button>
        )}
      </div>

      {/* New topic form */}
      {showForm && (
        <form className={styles.newTopicForm} onSubmit={handleCreate}>
          <h3>Create New Topic</h3>
          {error && <p className={styles.error}>{error}</p>}
          <input
            className={styles.input}
            placeholder="Title"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            required
            maxLength={200}
          />
          <textarea
            className={styles.textarea}
            placeholder="What's on your mind?"
            value={newBody}
            onChange={e => setNewBody(e.target.value)}
            required
            rows={5}
          />
          <select
            className={styles.select}
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
          >
            {CATEGORIES.filter(c => c !== 'All').map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button className={styles.submitBtn} type="submit" disabled={submitting}>
            {submitting ? 'Posting…' : 'Post Topic'}
          </button>
        </form>
      )}

      {/* Category filter tabs */}
      <div className={styles.categoryTabs}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`${styles.tabBtn} ${activeCategory === cat ? styles.tabActive : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Topics list */}
      <div className={styles.list}>
        {filtered.length === 0 ? (
          <p className={styles.empty}>No topics in this category yet.</p>
        ) : (
          filtered.map(t => <TopicCard key={t.id} topic={t} />)
        )}
      </div>
    </div>
  );
}
