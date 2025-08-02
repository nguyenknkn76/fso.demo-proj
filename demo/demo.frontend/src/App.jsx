// import { useState } from "react"

// const Display = ({counter}) => {
//   return(
//     <p>Display: {counter}</p>
//   )
// }
// const Button = ({onClick,text}) =>{
  
//   return (
//       <button onClick={onClick}>{text}</button>
//   )
// }

// const History = ({allClicks}) => {
//   if (allClicks.length === 0) {
//     return (
//       <p>no history</p>
//     )
//   }
//   return(
//     <p>History: {allClicks.join(',')}</p>
//   )
// }
// const App = () => {
//   // const [left, setLeft] = useState(0)
//   // const [right, setRight] = useState(0)
//   const [clicks, setClicks] = useState({left:0, right:0})
//   const [allClicks, setAllClicks] = useState([])
//   const [total,setTotal] = useState(0)

//   const handleLeftClick = () => {
//     const newClicks = {
//       ...clicks,
//       left: clicks.left +1,
//     }
//     console.log('before',clicks.left)
//     setClicks(newClicks)
//     console.log('after',clicks.left)

//     setAllClicks(allClicks.concat('L'))
//     setTotal(newClicks.left + newClicks.right)
//   }
//   const handleRightClick = () => {
//     const newClicks = {
//       ...clicks,
//       right: clicks.right + 1
//     }
//     setClicks(newClicks)
//     setAllClicks(allClicks.concat('R'))
//     setTotal(clicks.left + clicks.right)
//     setTotal(newClicks.left + newClicks.right)
//   }
//   return (
//     <div>
//       {clicks.left}
//       <Button onClick={handleLeftClick} text = 'left'/>
//       <Button onClick={handleRightClick} text = 'right'/>
//       {clicks.right}

//       {/* <p>{allClicks.join(' ')}</p> */}
//       <History allClicks = {allClicks}/>
//       <p>total: {total}</p>
//     </div>
//   )
// }

// export default App

import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('')
  const [rates, setRates] = useState({})
  const [currency, setCurrency] = useState(null)

  useEffect(() => {
    console.log('effect run, currency is now', currency)

    // skip if currency is not defined
    if (currency) {
      console.log('fetching exchange rates...')
      axios
        .get(`https://open.er-api.com/v6/latest/${currency}`)
        .then(response => {
          setRates(response.data.rates)
        })
    }
  }, [currency])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setCurrency(value)
  }

  return (
    <div>
      <form onSubmit={onSearch}>
        currency: <input value={value} onChange={handleChange} />
        <button type="submit">exchange rate</button>
      </form>
      <pre>
        {JSON.stringify(rates, null, 2)}
      </pre>
    </div>
  )
}

export default App