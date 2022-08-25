import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth,signInAuthUserWithEmailAndPassword} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.style.scss';
import Button from '../button/button.component';
import Authentication from '../../routes/authentication/authentication.component';


const defaultFormFields = {
    email: '',
    password: '',
}



const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {  email, password} = formFields;
    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try{
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response)
            resetFormFields();
        } catch(error){

            switch(error.code){
                case "auth/wrong-password":
                    alert("Incorrect password for email");
                    break
                case 'auth/user-not-found':
                    alert("No user associated with this email");
                    break;
                default:
                    console.log(error);
            }

        }

    }

    const handleChange = (event) => {
        const {name, value} = event.target; // this'll return all elements attach to the input

        setFormFields({...formFields, [name]: value})
    }

    return(
        <div className='sign-in-container'>
           <h1>I already have an account</h1>
            <p>Sign in with your email and password</p>
            <form onSubmit={handleSubmit}>

                <FormInput label="Email"  type="email" name="email" onChange={handleChange} value={email} required />
                <FormInput label="Password"  type="password" name="password" onChange={handleChange} value={password} required />

            <div className="buttons-container">
                <Button type="submit" >Sign In</Button>
                {/* <Button buttonType="google"> Sign in with Google </Button> */}
            </div>

            </form>
        </div>

    )
}

export default SignInForm;