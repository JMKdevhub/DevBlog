//configure store hota h jo store banata h and store ko chahiye ki usko saare reducers k baare me bataya jaaye
import {configureStore} from '@reduxjs/toolkit'
import authReducer from "./Auth_slice";

const store = configureStore({
    reducer:{
//yeh wla step yd se krna 
        auth: authReducer
    }
})

export default store;