import { useContext } from 'react';
import DataFilters from '../DataFilters';
import { PRListArticlesContext } from '@/contexts/context/pr/PRListArticlesContext';
import PRFilterArticleComponent from './PRFilterArticleComponent';

const PRFilterArticleProvider = () => {
  const articles = useContext(PRListArticlesContext);

  return (
    <DataFilters
      onClear={articles?.handleClearFields}
      onSearch={articles?.handleFilters}
      filterComponent={<PRFilterArticleComponent />}
    />
  );
};

export default PRFilterArticleProvider;
