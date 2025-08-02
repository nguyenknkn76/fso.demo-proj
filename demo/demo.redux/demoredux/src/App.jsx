import NewNote from "./components/NewNoteComp"
import Notes from "./components/NotesComp"
import { createNote, toggleImportanceOf } from "./reducers/noteReducer"
import { useSelector, useDispatch } from "react-redux"

const App = () => {
  
  return(
    <div>
      <NewNote/>
      <Notes/>
    </div>
  )
}
// import { useState } from "react"
// import { createStore } from "redux"

// const couterReducer = (state = 0, action) => {
//   switch(action.type){
//     case 'INCREAMENT': return state + 1
//     case 'DECREAMENT': return state - 1
//     case 'ZERO': return 0
//     default:  return state
//   }
// }
// const store = createStore(couterReducer)
// const App = () => {
//   const [value, setValue] = useState(0)

//   return (
//     <div>
//       <div>
//         <h2>first ver</h2>
//         <p>value: {value}</p>
//         <button onClick={() => setValue(value - 1)}>minus</button>
//         <button onClick={() => setValue(value + 1)}>plus</button>
//         <button onClick={() => setValue (0)}>zero</button>
//       </div>
//       <div>
//         <h2>2nd ver</h2>
//         <div>{store.getState}</div>
//         <button onClick={e => store.dispatch({type: 'DECREAMENT'})}>minus</button>
//         <button onClick={e => store.dispatch({type: 'INCREAMENT'})}>plus</button>
//         <button onClick={e => store.dispatch({type: 'ZERO'})}>zero</button>
//       </div>
      
//     </div>
//   )
// }

export default App