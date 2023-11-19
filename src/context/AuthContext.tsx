'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import firebase from '@/firebase/config';
import { GoogleAuthProvider, User as UserFirebase } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { userFirebase } from '@/utils/userFirebase';
import { isLoggedIn } from '@/utils/isLoggedinCookie';
import Cookies from 'js-cookie';

interface AuthContextProps {
   user: User | null;
   googleLogin: () => Promise<void>;
   logout: () => Promise<void>;
   loading?: boolean;
}

interface AuthProviderProps {
   children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
   user: null,
   googleLogin: async () => {},
   logout: async () => {},
});

function AuthProvider({ children }: AuthProviderProps) {
   const [user2, setUser2] = useState<User | null>(null);
   const [loadingContent, setLoadingContent] = useState(true);
   const router = useRouter();

   async function getSession(userSession: UserFirebase | null) {
      if (userSession?.email) {
         const userData = await userFirebase(userSession);

         setUser2(userData);

         isLoggedIn(true);

         setLoadingContent(false);

         return userData.email;
      }

      setUser2(null);
      isLoggedIn(false);
      setLoadingContent(false);

      return false;
   }

   const googleLogin = async () => {
      const { user } = await firebase.signInWithPopup(new GoogleAuthProvider());

      await getSession(user as UserFirebase);
      router.push('/');
   };

   const logout = async () => {
      await firebase.signOut();
      await getSession(null);
      router.push('/login');
   };

   useEffect(() => {
      if (Cookies.get('isLoggedIn')) {
         const removeWatch = firebase.onIdTokenChanged(
            async (user) => await getSession(user as UserFirebase),
         );

         return () => removeWatch();
      }
   }, []);

   return (
      <AuthContext.Provider
         value={{ googleLogin, user: user2, logout, loading: loadingContent }}
      >
         {children}
      </AuthContext.Provider>
   );
}

export { AuthContext, AuthProvider };
