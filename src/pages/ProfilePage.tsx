import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserById } from '../api/users';
import { useAuth } from '../context/AuthContext';
import type { User } from '../types';
import styles from './ProfilePage.module.css';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default function ProfilePage() {
  const { user: authUser, isLoggedIn, logout } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoggedIn || !authUser) {
      navigate('/login');
      return;
    }
    getUserById(authUser.id)
      .then(setProfile)
      .finally(() => setLoading(false));
  }, [isLoggedIn, authUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) return <div className={styles.loading}>Loading profile…</div>;
  if (!profile) return null;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Avatar placeholder */}
        <div className={styles.avatar}>
          {profile.username.charAt(0).toUpperCase()}
        </div>

        <h1 className={styles.username}>{profile.username}</h1>
        <span className={styles.role}>{profile.role}</span>

        <dl className={styles.details}>
          <dt>Email</dt>
          <dd>{profile.email}</dd>

          <dt>Member since</dt>
          <dd>{formatDate(profile.createdAt)}</dd>

          <dt>Topics created</dt>
          <dd>{profile.topicCount}</dd>

          <dt>Comments posted</dt>
          <dd>{profile.commentCount}</dd>
        </dl>

        <div className={styles.actions}>
          <Link to="/forum" className={styles.forumBtn}>Browse Forum</Link>
          <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
        </div>
      </div>
    </div>
  );
}
