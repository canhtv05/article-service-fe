import { createContext, useContext } from 'react';
import { TopicContextType } from '@/types';

export const PRTopicManagementContext = createContext<TopicContextType | null>(null);

export const usePRTopicManagement = () => {
  const context = useContext(PRTopicManagementContext);
  if (!context) {
    return null;
  }
  return context;
};
