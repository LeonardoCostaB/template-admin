import clsx from 'clsx';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ToastProps {
   message: string;
   messageType: 'sucess' | 'error' | 'alert';
   cb: (message: string) => void;
}

export function Toast({ message, messageType, cb }: ToastProps) {
   const [barWidth, setBarWidth] = useState<number>(0);

   useEffect(() => {
      if (message.length) {
         for (let i = 0; i <= 100; i++) {
            timer_thing(i);
         }
      }

      function timer_thing(i: number) {
         setTimeout(function () {
            update_progress(i);
         }, 100 * i);
      }

      function update_progress(pct: number) {
         if (!isNaN(pct)) {
            if (pct > 100) {
               pct = 100;
            }
            if (pct < 0) {
               pct = 0;
            }
         }

         // Check for finish
         if (pct === 100) {
            cb('');
         } else {
            setBarWidth(pct);
         }
      }
   }, [message.length]);

   return (
      <div
         className={clsx(
            'fixed -right-full top-10 max-w-xs transition-all duration-300 ease-linear',
            {
               'bg-red-500 text-white': messageType === 'error',
               '!right-10': message.length > 0,
            },
         )}
      >
         <div className="flex items-center gap-1 px-3 py-2">
            <p className="text-center text-sm">{message}</p>

            <button
               type="button"
               className="rounded-full p-1 transition-colors duration-200 hover:bg-red-400 active:bg-red-300"
               onClick={() => cb('')}
            >
               <X size={14} />
            </button>
         </div>

         <div className="relative h-1 w-full bg-red-800">
            <div
               style={{ width: `${barWidth}%` }}
               className="absolute right-0 h-1 bg-red-500 transition-all duration-200 ease-linear"
            />
         </div>
      </div>
   );
}
