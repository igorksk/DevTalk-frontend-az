import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTopics } from '../api/topics';
import { getNews } from '../api/news';
import TopicCard from '../components/TopicCard';
import NewsCard from '../components/NewsCard';
import type { ForumTopic, NewsArticle } from '../types';
import styles from './HomePage.module.css';

export default function HomePage() {
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getTopics(), getNews()])
      .then(([t, n]) => {
        setTopics(t.slice(0, 5)); // show 5 latest topics
        setNews(n.slice(0, 4));   // show 4 latest news
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className={styles.loading}>Loading…</div>;

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <h1>Welcome to DevTalk UA</h1>
        <p>Ukrainian IT community — discuss tech, share news, find opportunities.</p>
      </section>

      <div className={styles.columns}>
        {/* Forum topics column */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Latest Topics</h2>
            <Link to="/forum" className={styles.seeAll}>See all →</Link>
          </div>
          <div className={styles.list}>
            {topics.map(t => <TopicCard key={t.id} topic={t} />)}
          </div>
        </section>

        {/* News column */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Latest News</h2>
            <Link to="/news" className={styles.seeAll}>See all →</Link>
          </div>
          <div className={styles.list}>
            {news.map(a => <NewsCard key={a.id} article={a} />)}
          </div>
        </section>
      </div>
    </div>
  );
}
