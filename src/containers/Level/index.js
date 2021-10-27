import { useState, useEffect, useRef } from 'react';
import { Sprite, Stage, Container } from '@inlet/react-pixi';
import { ColorOverlayFilter } from '@pixi/filter-color-overlay';
import * as PIXI from 'pixi.js';
// import bgWater from 'assets/images/level/level.png';
// import bgWater from 'assets/images/level/level-filter1.jpg';
// import bgWater from 'assets/images/level/level-filter2.jpg';
// import bgWater from 'assets/images/level/level-filter3.jpg';
// import bgWater from 'assets/images/level/level-filter4.jpg';
// import bgWater from 'assets/images/level/level-filter5.jpg';
// import bgWater from 'assets/images/level/level-filter6.jpg';
import bgWater from 'assets/images/level/level-filter7.jpg';
import brainFish from 'assets/images/reefFlora/cerebro.png';
import pink from 'assets/images/reefFlora/pink.png';
import purple from 'assets/images/reefFlora/purple.png';
import green from 'assets/images/reefFlora/green.png';
import red from 'assets/images/reefFlora/red.png';
import lightOrange from 'assets/images/reefFlora/light-orange.png';
import Bubbles from 'components/Bubbles';

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const Level = () => {
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
    displacementRef.current.scale.x = 10;
    displacementRef.current.scale.y = 10;
    setFilters(prev => [
      ...prev,
      displacementFilter,
      new ColorOverlayFilter(0x120455, 0.7),
    ]);
    animate();
  }, []);

  const reefs = [
    {
      x: screenWidth / 2 - 480,
      y: screenHeight / 2 - 10,
      scale: 0.7,
      texture: new PIXI.Texture.from(purple),
    },
    {
      x: screenWidth / 2 - 320,
      y: screenHeight / 2 + 50,
      scale: 0.75,
      texture: new PIXI.Texture.from(pink),
    },
    {
      x: screenWidth / 2 + 610,
      y: screenHeight / 2 + 40,
      scale: 0.5,
      texture: new PIXI.Texture.from(green),
    },
    {
      x: screenWidth / 2 + 450,
      y: screenHeight / 2 + 90,
      scale: 0.75,
      texture: new PIXI.Texture.from(lightOrange),
    },
    {
      x: -60,
      y: screenHeight / 2 + 50,
      scale: 0.75,
      texture: new PIXI.Texture.from(red),
    },
  ];

  return (
    <>
      <Stage
        width={screenWidth}
        height={screenHeight}
        options={{ resizeTo: window }}>
        <Sprite
          texture={
            new PIXI.Texture.from(bgWater, {
              scaleMode: PIXI.SCALE_MODES.LINEAR,
            })
          }
          width={screenWidth}
          height={screenHeight}
          filters={filters}
        />
        <Sprite
          width={screenWidth}
          height={screenHeight}
          texture={PIXI.Texture.from(
            'https://cdna.artstation.com/p/assets/images/images/009/070/412/large/alisha-bannister-sarno-alishabs-clouds.jpg?1516950864'
          )}
          ref={displacementRef}
        />
        <Container filters={filters}>
          {reefs.map(it => (
            <Sprite
              x={it.x}
              y={it.y}
              scale={it.scale}
              texture={it.texture}
              interactive
              buttonMode
            />
          ))}
        </Container>
      </Stage>
      <Bubbles />
    </>
  );
};

export default Level;
