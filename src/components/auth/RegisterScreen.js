import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';


export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.uiReducer);
    console.log(msgError)

    const [ values, handleInputChange ]= useForm({
        name:'felipe', 
        email:'react@gmail.com', 
        password:123456, 
        password2:123456
    });
    
    const {name, email, password, password2} = values;

    const handleRegister = (e) =>{
        e.preventDefault();
        if(isFormValid()){
            
            dispatch(startRegisterWithEmailPasswordName(email, password, name));
        }

        
    }
        
    const isFormValid = () =>{

        if(name.trim().length === 0){
           dispatch (setError("el nombre es requeido "));
            return false;
        }

        else if (!validator.isEmail(email) ){
            dispatch (setError("el email no es valido"));
            return false;
        }
        
        
        else if (password !==  password2 || password.length < 5){
            dispatch (setError("La contraseña no coincide y mas debe tener al menos  6 caracteres"));
            return false;
        }

        dispatch (removeError()); // Retira el error en uiReducer del initialState
        return true;
    }



    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form 
                onSubmit={handleRegister}
                className='animate__animated animate__fadeIn animate__faster'>

               { 
                msgError != null ?

                <div className='auth__alert-error'> { msgError } </div>:
                null
                
                }

                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleInputChange }
                />

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email}
                    onChange={ handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={ password2 }
                    onChange={ handleInputChange }
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

               

                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
