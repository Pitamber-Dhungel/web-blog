import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn:false,
    user:{},
  },
  reducers: {
    setUser:(state,action)=>{
        state.user=action.payload
        state.isLoggedIn=true
    },
    removeUser:(state,action)=>{
        state.user={}
        state.isLoggedIn=false
    }
  }
})
export const {setUser,removeUser}=userSlice.actions
export default userSlice.reducer

