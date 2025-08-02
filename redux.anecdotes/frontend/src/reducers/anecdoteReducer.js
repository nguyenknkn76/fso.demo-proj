export const listContent = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
    'Hello world !!! Object Oriented Programing'
]

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export const initState = listContent.map(content => ({
    id: generateId(),
    content,
    votes: 0
}))

const anecdoteReducer = (state = initState, action) =>{
    switch(action.type){
        case "NEW_ANEC": return [...state, action.payload]
        case "VOTE_ANEC" : {
            const id  = action.payload
            const needVoteAnecBf = state.find(anec => anec.id === id)
            const needVoteAnecAt = {...needVoteAnecBf, votes: needVoteAnecBf.votes + 1}
            return state.map(anec => anec.id !== id ? anec : needVoteAnecAt)
        }
        case "SORT_ANEC": {
            const sortedState = state.slice().sort((a, b) => b.votes - a.votes)
            return sortedState
        }
        default : return state
    }
}


export const creatorNewAnec = (content) => {
    return({
        type: "NEW_ANEC",
        payload: {
            id: generateId(),
            content,
            votes: 0
        }
    })
}

export const creatorEditAnec = (id, content) => {
    return({
        type: "EDIT_ANEC",
        payload:{
            id,
            content
        }
    })
}

export const creatorVoteAnec = id => {

    return({
        type:"VOTE_ANEC",
        payload: id
    })
}

export const creatorSortAnec = () => {
    return({
        type:"SORT_ANEC"
    })
}
export default anecdoteReducer