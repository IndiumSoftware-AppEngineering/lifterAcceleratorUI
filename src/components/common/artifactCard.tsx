'use client';

import { FileIcon, MoreVertical } from 'lucide-react';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface PdfFileProps {
  filename: string;
  size: string;
  date: string;
  author: string;
}

export function ArtifactCard({ filename, size, date, author }: PdfFileProps) {
  return (
    <Card className='w-full p-4 flex flex-col gap-6 bg-white shadow-sm h-artifact_card_height w-artifact_card_width'>
      <div className='flex items-start'>
        {/* Icon on the top-left */}
        <div className='h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0'>
          <FileIcon className='h-6 w-6 text-red-500' />
        </div>

        {/* Spacer to push content to the right */}
        <div className='flex-1'></div>

        {/* Dropdown menu on the top-right */}
        <div className='flex-shrink-0'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon' className='h-8 w-8'>
                <MoreVertical className='h-4 w-4' />
                <span className='sr-only'>Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem>Download</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content below the icon and dropdown */}
      <div className='flex-grow min-w-0'>
        <div className='flex items-center justify-between'>
          <h3 className='text-gray-900 font-medium truncate'>{filename}</h3>
          <span className='text-gray-500 text-sm'>{size}</span>
        </div>
        <p className='text-gray-500 text-sm truncate'>
          {date}, {author}
        </p>
      </div>
    </Card>
  );
}
