import { createSlice, current } from "@reduxjs/toolkit"


const generateId = () =>
    Number((Math.random() * 1000000).toFixed(0))

const noteSlice = createSlice({
    name:'notes',
    initialState: [],
    reducers: {
        createNote(state, action){
            state.push(action.payload)
        },
        toggleImportanceOf(state, action){
            const id = action.payload
            const noteToChange = state.find(note => note.id === id)
            const changedNote = {...noteToChange, important: !noteToChange.important}
            console.log('current state',current(state))
            return state.map(note => 
                note.id!==id ? note : changedNote
            )
        },
        setNotes(state, action) {
            return action.payload
        }
        
    }
})

export const {createNote, toggleImportanceOf,setNotes} = noteSlice.actions

export default noteSlice.reducer

// const initialState = [
//     {
//         content: 'reducer defines how redux store works',
//         important: true,
//         id: 1,
//     },
//     {
//         content: 'state of store can contain any data',
//         important: false,
//         id: 2,
//     },
// ]


// const noteReducers = (state = initialState, action) => {
//     switch(action.type){ 
//         case "new_note": {
//             return [...state, action.payload]
//         }
//         case "toggle_importance": {
//             const id = action.payload.id
//             const noteToChange = state.find(note => note.id === id)
//             const changedNote = {...noteToChange, important: !noteToChange.important}
//             return state.map(note => note.id !== id ? note : changedNote)
//         }
//         case "set_notes": {
//             return action.payload
//         }
//         default:  return state
//     }
// }



// export const setNotes = (notes) => {
//     return{
//         type: 'set_notes',
//         payload: notes
//     }
// }

// export const createNote = (content) => {
//     return{
//         type: 'new_note',
//         payload: {
//             id: generateId(),
//             content,
//             important: false
//         }
//     }
// }

// export const toggleImportanceOf = (id) => {
//     return{
//         type: 'toggle_importance',
//         payload: {id}
//     }
// }

// export default noteReducers