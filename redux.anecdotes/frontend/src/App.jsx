import AnecdotesList from "./components/AnecdotesList"
import FormNewAnecdote from "./components/FormNewAnecdote"
import SliceAnec from "./components/SliceAnec"

const App = () => {
  return(
    <div>
      <AnecdotesList/>
      <FormNewAnecdote/>
      <SliceAnec/>
    </div>
  )
}
export default App