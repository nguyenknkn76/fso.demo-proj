import { useDispatch } from "react-redux"
import { useField } from "../../hooks/formHooks"
import { Link } from "react-router-dom"

const LoginForm = () => {
    const username = useField('text')
    const password = useField('password')

    const dispatch = useDispatch()
    
    const handleLogin = (e) => {
        e.preventDefault()
        console.log('try login')
    }
    return(
        <div>
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <div>
                    username: <input {...username}/>
                </div>
                <div>
                    password: <input {...password}/>
                </div>
                <button type="submit">login</button>
                <button><Link to='/register'>don't have acc, register here</Link></button>
            </form>
        </div>
    )
}

export default LoginForm