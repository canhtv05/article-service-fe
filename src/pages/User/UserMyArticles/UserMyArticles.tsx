import images from '@/assets/imgs';
import TabsUnderlined from '@/components/TabCustom';
import { Button } from '@/components/ui/button';
import UserTabInfo from '@/components/user/UserTabInfo';
import UserTabMyArticles from '@/components/user/UserTabMyArticles';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Upload } from 'lucide-react';

const UserMyArticles = () => {
  return (
    <>
      <div className="relative">
        <img src={images.admin} alt="admin" className="object-cover w-full h-[300px] block" />
        <Button customize={'default'} className="absolute right-2 bottom-2">
          <Upload />
          Thay đổi ảnh bìa
        </Button>
        <Avatar className="absolute sm:left-10 left-5 lg:-bottom-35 md:-bottom-30 sm:-bottom-25 -bottom-20 rounded-full">
          <AvatarImage
            className="rounded-full lg:size-[200px] md:size-[180px] sm:size-[150px] size-[100px]"
            src="https://github.com/shadcn.png"
          />
        </Avatar>
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
