'use client';

import '../globals.css';
import { useApp } from '@/hooks/useApp';
import { userIsLoggedIn } from '@/utils/userIsLoggedIn';
import Image from 'next/image';
import { useEffect } from 'react';

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

   useEffect(() => {
      userIsLoggedIn();
   }, []);

   return (
      <div className={`${theme} flex`}>
         <Image
            src="https://source.unsplash.com/random"
            alt="Imagens aleatória para tela de login"
            width={500}
            height={500}
            objectFit="cover"
            className="hidden h-screen w-full max-w-[60%] md:block"
         />

         <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-gray-300 dark:bg-gray-800 dark:text-gray-200">
            {children}
         </div>
      </div>
   );
}
