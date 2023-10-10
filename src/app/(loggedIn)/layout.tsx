'use client';

import '../globals.css';
import { Menu } from '@/components/Menu';
import { useApp } from '@/hooks/useApp';

export const metadata = {
   title: 'Template Admin',
   description: 'Template Admin Creation',
};

export default function LoggedInLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const { theme } = useApp();

   return (
      <div className={`${theme} flex h-screen`}>
         <Menu />

         <div className="flex w-full flex-col bg-gray-300 dark:bg-gray-800 dark:text-gray-200">
            {children}
         </div>
      </div>
   );
}
