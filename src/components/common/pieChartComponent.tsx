'use client';

import * as React from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import '../styles/chart.css';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface ChartProps {
  data: ChartData[];
  title: string;
  showPercentage: boolean;
  showLegend: boolean;
}
interface LabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  outerRadius: number;
  percent: number;
}
const chartData = [
  { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (
  { cx, cy, midAngle, outerRadius, percent }: LabelProps,
  data: ChartData[],
  showPercentage: boolean,
  labelColor: string // Add a custom color parameter
) => {
  const radius = outerRadius * 1.1;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (!showPercentage) return null;

  return (
    <text
      x={x}
      y={y}
      fill={labelColor} // Use the custom color for the label
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function PieChartComponent({
  data,
  title,
  showPercentage,
  showLegend,
}: ChartProps) {
  const chartConfig: ChartConfig = data.reduce(
    (config, item) => {
      config[item.name.toLowerCase()] = {
        label: item.name,
        color: item.color,
      };
      return config;
    },
    { value: { label: 'Percentage', color: 'red' } } as ChartConfig
  );
  return (
    <Card className='flex flex-col w-graph_container_width h-graph_container_height'>
      <CardHeader className=' pb-0'>
        <CardTitle className='text-chart_font_color'>{title}</CardTitle>
      </CardHeader>
      <CardContent className='flex-1 pb-0 '>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[210px] '
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Pie
              data={chartData}
              dataKey='visitors'
              labelLine={false}
              label={(props) =>
                renderCustomizedLabel(props, data, showPercentage, '#959494')
              }
              nameKey='browser'
              innerRadius={55}
              strokeWidth={5}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            {showLegend && <ChartLegend className='recharts-default-legend' />}
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
