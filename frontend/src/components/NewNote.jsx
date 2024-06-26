import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducers'
const NewNote = () => {
    const dispatch = useDispatch()
    
    const addNew = (event) => {
        event.preventDefault()
        const content = event.target.note.value
        dispatch(createNote(content))
        event.target.note.value = ''
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