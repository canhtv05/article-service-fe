import { AdminArchiveContextType } from '@/types';
import { createContext, useContext } from 'react';

export const AdminArchiveContext = createContext<AdminArchiveContextType | null>(null);

export const useAdminArchiveContext = () => {
  const context = useContext(AdminArchiveContext);
  if (!context) return null;
  return context;
};
