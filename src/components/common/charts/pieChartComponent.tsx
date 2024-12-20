'use client';

import * as React from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import '../../../components/styles/chart.css';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
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
  index: number;
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (
  { cx, cy, midAngle, outerRadius, percent, index }: LabelProps,
  originalData: ChartData[],
  showPercentage: boolean,
  labelColor: string
) => {
  if (!showPercentage || index >= originalData.length) return null;

  const radius = outerRadius * 1.1;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill={labelColor}
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
  // Add a dummy "Remaining" segment if only one data point is provided
  const processedData =
    data.length === 1
      ? [
          ...data,
          {
            name: 'Remaining',
            value: 100 - data[0].value,
            color: '#e0e0e0', // Light gray for the remaining segment
          },
        ]
      : data;

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
      <CardHeader className='pb-0'>
        <CardTitle className='text-chart_font_color'>{title}</CardTitle>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[210px]'
        >
          <PieChart>
            {/* <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
              filter={
                (entry) => entry.payload.name !== 'Remaining' // Exclude "Remaining" from tooltip
              }
            /> */}
            <Pie
              data={processedData}
              dataKey='value'
              labelLine={false}
              label={(props) =>
                renderCustomizedLabel(
                  props,
                  data, // Pass the original data for filtering
                  showPercentage,
                  '#959494'
                )
              }
              nameKey='name'
              innerRadius={data.length === 2 ? 55 : 55}
              strokeWidth={5}
            >
              {processedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            {showLegend && (
              <ChartLegend
                className='recharts-default-legend'
                payload={data.map((entry) => ({
                  value: entry.name,
                  type: 'circle',
                  color: entry.color,
                }))}
              />
            )}
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
