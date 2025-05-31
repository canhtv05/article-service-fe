import TabsUnderlined from '../TabCustom';
import UserTabInfo from './UserTabInfo';

const tabs = [
  {
    name: 'Tất cả',
    value: 'Tất cả',
    content: UserTabInfo,
  },
  {
    name: 'Bản nháp',
    value: 'Bản nháp',
    content: UserTabInfo,
  },
  {
    name: 'Chờ phê duyệt',
    value: 'Chờ phê duyệt',
    content: UserTabInfo,
  },
  {
    name: 'Gửi lại chờ phê duyệt',
    value: 'Gửi lại chờ phê duyệt',
    content: UserTabInfo,
  },
  {
    name: 'Đã phê duyệt',
    value: 'Đã phê duyệt',
    content: UserTabInfo,
  },

  {
    name: 'Bị từ chối',
    value: 'Bị từ chối',
    content: UserTabInfo,
  },
  {
    name: 'Không đăng',
    value: 'Không đăng',
    content: UserTabInfo,
  },
  {
    name: 'Đã đăng',
    value: 'Đã đăng',
    content: UserTabInfo,
  },
  {
    name: 'Đã gửi phòng PR',
    value: 'Đã gửi phòng PR',
    content: UserTabInfo,
  },
];

const UserTabMyArticles = () => {
  return (
    <div className="p-2">
      <TabsUnderlined type="full" tabs={tabs} />
    </div>
  );
};

export default UserTabMyArticles;
