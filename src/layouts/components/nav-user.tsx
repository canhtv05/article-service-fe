'use client';

import { ArrowLeftRight, BadgeCheck, ChevronsUpDown, LogOut } from 'lucide-react';

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/zustand/authStore';
import { useMutation } from '@tanstack/react-query';
import { httpRequest } from '@/utils/httpRequest';
import cookieUtil from '@/utils/cookieUtil';
import { toast } from 'sonner';
import axios from 'axios';
import { useCallback } from 'react';

export function NavUser() {
  const { isMobile } = useSidebar();
  const user = useAuthStore();
  const clearUser = useAuthStore((s) => s.clearUser);
  const navigate = useNavigate();
  const location = useLocation();

  const logoutMutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () =>
      await httpRequest.post(
        '/auth/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${cookieUtil.getStorage()?.accessToken}`,
          },
        },
      ),
    onSuccess: () => {
      cookieUtil.deleteStorage();
      clearUser();
      toast.success('Đăng xuất thành công');
      navigate('/login');
    },
    onError: (error: Error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? 'Đăng xuất thất bại');
      } else {
        toast.error('Đăng xuất thất bại');
      }
    },
  });

  const handleLogout = useCallback(() => {
    logoutMutation.mutate();
  }, [logoutMutation]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.user?.profilePicture} alt={user.user?.fullName} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.user?.fullName}</span>
                <span className="truncate text-xs">{user.user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.user?.profilePicture} alt={user.user?.fullName} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.user?.fullName}</span>
                  <span className="truncate text-xs">{user.user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  navigate('/profile', { state: { background: location } });
                }}
              >
                <BadgeCheck />
                Tài khoản
              </DropdownMenuItem>
              <Link to={`/author-switch`}>
                <DropdownMenuItem>
                  <ArrowLeftRight />
                  Role switch
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
