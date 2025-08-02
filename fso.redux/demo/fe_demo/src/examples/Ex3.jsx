import useField from "../hooks/fieldHook"
const Ex3 = () => {
    const name = useField('text')
    const dob = useField('text')
    const height = useField('text')

    return (
    
        <div>
            <h2> Ex3</h2>
            {/* <form>
                name: <input type= {name.type} value={name.value} onChange={name.onChange} />
                <br/> 
                birthdate: <input type= {dob.type} value={dob.value} onChange={dob.onChange} />
                <br /> 
                height: <input type= {height.type} value={height.value} onChange={height.onChange} />
            </form> */}
            //! name: <input type= {name.type} value={name.value} onChange={name.onChange} />
            //! name: <input {...name}/>
            <div><strong>sus method</strong></div>
            <form>
                name: <input {...name}/>
                <br/> 
                birthdate: <input {...dob}/>
                <br /> 
                height: <input {...height}/>

            </form>
            <div>
                {name.value} {dob.value} {height.value} 
            </div>
        </div>
    )
}

export default Ex3