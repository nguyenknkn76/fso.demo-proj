import { useMutation } from "@apollo/client"
import { useState } from "react"
import { ALL_PERSONS, EDIT_NUMBER } from "../../queries"

const EditPerson = ({person}) => {
    const [newPhone, setNewPhone] = useState(person.phone)
    
    const [editPerson] = useMutation(EDIT_NUMBER, {
        refetchQueries: [{query: ALL_PERSONS}]
    })
    
    const edit = (event) => {
        event.preventDefault()
        const name = person.name
        const phone = newPhone
        console.log(name, phone)
        editPerson({variables: {name, phone}})
        setNewPhone('update success')
    }   
    return(
        <div>
            <h2>edit person here</h2>
            <form onSubmit={edit}>
                <div>name: <input value={person.name} readOnly/></div>
                <div>phone: <input value={newPhone} onChange={(e) => setNewPhone(e.target.value)}/> ~ edit here</div>
                <div>street: <input value={person.address.street} readOnly/></div>
                <div>city: <input value={person.address.city} readOnly/></div>
                <button type="submit">edit</button>
            </form>
        </div>
    )
}
export default EditPerson