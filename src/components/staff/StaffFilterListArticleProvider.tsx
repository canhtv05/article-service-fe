import { useContext } from 'react';
import DataFilters from '../DataFilters';
import { StaffListArticlesContext } from '@/contexts/context/staff/StaffListArticlesContext';
import StaffFilterListArticleComponent from './StaffFilterListArticleComponent';

const StaffFilterListArticleProvider = () => {
  const articles = useContext(StaffListArticlesContext);

  return (
    <DataFilters
      onClear={articles?.handleClearFields}
      onSearch={articles?.handleFilters}
      filterComponent={<StaffFilterListArticleComponent />}
      gridCols={4}
    />
  );
};

export default StaffFilterListArticleProvider;
