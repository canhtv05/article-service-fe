import Statistical from '@/components/Statistical';
import { listStatistical } from '@/constant';
import { StatisticalItemType } from '@/types';

const AdminChart = () => {
  const statistical = listStatistical.find((sta) => location.pathname.includes(sta.type)) as StatisticalItemType;

  return (
    <div className="flex flex-col gap-4 pt-0 h-full">
      <Statistical statistical={statistical} />
      <div className="rounded-xl md:min-h-min flex-1 border" />
    </div>
  );
};

export default AdminChart;
