import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';

export default function TabsUnderlined({
  tabs,
  type = 'underline',
}: {
  tabs: { name: string; value: string; content: React.FC }[];
} & { type?: 'underline' | 'full' }) {
  return (
    <Tabs defaultValue={tabs[0].value} className="w-full">
      <TabsList className="w-full p-0 bg-background justify-start border-b rounded-none">
        {tabs.map((tab) => (
          <TabsTrigger
            tabType={type}
            key={tab.value}
            value={tab.value}
            className="rounded-none cursor-pointer bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            <span className="text-[13px] font-bold whitespace-nowrap">{tab.name}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <tab.content />
        </TabsContent>
      ))}
    </Tabs>
  );
}
