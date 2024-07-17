import { gql, useQuery } from "@apollo/client"
import Persons from "./components/Persons"
import { useState } from "react"
import PersonForm from "./components/PersonForm"
import { ALL_PERSONS } from "../queries"
import Notification from "./components/Notification"
import EditPerson2 from "./components/EditPerson2"
import LoginForm from "./components/LoginForm"
import {BrowserRouter as Router , Routes, Route, Link, Navigate} from "react-router-dom"

// export const ALL_PERSONS = gql`
// query {
//   allPersons {
//     name
//     phone
//     id
//   }
// }
// `

const App = () => {
  const [errMsg, setErrMsg] = useState(null)
  const [token, setToken] = useState(null)
  const TEST_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imtob2luZ3V5ZW4iLCJpZCI6IjY2OTc0NTgyMGRhZTNlYmY2ZWJhNzQwNiIsImlhdCI6MTcyMTE5Njk1Nn0.1013RaALBPDMiMAVBIfoxHQM_RvNB3aT_NDRO2lqYpU'
  const result = useQuery(ALL_PERSONS, {
    // pollInterval: 2000 //! sus method to re render after create person => DONT DO THAT
  })

  if(result.loading){
    return <div>...still loading</div>
  }

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
  }

  const padding = {
    padding: "5px"
  }
  return(
    <div>
      {/* 
      <LoginForm setToken={setToken} setErrMsg={setErrMsg}/>
      <EditPerson2 setError={setErrMsg}/>
      <PersonForm setError={setErrMsg}/>
      <Persons persons={result.data.allPersons}/> */}
      
      debug: {token ? 'have token' : 'non'} <span></span>
      <button onClick={()=> {
        setToken(TEST_TOKEN)
        localStorage.setItem('phonenumbers-user-token', TEST_TOKEN)
      }}>try set token</button>

      <Notification errMsg={errMsg} setErrMsg={setErrMsg}/> 
      <div>
        <Link to='/login' style={padding}>login</Link>
        <Link to='/persons' style={padding}>person</Link>
        <Link to='/createperson' style={padding}>create</Link>
        <Link to='/editperson' style={padding}>edit</Link>
        <a href='#' style={padding} onClick={handleLogout}>{token ? "logout" : null}</a>
      </div>

      <Routes>
        <Route path="/login" element={<LoginForm setToken={setToken} setErrMsg={setErrMsg}/>} />
        <Route path="/persons" element={<Persons persons={result.data.allPersons}/>}/>
        <Route path="/createperson" element={token ? <PersonForm setError={setErrMsg}/> : <Navigate replace to='/login'/>}/>
        <Route path="/editperson" element={token ? <EditPerson2 setError={setErrMsg}/> : <Navigate replace to='/login'/>}/>
      </Routes>
    </div>
  )
}

export default App