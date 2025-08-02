import EditPerson from "./EditPerson"
import EditPerson2 from "./EditPerson2"
import PersonForm from "./PersonForm"

const Person = ({person, onClose}) => {
    
    return(
        <div>
            <h2>Person Info</h2>
            <p>id: {person.id}</p>
            <strong >name: {person.name}</strong>
            <p>contact: {person.phone}</p>
            <p>address: {person.address.street}, {person.address.city}</p>
            <button onClick={onClose}>close</button>

            {/* <EditPerson person={person}/> */}
        </div>
    )
}
export default Person