import { useState } from "react"
import {  useMutation} from "@apollo/client";
import { LOGIN } from "../../queries";
const Login = ({setToken}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login] = useMutation(LOGIN)
    const handleLogin =  async(e) => {
        e.preventDefault()
        const result = await login({variables: {username: username, password: password}})
        const token = result.data.login.value
        setToken(token)
        localStorage.setItem('logged-in-token', token)
        setUsername('')
        setPassword('')
    }   
    return(
        <div>
            <form onSubmit={handleLogin}>
                <div>username <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/></div>
                <div>password <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/></div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}
export default Login