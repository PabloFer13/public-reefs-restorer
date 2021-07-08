import * as React from 'react';
import { Stage } from 'react-pixi-fiber';
import RotatingBunny from './games/RotatingBunny';
import { Provider } from 'react-redux';

import store from './store';
import { CounterDOM, CounterPixi } from 'components/Counter';

const width = 600;
const height = 400;
const options = {
  backgroundColor: 0x56789a,
  resolution: window.devicePixelRatio,
  width: width,
  height: height,
};
const style = {
  width: width,
  height: height,
};

function App() {
  return (
    <>
      <Provider store={store}>
        <CounterDOM />
      </Provider>
      <hr />
      <Stage options={options} style={style}>
        <Provider store={store}>
          <CounterPixi position="0,0" />
          <RotatingBunny position="100,100" />
        </Provider>
      </Stage>
    </>
  );
}

export default App;
