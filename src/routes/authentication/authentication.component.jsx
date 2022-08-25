import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import { auth, createUserDocumentFromAuth, signInWithGooglePopup,signInWithGoogleRedirect } from '../../utils/firebase/firebase.utils';
import SignUpForm from '../../components/sign-up-form/sign-up.component';
import SignInForm from '../../components/sign-in-form/sign-in.component';
import Button from "../../components/button/button.component";
import '../authentication/authentication.style.scss';


const Authentication = () => {

    useEffect(() => {
        (async () => {
          const response = await getRedirectResult(auth);
          if (response) {
            const userDocRef = await createUserDocumentFromAuth(response.user);
          }
        })();
      }, []);

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };

    return(
        <div className="authentication-container">
            <SignInForm />
            <Button buttonType="google" onClick={logGoogleUser}> Sign in with Google</Button>
            {/* <button onClick={signInWithGoogleRedirect}> Sign in with Google Redirect</button> */}
            <SignUpForm/>
        </div>
    );
};

export default Authentication;