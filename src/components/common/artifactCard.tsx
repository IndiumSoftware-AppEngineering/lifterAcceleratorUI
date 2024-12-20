'use client';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import CodeIcon from '@mui/icons-material/Code';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ArticleIcon from '@mui/icons-material/Article';
import TableChartIcon from '@mui/icons-material/TableChart';
import GridOnIcon from '@mui/icons-material/GridOn';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import ImageIcon from '@mui/icons-material/Image';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import MovieIcon from '@mui/icons-material/Movie';

import { MoreVertical } from 'lucide-react';
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

function getIconForFile(filename: string) {
  const extension = filename.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'pdf':
      return <PictureAsPdfIcon className='h-6 w-6 text-red-500' />;
    case 'txt':
      return <DescriptionIcon className='h-6 w-6 text-gray-500' />;
    case 'md':
      return <CodeIcon className='h-6 w-6 text-blue-500' />;
    case 'rtf':
      return <TextSnippetIcon className='h-6 w-6 text-green-500' />;
    case 'doc':
    case 'docx':
      return <ArticleIcon className='h-6 w-6 text-blue-700' />;
    case 'xls':
    case 'xlsx':
      return <TableChartIcon className='h-6 w-6 text-green-600' />;
    case 'csv':
    case 'tsv':
      return <GridOnIcon className='h-6 w-6 text-orange-500' />;
    case 'ppt':
    case 'pptx':
      return <SlideshowIcon className='h-6 w-6 text-orange-700' />;
    case 'jpeg':
    case 'jpg':
    case 'png':
    case 'tiff':
      return <ImageIcon className='h-6 w-6 text-purple-500' />;
    case 'mp3':
      return <AudiotrackIcon className='h-6 w-6 text-green-500' />;
    case 'mp4':
      return <MovieIcon className='h-6 w-6 text-red-500' />;
    default:
      return <DescriptionIcon className='h-6 w-6 text-gray-400' />; // Default file icon
  }
}

export function ArtifactCard({ filename, size, date, author }: PdfFileProps) {
  const fileIcon = getIconForFile(filename);

  return (
    <Card className='w-full p-4 flex flex-col gap-6 bg-white shadow-sm h-artifact_card_height w-artifact_card_width'>
      <div className='flex items-start'>
        {/* Icon on the top-left */}
        <div className='h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0'>
          {fileIcon}
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
          <h3 className='text-gray-900 font-bold truncate'>{filename}</h3>
          <span className='text-medium text-[#444A61]'>{size}</span>
        </div>
        <p className='text-gray-500 text-sm truncate text-[#8D919F]'>
          {date}, {author}
        </p>
      </div>
    </Card>
  );
}

// 'use client';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

// import {  MoreVertical } from 'lucide-react';
// import { Card } from '@/components/ui/card';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { Button } from '@/components/ui/button';

// interface PdfFileProps {
//   filename: string;
//   size: string;
//   date: string;
//   author: string;
// }

// export function ArtifactCard({ filename, size, date, author }: PdfFileProps) {
//   return (
//     <Card className='w-full p-4 flex flex-col gap-6 bg-white shadow-sm h-artifact_card_height w-artifact_card_width'>
//       <div className='flex items-start'>
//         {/* Icon on the top-left */}
//         <div className='h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0'>
//           <PictureAsPdfIcon className='h-6 w-6 text-red-500' />
//         </div>

//         {/* Spacer to push content to the right */}
//         <div className='flex-1'></div>

//         {/* Dropdown menu on the top-right */}
//         <div className='flex-shrink-0'>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant='ghost' size='icon' className='h-8 w-8'>
//                 <MoreVertical className='h-4 w-4' />
//                 <span className='sr-only'>Open menu</span>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align='end'>
//               <DropdownMenuItem>Download</DropdownMenuItem>
//               <DropdownMenuItem>Share</DropdownMenuItem>
//               <DropdownMenuItem>Delete</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>

//       {/* Content below the icon and dropdown */}
//       <div className='flex-grow min-w-0'>
//         <div className='flex items-center justify-between'>
//           <h3 className='text-gray-900 font-medium truncate'>{filename}</h3>
//           <span className='text-gray-500 text-sm'>{size}</span>
//         </div>
//         <p className='text-gray-500 text-sm truncate'>
//           {date}, {author}
//         </p>
//       </div>
//     </Card>
//   );
// }
