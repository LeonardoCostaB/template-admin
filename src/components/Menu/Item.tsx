import Link from 'next/link';
import { MouseEventHandler, ReactNode } from 'react';

interface ItemProps {
   url?: string;
   text: string;
   icon: ReactNode;
   onClick?: (event: MouseEventHandler<HTMLButtonElement>) => void;
   className?: string;
}

export function Item({ url, text, icon, className = '' }: ItemProps) {
   return (
      <li className="transition-all hover:bg-gray-100 dark:hover:bg-gray-800">
         {url ? (
            <Link
               href={url}
               className={`flex h-20 w-20 flex-col items-center justify-center text-xs font-light text-gray-600 ${className}`}
            >
               {icon}

               {text}
            </Link>
         ) : (
            <button
               className={`flex h-20 w-20 flex-col items-center justify-center text-xs font-light text-gray-600 transition-all dark:text-gray-200 ${className}`}
            >
               {icon}

               {text}
            </button>
         )}
      </li>
   );
}
