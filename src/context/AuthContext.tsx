'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import firebase from '@/firebase/config';
import {
   GoogleAuthProvider,
   User as UserFirebase,
   // eslint-disable-next-line comma-dangle
   AuthError,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { userFirebase } from '@/utils/userFirebase';
import { isLoggedIn } from '@/utils/isLoggedinCookie';
import Cookies from 'js-cookie';
import { Toast } from '@/components/Toast';

interface LoginProps {
   email: string;
   password: string;
}

interface AuthContextProps {
   user: User | null;
   login: ({ email, password }: LoginProps) => Promise<void>;
   googleLogin: () => Promise<void>;
   userRegister: ({ email, password }: LoginProps) => Promise<void>;
   logout: () => Promise<void>;
   loading?: boolean;
}

interface AuthProviderProps {
   children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
   user: null,
   login: async () => {},
   googleLogin: async () => {},
   userRegister: async () => {},
   logout: async () => {},
});

function AuthProvider({ children }: AuthProviderProps) {
   const [user2, setUser2] = useState<User | null>(null);
   const [loadingContent, setLoadingContent] = useState(true);
   const [errors, setErros] = useState<string>('');
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

   const login = async ({ email, password }: LoginProps) => {
      console.log('email', email, 'password:', password);

      try {
         setLoadingContent(false);

         const res = await firebase.signInWithEmailAndPassword(email, password);

         await getSession(res.user as UserFirebase);
         router.push('/');
      } catch (e) {
         const { code } = e as AuthError;

         console.log(code);

         if (code === 'auth/user-not-found') {
            setErros('Usuário não existe');
         }

         if (code === 'auth/wrong-password') {
            setErros(
               'Email ou senha incorreta, verifique os campos e tente novamente',
            );
         }

         if (code === 'auth/too-many-requests') {
            setErros(
               'Sua conta foi temporariamente bloqueada pelo o acesso de tentativa, por favor, tente mais tarde',
            );
         }
      } finally {
         setLoadingContent(true);
      }
   };

   const googleLogin = async () => {
      const { user } = await firebase.signInWithPopup(new GoogleAuthProvider());

      await getSession(user as UserFirebase);
      router.push('/');
   };

   const userRegister = async ({ email, password }: LoginProps) => {
      console.log('email:', email, 'pass:', password);
      try {
         const createUser = await firebase.createUserWithEmailAndPassword(
            email,
            password,
         );

         await getSession(createUser.user as UserFirebase);
         // router.push('/');
      } catch (e) {
         const error = e as AuthError;

         console.warn(error.message);
         console.error(error.code);
      }
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
         value={{
            login,
            googleLogin,
            userRegister,
            user: user2,
            logout,
            loading: loadingContent,
         }}
      >
         <Toast
            message={errors}
            messageType="error"
            cb={(message) => setErros(message)}
         />

         {children}
      </AuthContext.Provider>
   );
}

export { AuthContext, AuthProvider };
