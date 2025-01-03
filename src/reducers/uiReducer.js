import { types } from "../types/types";

const inicialState = {

    loading : false,
    msgError : null
}



export const uiReducer = ( state= inicialState, action) => {

    switch (action.type) {
        case types.uiSetError:
            return {
                ...state,
                msgError: action.payload
            };
            
        case types.uiRemoveError:
            return {
            ...state,
             msgError: null
            }

        case types.uiStartLoading:
            return {
                ...state,
                loading: action.payload,

            };
         
        case types.uiFinishLoading:
            return {
                ...state,
                loading: action.payload,

            }

        default:
            return state;
    }

}