'use client';

import { Pie, PieChart as Chart } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import FieldsSelect from './FieldsSelect';
import { ChartDataType } from '@/types';
import { fakeDataChart } from '@/constant';

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Chrome',
    color: 'hsl(var(--chart-1))',
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))',
  },
  firefox: {
    label: 'Firefox',
    color: 'hsl(var(--chart-3))',
  },
  edge: {
    label: 'Edge',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

const fallbackData: ChartDataType[] = [
  {
    label: 'Không có dữ liệu',
    count: 1,
    dataKey: 'fallback',
    color: 'hsl(var(--muted-foreground))',
  },
];

const PieChart = ({ chartData }: { chartData: ChartDataType[] }) => {
  const isEmpty = chartData.every((chart) => chart.count === 0);
  const finalData = isEmpty ? fallbackData : chartData;

  return (
    <Card className="flex flex-col h-full border-none shadow-md bg-transparent">
      <CardHeader className="items-center pb-0">
        <CardDescription>
          <div className="flex md:grid auto-rows-min gap-4 grid-cols-3">
            <FieldsSelect placeholder="Chọn đợt viết bài" data={fakeDataChart} label="Đợt viết bài" />
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 flex">
        <ChartContainer
          config={chartConfig}
          className="flex justify-end w-full mx-auto aspect-square max-h-[400px] px-0"
        >
          <Chart className="flex flex-row">
            <ChartLegend
              content={<ChartLegendContent nameKey="label" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={finalData} dataKey="count" nameKey="label" labelLine={false} />
          </Chart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PieChart;
