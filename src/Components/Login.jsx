//rename auth Login as store login for better understanding ----> Done

// 1. register kya karta hai?

// Normally React mein agar input ki value chahiye:

// const [email, setEmail] = useState("");

// <input
//     value={email}
//     onChange={(e) => setEmail(e.target.value)}
// />

// Yahan tumhe manually:

// value track karni
// onChange handle karna
// submit ke time value collect karni

// padti hai.

// React Hook Form mein:

// <input {...register("email")} />

// Bas.
// register("email") internally input ko form ke saath register karta hai.

//About handle Submit : 
//Form submit hone par values collect karo, validation karo, aur agar sab valid hai toh function ko data de do.
//Ye ek function receive karta hai aur ek naya function return karta hai.

import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom' 
import { login as storeLogin } from '../Store/Auth_slice'
import {Button, Input, Select, Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth_service'
import {useForm} from 'react-hook-form'

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("") //yeh ek basic syntax h, jab bhi login kro errors ko clean kr do 


        try {
            const session = await authService.logIn(data) //object hi jaayega yha   
            if(session){
                const userData = await authService.getCurrentUser()
                if(userData){
                    dispatch(storeLogin(userData))
                }
                navigate('/')
                //Link me hmehsa click krna pdta h but navigate se programmatically usko khi bhej 
                //skte h 
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                        Don&apos;t have any account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign Up
                        </Link>
            </p>
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
            {/* handle submit ek function h, isiliye dhyan se kabhi bhi jo actually execute ho rha ho
            upon submission uska naam handleSubmit mt rkh dena */}

{/* form k banna is not dependent on whether error h ya nhi (that is appwrite responses in desired manner or not) */}
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input
                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    //email yha register k andar key h 
                    {...register("email",{
                        required:true,
                        validate: {
// User ke email ko regex se check karo. Agar valid format hai toh true return karo, warna error message return karo
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })} //data isi format me aayega
//agr yeh ni kre toh kisi aur input me agr register use krte h toh uski value override ho jaayegi
 
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required:true,
                        })}
                    />

                    <Button
                    type="submit"
                    className='w-full'>
                        Login
                    </Button>
                </div>

            </form>
            </div>
        </div>
    );
}

export default Login;

//yeh abhi krna baaki h 
// React Hook Form
//     ↓
// Form validation errors
//     ↓
// formState.errors


// Appwrite / login API
//     ↓
// Authentication errors
//     ↓
// useState(error)