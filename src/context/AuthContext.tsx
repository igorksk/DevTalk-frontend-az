import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { AuthUser } from '../types';

interface AuthContextValue {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

// Create context with a sensible default
const AuthContext = createContext<AuthContextValue>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
});

// Key used for sessionStorage persistence
const SESSION_KEY = 'devtalk_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  // Restore user from sessionStorage so they stay logged in on refresh
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      return stored ? (JSON.parse(stored) as AuthUser) : null;
    } catch {
      return null;
    }
  });

  const login = (authUser: AuthUser) => {
    setUser(authUser);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(authUser));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: user !== null }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for consuming auth context
export function useAuth() {
  return useContext(AuthContext);
}
