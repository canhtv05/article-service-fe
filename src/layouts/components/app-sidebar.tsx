import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { NavHeader } from './nav-header';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import useLogicSidebar from '@/hooks/components/useLogicSidebar';
import { Separator } from '@/components/ui/separator';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const items = useLogicSidebar();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>
      <Separator />
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
