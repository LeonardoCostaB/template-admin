'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, User2 } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';
import { Header } from '@/components/Header';
import { Input } from '@/components/Input';

const updateUserFormSchema = z.object({
   image: z.string().url('URL inválida').nonempty('Campo não pode ser vazio.'),
   name: z.string(),
});

type UpdateUserFormData = z.infer<typeof updateUserFormSchema>;

export default function Profile() {
   const { user } = useAuth();

   const {
      register,
      handleSubmit,
      formState: { errors, isValid },
   } = useForm<UpdateUserFormData>({
      resolver: zodResolver(updateUserFormSchema),
      defaultValues: {
         name: user?.name ?? '',
      },
   });

   const [shouldAlert, setShouldAlert] = useState<boolean>(false);
   const [imgUrl, setImgUrl] = useState<string>('');

   function updateUser({ image, name }: UpdateUserFormData) {
      console.log(image, name);
   }

   return (
      <>
         <Header
            title="Profile"
            subTitle={
               user?.name
                  ? `Olá ${user.name}, aqui você encontra suas informações.`
                  : 'Olá, preencha suas informações'
            }
         />

         <main className="mt-5">
            <section className="m-auto flex max-w-2xl flex-col gap-4">
               <form onSubmit={handleSubmit(updateUser)}>
                  <div className="flex flex-col items-center">
                     <span className="block w-fit overflow-hidden rounded-full bg-zinc-700 object-cover dark:bg-gray-200">
                        {user?.img ? (
                           <Image
                              src={imgUrl.length ? imgUrl : user.img}
                              alt={`imagem de perfil de ${user.name}`}
                              width={96}
                              height={96}
                           />
                        ) : (
                           <>
                              <User2
                                 size={96}
                                 className="p-2 text-gray-200 dark:text-zinc-800"
                              />
                           </>
                        )}
                     </span>

                     <Input
                        customClasses="w-full mb-2 mt-4"
                        inputProps={{
                           type: 'text',
                           size: 'small',
                           placeholder: 'https://',
                           register: { ...register('image') },
                           focusEv() {
                              setShouldAlert(true);
                           },
                           blurEv(value) {
                              setShouldAlert(false);
                              setImgUrl(value);
                           },
                        }}
                        labelProps={{
                           text: 'Atualizar sua foto de perfil:',
                        }}
                        error={{
                           show: !!errors.image,
                           message: errors.image?.message,
                        }}
                     />

                     <strong
                        className={clsx(
                           'flex max-h-0 w-full items-center gap-2 rounded-lg bg-red-600 text-[10px] leading-relaxed opacity-0 transition-all ease-linear',
                           {
                              'max-h-60 p-2 opacity-100': shouldAlert,
                           },
                        )}
                     >
                        <AlertCircle size={24} />
                        Importante: No momento estamos aceitando somente imagem
                        como url e somente das seguintes plataformas: Facebook e
                        instagram
                     </strong>
                  </div>

                  <div className="flex items-center justify-center gap-4">
                     <Input
                        customClasses="w-full"
                        inputProps={{
                           type: 'text',
                           size: 'small',
                           refValue: user?.name,
                           disabled: !!user?.name,
                           register: { ...register('name') },
                        }}
                        labelProps={{
                           text: 'Nome:',
                           visible: true,
                        }}
                        error={{
                           show: !!errors.name,
                           message: errors.name?.message,
                        }}
                     />

                     <Input
                        customClasses="w-full"
                        inputProps={{
                           type: 'text',
                           size: 'small',
                           disabled: !!user?.email,
                           refValue: user?.email,
                        }}
                        labelProps={{
                           text: 'Email:',
                           visible: true,
                        }}
                     />
                  </div>

                  <div className="mt-4 flex items-center justify-center">
                     <button
                        type="submit"
                        className="w-full rounded-lg bg-indigo-500 py-2 text-white transition-all duration-300 ease-out hover:bg-indigo-700 disabled:cursor-no-drop disabled:text-white disabled:opacity-50 disabled:hover:bg-indigo-500"
                        disabled={!isValid}
                     >
                        Atualizar informações
                     </button>
                  </div>
               </form>
            </section>
         </main>
      </>
   );
}
