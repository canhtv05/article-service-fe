import PieChart from '@/components/PieChart';
import Statistical from '@/components/Statistical';
import { chartData } from '@/constant';
import { StatisticalItemType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { httpRequest } from '@/utils/httpRequest';
import { useCallback, useEffect, useState } from 'react';
import { Archive, CircleCheck, Send } from 'lucide-react';
import { ChartConfig } from '@/components/ui/chart';

interface DataSelect {
  id: string;
  name: string;
}

interface StatisticalResponse {
  sendToPRCount: number;
  publishedCount: number;
  inactiveCount: number;
}

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Chrome',
    color: 'hsl(var(--chart-2))',
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-1))',
  },
  edge: {
    label: 'Edge',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

const PRChart = () => {
  const { data, error, isLoading } = useQuery<DataSelect[]>({
    queryKey: ['list-statistics'],
    queryFn: async () => {
      const res = await httpRequest.get('/dot-bai-viet/danh-sach-dot-bai-viet');
      return res.data;
    },
    initialData: [],
  });

  const mappedOptions = useCallback(
    () =>
      data?.map((item) => ({
        value: item.id,
        label: item.name,
      })) ?? [],
    [data],
  );

  const [selected, setSelected] = useState<string>('');

  useEffect(() => {
    const options = mappedOptions();
    if (options.length > 0 && !selected) {
      setSelected(options[0].value);
    }
  }, [mappedOptions, selected]);

  const { data: statistic } = useQuery<StatisticalResponse>({
    queryKey: ['statistic-detail', selected],
    queryFn: async () => {
      const res = await httpRequest.get(`/admin/bai-viet/count-by-status/${selected}`);
      return res.data;
    },
    enabled: !!selected,
  });

  if (isLoading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi khi tải dữ liệu</p>;

  const statistical: StatisticalItemType = {
    label: 'Thống kê bài viết',
    type: 'articles',
    children: [
      {
        label: 'Số bài viết đã gửi cho PR',
        count: statistic?.sendToPRCount ?? 0,
        icon: Send,
        classText: 'text-yellow-500',
      },
      {
        label: 'Số bài viết đã đăng',
        count: statistic?.publishedCount ?? 0,
        icon: CircleCheck,
        classText: 'text-green-500',
      },
      {
        label: 'Số bài viết không đăng',
        count: statistic?.inactiveCount ?? 0,
        icon: Archive,
        classText: 'text-red-500',
      },
    ],
  };

  return (
    <div className="flex flex-col gap-4 pt-0 h-full">
      <Statistical statistical={statistical} />
      <div className="rounded-xl md:min-h-min flex-1 border">
        <PieChart
          chartData={chartData(statistical)}
          select
          data={mappedOptions()}
          selected={selected}
          chartConfig={chartConfig}
          setSelected={setSelected}
        />
      </div>
    </div>
  );
};

export default PRChart;
