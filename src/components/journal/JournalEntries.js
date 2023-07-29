import React from 'react'
import { JournalEntry } from './JournalEntry';
import { useSelector } from 'react-redux';

export const JournalEntries = () => {

    const { note } = useSelector(state => state.noteReducer );

    return (
        <div className="journal__entries ">
            
            {
                note.map( value => (
                    <JournalEntry 
                    key={ value.id }
                    id = { value.id }
                    title = { value.title }
                    date = { value.date }
                    body = { value.body }
                    url={ value.url }
                     />
                ))
            }

        </div>
    )
}
