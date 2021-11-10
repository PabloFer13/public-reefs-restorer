import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom'
import { Sprite, Stage, Container, withFilters } from '@inlet/react-pixi';
import { ColorOverlayFilter } from '@pixi/filter-color-overlay';
import * as PIXI from 'pixi.js';
// import bgWater from 'assets/images/level/level.png';
// import bgWater from 'assets/images/level/level-filter1.jpg';
// import bgWater from 'assets/images/level/level-filter2.jpg';
// import bgWater from 'assets/images/level/level-filter3.jpg';
// import bgWater from 'assets/images/level/level-filter4.jpg';
// import bgWater from 'assets/images/level/level-filter5.jpg';
// import bgWater from 'assets/images/level/level-filter6.jpg';
// import bgWater from 'assets/images/level/level-filter7.jpg';
// import bgWater from 'assets/images/level/level_1.png';
import bgWater from 'assets/images/level/sea_pixel.png';
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
  const history = useHistory();
  const [filters, setFilters] = useState([]);
  const displacementRef = useRef(null);
  const reqRef = useRef(null);

  useEffect(() => {
    const animate = () => {
      displacementRef.current.x += 3;
      displacementRef.current.y += 2;
      reqRef.current = requestAnimationFrame(animate);
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
      // new ColorOverlayFilter(0x120455, 0.7),
    ]);
    reqRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(reqRef.current);
  }, []);

  // useEffect(() => {
  //   const animate = () => {
  //     displacementRef.current.x += 3;
  //     displacementRef.current.y += 2;
  //     requestAnimationFrame(animate);
  //   };
  //   const displacementFilter = new PIXI.filters.DisplacementFilter(
  //     displacementRef.current
  //   );
  //   displacementRef.current.texture.baseTexture.wrapMode =
  //     PIXI.WRAP_MODES.REPEAT;
  //   displacementRef.current.scale.x = 10;
  //   displacementRef.current.scale.y = 10;
  //   setFilters(prev => [
  //     ...prev,
  //     displacementFilter,
  //     // new ColorOverlayFilter(0x120455, 0.7),
  //   ]);
  //   animate();
  // }, []);

  const reefs = [
    {
      x: screenWidth / 2 - 480,
      y: screenHeight / 2 - 10,
      scale: 0.7,
      texture: new PIXI.Texture.from(purple),
      goTo: '/shooter'
    },
    {
      x: screenWidth / 2 - 320,
      y: screenHeight / 2 + 50,
      scale: 0.75,
      texture: new PIXI.Texture.from(pink),
      goTo: '/shooter'
    },
    {
      x: screenWidth / 2 + 610,
      y: screenHeight / 2 + 40,
      scale: 0.5,
      texture: new PIXI.Texture.from(green),
      goTo: '/hidenseek'
    },
    {
      x: screenWidth / 2 + 450,
      y: screenHeight / 2 + 90,
      scale: 0.75,
      texture: new PIXI.Texture.from(lightOrange),
      goTo: '/hidenseek'
    },
    {
      x: -60,
      y: screenHeight / 2 + 50,
      scale: 0.75,
      texture: new PIXI.Texture.from(red),
      goTo: '/hidenseek'
    },
  ];

  const Filters = withFilters(Container, {
    colorOverlay: ColorOverlayFilter,
  });

  const Sepia = withFilters(Container, {
    matrix: PIXI.filters.ColorMatrixFilter,
  });

  return (
    <>
      <Stage
        width={screenWidth}
        height={screenHeight}
        // options={{ resizeTo: window }}
      >
        <Sepia
          matrix={{ enabled: true }}
          apply={({ matrix }) => matrix.sepia()}>
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
        </Sepia>
        <Sprite
          width={screenWidth}
          height={screenHeight}
          texture={PIXI.Texture.from(
            'https://cdna.artstation.com/p/assets/images/images/009/070/412/large/alisha-bannister-sarno-alishabs-clouds.jpg?1516950864'
          )}
          ref={displacementRef}
        />
        <Container filters={filters}>
          <Filters colorOverlay={{ color: 0x3e2a05, alpha: 0.7 }}>
            {reefs.map(it => (
              <Sprite
                x={it.x}
                y={it.y}
                scale={it.scale}
                texture={it.texture}
                interactive
                buttonMode
                click={() => history.push(it.goTo)}
              />
            ))}
          </Filters>
        </Container>
      </Stage>
      <Bubbles />
    </>
  );
};

export default Level;
