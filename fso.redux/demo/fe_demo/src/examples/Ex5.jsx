import { useReducer } from "react"
import CounterContext from "../CounterContext"
import { useContext } from "react"
import Button from "../components/Button"
import Display from "../components/Display"
const Ex5 = () => {
    return (
        <div>
            <div>use Context here</div>
            <Display/>
            <div>
                <Button  type={'INC'} label='+'/>
                <Button  type={'DEC'} label='-'/>
                <Button  type={'ZERO'} label='0'/>          
            </div>
        </div>
    )
}

export default Ex5