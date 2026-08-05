import { createSlice,type PayloadAction } from '@reduxjs/toolkit';



export interface File {
  _id: string;
  name: string;
  content: string;
}

export interface Message {
  _id: string;
  prompt: string;
  agent: string;
  response: string;
  images: string[];
  files: File[];
  conversationid: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface MessagesResponse {
    title:string,
  messages: Message[];}

const initialState: MessagesResponse = {
    title:"Chat",
  messages:[]
};

const conversationslice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setallconversation:(state,action:PayloadAction<{data:Message[],title:string}>)=>{
state.messages=action.payload.data
state.title=action.payload.title

    },

setsinglemessage:(state,action:PayloadAction<{data:Message}>)=>{

    state.messages.push(action.payload.data)
},

clearconversation(state){
state.messages=[]
state.title=""
}
    
  },
});

export const { setallconversation,setsinglemessage,clearconversation } = conversationslice.actions;
export default conversationslice.reducer;
