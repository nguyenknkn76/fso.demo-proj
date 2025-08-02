import LoginForm from "../components/FormComps/LoginForm"
import RegisterForm from "../components/FormComps/RegisterForm"
import { useLocation } from "react-router-dom"
const LoginPage = () => {
    const location = useLocation()
    const isLoginPage = location.pathname === '/login'
    
    return(
        <div>
            this is Login Page
            {isLoginPage 
                ? <LoginForm/>
                : <RegisterForm/>
            }
        </div>
    )
} 

export default LoginPage
