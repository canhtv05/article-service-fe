import { AddUserToCampaignType } from '@/types';
import AddUserToCampaignWithPagination from './AddUserToCampaignWithPagination';
import { useState } from 'react';

const AddUserToCampaign = () => {
  const [selectedRows, setSelectedRows] = useState<Record<string, string>>({});

  const handleSelectAll = (checked: boolean, currentPageData: AddUserToCampaignType[]) => {
    if (checked) {
      const newSelected: Record<string, string> = {};
      currentPageData.forEach((item, index) => {
        newSelected[index.toString()] = item.id;
      });
      setSelectedRows((prev) => ({ ...prev, ...newSelected }));
    } else {
      setSelectedRows({});
    }
  };

  const handleSelectRow = (user: AddUserToCampaignType, index: number, checked: boolean) => {
    setSelectedRows((prev) => {
      const newSelected = { ...prev };
      if (checked) {
        newSelected[index.toString()] = user.id;
      } else {
        delete newSelected[index.toString()];
      }
      return newSelected;
    });
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl shadow-md text-foreground h-full">
      <AddUserToCampaignWithPagination
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        handleSelectAll={handleSelectAll}
        handleSelectRow={handleSelectRow}
      />
    </div>
  );
};

export default AddUserToCampaign;
