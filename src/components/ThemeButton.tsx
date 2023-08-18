'use client';

import { useApp } from '@/hooks/useApp';
import clsx from 'clsx';
import { Moon, Sun } from 'lucide-react';

export function ThemeButton() {
   const { theme, isToggleTheme } = useApp();

   return (
      <button
         type="button"
         className={clsx(
            'relative hidden h-8 w-14 cursor-pointer items-center rounded-full px-1 transition-all duration-300 ease-linear sm:flex lg:w-20',
            {
               'bg-yellow-500': theme === 'dark',
               'bg-gray-900': theme !== 'dark',
            },
         )}
         onClick={isToggleTheme}
      >
         <span
            className={clsx(
               'absolute flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300 ease-linear',
               {
                  'translate-x-12 bg-white': theme === 'dark',
                  'bg-gray-700': theme !== 'dark',
               },
            )}
         >
            {theme !== 'dark' ? (
               <Moon size={16} color="#ca8a04" />
            ) : (
               <Sun size={16} color="#ca8a04" />
            )}
         </span>
      </button>
   );
}
