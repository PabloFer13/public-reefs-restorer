import { useState, useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { Sprite, Stage, withApp } from 'react-pixi-fiber';
import LevelMenu from 'components/Menu/LevelMenu';

const height = 1000;
const width = 900;
const OPTIONS = {
  backgroundColor: 0x1099bb,
  style: {
    transform: 'scale 1.1',
  },
};

const WaveBackground = () => {
  const [filters, setFilters] = useState([]);
  const displacementRef = useRef(null);

  useEffect(() => {
    const animate = () => {
      displacementRef.current.x += 3;
      displacementRef.current.y += 2;
      requestAnimationFrame(animate);
    };
    const displacementFilter = new PIXI.filters.DisplacementFilter(
      displacementRef.current
    );
    displacementRef.current.texture.baseTexture.wrapMode =
      PIXI.WRAP_MODES.REPEAT;
    displacementRef.current.scale.x = 5;
    displacementRef.current.scale.y = 5;
    setFilters(prev => [...prev, displacementFilter]);
    animate();
  }, []);

  return (
    <Stage options={OPTIONS} width={width} height={height} filters={filters}>
      <Sprite
        texture={PIXI.Texture.from(
          'https://images.unsplash.com/photo-1559825481-12a05cc00344?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1001&q=80'
        )}
      />

      <Sprite
        texture={PIXI.Texture.from(
          'https://cdna.artstation.com/p/assets/images/images/009/070/412/large/alisha-bannister-sarno-alishabs-clouds.jpg?1516950864'
        )}
        ref={displacementRef}
      />
      <LevelMenu position="0,0" />
    </Stage>
  );
};

export default withApp(WaveBackground);
