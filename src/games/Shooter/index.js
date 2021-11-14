import { useState, useEffect, useRef, useCallback } from 'react';
import { Sprite, Stage, Container, Text, Graphics } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import fishPic from 'assets/images/shooter/pezLeon_pixel.png';
import netPic from 'assets/images/shooter/red_pixel.png';
import boy from 'assets/images/shooter/boy.png';
import girl from 'assets/images/shooter/girl.png';
import bgWater from 'assets/images/shooter/sea_pixel.png';
import Bubbles from 'components/Bubbles';

const fishTexture = new PIXI.Texture.from(fishPic);
const netTexture = new PIXI.Texture.from(netPic);
const boyTexture = new PIXI.Texture.from(boy);
const girlTexture = new PIXI.Texture.from(girl);

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const mockArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function Fish({ posX, posY, ...props }) {
  return <Sprite x={posX} y={posY} texture={fishTexture} scale={0.2} />;
}

function Net({ posX, posY, ...props }) {
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

function BoySprite({ posX, posY, ...props }) {
  return (
    <Sprite
      x={posX}
      y={posY}
      scale={0.35}
      texture={boyTexture}
      rotation={1.15}
    />
  );
}

function GirlSprite({ posX, posY, ...props }) {
  return (
    <Sprite
      x={posX}
      y={posY}
      scale={0.35}
      texture={girlTexture}
      rotation={-1.15}
    />
  );
}

function Shooter() {
  const [fishes, setFishes] = useState(() => {
    const aux = mockArr.map(() => ({
      x: Math.floor(Math.random() * 800),
      y: Math.floor(Math.random() * 300),
      stepX: Math.random(),
      stepY: Math.random(),
      caught: false,
    }));

    return aux;
  });
  const [nets, setNets] = useState([]);
  const [player, setPlayer] = useState({ x: 950, y: 750 });
  const [filters, setFilters] = useState([]);
  const [score, setScore] = useState(0);
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
      const updatedFishes = fishes.map(it => {
        const newPos = {};
        newPos.x = it.x + (it.stepX * delta);
        newPos.y = it.y + (it.stepY * delta);

        return { ...it, x: Math.abs(newPos.x), y: Math.abs(newPos.y) };
      });

      const updatedNets = nets.map(it => {
        const newPos = { ...it, y: it.y - 4 * delta };

        return { ...newPos };
      });
      
      let flg = false;

      updatedNets.forEach((net, netInd) => {
        updatedFishes.forEach((fish, fishInd) => {
          if(!net.catched && !fish.caught){
            const [fishMinX, fishMaxX, fishMinY, fishMaxY] = [fish.x, fish.x + 30, fish.y, fish.y + 20];
            const [netMinX, netMaxX, netMinY, netMaxY] = [net.x, net.x + 30, net.y, net.y + 30];

            const xInRange = (fishMinX >= netMinX && fishMinX <= netMaxX) || (fishMaxX >= netMinX && fishMaxX <= netMaxX);
            const yInRange = (fishMinY >= netMinY && fishMinY <= netMaxY) || (fishMaxY >= netMinY && fishMaxY <= netMaxY);
            const collide = xInRange && yInRange;

            net.catched = collide
            fish.caught = collide
            if(collide) net.y = -100
            if(collide) setScore(prevScore => prevScore + 100);
          }
        })
      })

      const newFishes = updatedFishes.filter(it => !it.caught);
      const newNets = updatedNets.filter(it => !it.catched);

      if(flg) console.log(newNets);

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
    const newNet = { x: x - 40, y: y - 20, catched: false };
    setNets([...nets, newNet]);
  };

  const logEvent = e => {
    console.log(e);
    if (e.code === 'ArrowRight') {
      setPlayer({ ...player, x: player.x + 10 });
    } else if (e.code === 'ArrowLeft') {
      setPlayer({ ...player, x: player.x - 10 });
    } else if (e.code === 'ArrowUp') {
      setPlayer({ ...player, y: player.y - 10 });
    } else if (e.code === 'ArrowDown') {
      setPlayer({ ...player, y: player.y + 10 });
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
          <Text position={[220, 35]} text={`Score: ${score}`} />
        </Container>
        <Container filters={filters}>
          {fishes.map(it => {
            return !it.caught ? <Fish posX={it.x} posY={it.y}/> : null;
          })}
        </Container>
        {/* <Container>
          <Fish posX={500} posY={300}/>
          <Net posX={500} posY={300} />
        </Container> */}
        <Container filters={filters}>
          {nets.map(it => {
            return !it.catched ? <Net posX={it.x} posY={it.y} /> : null;
          })}
        </Container>
        <Container>
          <BoySprite posX={player.x} posY={player.y} />
        </Container>
      </Stage>
      <Bubbles />
    </div>
  );
}

export default Shooter;
