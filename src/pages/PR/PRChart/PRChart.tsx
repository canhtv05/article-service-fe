import { useLocation } from 'react-router-dom';

import PieChart from '@/components/PieChart';
import Statistical from '@/components/Statistical';
import { chartData, listStatistical } from '@/constant';
import { StatisticalItemType } from '@/types';

const PRChart = () => {
  const location = useLocation();
  const statistical = listStatistical.find((sta) => location.pathname.includes(sta.type)) as StatisticalItemType;

  return (
    <div className="flex flex-col gap-4 p-4 pt-0 h-full">
      <Statistical statistical={statistical} />
      <div className="rounded-xl md:min-h-min flex-1 border">
        <PieChart chartData={chartData(statistical)} />
      </div>
    </div>
  );
};

export default PRChart;
