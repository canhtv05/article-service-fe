import { LoaderCircle } from 'lucide-react';

const LoadingTable = () => {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/60 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-2">
        <LoaderCircle className="h-8 w-8 animate-spin text-foreground" />
        <span className="text-sm text-muted-foreground">Đang tải...</span>
      </div>
    </div>
  );
};

export default LoadingTable;
