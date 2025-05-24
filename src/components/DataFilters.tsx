import { ReactNode } from 'react';
import { Funnel, RefreshCw, Search } from 'lucide-react';

import { Button } from './ui/button';

const DataFilters = ({
  filterComponent,
  onSearch,
  onClear,
  gridCols = 3,
}: {
  filterComponent: ReactNode;
  onSearch?: VoidFunction;
  onClear?: VoidFunction;
  gridCols?: 3 | 2;
}) => {
  const grid = gridCols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2';

  return (
    <div className="flex flex-col gap-4 rounded-xl shadow-sm p-5 text-foreground border">
      <div className="flex gap-3 items-center">
        <Funnel />
        <span className="text-foreground text-[18px]">Bộ lọc</span>
      </div>

      <div className={`grid grid-cols-1 ${grid} gap-4 mt-2 w-full`}>{filterComponent}</div>

      <div className="flex justify-center items-center gap-4 mt-4">
        <Button customize="default" className="!py-5 px-6 flex gap-2 rounded-full" onClick={() => onSearch?.()}>
          <Search />
          <span>Tìm kiếm</span>
        </Button>
        <Button customize="default" className="!py-5 px-6 flex gap-2 rounded-full" onClick={() => onClear?.()}>
          <RefreshCw />
          <span>Làm mới</span>
        </Button>
      </div>
    </div>
  );
};

export default DataFilters;
