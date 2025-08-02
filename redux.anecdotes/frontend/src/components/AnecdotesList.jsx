import {useDispatch, useSelector} from 'react-redux'
import { initState, creatorNewAnec, creatorVoteAnec, creatorSortAnec} from '../reducers/anecdoteReducer'
import { useEffect } from 'react'

const AnecdotesList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)
    const sortedAnecdotes = anecdotes.slice().sort((a, b) => b.votes - a.votes)
    console.log(anecdotes)

    // useEffect(()=> {
    //     dispatch(creatorNewAnec('hello sir'))
    // },[])
    
    const voteAnec = id => {
        dispatch(creatorVoteAnec(id))
    }

    const sortAnecdotesList = () => {
        dispatch(creatorSortAnec())
    }

    return(
        <div>
            this is Anecdotes List
            <ul>
                {anecdotes?.map(anecdote => (
                    <li key={anecdote.id}>
                        {anecdote.id} : {anecdote.content} <strong>(votes: {anecdote.votes})</strong> <button onClick={() => voteAnec(anecdote.id)}>vote</button>
                    </li>
                ))}
            </ul>
            sort anec by no of votes <button onClick={sortAnecdotesList}>sort</button> 
            <br/><br/>
        </div>
    )
}
export default AnecdotesList