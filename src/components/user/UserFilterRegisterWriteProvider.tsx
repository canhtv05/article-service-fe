import DataFilters from '../DataFilters';
import UserFilterRegisterWriteComponent from './UserFilterRegisterWriteComponent';
import { useUserRegisterWriteContext } from '@/contexts/context/user/UserRegisterWriteContext';

const UserFilterRegisterWriteProvider = () => {
  const context = useUserRegisterWriteContext();

  return (
    <DataFilters
      onClear={context?.handleClearFields}
      onSearch={context?.handleFilters}
      filterComponent={<UserFilterRegisterWriteComponent />}
      gridCols={2}
    />
  );
};

export default UserFilterRegisterWriteProvider;
