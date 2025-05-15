'use client';

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { ReactIcon } from '@/assets/icons';

export function NavHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
          <div className="flex aspect-square items-center justify-center rounded-lg bg-[#282A36] text-sidebar-primary-foreground">
            <ReactIcon className="size-4" />
          </div>
          <div className="grid flex-1 text-left !text-[10px] leading-tight">
            <span className="truncate font-semibold">UDPM - Article Management</span>
            <span className="truncate font-regular">Group2 - canhtv05</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
