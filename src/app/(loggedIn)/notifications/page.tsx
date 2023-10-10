'use client';

import { Header } from '@/components/Header';
import { useApp } from '@/hooks/useApp';

export default function Notifications() {
   const ctx = useApp();

   return (
      <>
         <Header title="Template Admin" subTitle="Notifications Page" />
         <h1>Hello World</h1>

         <span>Bem vindo {ctx.theme}</span>
      </>
   );
}
