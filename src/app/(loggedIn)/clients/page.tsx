'use client';

import { Header } from '@/components/Header';
import { Input } from '@/components/Input';
import Client from '@/core/Client';
import clsx from 'clsx';
import { ArrowLeftCircle, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';

const tableHeadNames = [
   'id',
   'Cliente',
   'Início do projeto',
   'Data de entrega',
   'Remuneração',
];

const clients = [
   new Client('1', 'Fiverr', '10/05/2023', '25/05/2023', 400),
   new Client('2', 'Fiverr', '10/06/2023', '25/06/2023', 800),
   new Client('3', 'Fiverr', '10/07/2023', '25/07/2023', 1000),
   new Client('4', 'Agência Oasis', '10/09/2023', '25/09/2023', 2500),
   new Client('5', 'Agência Oasis', '15/12/2023', '18/12/2023', 800),
];

export default function Clients() {
   const [visibleForm, setVisibleForm] = useState<boolean>(false);

   function mostrar(client: Client) {
      console.log(client._name);
   }

   return (
      <>
         <Header
            title="Clientes"
            subTitle="Área reservada para a administração de seus clientes"
         />

         <main className="flex h-full items-center justify-center">
            <div className="w-full max-w-3xl">
               <div
                  className={clsx(
                     'rounded-r-lg-lg flex items-center rounded-t-lg p-4 dark:bg-slate-700',
                     {
                        'justify-start': visibleForm,
                        'justify-between': !visibleForm,
                     },
                  )}
               >
                  {visibleForm ? (
                     <>
                        <button
                           type="button"
                           onClick={() => setVisibleForm(false)}
                        >
                           <ArrowLeftCircle size={24} />
                        </button>

                        <span className="flex w-[calc(100%-48px)] justify-center">
                           Novo Cliente
                        </span>
                     </>
                  ) : (
                     <>
                        <Input
                           inputProps={{
                              type: 'text',
                              size: 'small',
                              placeholder: 'Pesquisar cliente',
                           }}
                           labelProps={{
                              text: 'Pesquisar cliente',
                              visible: false,
                           }}
                        />

                        <span>N° de projetos: {clients.length}</span>

                        <span>
                           Total:{' '}
                           {clients
                              .reduce((acc, value) => acc + value._cash, 0)
                              .toLocaleString('pt-bt', {
                                 style: 'currency',
                                 currency: 'BRL',
                              })}
                        </span>

                        <button
                           type="button"
                           className="rounded-lg bg-gradient-to-r bg-size-200 bg-pos-0 px-4 py-2 text-white transition-all hover:bg-pos-100 dark:from-blue-400 dark:to-blue-700"
                           onClick={() => setVisibleForm(true)}
                        >
                           Novo cliente
                        </button>
                     </>
                  )}
               </div>

               <div className="mt-2 rounded-b-lg rounded-br-lg p-4 dark:bg-slate-700">
                  {visibleForm ? (
                     <form className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                           <Input
                              inputProps={{
                                 type: 'text',
                                 size: 'small',
                              }}
                              labelProps={{
                                 text: 'Cliente',
                                 visible: true,
                              }}
                              customClasses="flex-1"
                           />

                           <Input
                              inputProps={{
                                 type: 'text',
                                 size: 'small',
                              }}
                              labelProps={{
                                 text: 'Remuneração',
                                 visible: true,
                              }}
                              customClasses="flex-1"
                           />
                        </div>

                        <div className="flex items-center gap-2">
                           <Input
                              inputProps={{
                                 type: 'date',
                                 size: 'small',
                              }}
                              labelProps={{
                                 text: 'Data de início',
                                 visible: true,
                              }}
                              customClasses="flex-1"
                           />

                           <Input
                              inputProps={{
                                 type: 'date',
                                 size: 'small',
                              }}
                              labelProps={{
                                 text: 'Data de entrega',
                                 visible: true,
                              }}
                              customClasses="flex-1"
                           />
                        </div>

                        <div className="flex flex-col gap-2">
                           <label htmlFor="observation">Observações</label>
                           <textarea
                              name=""
                              id="observation"
                              cols={30}
                              rows={8}
                              className="resize-none rounded-lg bg-gray-200 p-4 text-gray-800 dark:text-black"
                           />
                        </div>

                        <div className="">
                           <button
                              type="button"
                              className="w-full rounded-lg bg-indigo-500 py-2 text-white transition-all duration-300 ease-out hover:bg-indigo-700 disabled:cursor-no-drop disabled:text-white disabled:opacity-50 disabled:hover:bg-indigo-500"
                           >
                              Registrar cliente
                           </button>
                        </div>
                     </form>
                  ) : (
                     <table className=" w-full ">
                        <thead className="w-full">
                           <tr>
                              {tableHeadNames.map((name) => (
                                 <th key={name} className="p-2">
                                    {name}
                                 </th>
                              ))}
                           </tr>
                        </thead>

                        <tbody className="">
                           {clients.map((client) => (
                              <tr key={client._id}>
                                 <td className="p-2 text-center">
                                    {client._id}
                                 </td>
                                 <td className="p-2 text-center">
                                    {client._name}
                                 </td>
                                 <td className="p-2 text-center">
                                    {client._initialDate}
                                 </td>
                                 <td className="p-2 text-center">
                                    {client._deliveryDate}
                                 </td>
                                 <td className="p-2 text-center">
                                    {client._cash.toLocaleString('pt-br', {
                                       style: 'currency',
                                       currency: 'BRL',
                                    })}
                                 </td>
                                 <td className="">
                                    <button
                                       type="button"
                                       className="m-1 rounded-full p-2 transition-all dark:hover:bg-blue-500"
                                       onClick={() => mostrar(client)}
                                    >
                                       <Pencil size={16} />
                                    </button>
                                    <button
                                       type="button"
                                       className="m-1 rounded-full p-2 transition-all dark:hover:bg-red-500"
                                       onClick={() => mostrar(client)}
                                    >
                                       <Trash size={16} />
                                    </button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  )}
               </div>
            </div>
         </main>
      </>
   );
}
