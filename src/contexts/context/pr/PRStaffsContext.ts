import { PRStaffsContextType } from '@/types';
import { createContext, useContext } from 'react';

export const PRStaffsContext = createContext<PRStaffsContextType | null>(null);

export const usePRStaffs = () => {
  const context = useContext(PRStaffsContext);
  if (!context) return null;
  return context;
};
