import { createSlice } from "@reduxjs/toolkit";

//yeh slice help krega track krne ko, user authenticated hai ya nahi

const initialState = {
    status:false, //signifies ki initially user authenticated ni h 
    userData:null
}
const authSlice = createSlice({
    name:"auth", 
    // action type generate karne mein.
    // Redux Toolkit automatically actions ke types banata hai

    initialState,
    reducers:{
        login: (state,action) => {
            state.status = true
            state.userData = action.payload.userData
        },
        logout: (state) => {
            state.status = false
            state.userData = null
        }
    }
})

//actions wo functions hain jinhe tum dispatch karke reducer ko trigger karte ho.
//createSlice() tumhare reducers object ko dekhkar corresponding action creators automatically generate karta hai aur authSlice.actions mein deta hai.
export const {login,logout} = authSlice.actions



//createSlice() tumhare reducers object ko process karke ek single reducer function bhi bana deta hai.
//Isi actual reducer ko store mein dena hota hai:
export default authSlice.reducer