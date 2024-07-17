import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { LOGIN } from "../../queries"
import { useNavigate } from "react-router-dom"

const LoginForm = ({setToken, setErrMsg}) =>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const [ login, result ] = useMutation(LOGIN, {
        onError: (error) => {
            setErrMsg(error.graphQLErrors[0].message)
        }
    })
    
    // useEffect(() => {
    //     console.log('effect')
    //     if ( result.data ) {
    //         const token = result.data.login.value
    //         setToken(token)
    //         localStorage.setItem('phonenumbers-user-token', token)
    //     }
    // }, [result.data])

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('try login', username, password)
        const result = await login({ variables: { username, password } })
        const token = result.data.login.value
        console.log('token',token)  
        setToken(token)
        localStorage.setItem('phonenumbers-user-token', token)
        setErrMsg('login success')
        navigate('/persons')
    } 
    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    username: <input type='text' value ={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    password: <input type='password' value ={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm