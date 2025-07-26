import { createStore} from 'redux';
import {createSlice, configureStore} from "@reduxjs/toolkit";

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

// const countReducer =(state=initialstate,action) =>{
//     if(action.type=="increment"){
//         return {counter:state.counter+action.amount,
//             toggleState:state.toggleState,
//         }
//     }
//     if(action.type=="increase"){
//         return {counter:state.counter+1,
//             toggleState:state.toggleState,
//         }
//     }
//     if(action.type=="decrement"){
//         return {counter:state.counter-1,
//             toggleState:state.toggleState,
//         }
//     }

//     if(action.type==='toggle'){
//         return {
//             toggleState:!state.toggleState,
//             counter:state.counter
//         };
//     }
//     return state;


// }



const store = configureStore({
    reducer:{counter:counterSlice.reducer}
});
export const counterActions= counterSlice.actions;


export default store;