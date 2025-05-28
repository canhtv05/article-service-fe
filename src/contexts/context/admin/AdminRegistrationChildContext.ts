import { AdminRegistrationChildContextType } from '@/types';
import { createContext, useContext } from 'react';

export const AdminRegistrationChildContext = createContext<AdminRegistrationChildContextType | null>(null);

export const useAdminRegistrationDetail = () => {
  const context = useContext(AdminRegistrationChildContext);
  if (!context) return null;
  return context;
};
