import { gql, useMutation } from "@apollo/client"
import { useState } from "react"
import { ALL_PERSONS, CREATE_PERSON } from "../../queries"

// const CREATE_PERSON = gql`
// mutation AddPerson($name: String!, $street: String!, $city: String!, $phone: String) {
//   addPerson(name: $name, street: $street, city: $city, phone: $phone) {
//     name
//     phone
//     id
//     address {
//       street
//       city
//     }
//   }
// }
// `

const PersonForm = ({setError}) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')

    const [createPerson] = useMutation(CREATE_PERSON,{
        refetchQueries: [{ query: ALL_PERSONS}], //! refetch comps (page) after do query CREATE_PERSON
        onError: (error) => {
            const messages = error.graphQLErrors.map(error => error.message).join('\n')
            setError(messages)
        }
    })
    
    const submit = (event) => {
        event.preventDefault()

        createPerson({variables:{name, phone, street, city}})

        setName('')
        setCity('')
        setPhone('')
        setStreet('')
    }

    return(
        <div>
            <h2>create new person</h2>
            <form onSubmit={submit}>
                <div>name <input value={name} onChange={(event) => setName(event.target.value)}/></div>
                <div>phone <input value={phone} onChange={(event) => setPhone(event.target.value)}/></div>
                <div>street <input value={street} onChange={(event) => setStreet(event.target.value)}/></div>
                <div>city <input value={city} onChange={(event) => setCity(event.target.value)}/></div>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default PersonForm