'use client';
import Image from 'next/image';
import { CircleHelp } from 'lucide-react';
import { Bell } from 'lucide-react';
import { BellDot } from 'lucide-react';
import ProfileIcon from '../../../public/images/avatar.png';

export default function TopBar() {
  const notification = false;

  return (
    <div className='flex items-center justify-end p-4'>
      <div className='flex items-center space-x-6'>
        <CircleHelp className='cursor-pointer' />
        {/* Notification Icon */}
        {notification ? (
          <BellDot className='cursor-pointer' />
        ) : (
          <Bell className='cursor-pointer' />
        )}

        {/* Profile with Dropdown */}
        <div className='flex items-center space-x-2'>
          {/* Profile Image */}
          {/* <User className="cursor-pointer" /> */}
          <Image
            src={ProfileIcon}
            alt='man Icon'
            width={25}
            height={25}
            className='rounded-full border border-gray-300 cursor-pointer'
          />
          {/* Dropdown Icon */}
          {/* <DropdownMenuDemo /> */}
        </div>
      </div>
    </div>
  );
}
