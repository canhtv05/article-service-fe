'use client';

import { Link, useLocation } from 'react-router-dom';

import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { MenuSidebarChildType } from '@/types';

export function NavMain({ items }: { items: MenuSidebarChildType[] }) {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = item.to.includes(location.pathname);

          return (
            <Collapsible key={item.label} asChild className="group/collapsible">
              <SidebarMenuItem className={`${isActive ? 'bg-sidebar-accent' : ''} rounded-lg`}>
                <CollapsibleTrigger asChild>
                  <Link to={item.to}>
                    <SidebarMenuButton tooltip={item.label}>
                      {item.icon && <item.icon className="text-foreground !size-5" />}
                      <span className="text-foreground text-left text-[14px] font-medium">{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                </CollapsibleTrigger>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
