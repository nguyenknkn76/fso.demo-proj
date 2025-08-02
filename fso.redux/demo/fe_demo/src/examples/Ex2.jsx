import useCounter from "../hooks/counterHook"
const Ex2 = () => {
    const left = useCounter()
    const right = useCounter()
    return (
        <div>
            <h2>Ex2</h2>
            <div>left: {left.value}, right: {right.value}</div>
            <button onClick={left.increase}>left</button>
            <button onClick={right.increase}>right</button>
            
        </div>
    )
}

export default Ex2