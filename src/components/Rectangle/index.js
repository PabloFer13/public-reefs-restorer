import { useCallback } from 'react';
import { Graphics } from '@inlet/react-pixi';

const RectangleBackground = () => {
  const draw = useCallback(g => {
    g.clear();
    g.lineStyle(2, 0x9a9a9a, 3);
    g.beginFill(0x9a9a9a, 0.25);
    g.drawRoundedRect(-85, 0, 200, 100, 25);
    g.endFill();
  }, []);

  return <Graphics draw={draw} />;
};

export default RectangleBackground;
