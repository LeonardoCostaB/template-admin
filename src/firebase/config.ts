import firebase from 'firebase/app';
import auth from 'firebase/auth';

if (!firebase.getApps.length) {
   firebase.initializeApp({
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
   });
}

export default auth;
