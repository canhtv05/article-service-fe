import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn('flex flex-col gap-2', className)} {...props} />;
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'bg-muted text-muted-foreground inline-flex h-9 border-none w-fit items-center justify-center rounded-lg p-[3px]',
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  tabType = 'underline',
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & { tabType?: 'underline' | 'full' }) {
  const isUnderline = tabType === 'underline';
  const isFull = tabType === 'full';

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        'relative border-none inline-flex h-10 items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
        isUnderline && [
          'text-foreground dark:text-muted-foreground overflow-hidden',
          'after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-border after:z-10',
          'before:content-[""] before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:bg-foreground before:z-20 before:scale-x-0',
          'data-[state=active]:before:scale-x-100',
        ],
        isFull && ['!rounded-md text-foreground', 'data-[state=active]:bg-customize data-[state=active]:text-white'],
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn('flex-1 outline-none', className)} {...props} />;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
