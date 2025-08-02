import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const SliceAnec = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)
    const [pos, setPos] = useState(0)


    useEffect(() => {
        const intervalId = setInterval(() => {
            if (pos === anecdotes.length - 1) {
                setPos(0);
            } else {
                setPos(pos + 1);
            }
        }, 5000)
        return () => clearInterval(intervalId);
    }, [pos, anecdotes.length]);

    const backAnec = () => {
        if(pos === 0){
            setPos(anecdotes.length - 1)
        }else{
            setPos(pos - 1)
        }    
    }
    

    const nextAnec = () => {
        if(pos === anecdotes.length - 1){
            setPos(0)
        }else{
            setPos(pos + 1)
        }
    }
    
    return (
        <div>
            <h3>slice anecdotes</h3>
            <div>
                {pos} : {anecdotes[pos].content}
            </div>
            <button onClick={backAnec}>back</button>
            <button onClick={nextAnec}>next</button>
        </div>
    )
}   
export default SliceAnec