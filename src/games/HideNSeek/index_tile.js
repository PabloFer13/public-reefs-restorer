import { useState, useEffect, useRef, useCallback } from 'react';
import { Sprite, Stage, Text, Container, Graphics } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import { useTilemapLoader } from 'react-pixi-tilemap';
import guantes from 'assets/images/hidenseek/guantes.png';
import linterna from 'assets/images/hidenseek/linterna.png';
import red from 'assets/images/hidenseek/red.png';
import Bubbles from 'components/Bubbles';
import RectangleBackground from 'components/Rectangle';
import pezLeon from 'assets/images/hidenseek/pez_leon.png';
import coralPilar from 'assets/images/hidenseek/coral_pilar.png';
import bgPixel from 'assets/images/hidenseek/map_1.png';
import coralBlanco from 'assets/images/reefFlora/coralBlanco.png';
import redReef from 'assets/images/reefFlora/coralRojo.png';
import coralRojo from 'assets/images/reefFlora/coralRojo2.png';

const tilemape = process.env.PUBLIC_URL + '/stages/map_1.tmx';
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const blockers = { coralPilar };
const blockersType = ['coralPilar', 'coralPilar', 'coralPilar'];

const reloadedMockData = [
  {
    type: 'animal',
    img: pezLeon,
    coords: [
      { x: 200, y: 200, over: false },
      { x: 600, y: 100, over: false },
      { x: 100, y: 450, over: true },
      { x: 600, y: 450, over: true },
      { x: 350, y: 275, over: true },
    ],
  },
  // {
  //   type: 'night-animal',
  //   img: pezLeon,
  //   coords: [
  //     { x: 100, y: 100 },
  //     { x: 600, y: 100 },
  //     { x: 100, y: 450 },
  //     { x: 600, y: 450 },
  //     { x: 350, y: 275 },
  //   ],
  // },
];
const tools = [
  { x: -150, y: screenHeight - 200, img: guantes, type: 'guantes' },
  { x: 0, y: screenHeight - 200, img: linterna, type: 'linterna' },
  { x: 150, y: screenHeight - 200, img: red, type: 'red' },
];

const decorations = [
  // { img: coralBlanco, coords: [{ x: 50, y: 450 }, { x: 100, y: 450 }, { x: 400, y: 450 }] },
  { img: coralRojo, coords: [{ x: 140, y: 650 }, { x: 500, y: 500 }, { x: 800, y: 550 }, { x: 1360, y: 650 }, { x: 1650, y: 700 }, { x: 132, y: 450 }] },
  { img: redReef, coords: [{ x: 1700, y: 450 }, { x: 30, y: 800 }, { x: 210, y: 450 }, { x: 1800, y: 405 }, { x: 1150, y: 400 }, { x: 1350, y: 700 }] },
];

const getRandomNumber = () => {
  return Math.floor(Math.random() * 10) + 1;
};

const getRandomBlock = () => {
  if (getRandomNumber() % 2 === 0) {
    return false;
  }

  const type = getRandomNumber() % 3;

  return { found: false, type: blockersType[type] };
};

const HideNSeek = () => {
  const map = useTilemapLoader(tilemape);
  const [objs, setObjs] = useState([]);
  const [boardObjects, setBoardObjects] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [boardDecorations, setBoardDecorations] = useState([]);
  const [currentTool, setCurrentTool] = useState('');
  const [found, setFound] = useState([]);
  const [score, setScore] = useState(0);
  const [lastScore, setLastScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(-1);
  const [won, setWon] = useState(false);
  const [nightMode, setNightMode] = useState(false);
  const [filters, setFilters] = useState([]);
  const displacementRef = useRef(null);

  const toolBg = useCallback(g => {
    g.clear();
    g.lineStyle(3, 0xffd966, 1);
    g.drawRoundedRect(0, 0, 100, 100, 25);
    g.endFill();
  }, []);
  const objBg = useCallback(g => {
    g.clear();
    g.lineStyle(3, 0xffd966, 1);
    g.beginFill(0x9a9a9a, 0.25);
    g.drawRoundedRect(-25, 0, 120, 200, 25);
    g.endFill();
  }, []);
  const scoreBg = useCallback(g => {
    g.clear();
    g.lineStyle(2, 0x9a9a9a, 3);
    g.beginFill(0x9a9a9a, 0.25);
    g.drawRoundedRect(180, 16, 200, 50, 25);
    g.endFill();
  }, []);

  useEffect(() => {
    const newObjs = reloadedMockData.reduce((acc, it) => {
      const { type, img } = it;
      const newItems = it.coords.map(crd => ({
        found: false,
        type,
        img,
        ...crd,
        over: crd.over ? getRandomBlock() : false,
      }));
      return [...acc, ...newItems];
    }, []);

    const newDecorations = decorations.reduce((acc, it) => {
      const { coords, img } = it;
      const newDecorations = coords.map(dc => ({ ...dc, img }));

      return [...acc, ...newDecorations];
    }, [])

    const newFounds = reloadedMockData.map(() => 0);

    setObjs([...newObjs]);
    setFound([...newFounds]);
    setBoardDecorations([...newDecorations]);
    setTimeLeft(60);
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : prevTime));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    const newBoard = objs.reduce((acc, it, ind) => {
      const shouldRenderAnimal =
        (!nightMode && it.type === 'animal') ||
        (nightMode && it.type === 'night-animal');
      if (!it.found && shouldRenderAnimal) {
        acc.push({ ...it, originalInd: ind });
      }

      return acc;
    }, []);

    const newBlocks = objs.reduce((acc, it, ind) => {
      const { over } = it;
      const shouldRenderBlock =
        (!nightMode && it.type === 'animal') ||
        (nightMode && it.type === 'night-animal');
      if (over && !it.found && !over.found && shouldRenderBlock) {
        acc.push({
          x: it.x,
          y: it.y,
          img: blockers[over.type],
          originalInd: ind,
          type: over.type,
        });
      }

      return acc;
    }, []);

    setBoardObjects([...newBoard]);
    setBlocks([...newBlocks]);
  }, [objs, nightMode]);

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
    setFilters(prev => [...prev, displacementFilter]);
    animate();
  }, []);

  useEffect(() => {
    const haveWon = objs.reduce((acc, it) => (acc && it.found), true);

    setWon(haveWon);
  }, [objs])

  const clickItem = i => {
    if(timeLeft > 0){
      if (
        ((objs[i].over && objs[i].over.found) || !objs[i].over) &&
        currentTool === 'red'
      ) {
        const newObjs = objs.map((it, ind) => {
          const newItem = { ...it };
          if (ind === i) {
            newItem.found = true;
          }
  
          return { ...newItem };
        });
  
        const foundsInd = reloadedMockData.findIndex(
          it => it.type === objs[i].type
        );
        const newFounds = [...found];
        newFounds[foundsInd] = newFounds[foundsInd] + 1;
  
        const bonus = (lastScore - timeLeft) < 6 && lastScore > 0;
        const bonusPoints = bonus ? combo  * 100 : 0;
        const sumPoints = 100 + bonusPoints;
  
        setFound([...newFounds]);
        setObjs([...newObjs]);
        setScore(score + sumPoints);
        setLastScore(timeLeft);
        setCombo(bonus ? combo + 1 : 1);
      }
    }
  };

  const clickBlock = i => {
    const block = { ...blocks[i] };

    if(timeLeft > 0){
      if (currentTool === 'guantes') {
        const newObjs = objs.map((it, ind) => {
          const newItem = { ...it };
          if (ind === block.originalInd) {
            newItem.over.found = true;
          }
  
          return { ...newItem };
        });
  
        setObjs(newObjs);
      }
    }
  };

  const clickTool = type => {
    if(timeLeft > 0){
      if (currentTool === type) {
        setCurrentTool('');
      } else {
        setCurrentTool(type);
      }
  
      if (type === 'linterna') {
        setTimeout(() => {
          setCurrentTool('');
        }, 5000);
      }
    }
  };

  return (
    <>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        options={{ resizeTo: window }}>
        <Sprite
          texture={
            new PIXI.Texture.from(bgPixel, {
              scaleMode: PIXI.SCALE_MODES.LINEAR,
            })
          }
          width={window.innerWidth}
          height={window.innerHeight}
          filters={filters}
        />
        <Sprite
          width={window.innerWidth}
          height={window.innerHeight}
          texture={PIXI.Texture.from(
            'https://cdna.artstation.com/p/assets/images/images/009/070/412/large/alisha-bannister-sarno-alishabs-clouds.jpg?1516950864'
          )}
          ref={displacementRef}
        />
        <Container position={[window.innerWidth / 2 + 500, 20]}>
          <Graphics x={0} y={10} draw={scoreBg} />
          <Text position={[220, 35]} text={`Score: ${score}`} />
        </Container>
        <Container position={[50, 0]}>
          <Graphics x={0} y={10} draw={objBg} />
          {reloadedMockData.map((it, ind) => (
            <Container>
              <Sprite
                x={-60}
                y={90 * ind}
                width={100}
                height={100}
                texture={new PIXI.Texture.from(it.img)}
                scale={0.2}
              />
              <Text
                position={`25,${70 + 90 * ind}`}
                style={{ fontSize: 18 }}
                text={`${found[ind]}/${it.coords.length}`}
              />
            </Container>
          ))}
        </Container>
        <Container position={[window.innerWidth / 2, 25]}>
          <RectangleBackground />
          <Text
            position={[0, 30]}
            style={{ fontSize: 30, fill: timeLeft > 30 ? 'black' : 'white' }}
            text={`${timeLeft}`}
          />
        </Container>
        <Container filters={filters}>
          <Container>
            {boardDecorations.map(it => (
              <Sprite
                x={it.x}
                y={it.y}
                width={100}
                height={100}
                texture={new PIXI.Texture.from(it.img)}
                scale={0.2}
              />
            ))}
          </Container>
          <Container>
            {boardObjects.map((it, ind) => {
              return (
                <Sprite
                  x={it.x + 400}
                  y={it.y + 200}
                  width={100}
                  height={100}
                  texture={new PIXI.Texture.from(it.img)}
                  scale={0.2}
                  interactive
                  buttonMode
                  click={() => {
                    clickItem(it.originalInd);
                  }}
                />
              );
            })}
          </Container>
          <Container>
            {blocks.map((it, ind) => {
              return (
                <Sprite
                  x={it.x + 450}
                  y={it.y + 200}
                  width={100}
                  height={100}
                  texture={new PIXI.Texture.from(it.img)}
                  scale={0.15}
                  interactive
                  buttonMode
                  click={() => {
                    clickBlock(ind);
                  }}
                />
              );
            })}
          </Container>
        </Container>
        <Container position={[screenWidth / 2, 0]}>
          {tools.map(it => {
            return (
              <Container>
                <Graphics x={it.x} y={it.y} draw={toolBg} />
                <Sprite
                  interactive
                  buttonMode
                  x={it.x + 15}
                  y={it.y + 15}
                  width={100}
                  height={100}
                  scale={0.12}
                  texture={new PIXI.Texture.from(it.img)}
                  click={() => {
                    clickTool(it.type);
                  }}
                />
              </Container>
            );
          })}
        </Container>
        { (won || timeLeft === 0) && <Container position={[window.innerWidth / 2, window.innerHeight / 2]}>
          <RectangleBackground />
          <Text
            position={[-40, 20]}
            style={{ fontSize: 25, fill: 'black' }}
            text={`${won ? '¡Ganaste!' : '¡Tiempo!'}\nPuntaje: ${score}`}
          />
        </Container>}
      </Stage>
      <Bubbles />
    </>
  );
};

export default HideNSeek;
