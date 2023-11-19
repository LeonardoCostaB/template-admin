import { User as UserFirebaseProps } from 'firebase/auth';

export async function userFirebase(user: UserFirebaseProps): Promise<User> {
   const token = await user.getIdToken();

   return {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      token,
      provider: user.providerData[0]?.providerId,
      img: user.photoURL,
   };
}
