import { httpRequest } from '@/utils/httpRequest';
import { useQuery } from '@tanstack/react-query';

const UserListStatistics = () => {
  const { data } = useQuery({
    queryKey: ['statistic'],
    queryFn: async () => {
      const res = await httpRequest.get('/admin/bai-viet/thong-tin-cac-dot-va-bai-viet');
      return res.data;
    },
  });

  const items = [
    {
      label: 'Tổng số lượng bài viết bị từ chối',
      value: data?.inactiveCount || 0,
    },
    {
      label: 'Tổng số lượng bài viết đã đăng',
      value: data?.publishedCount || 0,
    },
    {
      label: 'Tổng số lượng bài viết đã gửi',
      value: data?.sendToPrCount || 0,
    },
    {
      label: 'Tổng số lượng bài viết đang chờ duyệt',
      value: data?.pendingCount || 0,
    },
    {
      label: 'Tổng số lượng bài viết đã phê duyệt',
      value: data?.approvedCount || 0,
    },
  ];

  return items.map((item, index) => (
    <div key={index} className="flex justify-between my-2">
      <span className="text-sm text-left">{item.label}</span>
      <span className="text-sm text-right">{item.value}</span>
    </div>
  ));
};

export default UserListStatistics;
