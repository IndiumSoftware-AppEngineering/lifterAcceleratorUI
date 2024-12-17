import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface StatusDropdownProps {
  status: string;
  setFormData: (
    formData: React.SetStateAction<{
      name: string;
      id: string;
      description: string;
      status: string;
    }>
  ) => void;
}

export function StatusDropdown({ status, setFormData }: StatusDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className={`h-8 gap-1 rounded-sm ${
            status === 'Active'
              ? 'bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800'
              : 'bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800'
          }`}
        >
          {status}
          <ChevronDown className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='rounded-sm'>
        <DropdownMenuItem
          onClick={() => setFormData((prev) => ({ ...prev, status: 'Active' }))}
        >
          Active
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            setFormData((prev) => ({ ...prev, status: 'Inactive' }))
          }
        >
          Inactive
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
