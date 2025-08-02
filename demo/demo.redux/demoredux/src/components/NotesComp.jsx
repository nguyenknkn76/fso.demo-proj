import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";
import { useState } from "react";

const Note = ({note, handleClick}) => {
    return(
        <li onClick={handleClick}>
            {note.id} : {note.content} | <strong>{note.important === true ? 'imp: make not imp' : 'non-imp : make imp'}</strong>
        </li>
    )
}

const Notes = () => {
    const dispatch = useDispatch()
    const notes = useSelector((state) => state)
    return(
        <div>
            <h2>all note</h2>
            <ul>
                {notes.map(note =>
                    <Note 
                        key={note.id}
                        note = {note}
                        handleClick = {() => dispatch(toggleImportanceOf(note.id))}
                    />
                )}
            </ul>
        </div>
        
    )
}

export default Notes