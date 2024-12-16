'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface drawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  toggleDrawer: () => void;
}

export function RightDrawer({ children, isOpen, toggleDrawer }: drawerProps) {
  return (
    <div className='flex'>
      <div
        className={cn(
          'fixed top-0 right-0 h-full bg-white shadow-lg z-40 transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{ width: '40%' }}
      >
        <div className='p-6'>{children}</div>
      </div>
      {isOpen && (
        <div
          className='fixed inset-0 z-20 bg-black bg-opacity-5'
          onClick={toggleDrawer}
        />
      )}
    </div>
  );
}
