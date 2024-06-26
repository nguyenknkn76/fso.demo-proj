const filterReducer = (state = 'ALL', action) =>{
    switch (action.type){
        case 'set_filter': {
            return action.payload
        }
        default: return state
    }
}

export const creatorFilterChange = (filter) => {
    return{
        type: 'set_filter',
        payload: filter
    }
}

export default filterReducer