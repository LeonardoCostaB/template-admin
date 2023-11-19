'use client';

import { useAuth } from '@/hooks/useAuth';
import clsx from 'clsx';
import { User2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function UserAvatar() {
   const { user } = useAuth();

   return (
      <Link
         href="/profile"
         className={clsx(
            'flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700 transition-colors hover:bg-zinc-800 active:bg-zinc-900 dark:bg-gray-200 dark:hover:bg-gray-300 dark:active:bg-gray-400',
            {
               'overflow-hidden p-0': user?.img,
               'p-2': !user,
            },
         )}
      >
         {user?.img ? (
            <Image
               src={user.img}
               alt={
                  user?.name
                     ? `Foto de perfil de ${user.name}`
                     : 'Clique aqui para acessar seu perfil'
               }
               width={50}
               height={50}
            />
         ) : (
            <User2 size={20} className="text-gray-200 dark:text-zinc-800" />
         )}
      </Link>
   );
}
