import { AdminRegistrationDetailContextType } from '@/types';
import { createContext, useContext } from 'react';

export const AdminRegistrationDetailContext = createContext<AdminRegistrationDetailContextType | null>(null);

export const useAdminRegistrationDetail = () => {
  const context = useContext(AdminRegistrationDetailContext);
  if (!context) return null;
  return context;
};
