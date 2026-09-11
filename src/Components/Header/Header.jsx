import {Logo,LogoutBtn,Container} from '../index'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Header(props) {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        }, 
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]
//slug k jagah url bhi rkh skte ho 
    return (
        <header className='py-3 shadow bg-gray-500'>
            <Container>
                <nav className='flex'>
                    <div className='mr-4'>
                        <Link to='/'>
                            <Logo width='70px'/>
                        </Link>
                    </div>
                    <ul className='flex ml-auto'>
                        {navItems.map((item) => 
//jo html element change ho rhi h wha key use krna h 
                            item.active ? (<li key={item.name}>
                                <button
//link me jo kaam to me hota h whi navigate me hota h 
                                onClick={() => navigate(item.slug)}
                                className='inline-block px-6 py-2 duration-200 hover:bg-blue-100
                                rounded-full'>{item.name}</button>
                            </li>): null
                        )}
{/* agr authStatus true hua tabhi aage k execute hoga */}
                        {authStatus && (
                            <li>
                                <LogoutBtn/>
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}


export default Header