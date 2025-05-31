const items = [
  {
    label: 'Tổng số lượng bài đã viết',
    value: 1,
  },
  {
    label: 'Tổng số lượng bài viết bị từ chối',
    value: 0,
  },
  {
    label: 'Tổng số lượng bài viết đã đăng',
    value: 1,
  },
  {
    label: 'Tổng số lượng bài viết đã gửi',
    value: 13,
  },
  {
    label: 'Tổng số lượng bài viết không đăng',
    value: 24,
  },
  {
    label: 'Tổng số lượng bài viết đã phê duyệt',
    value: 1,
  },
];

const UserListStatistics = () => {
  return items.map((item, index) => (
    <div key={index} className="flex justify-between my-2">
      <span className="text-sm text-left">{item.label}</span>
      <span className="text-sm text-right">{item.value}</span>
    </div>
  ));
};

export default UserListStatistics;
