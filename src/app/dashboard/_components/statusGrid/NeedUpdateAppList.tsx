'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataGrid } from '@/components/common/datagrid/dataGrid';
import { UptoDateApplicationData } from '../../_constants/type';
import { applicationData } from '../../_constants/dummy';

const columns: ColumnDef<UptoDateApplicationData>[] = [
  {
    accessorKey: 'projectName',
    header: () => (
      <span className='whitespace-nowrap font-semibold text-sm text-black min-w-[120px]'>
        Project Name
      </span>
    ),
    cell: ({ row }) => (
      <div className='text-sm text-gray-600'>{row.getValue('projectName')}</div>
    ),
  },
  {
    accessorKey: 'version',
    header: () => (
      <span className='whitespace-nowrap font-semibold text-sm text-black min-w-[80px]'>
        Version
      </span>
    ),
    cell: ({ row }) => (
      <div className='text-sm text-gray-600'>{row.getValue('version')}</div>
    ),
  },
  {
    accessorKey: 'lastUpdated',
    header: () => (
      <span className='whitespace-nowrap font-semibold text-sm text-black min-w-[100px]'>
        Last Updated
      </span>
    ),
    cell: ({ row }) => (
      <div className='text-sm text-gray-600'>{row.getValue('lastUpdated')}</div>
    ),
  },
  {
    accessorKey: 'owner',
    header: () => (
      <span className='whitespace-nowrap font-semibold text-sm text-black min-w-[80px]'>
        Owner
      </span>
    ),
    cell: ({ row }) => (
      <div className='text-sm text-gray-600'>{row.getValue('owner')}</div>
    ),
  },
];

export default function NeedUpdateApplications() {
  return (
    <div className='flex h-full flex-col gap-8'>
      <div>
        <div className='border-b p-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <h2 className='text-lg font-semibold'>Application/Projects</h2>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='flex flex-col gap-2 p-4'>
          <h2 className='text-sm font-semibold'>Application Need Update</h2>
          <div className='bg-white shadow-sm border border-gray-200'>
            <DataGrid columns={columns} data={applicationData} />
          </div>
        </div>
      </div>
    </div>
  );
}
