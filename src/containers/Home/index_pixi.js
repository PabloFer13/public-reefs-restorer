import { useState, useEffect, useRef } from 'react';
import { Sprite, Stage, Container } from '@inlet/react-pixi';
import { Howl } from 'howler';
import BgSound from 'assets/music/menu.mp3';
import * as PIXI from 'pixi.js';
import bgWater from 'assets/images/home_water.png';
import Mexico from 'assets/images/mapa_mexico.png';
import Bubbles from 'components/Bubbles';

// import Fish from 'assets/images/fish.gif';
// import Fishes from 'assets/images/fish-swim.gif';
// import Fish2 from 'assets/images/fish-2.gif';
// import MiniFish from 'assets/images/mini-fish.gif';
// import GreenFish from 'assets/images/green-fish.gif';
// import Map from 'components/Map';
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const Home = () => {
  const [filters, setFilters] = useState([]);
  const displacementRef = useRef(null);

  useEffect(() => {
    const bgMusic = new Howl({
      src: BgSound,
      autoplay: false,
      loop: true,
    });
    bgMusic.play();
    return () => {
      bgMusic.stop();
    };
  }, []);
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
    displacementRef.current.scale.x = 6;
    displacementRef.current.scale.y = 6;
    setFilters(prev => [
      ...prev,
      displacementFilter,
      // new ColorOverlayFilter(0x120455, 0.7),
    ]);
    animate();
  }, []);
  return (
    <>
      <Stage width={screenWidth} height={screenHeight}>
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
        <Container position={[screenWidth / 5, screenHeight / 13]}>
          <Sprite
            x={0}
            y={0}
            scale={2}
            texture={new PIXI.Texture.from(Mexico)}
          />
        </Container>
      </Stage>
      <Bubbles />
    </>
  );
};

export default Home;
