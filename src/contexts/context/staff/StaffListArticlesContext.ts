import { StaffListArticleContextType } from '@/types';
import { createContext, useContext } from 'react';

export const StaffListArticlesContext = createContext<StaffListArticleContextType | null>(null);

export const useStaffListArticles = () => {
  const context = useContext(StaffListArticlesContext);
  if (!context) return null;
  return context;
};
