'use client';

import { LoggedinPages } from '@/components/skeletonLoading/LoggedinPages';
import '../globals.css';
import { Menu } from '@/components/Menu';
import { useApp } from '@/hooks/useApp';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

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
   const { loading } = useAuth();
   const router = useRouter();

   useEffect(() => {
      if (!document.cookie.includes('isLoggedIn')) {
         router.push('/unauthenticated');
      }
   }, []);

   return (
      <div className={`${theme} flex h-screen`}>
         <Menu />
         <div className="flex w-full flex-col bg-gray-300 p-6 dark:bg-gray-800 dark:text-gray-200">
            {loading ? <LoggedinPages /> : <>{children}</>}
         </div>
      </div>
   );
}
