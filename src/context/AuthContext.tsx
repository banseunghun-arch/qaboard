import React, { createContext, useState } from 'react';
import type { User } from '../types/models';

interface AuthContextType {
  user: User | null;
  role: 'member' | 'admin' | null;
  loading: boolean;
  login: (role: 'member' | 'admin') => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('qanow_user');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        localStorage.removeItem('qanow_user');
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(false);

  const mockUsers: Record<string, User> = {
    member: {
      id: 'user-1',
      email: 'member@example.com',
      name: '김회원',
      role: 'member',
      created_at: new Date('2025-01-01'),
    },
    admin: {
      id: 'user-2',
      email: 'admin@example.com',
      name: '관리자',
      role: 'admin',
      created_at: new Date('2025-01-01'),
    },
  };

  const login = (role: 'member' | 'admin') => {
    setLoading(true);
    setTimeout(() => {
      const selectedUser = mockUsers[role];
      setUser(selectedUser);
      localStorage.setItem('qanow_user', JSON.stringify(selectedUser));
      setLoading(false);
    }, 500);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('qanow_user');
  };

  const value: AuthContextType = {
    user,
    role: user?.role || null,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
