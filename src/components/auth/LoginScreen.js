import React from 'react';
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import { removeError, setError } from '../../actions/ui';
import {  useNavigate } from "react-router-dom"


 const LoginScreen = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate ();
    const { loading, msgError } = useSelector(state => state.uiReducer);
    
   
    const [formValues,  handleInputChange] = useForm ({

        email:'react@gmail.com',

        password:''
    });


    const {email, password} = formValues


    const handleLogin = (e) =>{
        e.preventDefault();

        if(isFormValid() ){

            dispatch ( startLoginEmailPassword( email, password) );

            navigate ("/",{
                replace:true,
              });
        }
       
        
    }

    const handleGooglesingin= () =>{

        dispatch(startGoogleLogin());

        
    }


    // Validacion Email y password

    const isFormValid = () =>{

        if (!validator.isEmail(email) ){
            dispatch (setError("el email no es valido"));
            return false;
        }
        
        
        else if (password.length === 0){
            dispatch (setError("La contraseña no coincide y  debe tener al menos  6 caracteres"));
            return false;
        }

        dispatch (removeError()); // Retira el error en uiReducer del initialState
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>

            { msgError!= null ?
                <div className='auth__alert-error'>{ msgError }</div>:
                null
            }

            <form 
                onSubmit={ handleLogin }
                className='animate__animated animate__fadeIn animate__faster'> 

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange= { handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    onChange= { handleInputChange }
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={ loading } 
                >
                    Login
                </button>

                
                <div className="auth__social-networks">
                    <p>Login with social networks</p>

                    <div 
                        className="google-btn"
                    >
                        <div className="google-icon-wrapper" 
                             onClick={ handleGooglesingin }>
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link 
                    to="/auth/register"
                    className="link"
                >
                    Create new account    
                </Link>

            </form>
        </>
    )
}

export default LoginScreen;