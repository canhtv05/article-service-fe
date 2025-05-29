import { AdminApproveArticleContextType } from '@/types';
import { createContext, useContext } from 'react';

export const AdminApproveArticleContext = createContext<AdminApproveArticleContextType | null>(null);

export const useAdminApproveArticleContext = () => {
  const context = useContext(AdminApproveArticleContext);
  if (!context) return null;
  return context;
};
