import { useField } from "../../hooks/formHooks"
import { Link, generatePath } from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import { creatorAddUser } from "../../reducers/UsersReducer"

const RegisterForm = () => {
    const newname = useField('text')
    const newusername = useField('text')
    const newpassword = useField('password')
    const newpassword2 = useField('password')

    const dispatch = useDispatch()
    const users = useSelector(state => state.users)

    const handleRegister = (e) => {
        e.preventDefault()
        if(checkUsername() && confirmPassword){
            const newUser = {
                id: generateId(),
                name: newname,
                username: newusername,
                password: newpassword,
            }
            dispatch(creatorAddUser(newUser))
        }
        console.log('try register')
    }

    const generateId = () => {
        const userids = users.map(user => user.id)
        const newId = Math.max(...userids) + 1 
        return newId
    }
    const checkUsername = () => {
        const checkUsername = users.find(user => user.username === newusername)
        if( !checkUsername) return true
        else return false
    }
    const confirmPassword = () => {
        if( newpassword === newpassword2) return true
        else return false 
    }

    return(
        <div>
            <form onSubmit={handleRegister}>
                <h2>Register</h2>
                <div>
                    name: <input {...newname}/>
                </div>
                <div>
                    username: <input {...newusername}/>
                </div>
                <div>
                    password: <input {...newpassword}/>
                </div>
                <div>
                    confirm: <input {...newpassword2}/>
                </div>
                <button type="submit">register</button>
                <button><Link to='/login'>login here</Link></button>
            </form>
        </div>
    )
}

export default RegisterForm