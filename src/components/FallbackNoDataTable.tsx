import images from '@/assets/imgs';

const FallbackNoDataTable = () => {
  return (
    <div className="flex justify-center items-center w-full h-full flex-col">
      <img src={images.fallbackNoData} className="object-cover block max-w-[10%] max-h-[10%]" alt="fallback img"></img>
      <span className="text-sm text-muted-foreground">Không có dữ liệu</span>
    </div>
  );
};

export default FallbackNoDataTable;
