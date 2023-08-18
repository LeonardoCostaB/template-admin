import './globals.css';
import { Poppins } from 'next/font/google';
import { Menu } from '@/components/Menu';
import { AppProvider } from '@/context/AppContext';

const poppins = Poppins({
   subsets: ['latin'],
   weight: ['300', '400', '500', '600', '700'],
   variable: '--font-poppins',
});

export const metadata = {
   title: 'Template Admin',
   description: 'Template Admin Creation',
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="pt-br">
         <body className={`${poppins.variable} h-screen font-sans`}>
            <AppProvider>
               <Menu />

               <div className="flex w-full flex-col bg-gray-300 dark:bg-gray-800 dark:text-gray-200">
                  {children}
               </div>
            </AppProvider>
         </body>
      </html>
   );
}
