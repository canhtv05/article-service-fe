import { useContext } from 'react';

import { PRStaffsContext } from '@/contexts/context/pr/PRStaffsContext';
import DataFilters from '../DataFilters';
import PRFilterAssignArticleComponent from './PRFilterAssignArticleComponent';

const PRFilterAssignArticleProvider = () => {
  const staffs = useContext(PRStaffsContext);

  return (
    <DataFilters
      onClear={staffs?.handleClearFields}
      onSearch={staffs?.handleFilters}
      filterComponent={<PRFilterAssignArticleComponent />}
      gridCols={2}
    />
  );
};

export default PRFilterAssignArticleProvider;
