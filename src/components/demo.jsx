const {createStore} = require('redux');
import { createStore } from 'redux';

const counterReducer =(state={counter:0},action)=>{
    if(action.type==='increment'){
        return{
            counter:state.counter+1,
        }
    }
    if(action.type==='decrement'){
        return{
            counter:state.counter-1,
        }
    }
    return state;
}

const store = createStore(counterReducer);

console.log("initial",store.getState());

const susbcriber= store.subscribe(()=>{
    console.log('update',store.getState());
});

store.dispatch({type:'increment'});
store.dispatch({type:'decrement'});

export default store;