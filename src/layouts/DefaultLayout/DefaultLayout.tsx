import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/layouts/components/app-sidebar';
import { Separator } from '@/components/ui/separator';
import useLogicSidebar from '@/hooks/components/useLogicSidebar';
import RenderIf from '@/components/RenderIf';
import { MoonStar, Sun } from 'lucide-react';
import useTheme from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';

const DefaultLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const menus = useLogicSidebar();

  const label: string = menus.find((menu) => menu.to.includes(location.pathname))?.label || '';

  const { theme, toggleTheme } = useTheme();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 lef-0 bg-background">
          <div className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <RenderIf value={theme === 'dark'}>
                <Button
                  className="bg-background text-foreground hover:bg-accent/50 duration-200 transition-colors"
                  size={'icon'}
                  onClick={toggleTheme}
                >
                  <Sun className="size-5" />
                </Button>
              </RenderIf>
              <RenderIf value={theme === 'light'}>
                <Button
                  className="bg-background text-foreground hover:bg-accent/50 duration-200 transition-colors"
                  size={'icon'}
                  onClick={toggleTheme}
                >
                  <MoonStar className="size-5" />
                </Button>
              </RenderIf>
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <RenderIf value={!!label}>
                    <BreadcrumbSeparator className="hidden md:block" />
                  </RenderIf>
                  <BreadcrumbItem>
                    <BreadcrumbPage>{label}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
          <Separator />
        </header>
        <div className="mt-2 w-full h-full">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DefaultLayout;
