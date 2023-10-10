'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

const userLoginFormSchema = z.object({
   email: z.string().email('Email inválido').nonempty('Email é obrigatório'),
   password: z
      .string()
      .min(6, 'A senha precisa ter no mínimo 6 caracteres')
      .nonempty('Senha é obrigatório'),
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

   const { googleLogin } = useAuth();

   function login(data: any) {
      console.log(data);
   }

   return (
      <>
         <form
            onSubmit={handleSubmit(login)}
            className="mx-auto my-0 flex w-full flex-col gap-4 max-md:px-4 sm:max-w-sm"
         >
            <div className="flex flex-col gap-1">
               <label htmlFor="email">Email</label>
               <input
                  type="email"
                  {...register('email')}
                  className="rounded-lg bg-gray-200 px-4 py-3 text-gray-800"
               />
               {errors.email && <span>{errors.email.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
               <label htmlFor="password">Senha</label>
               <input
                  type="password"
                  {...register('password')}
                  className="rounded-lg bg-gray-200 px-4 py-3 text-gray-800"
               />
               {errors.password && <span>{errors.password.message}</span>}
            </div>

            <button
               type="submit"
               className="w-full rounded-lg bg-indigo-500 py-2 text-white transition-all duration-300 ease-out hover:bg-indigo-700"
            >
               Entrar
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
