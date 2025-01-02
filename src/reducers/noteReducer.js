import { types } from "../types/types";


const initialState ={
    note:[],
    active: null
}

export const noteReducer= (state = initialState, action) =>{
    switch (action.type) {
            case types.notesActive:
                
                return {
                    ...state,
                    active:{
                        ...action.payload
                    }
                }
        
            case types.notesAddNew:
            return {
                
                ...state,
                note: [ action.payload, ...state.note ] 
                    
                   }       
                   
            case types.notesload:
            
            return {
                ...state,
                note:[ ...action.payload]
            }

            case types.notesUpdated:
            return {
                ...state,
                note: state.note.map(
                    note => note.id === action.payload.id 
                    ? action.payload.note 
                    : note
                    
                )
            }

            case types.notesDelete:
            return {

                ...state,
                active: null,
                note: state.note.filter(note => note.id !== action.payload) 
                    
                   }

            case types.noteslogoutCleaning:
            return {
                
                ...state,
                active:null,
                note : []
                    
                   }


        default:
           return state;
    }
};

