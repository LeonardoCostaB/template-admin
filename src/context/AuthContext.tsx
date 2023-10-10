'use client';

// import firebase from '@/firebase/config';
import { createContext, ReactNode } from 'react';

interface AuthContextProps {
   user?: User;
   googleLogin: () => Promise<void>;
}

interface AuthProviderProps {
   children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
   googleLogin: async () => {},
});

// async function userFirebase(user: firebase.User): Promise<User> {
//    const token = await user.getIdToken();

//    return {
//       uid: user.uid,
//       name: user.displayName,
//       email: user.email,
//       token,
//       provider: user.providerData[0].providerId,
//       img: user.photoURL,
//    };
// }

function AuthProvider({ children }: AuthProviderProps) {
   const googleLogin = async () => {
      console.log('estou logando com o google');

      // const seila = await new Promise((resolve) => resolve);
   };

   return (
      <AuthContext.Provider value={{ googleLogin }}>
         {children}
      </AuthContext.Provider>
   );
}

export { AuthContext, AuthProvider };
