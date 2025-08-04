import {useSelector, useDispatch} from 'react-redux';
import { counterActions } from '../store/counter';
// import { createAction } from '@reduxjs/toolkit';


const Counter =()=>{

    const counter =useSelector((state)=>state.counter.counter);
    const toggle = useSelector((state)=>state.counter.toggleState);
    const dispatch = useDispatch();
   
   
    const incrementHandler=()=>{
        // dispatch({type:"increment", amount:5});
        dispatch(counterActions.increment(5));//pass argument 5 payload
    }
    const increaseHandler=()=>{
        // dispatch({type:"increase"});
        dispatch(counterActions.increase());
    }
    const decrementHandler=()=>{
        // dispatch({type:"decrement"});
        dispatch(counterActions.decrement());
    }
 
    const toggleHandler =()=>{
        // dispatch({type:"toggle"});
        dispatch(counterActions.toggle());


    };
    return (
        <>
            <h1>Redux Counter</h1>
            {toggle &&<div>Counter Value{counter}</div>}
           
            <button onClick={increaseHandler}>increment Counter</button>
            <button onClick={incrementHandler}>increment Counter 5</button>
            <button onClick={decrementHandler}>decrement Counter</button>
            <button onClick={toggleHandler}>Toggle</button>
        </>

    );
}
export default Counter;
