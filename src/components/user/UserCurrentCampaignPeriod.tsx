const items = [
  {
    label: 'Tên đợt viết bài',
    value: 'Đợt 01/10/2005 - 30/10/2005',
  },
  {
    label: 'Thời gian bắt đầu',
    value: '01/10/2005',
  },
  {
    label: 'Thời gian kết thúc',
    value: '30/10/2005',
  },
  {
    label: 'Số lượng bài phải viết',
    value: 13,
  },
  {
    label: 'Số lượng bài đã viết',
    value: 1,
  },
];

const UserCurrentCampaignPeriod = () => {
  return items.map((item, index) => (
    <div key={index} className="flex justify-between my-2">
      <span className="text-sm text-left">{item.label}</span>
      <span className="text-sm text-right">{item.value}</span>
    </div>
  ));
};

export default UserCurrentCampaignPeriod;
