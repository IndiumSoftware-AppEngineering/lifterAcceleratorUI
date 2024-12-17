import Image from 'next/image';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ProfileIcon from '../../../public/assets/avatar.png';
import DropdownIcon from '../../../public/assets/Dropdown.svg';


export default function TopBar() {
  const notification = true; // Set to true to test the red dot
  
  return (
    <div className="flex items-center justify-end p-4">
      <div className="flex items-center space-x-6">
        {/* Help Icon */}
        <HelpOutlineIcon className="cursor-pointer" />

        {/* Notification Icon with Conditional Red Dot */}
        <div className="flex items-center">
          <NotificationsNoneOutlinedIcon className="cursor-pointer" />
          {notification && (
            <span className="flex h-2 w-2 bg-red-500 rounded-full ml-[-8px] mt-[-12px]" />
          )}
        </div>

        {/* Profile with Dropdown */}
        <div className="flex items-center space-x-2">
          {/* Profile Image */}
          <Image
            src={ProfileIcon}
            alt="man Icon"
            width={25}
            height={25}
            className="rounded-full border border-gray-300 cursor-pointer"
          />
          <Image
          src={DropdownIcon}
          alt="Dropdown Icon"
          width={16}
          height={16}
          className="cursor-pointer"
        />
          {/* Dropdown Icon */}
          {/* <DropdownMenuDemo /> */}
        </div>
      </div>
    </div>
  );
}

// 'use client';
// import Image from 'next/image';
// import { CircleHelp } from 'lucide-react';
// import { Bell } from 'lucide-react';
// import { BellDot } from 'lucide-react';
// import ProfileIcon from '../../../public/images/avatar.png';

// export default function TopBar() {
//   const notification = false;

//   return (
//     <div className='flex items-center justify-end p-4'>
//       <div className='flex items-center space-x-6'>
//         <CircleHelp className='cursor-pointer' />
//         {/* Notification Icon */}
//         {notification ? (
//           <BellDot className='cursor-pointer' />
//         ) : (
//           <Bell className='cursor-pointer' />
//         )}

//         {/* Profile with Dropdown */}
//         <div className='flex items-center space-x-2'>
//           {/* Profile Image */}
//           {/* <User className="cursor-pointer" /> */}
//           <Image
//             src={ProfileIcon}
//             alt='man Icon'
//             width={25}
//             height={25}
//             className='rounded-full border border-gray-300 cursor-pointer'
//           />
//           {/* Dropdown Icon */}
//           {/* <DropdownMenuDemo /> */}
//         </div>
//       </div>
//     </div>
//   );
// }
