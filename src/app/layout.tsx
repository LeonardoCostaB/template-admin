import './globals.css';
import { Poppins } from 'next/font/google';
import { AppProvider } from '@/context/AppContext';
import { AuthProvider } from '@/context/AuthContext';

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
            <AuthProvider>
               <AppProvider>{children}</AppProvider>
            </AuthProvider>
         </body>
      </html>
   );
}
