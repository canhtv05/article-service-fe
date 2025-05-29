import { useAdminApprovalHistoryContext } from '@/contexts/context/admin/AdminApprovalHistoryContext';
import DataFilters from '../DataFilters';
import AdminFilterApprovalHistoryComponent from './AdminFilterApprovalHistoryComponent';

const AdminFilterApprovalHistoryProvider = () => {
  const adminApproveHistory = useAdminApprovalHistoryContext();

  return (
    <DataFilters
      onClear={adminApproveHistory?.handleClearFields}
      onSearch={adminApproveHistory?.handleFilters}
      filterComponent={<AdminFilterApprovalHistoryComponent />}
      gridCols={3}
    />
  );
};

export default AdminFilterApprovalHistoryProvider;
