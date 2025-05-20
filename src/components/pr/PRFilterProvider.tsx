import { useContext } from 'react';
import DataFilters from '../DataFilters';
import { PRTopicManagementContext } from '@/contexts/context/pr/PRTopicManagementContext';
import PRFilterComponent from './PRFilterComponent';

const PRFilterProvider = () => {
  const topics = useContext(PRTopicManagementContext);

  return (
    <DataFilters
      onClear={topics?.handleClearFields}
      onSearch={topics?.handleFilters}
      filterComponent={<PRFilterComponent />}
    />
  );
};

export default PRFilterProvider;
