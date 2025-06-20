import TabsUnderlined from '../TabCustom';
import UserArticle from './UserArticle';

const tabs = [
  {
    name: 'Tất cả',
    value: 'Tất cả',
    content: UserArticle,
  },
  // {
  //   name: 'Bản nháp',
  //   value: 'Bản nháp',
  //   content: UserTabInfo,
  // },
  {
    name: 'Chờ phê duyệt',
    value: 'Chờ phê duyệt',
    content: UserArticle,
    status: 'Pending',
  },
  // {
  //   name: 'Gửi lại chờ phê duyệt',
  //   value: 'Gửi lại chờ phê duyệt',
  //   content: UserTabInfo,
  // },
  {
    name: 'Đã phê duyệt',
    value: 'Đã phê duyệt',
    content: UserArticle,
    status: 'Approved',
  },

  {
    name: 'Bị từ chối',
    value: 'Bị từ chối',
    content: UserArticle,
    status: 'Inactive',
  },
  // {
  //   name: 'Không đăng',
  //   value: 'Không đăng',
  //   content: UserTabInfo,
  // },
  {
    name: 'Đã đăng',
    value: 'Đã đăng',
    content: UserArticle,
    status: 'Published',
  },
  {
    name: 'Đã gửi phòng PR',
    value: 'Đã gửi phòng PR',
    content: UserArticle,
    status: 'SendToPR',
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
