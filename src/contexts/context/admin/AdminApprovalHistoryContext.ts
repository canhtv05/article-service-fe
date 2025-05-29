import { AdminApprovalHistoryContextType } from '@/types';
import { createContext, useContext } from 'react';

export const AdminApprovalHistoryContext = createContext<AdminApprovalHistoryContextType | null>(null);

export const useAdminApprovalHistoryContext = () => {
  const context = useContext(AdminApprovalHistoryContext);
  if (!context) return null;
  return context;
};
