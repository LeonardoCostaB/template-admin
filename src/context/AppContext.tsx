'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';

interface AppContextProps {
   theme: string;
   isToggleTheme: () => void;
}

interface AppProviderProps {
   children: ReactNode;
}

const AppContext = createContext<AppContextProps>({
   theme: '',
   isToggleTheme: () => false,
});

function AppProvider({ children }: AppProviderProps) {
   const [theme, setTheme] = useState<AppContextProps['theme']>('dark');

   const isToggleTheme = () => {
      setTheme(theme ? '' : 'dark');

      localStorage.setItem('theme', theme ? 'ligth' : 'dark');
   };

   useEffect(() => {
      const themeStorage = localStorage.getItem('theme');

      if (!themeStorage) {
         localStorage.setItem('theme', theme);
      }

      setTheme(themeStorage === 'ligth' ? '' : 'dark');
   }, []);

   return (
      <AppContext.Provider value={{ theme, isToggleTheme }}>
         {children}
      </AppContext.Provider>
   );
}

export { AppContext, AppProvider };
