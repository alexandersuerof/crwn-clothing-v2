import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
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

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup( auth, provider);
  
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) =>{
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
            createdAt
          })
        }catch(error){
          console.log('error creating the user', error.message);
        }
      }
      return userDocRef;
  }