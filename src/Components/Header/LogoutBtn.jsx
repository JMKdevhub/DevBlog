import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth_service'
import {logout} from '../../Store/Auth_slice'

function LogoutBtn(props) {
    const dispatch = useDispatch()
    const logoutHandler = () => {
//most of the chize jo return hoti h appwrite service se woh ek promise hoti h 
        authService.logout().then(() => {
            // Jab Appwrite ka logout successfully complete ho jaaye, tab Redux mein bhi logout action dispatch karo.
            dispatch(logout())
        })
    }
    return (
        <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' 
        onClick={logoutHandler}>Logout</button>
    );
}

export default LogoutBtn