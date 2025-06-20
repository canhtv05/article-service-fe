import images from '@/assets/imgs';
import Image from '@/components/Image';
import TabsUnderlined from '@/components/TabCustom';
import UserTabInfo from '@/components/user/UserTabInfo';
import UserTabMyArticles from '@/components/user/UserTabMyArticles';
import { useAuthStore } from '@/zustand/authStore';

const UserMyArticles = () => {
  const user = useAuthStore((s) => s.user);
  return (
    <>
      <div className="relative">
        <img src={images.admin} alt="admin" className="object-cover w-full h-[300px] block" />
        <Image
          src={user?.profilePicture}
          alt={user?.fullName}
          className="absolute size-50 sm:left-10 left-5 lg:-bottom-35 md:-bottom-30 sm:-bottom-25 -bottom-20 rounded-full"
        />
      </div>

      <div className="w-full lg:mt-[200px] md:mt-[180px] sm:mt-[150px] mt-[100px]">
        <TabsUnderlined
          tabs={[
            {
              name: 'Thông tin',
              value: 'Thông tin',
              content: UserTabInfo,
            },
            {
              name: 'Danh sách bài viết',
              value: 'Danh sách bài viết',
              content: UserTabMyArticles,
            },
          ]}
        />
      </div>
    </>
  );
};

export default UserMyArticles;
