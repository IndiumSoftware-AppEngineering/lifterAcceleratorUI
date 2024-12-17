import * as React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  successIcon: string;
}

export function SuccessModal({
  isOpen,
  onClose,
  onConfirm,
  successIcon,
}: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/50'>
      <div className='w-[90%] max-w-[400px] rounded-sm border bg-white p-6 relative overflow-visible'>
        {/* Image positioned partially outside */}
        <div className='absolute top-[-27px] left-1/2 transform -translate-x-1/2'>
          <Image src={successIcon} alt='success' className='h-14 w-14' />
        </div>
        <div className='flex flex-col items-center text-center'>
          <h2 className='mt-12 text-xl font-semibold'>
            Project is successfully created!
          </h2>
          <p className='mt-1 text-sm text-gray-600'>
            Do you wish to add Artifacts?
          </p>
          <div className='mt-6 flex flex-wrap justify-center gap-3'>
            <Button
              variant='outline'
              onClick={onClose}
              className='min-w-[100px] rounded-sm border-[#172B9E] text-[#172B9E] hover:bg-[#172B9E] hover:text-white'
            >
              Not now
            </Button>
            <Button
              onClick={onConfirm}
              className='min-w-[100px] rounded-sm bg-[#172B9E] hover:bg-[#172B9E]/90'
            >
              Add Artifacts
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
