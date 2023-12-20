'use client';

import clsx from 'clsx';
import { Eye, EyeOff } from 'lucide-react';
import { useRef, useState } from 'react';

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
      seePassword?: boolean;
      disabled?: boolean;
      refValue?: string | null;
      focusEv?: (value: string) => void;
      blurEv?: (value: string) => void;
      changeEv?: (value: string) => void;
   };
   customClasses?: string;
   error?: {
      show: boolean;
      message?: string;
   };
   tutorial?: boolean;
}

export function Input({
   inputProps: {
      type,
      placeholder,
      register,
      size = 'normal',
      seePassword,
      disabled,
      refValue = '',
      focusEv,
      blurEv,
      changeEv,
   },
   labelProps: { text, visible = true },
   customClasses,
   error,
   tutorial = false,
}: InputProps) {
   const labelRef = useRef<HTMLLabelElement>(null);
   const [toggleSeePassword, setToggleSeePassword] =
      useState<string>('password');
   const [tutorialForPass, setTutorialForPass] = useState<boolean>(false);

   return (
      <div
         className={clsx('relative flex flex-col gap-1', {
            [`${customClasses}`]: customClasses && customClasses?.length > 0,
         })}
      >
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
            type={seePassword ? toggleSeePassword : type}
            className={clsx(
               'w-full rounded-lg border bg-gray-200 px-4 text-gray-800 transition-all',
               {
                  'py-2': size == 'small',
                  'py-3': size == 'normal',
                  'py-4': size == 'large',
                  'border-transparent': !error?.show,
                  'border-red-500': error?.show,
                  'cursor-no-drop opacity-50': disabled,
               },
            )}
            placeholder={placeholder ?? ''}
            {...register}
            onFocus={
               tutorial
                  ? () => setTutorialForPass(true)
                  : focusEv
                  ? (e) => focusEv(e.target.value)
                  : () => false
            }
            onBlur={
               tutorial
                  ? () => setTutorialForPass(false)
                  : blurEv
                  ? (e) => blurEv(e.target.value)
                  : () => false
            }
            disabled={disabled}
            {...(refValue ? { value: refValue } : false)}
            {...(changeEv ? { onChange: (e) => changeEv(e.target.value) } : {})}
         />

         {tutorialForPass && (
            <div className="absolute left-[calc(-42%+-10px)] top-0 w-fit rounded-md bg-white p-4 text-sm text-black shadow-md">
               Sua senha deve conter:
               <ul className="ml-8 list-disc text-xs text-black">
                  <li>No mínimo 8 caracteres</li>
                  <li>Uma letra maiúscula</li>
                  <li>Um número</li>
               </ul>
               <div className="absolute left-[calc(100%+-10px)] top-1/2 h-5 w-5 -translate-y-1/2 rotate-45 bg-white" />
            </div>
         )}

         {seePassword && (
            <button
               type="button"
               className={clsx('absolute right-2 text-sm text-black', {
                  'top-[42px]': size === 'small',
                  'top-[46px]': size === 'normal',
               })}
               onClick={() =>
                  setToggleSeePassword((prev) =>
                     prev === 'password' ? 'text' : 'password',
                  )
               }
            >
               {toggleSeePassword === 'password' ? (
                  <Eye size={16} />
               ) : (
                  <EyeOff size={16} />
               )}
            </button>
         )}

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
