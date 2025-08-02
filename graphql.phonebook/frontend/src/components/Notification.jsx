import { useEffect, useState } from "react"

const Notification = ({errMsg, setErrMsg}) => {
    useEffect(() => {
        setTimeout(() => {
            setErrMsg(null)
        },5000)
    },[errMsg])
    return(
        <div style={{color: "red"}}>
            {errMsg}
        </div>
    )
}

export default Notification