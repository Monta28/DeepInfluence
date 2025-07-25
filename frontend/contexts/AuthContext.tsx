'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import ApiService, { User } from '../services/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userType?: string;
  }) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await ApiService.getMe();
        if (response.success) {
          setUser(response.data);
        } else {
          localStorage.removeItem('token');
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await ApiService.login(email, password);
      if (response.success) {
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
      } else {
        throw new Error(response.message || 'Erreur de connexion');
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userType?: string;
  }) => {
    try {
      const response = await ApiService.register(userData);
      if (response.success) {
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
      } else {
        throw new Error(response.message || 'Erreur d\'inscription');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      if (user) {
        const response = await ApiService.updateUserProfile(userData);
        if (response.success) {
          setUser({ ...user, ...response.data });
        } else {
          throw new Error(response.message || 'Erreur lors de la mise à jour du profil');
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

