import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../../features/auth/services/authService';
import { useQueryClient } from '@tanstack/react-query';

const AuthContext = createContext();

export const SupabaseAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    const initializeAuth = async () => {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };

    initializeAuth();

    const { data: authListener } = authService.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      queryClient.invalidateQueries('user');
    });

    return () => {
      if (authListener && typeof authListener.unsubscribe === 'function') {
        authListener.unsubscribe();
      }
    };
  }, [queryClient]);

  const value = {
    user,
    loading,
    signIn: authService.signIn,
    signUp: authService.signUp,
    signOut: authService.signOut,
    getUserProfile: authService.getUserProfile,
    updateUserProfile: authService.updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useSupabaseAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useSupabaseAuth must be used within a SupabaseAuthProvider');
  }
  return context;
};