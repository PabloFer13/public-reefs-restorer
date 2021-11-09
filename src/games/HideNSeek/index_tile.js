import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Sprite,
  Stage,
  Text,
  Container,
  Graphics,
  withFilters,
} from '@inlet/react-pixi';
import { ColorOverlayFilter } from '@pixi/filter-color-overlay';
import * as PIXI from 'pixi.js';
import { Howl } from 'howler';
import SelectSound from 'assets/music/select.wav';
import GameOverSound from 'assets/music/game-over.wav';
import LightSwitch from 'assets/music/light-switch.wav';
import guantes from 'assets/images/hidenseek/guantes.png';
import linterna from 'assets/images/hidenseek/linterna.png';
import red from 'assets/images/hidenseek/red.png';
import Bubbles from 'components/Bubbles';
import RectangleBackground from 'components/Rectangle';
import pezLeon from 'assets/images/hidenseek/pez_leon.png';
import coralPilar from 'assets/images/hidenseek/coral_pilar.png';
import bgPixel from 'assets/images/hidenseek/map_1.png';
import brownRock from 'assets/images/hidenseek/brownRock.png';
import purpleRock from 'assets/images/hidenseek/purpleRock.png';
import sargazo from 'assets/images/hidenseek/sargazoPixel.png';
import tortuga from 'assets/images/species/tortugaCarey.png';
import redReef from 'assets/images/reefFlora/coralRojo.png';
import coralRojo from 'assets/images/reefFlora/coralRojo2.png';

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const blockers = { brownRock, purpleRock, sargazo };
const blockersType = ['brownRock', 'purpleRock'];

const reloadedMockData = [
  {
    type: 'animal',
    img: tortuga,
    amount: 5,
  },
  {
    type: 'night-animal',
    img: pezLeon,
    amount: 5,
  },
];
const tools = [
  { x: 0, y: screenHeight - 200, img: guantes, type: 'guantes' },
  { x: 150, y: screenHeight - 200, img: linterna, type: 'linterna' },
  { x: 300, y: screenHeight - 200, img: red, type: 'red' },
];

const decorations = [
  {
    img: coralPilar,
    coords: [
      { x: 50, y: 450 },
      { x: 100, y: 450 },
      { x: 400, y: 450 },
    ],
  },
  {
    img: coralRojo,
    coords: [
      { x: 140, y: 650 },
      { x: 500, y: 500 },
      { x: 800, y: 550 },
      { x: 1360, y: 650 },
      { x: 1650, y: 700 },
      { x: 132, y: 450 },
    ],
  },
  {
    img: redReef,
    coords: [
      { x: 1700, y: 450 },
      { x: 30, y: 800 },
      { x: 210, y: 450 },
      { x: 1800, y: 405 },
      { x: 1150, y: 400 },
      { x: 1350, y: 700 },
    ],
  },
  {
    img: sargazo,
    coords: [
      { x: 1700, y: 200 },
      { x: 30, y: 150 },
      { x: 210, y: 130 },
      { x: 1800, y: 50 },
      { x: 1150, y: 140 },
      { x: 1350, y: 160 },
    ],
  },
];

const getRandomNumber = () => {
  return Math.floor(Math.random() * 100) + 1;
};

const getRandomBlock = (typeBlock, force = false) => {
  if (!force && getRandomNumber() % 2 === 0) {
    return false;
  }

  const type = getRandomNumber() % 2;

  return {
    found: false,
    type: typeBlock === 'top' ? 'sargazo' : blockersType[type],
    timeFound: -1,
  };
};

const getMinY = x => {
  if (x <= 100) {
    return 400;
  } else if (
    x >= window.innerWidth / 2 - 100 &&
    x <= window.innerWidth / 2 + 100
  ) {
    return 200;
  } else if (
    x >= window.innerWidth / 2 + 400 &&
    x <= window.innerWidth / 2 + 600
  ) {
    return 150;
  } else {
    return 50;
  }
};

const getMaxY = x => {
  if ((x >= window.innerWidth / 2) - 100 && x <= window.innerWidth / 2 + 100) {
    return 600;
  } else {
    return 800;
  }
};

function getRandomCoords() {
  const min = Math.ceil(50);
  const max = Math.floor(1800);
  const x = Math.floor(Math.random() * (max - min + 1) + min);
  const minY = getMinY(x);
  const maxY = getMaxY(x);
  const y = Math.floor(Math.random() * (maxY - minY + 1) + minY);

  return { x, y };
}

const HideNSeek = () => {
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
  const selectS = new Howl({
    src: SelectSound,
    autoplay: false,
    loop: false,
  });
  const gameOver = new Howl({
    src: GameOverSound,
    autoplay: false,
    loop: false,
  });
  const lightSwitchS = new Howl({
    src: LightSwitch,
    autoplay: false,
    loop: false,
  });
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
      const { type, img, amount } = it;
      const newItems = [];
      for (let i = 0; i < amount; i += 1) {
        const coords = getRandomCoords();
        newItems.push({
          type,
          img,
          found: false,
          ...coords,
          over:
            coords.y >= 350 ? getRandomBlock('bottom') : getRandomBlock('top'),
        });
      }

      return [...acc, ...newItems];
    }, []);

    const newDecorations = decorations.reduce((acc, it) => {
      const { coords, img } = it;
      const newDecorations = coords.map(dc => ({ ...dc, img }));

      return [...acc, ...newDecorations];
    }, []);

    const newFounds = reloadedMockData.map(() => 0);

    setObjs([...newObjs]);
    setFound([...newFounds]);
    setBoardDecorations([...newDecorations]);
    setTimeLeft(60);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime === 31) {
          // setNightMode(true);
        }

        setObjs(prevObjs => {
          const newObjs = prevObjs.reduce((acc, it) => {
            if (
              !it.found &&
              it.over &&
              it.over.found &&
              it.over.timeFound !== -1 &&
              it.over.timeFound - prevTime >= 5
            ) {
              const newCoords = getRandomCoords();
              const newBlock = getRandomBlock(
                newCoords.y >= 275 ? 'top' : 'bottom',
                true
              );
              return [
                ...acc,
                {
                  ...it,
                  x: newCoords.x,
                  y: newCoords.y,
                  over: { ...newBlock },
                },
              ];
            }

            return [...acc, { ...it }];
          }, []);

          return [...newObjs];
        });

        return prevTime > 0 ? prevTime - 1 : prevTime;
      });
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
    setFilters(() => {
      const newFilters = [displacementFilter];
      if (nightMode) newFilters.push(new ColorOverlayFilter(0x120455, 0.7));

      return [...newFilters];
    });
    animate();
  }, [nightMode]);

  useEffect(() => {
    const haveWon = objs.reduce((acc, it) => acc && it.found, true);
    const shouldNightMode = objs.reduce(
      (acc, it) => (it.type === 'animal' ? it.found && acc : acc),
      true
    );
    if (shouldNightMode && objs.length > 0) {
      setNightMode(true);
    }
    setWon(haveWon);
  }, [objs]);

  useEffect(() => {
    timeLeft === 0 && gameOver.play();
    return () => {
      gameOver.stop();
    };
  }, [timeLeft]);

  const clickItem = i => {
    if (timeLeft > 0) {
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

        const bonus = lastScore - timeLeft < 6 && lastScore > 0;
        const bonusPoints = bonus ? combo * 100 : 0;
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

    if (timeLeft > 0) {
      if (currentTool === 'guantes') {
        const newObjs = objs.map((it, ind) => {
          const newItem = { ...it };
          if (ind === block.originalInd) {
            newItem.over.found = true;
            newItem.over.timeFound = timeLeft;
          }

          return { ...newItem };
        });

        setObjs(newObjs);
      }
    }
  };

  const clickTool = type => {
    if (timeLeft > 0) {
      if (currentTool === type && currentTool !== 'linterna') {
        setCurrentTool('');
      } else if (currentTool !== 'linterna' || !nightMode) {
        selectS.play();
        setCurrentTool(type);
      }

      if (type === 'linterna' && currentTool !== 'linterna') {
        const [dispFilter] = filters;
        lightSwitchS.play();
        setFilters([dispFilter, new ColorOverlayFilter(0x120455, 0.4)]);
        setTimeout(() => {
          setCurrentTool('');
          setFilters([dispFilter, new ColorOverlayFilter(0x120455, 0.7)]);
        }, 5000);
      }
    }
  };

  const Filters = withFilters(Container, {
    colorOverlay: ColorOverlayFilter,
  });

  return (
    <>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        options={{ resizeTo: window }}>
        <Filters colorOverlay={{ color: 0x120455, alpha: 0.7 }}>
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
        </Filters>
        <Sprite
          width={window.innerWidth}
          height={window.innerHeight}
          texture={PIXI.Texture.from(
            'https://cdna.artstation.com/p/assets/images/images/009/070/412/large/alisha-bannister-sarno-alishabs-clouds.jpg?1516950864'
          )}
          ref={displacementRef}
        />
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
                  x={it.x}
                  y={it.y}
                  width={100}
                  height={100}
                  texture={new PIXI.Texture.from(it.img)}
                  scale={0.15}
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
                  x={it.x}
                  y={it.y}
                  width={100}
                  height={100}
                  texture={new PIXI.Texture.from(it.img)}
                  scale={0.3}
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
        <Container position={[screenWidth / 2 - 150, 0]} b>
          {tools.map(it => {
            return nightMode || it.type !== 'linterna' ? (
              <Container>
                <Graphics x={it.x} y={it.y} draw={toolBg} />
                <Sprite
                  interactive
                  buttonMode
                  filters={
                    currentTool === it.type
                      ? [new ColorOverlayFilter(0xffffff, 0.5)]
                      : []
                  }
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
            ) : null;
          })}
        </Container>
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
                text={`${found[ind]}/${it.amount}`}
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
        {(won || timeLeft === 0) && (
          <Container position={[window.innerWidth / 2, window.innerHeight / 2]}>
            <RectangleBackground />
            <Text
              position={[-40, 20]}
              style={{ fontSize: 25, fill: 'black' }}
              text={`${won ? '¡Ganaste!' : '¡Tiempo!'}\nPuntaje: ${score}`}
            />
          </Container>
        )}
      </Stage>
      <Bubbles />
    </>
  );
};

export default HideNSeek;
