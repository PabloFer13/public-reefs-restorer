import * as React from 'react';
import { AppContext } from 'react-pixi-fiber';
import Bunny from 'sprites/Bunny';

function RotatingBunny({ ...props }) {
  const [rotation, setRotation] = React.useState(0);
  const app = React.useContext(AppContext);

  const animate = React.useCallback(delta => {
    setRotation(rotation => rotation + 0.1 * delta);
  }, []);

  React.useEffect(() => {
    app.ticker.add(animate);

    return () => {
      app.ticker.remove(animate);
    };
  }, [app.ticker, animate]);

  return <Bunny {...props} rotation={rotation} />;
}

export default RotatingBunny;
