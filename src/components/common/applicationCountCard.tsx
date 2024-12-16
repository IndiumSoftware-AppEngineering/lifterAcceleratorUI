import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

interface ApplicationCountProps {
  totalCount: number;
  upToDateCount: number;
  needUpdateCount: number;
}

function ApplicationsCard({
  totalCount,
  upToDateCount,
  needUpdateCount,
}: ApplicationCountProps) {
  return (
    <Card className='w-graph_container_width h-graph_container_height max-w-sm p-6'>
      <CardHeader className='p-0'>
        <CardTitle className='text-sm font-normal text-muted-foreground'>
          Total Applications
        </CardTitle>
        <div className='text-4xl font-semibold text-card_head_color'>
          {totalCount}
        </div>
      </CardHeader>

      <div className='flex flex-row gap-24 pt-12'>
        <div className='flex flex-col space-y-4'>
          <span className='text-sm text-muted-foreground'>Up to date</span>
          <span className='text-2xl font-semibold text-green-600'>
            {upToDateCount}
          </span>
        </div>
        <div className='flex flex-col space-y-4'>
          <span className='text-sm text-muted-foreground'>Need update</span>
          <span className='text-2xl font-semibold text-red-600'>
            {needUpdateCount}
          </span>
        </div>
      </div>
    </Card>
  );
}

export default ApplicationsCard;
