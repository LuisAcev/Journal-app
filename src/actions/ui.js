import { types } from "../types/types"


export const setError = (err) => {
    
   return { type: types.uiSetError,
            payload: err} 
    
}

export const  removeError = (  ) =>{

   return {type : types.uiRemoveError }
          
}

// Funciones para controlar y bloquear el loading mientras se 
//resuelve la promesa al momento de login en el LoginScreen

export const startLoading = () => {
   return {
       type:types.uiStartLoading,
       payload: true
   }
}

export const finishLoading = () => {
   return {
       type:types.uiFinishLoading,
       payload: false
   }
}