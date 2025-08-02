import { useDispatch, useSelector } from "react-redux"
import { creatorNewAnec } from "../reducers/anecdoteReducer"
const FormNewAnecdote = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)

    const submitAddNewAnec = (event) => {
        event.preventDefault()
        const anecdoteContent = event.target.newAnecdote.value
        event.target.newAnecdote.value = ''
        dispatch(creatorNewAnec(anecdoteContent))
    }

    return(
        <div>
            <form onSubmit={submitAddNewAnec}>
                new anec : <input name='newAnecdote'/>
                <button type='submit'>add</button>
            </form>
        </div>
    )
}

export default FormNewAnecdote