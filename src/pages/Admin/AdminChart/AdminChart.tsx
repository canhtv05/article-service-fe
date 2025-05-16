import Statistical from '@/components/Statistical';

const AdminChart = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Statistical />
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
};

export default AdminChart;
