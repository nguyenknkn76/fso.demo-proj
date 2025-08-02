import { useState } from 'react'

const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}
const DisplayAnecdotes = ({anecdotes}) => {
  return (
    <div>
      <p>{anecdotes}</p>
    </div>
  )
} 
const DisplayVotes = ({pos, votes}) => {
  return(
    <div>
      <p> anecdotes {pos} has votes {votes}</p>
    </div>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  
  let maxPos = 0
  for (let i = 0; i < votes.length; i ++){
    if(votes[i] === Math.max(...votes)){
      maxPos = i
      break
    }
  } 

  const nextAnecdote = () =>{
    if(selected === anecdotes.length - 1) setSelected(0)
    else setSelected(selected + 1)
  }
  const backAnecdote = () => {
    if(selected === 0) setSelected((anecdotes.length- 1))
    else setSelected(selected - 1)
  }

  const increaseVotes = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }  
  

  return (
    <div>
      <h1>Anecdotes of the day</h1>
      <DisplayAnecdotes anecdotes = {anecdotes[selected]}/>
      <DisplayVotes pos ={selected} votes = {votes[selected]}/>
      {/* <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p> */}
      <Button onClick={increaseVotes} text='vote'/>
      <Button onClick = {nextAnecdote} text = 'next anecdote'/>
      <Button onClick = {backAnecdote} text = 'back anecdote'/>
      <h1>Anecdotes with most votes</h1>
      <DisplayAnecdotes anecdotes = {anecdotes[maxPos]}/>
      <DisplayVotes pos = {maxPos} votes = {votes[maxPos]}/>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Hello, TailwindCSS!</h1>
      </div>
    </div>
  )
}

export default App