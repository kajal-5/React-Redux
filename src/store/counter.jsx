import { createSlice } from "@reduxjs/toolkit";


const initialState ={counter:0 , toggleState:true};
const counterSlice=createSlice({
    name:'counter',
    initialState ,
    reducers:{
        increment(state, action){
            state.counter =state.counter+action.payload;
        },
        decrement(state){
            state.counter--;
        },
        increase(state){
            state.counter++;
        },
        toggle(state){
            state.toggleState=!state.toggleState;
        }
    }
});

export const counterActions= counterSlice.actions;
export default counterSlice.reducer;