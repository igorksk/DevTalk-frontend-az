import { useEffect, useState } from 'react';
import { getNews } from '../api/news';
import NewsCard from '../components/NewsCard';
import type { NewsArticle } from '../types';
import styles from './NewsPage.module.css';

const CATEGORIES = ['All', 'Career', '.NET', 'Frontend', 'Gamedev', 'Ukraine IT'];

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cat = activeCategory === 'All' ? undefined : activeCategory;
    setLoading(true);
    getNews(cat)
      .then(setArticles)
      .finally(() => setLoading(false));
  }, [activeCategory]);

  return (
    <div className={styles.page}>
      <h1>News</h1>

      {/* Category filter */}
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

      {loading ? (
        <div className={styles.loading}>Loading…</div>
      ) : (
        <div className={styles.grid}>
          {articles.map(a => <NewsCard key={a.id} article={a} />)}
        </div>
      )}
    </div>
  );
}
