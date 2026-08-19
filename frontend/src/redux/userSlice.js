import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:'User',//Slice Name
    initialState:{User:null},
    reducers:{
        setUser:(state,action)=>
        {
         state.User=action.payload
        }//function to change the state
    }
})
 
console.log("userSlice",userSlice);

export const {setUser}=userSlice.actions;
export default userSlice.reducer;





















// NOTEs-->createSlice() only understands these keys like: name ,initialState ,reducers ,extraReducers