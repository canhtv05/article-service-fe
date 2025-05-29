import DataFilters from '../DataFilters';
import AdminFilterApproveArticleComponent from './AdminFilterApproveArticleComponent';
import { useAdminApproveArticleContext } from '@/contexts/context/admin/AdminApproveArticleContext';

const AdminFilterApproveArticleProvider = () => {
  const adminApproveArticle = useAdminApproveArticleContext();

  return (
    <DataFilters
      onClear={adminApproveArticle?.handleClearFields}
      onSearch={adminApproveArticle?.handleFilters}
      filterComponent={<AdminFilterApproveArticleComponent />}
      gridCols={2}
    />
  );
};

export default AdminFilterApproveArticleProvider;
