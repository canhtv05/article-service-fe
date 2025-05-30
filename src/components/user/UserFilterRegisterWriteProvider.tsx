import { useContext } from 'react';
import DataFilters from '../DataFilters';
import { StaffListArticlesContext } from '@/contexts/context/staff/StaffListArticlesContext';
import UserFilterRegisterWriteComponent from './UserFilterRegisterWriteComponent';

const UserFilterRegisterWriteProvider = () => {
  const articles = useContext(StaffListArticlesContext);

  return (
    <DataFilters
      onClear={articles?.handleClearFields}
      onSearch={articles?.handleFilters}
      filterComponent={<UserFilterRegisterWriteComponent />}
      gridCols={3}
    />
  );
};

export default UserFilterRegisterWriteProvider;
