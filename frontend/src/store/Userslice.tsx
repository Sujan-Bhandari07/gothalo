import { createSlice,type PayloadAction } from '@reduxjs/toolkit';

interface User {
  email:string;
  fullname:string,
  isauth:boolean,

}



const initialState: User = {
email:"",
fullname:"",
isauth:false,


};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setisauth(state,action:PayloadAction<boolean>){
state.isauth=action.payload

    },

    setuser(state,action:PayloadAction<{
      email:string,
      fullname:string,
      isauth?:boolean
    }>){

      const{email,fullname,isauth}=action.payload
      state.fullname=fullname
      state.email=email
      if(isauth){
        state.isauth=isauth
      }

    }


  },
});

export const { setisauth,setuser } = userSlice.actions;
export default userSlice.reducer;
