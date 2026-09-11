import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth_service'
import {login,logout} from './Store/Auth_slice'
import {Header,Footer} from './Components/index'
import { Outlet } from 'react-router-dom'

function App() {

  {/* ek loading state rkhna shi rhega, kyuki appwrite se data fetch krne k request instantaneously reply nhi 
dega and hence, yeh pta hona chahiye data is now loaded and ready to render or still loading
this always helps jb network ya db calls krni ho  */}

  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()
  //Jaise hi app load hoga pehle yeh check krna pdega ki user loggedIn h yaa nahi uss hisaab se
  //content display kiya jaayega


  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
//dispatch() Redux mein action ko store tak bhejta hai, jisse corresponding 
// reducer execute hota hai aur state update hoti hai.
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  },[])

  //conditional rendering
  //matlb it's now loaded
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>  
    </div>
  ) : null
}

export default App
