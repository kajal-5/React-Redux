import {useSelector, useDispatch} from 'react-redux';



const Counter =()=>{

    const counter =useSelector((state)=>state.counter);
    const dispatch = useDispatch();
    const incrementHandler=()=>{
        dispatch({type:"increment", amount:5});
    }
    const decrementHandler=()=>{
        dispatch({type:"decrement"});
    }
 
    const toggleCounterHandler =()=>{

    };
    return (
        <>
            <h1>Redux Counter</h1>
            <div>Counter Value{counter}</div>
            <button onClick={toggleCounterHandler}>Toggle Counter</button>
            <button onClick={incrementHandler}>increment Counter</button>
            <button onClick={incrementHandler}>increment Counter 5</button>
            <button onClick={decrementHandler}>decrement Counter</button>
        </>

    );
}
export default Counter;