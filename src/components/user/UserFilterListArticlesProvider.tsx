import DataFilters from '../DataFilters';
import UserFilterListArticleComponent from './UserFilterListArticleComponent';
import { useUserListArticlesContext } from '@/contexts/context/user/UserListArticlesContext';

const UserFilterListArticlesProvider = () => {
  const context = useUserListArticlesContext();

  return (
    <DataFilters
      onClear={context?.handleClearFields}
      onSearch={context?.handleFilters}
      filterComponent={<UserFilterListArticleComponent />}
      gridCols={3}
    />
  );
};

export default UserFilterListArticlesProvider;
