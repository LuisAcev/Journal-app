import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {
    const dispatch = useDispatch();

    // Extraer del noteReducer el active con la data para enviar al Cloud Firestore
    const { active } = useSelector(state => state.noteReducer );

    const handleSave = () =>{
        dispatch ( startSaveNote(active) );
    }

    const handlePictureUpload= () =>{

       document.querySelector('#fileSelector').click();
        
    }


    const handleFileChange = (e) =>{
        const file = e.target.files[0];
        if( file )
        {
            dispatch ( startUploading( file ) );
        }

    }

    return (
        <div className="notes__appbar">
            <span>28 de agosto 2020</span>

            <input 
                id='fileSelector'
                type='file' 
                style={{ display: 'none' }}
                name='file'
                onChange={ handleFileChange }
            />

            <div>
                <button className="btn"
                        onClick={ handlePictureUpload }>
                    Picture
                </button>

                <button className="btn"
                        onClick={ handleSave }>
                    Save
                </button>
            </div>
        </div>
    )
}
