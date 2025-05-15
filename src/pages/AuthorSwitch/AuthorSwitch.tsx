import { Link } from 'react-router-dom';

import images from '@/assets/imgs';
import { Button } from '@/components/ui/button';
import { menusAuthorSwitch } from '@/constant';
import type { MenuAuthorSwitchType } from '@/types';

const AuthorSwitch = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="font-normal text-[18px] sm:text-[28px] text-[#FFB86C]">Thay đổi vai trò quản lý bài viết</h1>
      <div className="flex gap-2">
        <img src={images.fpt} alt="logo-fpt" loading="lazy" className="w-[100px]" />
        <img src={images.udpm} alt="logo-udpm" loading="lazy" className="w-[100px]" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 w-full max-w-[1200px] px-4">
        {menusAuthorSwitch.map((menu: MenuAuthorSwitchType, index: number) => (
          <Link to={menu.to} key={index}>
            <div className="flex flex-col items-center">
              <div className="aspect-square w-full overflow-hidden rounded-md mb-3 shadow-customize-btn-shadow">
                <img
                  src={menu.image}
                  alt={`Logo-${menu.label}`}
                  loading="lazy"
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <Button customize={'default'} className="w-full">
                {menu.label}
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AuthorSwitch;
