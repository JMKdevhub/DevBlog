//yeh bada hi interesting layout h, kaafi jagah use hoga
//aage jaake next js sb me bhi 
//yeh ek mech h, ki kiss tarah se project ko yaa routes ko protect kiya jaata h 
//ek protector container h 
import { useState,useEffect } from "react";
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'


//yha user se authentication lo hi mt, directly auth status se pta lga lo
function Protected({children, authentication=true}) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    const authStatus = useSelector(state => state.auth.status)

    console.log(authStatus)
    useEffect(()=>{
        //sir yeh manke chl rhe h ki authentication me hr baar true aa hi rha h 
        if(authentication && authStatus!==authentication){
            navigate("/login")
        }else if(!authentication && authStatus!==authentication){
            navigate("/")
        }
        setLoading(false)
    },[authStatus,navigate,authentication])

    return loading ? <h1>Loading....</h1> : <>{children}</>
}

export default Protected

// Backend middleware → server/request level pe protection
// Protected component → client-side routing/UI level pe protection

// loading = true
// ↓
// Dashboard render mat karo
// ↓
// check auth
// ↓
// loading = false
// ↓
// children render