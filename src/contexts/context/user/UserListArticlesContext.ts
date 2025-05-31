import { UserListArticlesContextType } from '@/types';
import { createContext, useContext } from 'react';

export const UserListArticlesContext = createContext<UserListArticlesContextType | null>(null);

export const useUserListArticlesContext = () => {
  const context = useContext(UserListArticlesContext);
  if (!context) return null;
  return context;
};
