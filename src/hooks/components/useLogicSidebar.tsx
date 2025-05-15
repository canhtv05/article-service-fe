import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { menusSidebar } from '@/constant';
import { MenuSidebarChildType } from '@/types';

const useLogicSidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const [menus, setMenus] = useState<MenuSidebarChildType[]>([]);
  useEffect(() => {
    const res = menusSidebar.find((menu) => pathname.includes(menu.type));
    setMenus(res?.children ?? []);
  }, [pathname]);

  return menus;
};

export default useLogicSidebar;
