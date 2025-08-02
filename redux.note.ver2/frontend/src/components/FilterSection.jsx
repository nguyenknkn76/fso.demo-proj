import { useDispatch } from 'react-redux'
import { creatorFilterChange } from '../reducers/filterReducer'

const FilterSection = () => {
    const dispatch = useDispatch()

    const filterSelected = (value) => {
        dispatch(creatorFilterChange(value))
    }
    return(
        <div>            
            all <input type='radio' name='filter' onChange={()=>filterSelected('ALL')}/>
            important <input type='radio' name='filter' onChange={()=>filterSelected('IMPORTANT')}/>
            non important <input type='radio' name='filter' onChange={()=>filterSelected('NONIMPORTANT')}/>

        </div>
    )
}

export default FilterSection