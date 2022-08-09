import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBdpaH2xwUYyDNaavMcxqNL7IzLYaT_9Mk",
    authDomain: "crwn-clothing-db-65eab.firebaseapp.com",
    projectId: "crwn-clothing-db-65eab",
    storageBucket: "crwn-clothing-db-65eab.appspot.com",
    messagingSenderId: "185690253711",
    appId: "1:185690253711:web:20a31ae3f20cd460eec3fa"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
    if(!userAuth) return;
       additionalInformation = {};
      const userDocRef = doc(db, 'users', userAuth.uid);
      console.log(userDocRef)

      const userSnapshot = await getDoc(userDocRef);
      console.log(userSnapshot)
      console.log(userSnapshot.exists())

      if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try{
          await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation,
          })
        }catch(error){
          console.log('error creating the user', error.message);
        }
      }
      return userDocRef;
  };




  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup( auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
  
  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  }