'use client';

import React from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';

import LifterIcon from '../../../public/assets/Lifter Temporary Icon.svg';
import DashboardIcon from '../../../public/assets/Dashboard Icon.svg';
import AccessIcon from '../../../public/assets/Access Icon.svg';

interface NavItem {
  href: string;
  src: string | StaticImageData;
  label: string;
}

const navItems: NavItem[] = [
  {
    href: '/dashboard',
    src: DashboardIcon,
    label: 'Dashboard',
  },
  {
    href: '/access',
    src: AccessIcon,
    label: 'Access',
  },
];

function AnimatedSideNav() {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <nav
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`flex min-h-screen sm:min-h-3/6  flex-col bg-[#021f46] p-4 transition-all duration-700 ${
        isExpanded ? 'w-[200]' : 'w-20'
      }`}
    >
      <div className='flex flex-col items-center mb-8 relative h-10 flex items-center justify-center'>
        <div className='absolute top-0 left-0 w-full flex flex-col items-center'>
          <Image
            src={LifterIcon}
            alt='Lifter logo'
            width={32}
            height={32}
            className='transition-transform duration-700'
          />
          <div
            className={`text-lg font-semibold text-white custom-font transition-all duration-700 overflow-hidden ${
              isExpanded ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <span>Lifter</span>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center flex-1 w-full'>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center w-full group px-3 py-2 text-gray-300  duration-700 hover:bg-options_hover`}
          >
            <div className='flex items-center gap-3 relative w-full'>
              <div className='w-[25px] h-[25px] flex items-center justify-center  transition-none'>
                <Image
                  src={item.src}
                  alt={item.label}
                  width={30}
                  height={30}
                  className='object-contain absolute'
                />
              </div>

              <div
                className={`transition-all duration-700 ease-in-out overflow-hidden ${
                  isExpanded ? 'max-w-full opacity-100' : 'max-w-0 opacity-0'
                }`}
              >
                <span className='text-sm whitespace-nowrap'>{item.label}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default AnimatedSideNav;
