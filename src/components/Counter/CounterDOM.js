import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function CounterDOM() {
  const count = useSelector(state => state.counter.count);
  const sagasCount = useSelector(state => state.counter.sagasCompleted);
  const dispatch = useDispatch();

  // For test purposes, be sure to delete this
  console.log(sagasCount);

  return (
    <div>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <span>Count: {count}</span>
    </div>
  );
}
