import { createSlice,type PayloadAction } from '@reduxjs/toolkit';



interface slidestate {
 isopen:boolean,
 conversation:string,
 aithink:boolean,
 clone:string

}

const initialState: slidestate = {
  isopen:true,
  conversation:"",
  aithink:false,
  clone:""
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
    },

    setclone(state,action:PayloadAction<string>){

      state.clone=action.payload
    }
  },
});

export const { setisopen ,setconversation,setaithink,setclone} = sidebarSlide.actions;
export default sidebarSlide.reducer;
