import { UserRegisterWriteContextType } from '@/types';
import { createContext, useContext } from 'react';

export const UserRegisterWriteContext = createContext<UserRegisterWriteContextType | null>(null);

export const useUserRegisterWriteContext = () => {
  const context = useContext(UserRegisterWriteContext);
  if (!context) return null;
  return context;
};
