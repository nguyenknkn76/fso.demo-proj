import { useDispatch, useSelector } from 'react-redux'
import { setNotes, toggleImportanceOf } from '../reducers/noteReducers'
import { useEffect } from 'react'
import NoteService from '../services/NoteService'

const Notes = () => {
    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)
    // const notes = useSelector(state => {
    //     if(filter === "IMPORTANT") return state.notes.filter(note => note.important)
    //     else if(filter === "NONIMPORTANT") return state.notes.filter(note => !note.important)
    //     else return state.notes
    // })
    const notes = useSelector(state => state.notes)
    
    const fetchNotes = async() => {
        const loadNotes = await NoteService.getAll()
        dispatch(setNotes(loadNotes))
    }

    useEffect( () => {
        fetchNotes()
    },[])
    
    const toggleImportance = (id) => {
        dispatch(toggleImportanceOf(id))
    }

    return (
        <div>
            <ul>
                {
                    notes?.map(note =>
                        <li key={note.id} onClick={() => toggleImportance(note.id)}>
                            {note.content} <strong>{note.important ? 'important' : null}</strong>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default Notes