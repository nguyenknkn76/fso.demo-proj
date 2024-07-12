import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { ALL_PERSONS, EDIT_NUMBER } from "../../queries"

const EditPerson2 = ({setError}) => {
    const [newPhone, setNewPhone] = useState('')
    const [newName, setNewName] = useState('')

    const [editPerson, result] = useMutation(EDIT_NUMBER, {
        refetchQueries: [{query: ALL_PERSONS}]
    })
    
    useEffect(() => {
        if(result.data && result.data.editNumber === null){
            setError('person not found')
        }
    },[result.data])
    const edit = (event) => {
        event.preventDefault()
        
        editPerson({variables: {name: newName, phone: newPhone}})
        setNewPhone('update success')
        setNewName('update success')
    }   
    return(
        <div>
            <h2>edit person here</h2>
            <form onSubmit={edit}>
                <div>name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/></div>
                <div>phone: <input value={newPhone} onChange={(e) => setNewPhone(e.target.value)}/> ~ edit here</div>
                <button type="submit">edit</button>
            </form>
        </div>
    )
}
export default EditPerson2