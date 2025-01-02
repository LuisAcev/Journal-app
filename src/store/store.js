import {  configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
 //import { createStore, combineReducers } from 'redux'
import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';
import { noteReducer } from '../reducers/noteReducer';

// CON REDUX TOOLKIT YA NO ES NECESARIO EL combineREducer ni creatStore ya configureStor hace las dos funciones

export  const store = configureStore({

    reducer: {
        
        authReducer,
        uiReducer,
        noteReducer
    },

    middleware: [thunk]
   
    }

);
   
   