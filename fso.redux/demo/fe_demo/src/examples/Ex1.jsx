import useCounter from "../hooks/counterHook";

const Ex1 = () => {
    const counter = useCounter()

    return(
        
        <div>
            <h2>Ex1</h2>
            <div>{counter.value}</div>
            <button onClick={counter.increase}>inc</button>
            <button onClick={counter.decrease}>dec</button>
            <button onClick={counter.zero}>zero</button>
        </div>
    )
}
export default Ex1