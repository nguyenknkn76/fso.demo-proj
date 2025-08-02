import { useEffect } from 'react'
import { createNote, toggleImportanceOf } from './reducers/noteReducer'
import { useSelector, useDispatch } from 'react-redux'
import NewNoteComp from './components/NewNoteComp'
import ListNoteComp from './components/ListNoteComp'

const App = () => {
  // const notes = useSelector(state => state)

  // useEffect(() => {
  //   console.log(notes)
  // },[notes])
  const filterSelected = (value) => {
    console.log(value)
  }
  return (
    <div> 
      <div>
        all: <input name='filter' type='radio' onChange={()=> filterSelected('ALL')}/>
        important <input name='filter' type='radio' onChange={()=> filterSelected('IMPORTANT')}/>
        nonimportant <input name='filter' type='radio' onChange={()=> filterSelected('NONIMPORTANT')}/>
      </div>
      <NewNoteComp/>
      <ListNoteComp/>
    </div>
  )
}

export default App