'use client';

import { createContext, ReactNode, useState } from 'react';

interface AppContextProps {
   theme: 'dark' | '';
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
   };

   return (
      <AppContext.Provider value={{ theme, isToggleTheme }}>
         {children}
      </AppContext.Provider>
   );
}

export { AppContext, AppProvider };
