import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducers'
import NoteService from '../services/NoteService'
const NewNote = () => {
    const dispatch = useDispatch()
    
    const addNew = async (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ''
        const newNote = await NoteService.createNew(content)
        dispatch(createNote(newNote))
    }
    return (
        <div>
            <form onSubmit={addNew}>
                <input name='note'/>
                <button type='submit'>add new</button>
            </form>
        </div>
    )
}

export default NewNote