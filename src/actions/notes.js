import { db } from "../firebase/firebaseConfig";
import { collection , addDoc, doc, updateDoc, deleteDoc} from "firebase/firestore";
import Swal from "sweetalert2";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import { fileUpload } from "../helpers/fileUpload";

// crear nueva nota y enviar a la base de datos de Firestore
export const startNewNote = () =>{
    return async(  dispatch, getState ) => {

        const { uid }= getState().authReducer;
        
        const newNote = {
            title: '',
            body: '',
            date : new Date().getTime()

        }
        const docRef = await addDoc(collection(db , uid, "journal/notes"),newNote);

        
       dispatch (activeNote( docRef.id , newNote))
       dispatch(addNewNote(docRef.id, newNote))

    }

    
}

export const startLoadingNotes = ( uid ) =>{
    return async (dispatch) =>{
        const notes =  await loadNotes( uid );
        dispatch ( setNotes( notes ) )

    }
}


export const activeNote = (id, note) => {

       return  {    type: types.notesActive,
                    payload :{
                        id,
                        ...note
                     }
               }
}


export const addNewNote =(id, note) =>{
    return {
        type:types.notesAddNew,
        payload:{
             id, 
            ...note,
            
        }
    }
}

export const setNotes =( notes ) =>({
    type:types.notesload,
    payload : notes

});

export const startSaveNote = ( note ) =>{
    return async (dispatch, getState)=>{
        const { uid } = getState().authReducer;
        
        if (!note.url){
            delete note.url;
        }
        const noteToFireStore = {...note};
        delete noteToFireStore.id;

        await updateDoc ( doc(db, uid, "/journal/notes/", note.id), noteToFireStore)
        
        dispatch(refrechNote(note.id, noteToFireStore ));
        Swal.fire ('Save', note.title, 'success' );
    }
}

// Funcion que me permite refrescar la nota sin tener que recargar la pagina solo tomando la info del reducer que tiene precargado ese estdo
export const refrechNote = (id, note)=>({
    type: types.notesUpdated,
    payload:{
        id, note:{
            id,
            ...note
        }
    }
})



export const startUploading = ( file ) => {
    return async( dispatch, getState )=>{
        const { active } = getState().noteReducer; 

        Swal.fire({
            title: 'Uploading',
            text: 'please wait... ',
            allowOutsideClick: false,
            onBeforeOpen:()=>{
               Swal.showLoading(); 
            }
        })

        const fileUrl = await fileUpload( file );
        active.url =fileUrl;

        dispatch(startSaveNote(active));

        Swal.close();

    }
}

// funcion para borrar documentos de firestore (promesa)
export const startDeleting =( id )=>{
    return async(dispatch, getState)=>{
        const uid = getState().authReducer.uid;
        await deleteDoc ( doc(db, uid, "/journal/notes/", id));

        dispatch(deleteNote( id ));
    }
}

export const deleteNote =( id )=>{
    return {
        
        type: types.notesDelete,
        payload: id

    }
}

export const noteLogOut = ()=>{

    return {

        type: types.noteslogoutCleaning,
        
    }

}