import { auth, googleAuthProvider } from "../firebase/firebaseConfig.js"
import {  signInWithPopup, createUserWithEmailAndPassword ,updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { types } from "../types/types"
import { startLoading,finishLoading } from "./ui.js";
import Swal from 'sweetalert2';
import { noteLogOut } from "./notes.js";



export  const startLoginEmailPassword = ( email, password ) => {
    
    return ( dispatch )=> {

        dispatch(startLoading ()); 
        
        signInWithEmailAndPassword(auth, email, password)
            .then ( ({ user }) => {
                
                dispatch( login(user.uid, user.displayName) ); 
                dispatch( finishLoading() );
            
            })

            .catch(err => {
                console.log(err.FirebaseError)
                dispatch( finishLoading());
                Swal.fire('Error',err.message,'error')
                
            })
        }
    };

    

 // Regsitro y autenticacion en Firebase de Usario con Email y contraseña
 export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return ( dispatch ) =>{
        createUserWithEmailAndPassword (auth, email, password)
            .then( async({ user }) => {
                await updateProfile(user, {
                                    displayName: name})  

                dispatch ( login(user.uid , user.displayName) )

            })
            .catch ( console.log ('El usuario ya existe'))

        } 

    }

 export const startGoogleLogin = () => {
    return (dispatch) =>{

            signInWithPopup(auth, googleAuthProvider )
            .then( ({ user }) => {

                dispatch ( login(user.uid , user.displayName) )

            })
        }

    }


export const login = ( uid, displayName ) =>{
    
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }

    }

}

export const logout = ( uid, displayName ) =>{
    
    return {
        type: types.logout,

    }

}

export const startLogout= () => {

    return (dispatch) =>{
        
        signOut( auth )
        .then(()=>{
            dispatch(logout());
            dispatch(noteLogOut());
        }).catch(err => err)
         
    }
}

