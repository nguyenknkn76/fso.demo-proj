import { useState } from "react"
import counterReducer from "./counterReducer"


const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const Display = ({feedback, text}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{feedback}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, all, average, positive}) => {
  if(all === 0){
    return(
      <p>no feedback given</p>
    )
  }
  return(
    <table>
      <Display feedback = {good} text = 'good'/>
      <Display feedback = {neutral} text = 'neutral'/>
      <Display feedback = {bad} text = 'bad'/>
      <Display feedback = {all} text = 'all'/>
      <Display feedback = {average} text = 'average'/>
      <Display feedback = {positive} text = 'positive'/>
    </table>
    
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let all = good + bad + neutral
  let average = (good - bad)/all
  let positive = good/all*100

  const voteGood = () => setGood(good + 1)
  const voteNeutral = () => setNeutral(neutral + 1)
  const voteBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={voteGood} text = 'good'/>
      <Button onClick={voteNeutral} text = 'neutral'/>
      <Button onClick={voteBad} text = 'bad'/>

      <h1>statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad} all = {all} average = {average} positive = {positive}/>
    </div>
  )
}

export default App