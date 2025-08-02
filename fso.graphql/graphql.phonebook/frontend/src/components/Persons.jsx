import { gql, useQuery } from "@apollo/client"
import { useState } from "react"
import { FIND_PERSON } from "../../queries"
import Person from "./Person"

// const FIND_PERSON = gql`
// query findPersonByName($nameToSearch: String!) {
//     findPerson(name: $nameToSearch) {
//             id
//             name
//             phone 
//             address {
//                 street
//                 city
//         }
//     }
// }
// `

const Persons = ({persons}) => {
    const [nameToSearch, setNameToSearch] = useState(null)
    const result2 = useQuery (FIND_PERSON, {
        variables: {nameToSearch},
        skip: !nameToSearch,
    })

    if(nameToSearch && result2.data){
        return(
            <Person
                person = {result2.data.findPerson}
                onClose = {()=> setNameToSearch(null)}
            />
        )
    }
    return(
        <div>
            <h2> Persons </h2>
            <ul>
                {persons.map(person => 
                    <li key={person.id}>
                        {person.name} {person.phone} 
                        <button onClick={() => setNameToSearch(person.name)}>show</button>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Persons