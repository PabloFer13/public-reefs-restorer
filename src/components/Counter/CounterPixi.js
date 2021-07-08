import * as React from 'react';
import { Container, Text } from 'react-pixi-fiber';
import { useDispatch, useSelector } from 'react-redux';

const style = {
  fontSize: 16,
};

export default function CounterPixi({ ...props }) {
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();

  return (
    <Container {...props}>
      <Text
        buttonMode
        interactive
        pointerup={() => dispatch({ type: 'INCREMENT' })}
        position="5,5"
        style={style}
        text="+"
      />
      <Text
        buttonMode
        interactive
        pointerup={() => dispatch({ type: 'DECREMENT' })}
        position="30,5"
        style={style}
        text="-"
      />
      <Text position="50,5" style={style} text={`Count: ${count}`} />
    </Container>
  );
}
