'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Input } from './Input';
import { Loader2Icon } from 'lucide-react';

const userLoginFormSchema = z.object({
   email: z.string().email('Email inválido').nonempty('Email é obrigatório'),
   password: z.string().nonempty('Senha é obrigatório'),
});

type UserLoginFormData = z.infer<typeof userLoginFormSchema>;

export function LoginForm() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<UserLoginFormData>({
      resolver: zodResolver(userLoginFormSchema),
   });

   const { googleLogin, login, loading } = useAuth();

   return (
      <>
         <form
            onSubmit={handleSubmit(login)}
            className="mx-auto my-0 flex w-full flex-col gap-4 max-md:px-4 sm:max-w-sm"
         >
            <Input
               labelProps={{ text: 'Email:' }}
               inputProps={{
                  type: 'email',
                  size: 'normal',
                  register: { ...register('email') },
               }}
               error={{
                  show: !!errors.email,
                  message: errors.email?.message,
               }}
            />

            <Input
               labelProps={{ text: 'Senha:' }}
               inputProps={{
                  type: 'password',
                  size: 'normal',
                  placeholder: 'ex: abVde451',
                  register: { ...register('password') },
                  seePassword: true,
               }}
               error={{
                  show: !!errors.password,
                  message: errors.password?.message,
               }}
            />

            <button
               type="submit"
               className="flex h-10 w-full items-center justify-center rounded-lg bg-indigo-500 py-2 text-white transition-all duration-300 ease-out hover:bg-indigo-700 disabled:cursor-no-drop disabled:opacity-50"
               disabled={!loading}
            >
               {!loading ? (
                  <Loader2Icon size={24} className="animate-spin" />
               ) : (
                  'Entrar'
               )}
            </button>

            <div className="flex items-center gap-2 before:h-[1px] before:flex-1 before:bg-gray-300 after:h-[1px] after:flex-1 after:bg-gray-300">
               Ou
            </div>

            <button
               type="button"
               className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 py-2 text-white transition-all duration-300 ease-out hover:bg-red-700"
               onClick={googleLogin}
            >
               Google{' '}
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#fbf9f9"
                  viewBox="0 0 256 256"
               >
                  <path d="M220,128a92,92,0,1,1-21-58.55,4,4,0,0,1-6.17,5.1A84,84,0,1,0,211.91,132H128a4,4,0,0,1,0-8h88A4,4,0,0,1,220,128Z"></path>
               </svg>
            </button>
         </form>

         <Link href="/login/create-user" className="text-sm">
            Novo por aqui?{' '}
            <span className="text-blue-400 transition-colors hover:text-blue-500">
               cadastre-se e adquira suas credencias
            </span>
         </Link>
      </>
   );
}
