'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';
import { Input } from './Input';

const createUserFormSchema = z.object({
   name: z
      .string()
      .nonempty('Campo Obrigatório')
      .min(10, 'Nome inválido')
      .transform((name) => {
         return name
            .trim()
            .split(' ')
            .map((word) => {
               return word[0].toUpperCase().concat(word.substring(1));
            })
            .join(' ');
      }),
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
   photo: z.optional(z.string().url()).or(z.literal('')),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

export function CreateUserForm() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<CreateUserFormData>({
      resolver: zodResolver(createUserFormSchema),
   });

   function createUser(data: CreateUserFormData) {
      console.log(data);
   }

   return (
      <form
         onSubmit={handleSubmit(createUser)}
         className="mx-auto my-0 flex w-full max-w-lg flex-col gap-3"
      >
         <Input
            labelProps={{ text: 'Nome:' }}
            inputProps={{
               type: 'text',
               size: 'small',
               register: { ...register('name') },
            }}
            error={{
               show: !!errors.name,
               message: errors.name?.message,
            }}
         />

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
            }}
            error={{
               show: !!errors.password,
               message: errors.password?.message,
            }}
         />

         <Input
            labelProps={{ text: 'Confirmar senha:' }}
            inputProps={{
               type: 'password',
               size: 'small',
               register: { ...register('confirmPassword') },
            }}
            error={{
               show: !!errors.confirmPassword,
               message: errors.confirmPassword?.message,
            }}
         />

         <Input
            labelProps={{ text: 'Adicionar foto:' }}
            inputProps={{
               type: 'text',
               placeholder: 'https://',
               size: 'small',
               register: { ...register('photo') },
            }}
            error={{
               show: !!errors.photo,
               message: errors.photo?.message,
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
