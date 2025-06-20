import { formatDateTime } from '@/lib/utils';
import { httpRequest } from '@/utils/httpRequest';
import { useQuery } from '@tanstack/react-query';

const UserCurrentCampaignPeriod = () => {
  const { data } = useQuery({
    queryKey: ['statistic'],
    queryFn: async () => {
      const res = await httpRequest.get('/admin/bai-viet/thong-tin-cac-dot-va-bai-viet');
      return res.data;
    },
  });
  const res = data?.campaigns[0];

  const items = [
    {
      label: 'Tên đợt viết bài',
      value: res?.nameCampaign ?? '',
    },
    {
      label: 'Thời gian bắt đầu',
      value: res ? formatDateTime(res.startDate, 'dd/MM/yyyy') : '',
    },
    {
      label: 'Thời gian kết thúc',
      value: res ? formatDateTime(res.endDate, 'dd/MM/yyyy') : '',
    },
    {
      label: 'Số lượng bài phải viết',
      value: res?.assignedArticleCount ?? 0,
    },
    {
      label: 'Số lượng bài đã viết',
      value: res?.pendingCount ?? 0,
    },
  ];

  return items.map((item, index) => (
    <div key={index} className="flex justify-between my-2">
      <span className="text-sm text-left">{item.label}</span>
      <span className="text-sm text-right">{item.value}</span>
    </div>
  ));
};

export default UserCurrentCampaignPeriod;
