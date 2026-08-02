import { createSlice,type PayloadAction } from '@reduxjs/toolkit';



interface slidestate {
 isopen:boolean,
 conversation:string,
 aithink:boolean

}

const initialState: slidestate = {
  isopen:true,
  conversation:"",
  aithink:false
};

const sidebarSlide = createSlice({
  name: 'slidebar',
  initialState,
  reducers: {
    setisopen: (state, action: PayloadAction<{isopen:boolean}>) => {
      state.isopen=action.payload.isopen
    },

    setconversation:(state,action:PayloadAction<{id:string}>)=>{
state.conversation=action.payload.id
    },

    setaithink:(state,action:PayloadAction<boolean>)=>{
state.aithink=action.payload
    }
  },
});

export const { setisopen ,setconversation,setaithink} = sidebarSlide.actions;
export default sidebarSlide.reducer;
