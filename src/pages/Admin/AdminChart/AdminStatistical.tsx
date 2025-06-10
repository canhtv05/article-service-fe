import PieChart from '@/components/PieChart';
import Statistical from '@/components/Statistical';
import { ChartConfig } from '@/components/ui/chart';
import { chartData } from '@/constant';
import { StatisticalItemType } from '@/types';
import { httpRequest } from '@/utils/httpRequest';
import { useQuery } from '@tanstack/react-query';
import { Archive, CircleCheck, FileUp, Send } from 'lucide-react';

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Chrome',
    color: 'hsl(var(--chart-1))',
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))',
  },
  firefox: {
    label: 'Firefox',
    color: 'hsl(var(--chart-3))',
  },
  edge: {
    label: 'Edge',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

const AdminStatistical = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['/statistics/articles'],
    queryFn: async () => {
      const response = await httpRequest.get('/statistics/articles');
      return response.data.data;
    },
  });

  if (isLoading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi khi tải dữ liệu</p>;

  const statistical: StatisticalItemType = {
    label: 'Thống kê bài viết',
    type: 'articles',
    children: [
      {
        label: 'Đã phê duyệt',
        icon: CircleCheck,
        classText: 'text-green-600',
        count: data?.approvedCount ?? 0,
      },
      {
        label: 'Đã gửi',
        icon: Send,
        classText: 'text-yellow-600',
        count: data?.sendToPRCount ?? 0,
      },
      {
        label: 'Đã đăng',
        icon: Archive,
        classText: 'text-blue-600',
        count: data?.publishedCount ?? 0,
      },
      {
        label: 'Không đăng',
        icon: FileUp,
        classText: 'text-red-600',
        count: data?.inactiveCount ?? 0,
      },
    ],
  };

  return (
    <>
      <Statistical statistical={statistical} />
      <div className="rounded-xl md:min-h-min flex-1 border">
        <PieChart chartData={chartData(statistical)} chartConfig={chartConfig} />
      </div>
    </>
  );
};

export default AdminStatistical;
