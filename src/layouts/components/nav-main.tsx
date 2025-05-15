'use client';

import { Link } from 'react-router-dom';

import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { MenuSidebarChildType } from '@/types';

export function NavMain({ items }: { items: MenuSidebarChildType[] }) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.label} asChild className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <Link to={item.to}>
                  <SidebarMenuButton tooltip={item.label}>
                    {item.icon && <item.icon className="text-foreground" />}
                    <span className="text-foreground text-left text-[14px] flex w-full h-full justify-start font-normal">
                      {item.label}
                    </span>
                  </SidebarMenuButton>
                </Link>
              </CollapsibleTrigger>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
