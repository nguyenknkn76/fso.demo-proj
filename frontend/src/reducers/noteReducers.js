const initialState = [
    {
      content: 'reducer defines how redux store works',
      important: true,
      id: 1,
    },
    {
      content: 'state of store can contain any data',
      important: false,
      id: 2,
    },
  ]

const noteReducers = (state = initialState, action) => {
    switch(action.type){ 
        case "new_note": {
            return [...state, action.payload]
        }
        case "toggle_importance": {
            const id = action.payload.id
            const noteToChange = state.find(note => note.id === id)
            const changedNote = {...noteToChange, important: !noteToChange.important}
            return state.map(note => note.id !== id ? note : changedNote)
        }
        case "set_notes": {
            return action.payload
        }
        default:  return state
    }
}

const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))

export const setNotes = (notes) => {
    return{
        type: 'set_notes',
        payload: notes
    }
}

export const createNote = (content) => {
    return{
        type: 'new_note',
        payload: {
            id: generateId(),
            content,
            important: false
        }
    }
}

export const toggleImportanceOf = (id) => {
    return{
        type: 'toggle_importance',
        payload: {id}
    }
}

export default noteReducers