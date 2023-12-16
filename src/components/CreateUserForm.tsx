'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertCircle } from 'lucide-react';
import { Input } from './Input';
import { useAuth } from '@/hooks/useAuth';

const createUserFormSchema = z.object({
   email: z
      .string()
      .email('Email inválido')
      .nonempty('Email é obrigatório')
      .toLowerCase(),
   password: z
      .string()
      .min(8, 'A senha precisa ter no mínimo 6 caracteres')
      .nonempty('Senha é obrigatório')
      .regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, 'Formato inválido'),
   confirmPassword: z
      .string()
      .min(6, 'A senha precisa ter no mínimo 6 caracteres')
      .nonempty('Senha é obrigatório'),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

export function CreateUserForm() {
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm<CreateUserFormData>({
      resolver: zodResolver(createUserFormSchema),
   });

   const { userRegister } = useAuth();

   async function createUser({ email, password }: CreateUserFormData) {
      await userRegister({ email, password });
   }

   const errorMessageShow =
      watch('confirmPassword')?.length &&
      watch('password') !== watch('confirmPassword');

   return (
      <form
         onSubmit={handleSubmit(createUser)}
         className="mx-auto my-0 flex w-full max-w-lg flex-col gap-3"
      >
         <Input
            labelProps={{ text: 'Email:' }}
            inputProps={{
               type: 'email',
               size: 'small',
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
               size: 'small',
               placeholder: 'ex: abVde451',
               register: { ...register('password') },
               seePassword: true,
            }}
            error={{
               show: !!errors.password,
               message: errors.password?.message,
            }}
            tutorial
         />

         <Input
            labelProps={{ text: 'Confirmar senha:' }}
            inputProps={{
               type: 'password',
               size: 'small',
               register: { ...register('confirmPassword') },
               seePassword: true,
               disabled: watch('password')?.length < 8 || !watch('password'),
            }}
            error={{
               show: !!errors.confirmPassword || !!errorMessageShow,
               message: errorMessageShow
                  ? 'Senha não coincidem'
                  : errors.confirmPassword?.message,
            }}
         />

         <strong className="mx-auto flex max-w-lg items-center gap-2 rounded-lg bg-red-600 p-2 text-[10px] leading-relaxed">
            <AlertCircle size={24} />
            Lembre-se: Para poder utilizar o admin, o proprietário deverá
            conceder permissão, este é apenas o primeiro passo.
         </strong>

         <button
            type="submit"
            className="w-full rounded-lg bg-indigo-500 py-2 text-white transition-all duration-300 ease-out hover:bg-indigo-700"
         >
            Cadastrar
         </button>
      </form>
   );
}
