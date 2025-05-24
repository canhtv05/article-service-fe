import { List } from 'lucide-react';

import PRStaffsTable from './PRStaffsTable';
import useViewport from '@/hooks/useViewport';
import { useIsMobile } from '@/hooks';

const PRListStaffs = () => {
  const { width } = useViewport();
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col gap-4 rounded-xl shadow-md p-5 text-foreground h-full">
      <div className="flex gap-3 items-center justify-between mb-10">
        <div className="flex gap-3 items-center">
          <List />
          <span className="text-foreground text-[18px]">Danh sách nhân viên</span>
        </div>
      </div>
      <div
        style={{
          width: isMobile ? '100%' : width - 340,
        }}
      >
        <PRStaffsTable />
      </div>
    </div>
  );
};

export default PRListStaffs;
