import { useContext } from 'react';
import DataFilters from '../DataFilters';
import { PRTopicManagementContext } from '@/contexts/context/pr/PRTopicManagementContext';
import PRFilterTopicComponent from './PRFilterTopicComponent';

const PRFilterTopicProvider = () => {
  const topics = useContext(PRTopicManagementContext);

  return (
    <DataFilters
      onClear={topics?.handleClearFields}
      onSearch={topics?.handleFilters}
      filterComponent={<PRFilterTopicComponent />}
    />
  );
};

export default PRFilterTopicProvider;
