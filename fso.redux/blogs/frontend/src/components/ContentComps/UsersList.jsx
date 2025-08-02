import {useDispatch, useSelector } from 'react-redux'
const UsersList = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)

    return (
        <div>
            <ul>
                {
                    users.map(user =>
                        <li key={user.id}>{user.name}</li>
                    )
                }
            </ul>

        </div>
    )
}
export default UsersList