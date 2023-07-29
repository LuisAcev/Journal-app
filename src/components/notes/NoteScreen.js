import React, { useEffect, useRef } from 'react'
import { NotesAppBar } from './NotesAppBar'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { activeNote, startDeleting } from '../../actions/notes'

export const NoteScreen = () => {

    const { active } = useSelector(state=> state.noteReducer);
    const  [formValues, handleInputChange,reset ] = useForm(active);
    const {body, title, id } = formValues;
    const dispatch = useDispatch();

    const activeId = useRef( active.id );

    useEffect(()=>{

        if(active.id !== activeId.current ){
            reset( active );
            activeId.current = active.id
        }


    },[active, reset])

    useEffect (()=>{

        dispatch ( activeNote( formValues.id, {...formValues}) );

    },[formValues, dispatch])

    const handleDelete = () =>{

        dispatch ( startDeleting(id) );
    }

    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    name='title'
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    onChange={ handleInputChange}
                    value={ title }
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    name='body'
                    onChange={ handleInputChange}
                    value={ body }
                ></textarea>

                {
                    (active.url)
                    &&( 
                        <div className="notes__image">
                            <img 
                                src= { active.url }
                                alt="imagen"
                            />
                        </div>
                       )
                }


            </div>

            <button className='btn btn-danger'
                    onClick={ handleDelete }>
                delete
            </button>

        </div>
    )
}
