import { useContext } from "react"
import CounterContext, { useCounterDispatch } from "../CounterContext"

const Button = ({ type, label}) => {
    // const [counter, dispatch] = useContext(CounterContext)
    const dispatch = useCounterDispatch()
    return(
        <button onClick={()=> dispatch({type})}>
            {label}
        </button>
    )
}
export default Button