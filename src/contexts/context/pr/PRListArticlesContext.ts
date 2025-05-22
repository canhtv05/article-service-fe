import { PRListArticlesContextType } from '@/types';
import { createContext, useContext } from 'react';

export const PRListArticlesContext = createContext<PRListArticlesContextType | null>(null);

export const usePRListArticles = () => {
  const context = useContext(PRListArticlesContext);
  if (!context) return;
  return context;
};
