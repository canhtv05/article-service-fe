import { LoaderCircle } from 'lucide-react';

const LoadingTable = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <LoaderCircle className="h-8 w-8 animate-spin text-foreground" />
      <span className="text-sm text-muted-foreground">Đang tải dữ liệu...</span>
    </div>
  );
};

export default LoadingTable;
