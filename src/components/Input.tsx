'use client';

import clsx from 'clsx';
import { useRef } from 'react';

interface InputProps {
   labelProps: {
      visible?: boolean;
      text: string;
   };
   inputProps: {
      type: string;
      placeholder?: string;
      register?: any;
      size: 'small' | 'normal' | 'large';
   };
   error?: {
      show: boolean;
      message?: string;
   };
}

export function Input({
   inputProps: { type, placeholder, register, size = 'normal' },
   labelProps: { text, visible = true },
   error,
}: InputProps) {
   const labelRef = useRef<HTMLLabelElement>(null);

   return (
      <div className="relative flex flex-col gap-1">
         <label
            htmlFor="email"
            className={clsx('w-fit', {
               'sr-only': !visible,
            })}
            ref={labelRef}
         >
            {text}
         </label>

         <input
            type={type}
            className={clsx(
               'rounded-lg border bg-gray-200 px-4 text-gray-800',
               {
                  'py-2': size == 'small',
                  'py-3': size == 'normal',
                  'py-4': size == 'large',
                  'border-transparent': !error?.show,
                  'border-red-500': error?.show,
               },
            )}
            placeholder={placeholder ?? ''}
            {...register}
         />

         {error?.message && (
            <span
               className="absolute top-1 h-fit text-xs text-red-500"
               style={{
                  left: labelRef.current
                     ? labelRef.current.offsetWidth + 10
                     : 0,
               }}
            >
               {error?.message}
            </span>
         )}
      </div>
   );
}
