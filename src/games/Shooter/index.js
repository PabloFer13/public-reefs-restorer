import { useState, useEffect, useRef, useCallback } from 'react';
import { Sprite, Stage, Container, Text, Graphics } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import fishPic from 'assets/images/shooter/pezLeon_pixel.png';
import netPic from 'assets/images/shooter/red_pixel.png';
import submarinePic from 'assets/images/shooter/submarine_pixel.png';
import bgWater from 'assets/images/shooter/sea_pixel.png';
import Bubbles from 'components/Bubbles';

const fishTexture = new PIXI.Texture.from(fishPic);
const netTexture = new PIXI.Texture.from(netPic);
const submarineTexture = new PIXI.Texture.from(submarinePic);

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const mockArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function Fish({ posX, posY, ...props }) {
  // console.log(props)
  return <Sprite x={posX} y={posY} texture={fishTexture} scale={0.2} />;
}

function Net({ posX, posY, ...props }) {
  // console.log(props)
  return (
    <Sprite
      x={posX}
      y={posY}
      width={30}
      height={30}
      texture={netTexture}
      scale={0.2}
    />
  );
}

function PlayerShip({ posX, posY, ...props }) {
  // console.log(props)
  return (
    <Sprite
      x={posX}
      y={posY}
      scale={0.4}
      texture={submarineTexture}
      rotation={5 - 0.1}
    />
  );
}

function Shooter() {
  const [fishes, setFishes] = useState(() => {
    const aux = mockArr.map(() => ({
      x: Math.floor(Math.random() * 800),
      y: Math.floor(Math.random() * 300),
    }));

    return aux;
  });

  const [nets, setNets] = useState([]);

  const [player, setPlayer] = useState({ x: 400, y: 450 });

  const [filters, setFilters] = useState([]);
  const displacementRef = useRef(null);
  const reqRef = useRef(null);

  const scoreBg = useCallback(g => {
    g.clear();
    g.lineStyle(2, 0x9a9a9a, 3);
    g.beginFill(0x9a9a9a, 0.25);
    g.drawRoundedRect(180, 16, 200, 50, 25);
    g.endFill();
  }, []);

  useEffect(() => {
    const animate = delta => {
      const newFishes = fishes.map(it => {
        const newPos = { ...it };
        if (Math.floor(Math.random() * 2)) {
          newPos.x = newPos.x + 0.4 * delta;
        }

        newPos.y = newPos.y + 0.1 * delta;

        return { x: Math.abs(newPos.x), y: Math.abs(newPos.y) };
      });

      const newNets = nets.map(it => {
        const newPos = { ...it, y: it.y - 4 * delta };

        return { ...newPos };
      });

      setFishes([...newFishes]);
      setNets([...newNets]);
    };

    PIXI.Ticker.shared.add(animate, this);

    return () => {
      PIXI.Ticker.shared.remove(animate, this);
    };
  });

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
    setFilters(prev => [...prev, displacementFilter]);
    reqRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(reqRef.current);
  }, []);

  const shoot = () => {
    const { x, y } = player;
    const newNet = { x, y: y - 20 };
    setNets([...nets, newNet]);
  };

  const logEvent = e => {
    console.log(e);
    if (e.code === 'ArrowRight') {
      setPlayer({ ...player, x: player.x + 5 });
    } else if (e.code === 'ArrowLeft') {
      setPlayer({ ...player, x: player.x - 5 });
    } else if (e.code === 'ArrowUp') {
      setPlayer({ ...player, y: player.y + 5 });
    } else if (e.code === 'ArrowDown') {
      setPlayer({ ...player, y: player.y - 5 });
    } else if (e.code === 'Space') {
      shoot();
    }
  };

  return (
    <div onKeyDown={logEvent} tabIndex="0" id="game-container">
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
        <Container position={[window.innerWidth / 2 + 500, 20]}>
          <Graphics x={0} y={10} draw={scoreBg} />
          <Text position={[220, 35]} text={`Score: 100`} />
        </Container>
        <Container filters={filters}>
          {fishes.map(it => {
            return <Fish posX={it.x} posY={it.y} />;
          })}
        </Container>
        <Container position={[screenWidth / 4, screenHeight / 2]}>
          {nets.map(it => (
            <Net posX={it.x + 50} posY={it.y} />
          ))}
          <PlayerShip posX={player.x} posY={player.y} />
        </Container>
      </Stage>
      <Bubbles />
    </div>
  );
}

export default Shooter;
