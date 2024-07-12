import { gql, useQuery } from "@apollo/client"
import Persons from "./components/Persons"
import { useState } from "react"
import PersonForm from "./components/PersonForm"
import { ALL_PERSONS } from "../queries"
import Notification from "./components/Notification"
import EditPerson2 from "./components/EditPerson2"

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
  const result = useQuery(ALL_PERSONS, {
    // pollInterval: 2000 //! sus method to re render after create person => DONT DO THAT
  })

  if(result.loading){
    return <div>...still loading</div>
  }

  return(
    <div>
      <Notification errMsg={errMsg} setErrMsg={setErrMsg}/>
      <EditPerson2 setError={setErrMsg}/>
      <PersonForm setError={setErrMsg}/>
      <Persons persons={result.data.allPersons}/>
      
    </div>
  )
}

export default App