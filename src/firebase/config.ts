import firebase from 'firebase/compat/app';
// import auth from 'firebase/auth';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const app = firebase.initializeApp({
   apiKey: process.env.NEXT_PUBLIC_API_KEY,
   authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
   projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
});

export default app.auth();
