import { AdminRegistrationPeriodContextType } from '@/types';
import { createContext, useContext } from 'react';

export const AdminRegistrationPeriodContext = createContext<AdminRegistrationPeriodContextType | null>(null);

export const useAdminRegistrationPeriod = () => {
  const context = useContext(AdminRegistrationPeriodContext);
  if (!context) return null;
  return context;
};
