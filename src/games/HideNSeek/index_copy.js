import { useState, useEffect, useRef, useCallback } from 'react';
import { Sprite, Stage, Text, Container, Graphics } from '@inlet/react-pixi';
import { SimpleLightmapFilter } from '@pixi/filter-simple-lightmap';
import * as PIXI from 'pixi.js';
import lightmap from 'assets/images/lightmap.png';
import sand from 'assets/images/sand.png';
import rock from 'assets/images/rock.png';
import wood from 'assets/images/wood.png';
import fish from 'assets/images/fish.gif';
import gFish from 'assets/images/green-fish.gif';
import guantes from 'assets/images/hidenseek/guantes.png';
import linterna from 'assets/images/hidenseek/linterna.png';
import red from 'assets/images/hidenseek/red.png';
import reef from 'assets/images/customReef.png';
import Bubbles from 'components/Bubbles';
import RectangleBackground from 'components/Rectangle';

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const blockers = { sand, rock, wood };
const blockersType = ['sand', 'rock', 'wood'];
const reloadedMockData = [
  {
    type: 'animal',
    img: fish,
    coords: [
      { x: 100, y: 100 },
      { x: 600, y: 100 },
      { x: 100, y: 450 },
      { x: 600, y: 450 },
      { x: 350, y: 275 },
    ],
  },
  {
    type: 'night-animal',
    img: gFish,
    coords: [
      { x: 100, y: 100 },
      { x: 600, y: 100 },
      { x: 100, y: 450 },
      { x: 600, y: 450 },
      { x: 350, y: 275 },
    ],
  },
];

const tools = [
  { x: -150, y: screenHeight - 200, img: guantes, type: 'guantes' },
  { x: 0, y: screenHeight - 200, img: linterna, type: 'linterna' },
  { x: 150, y: screenHeight - 200, img: red, type: 'red' },
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
  const [objs, setObjs] = useState([]);
  const [boardObjects, setBoardObjects] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [currentTool, setCurrentTool] = useState([]);
  const [found, setFound] = useState([]);
  const [timeLeft, setTimeLeft] = useState(-1);
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

  useEffect(() => {
    const newObjs = reloadedMockData.reduce((acc, it) => {
      const { type, img } = it;
      const newItems = it.coords.map(crd => ({
        found: false,
        type,
        img,
        ...crd,
        over: getRandomBlock(),
      }));
      return [...acc, ...newItems];
    }, []);

    const newFounds = reloadedMockData.map(() => 0);

    setObjs([...newObjs]);
    setFound([...newFounds]);
    setTimeLeft(60);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : prevTime));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const clickItem = i => {
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

      setFound([...newFounds]);
      setObjs([...newObjs]);
    }
  };

  const clickBlock = i => {
    const block = { ...blocks[i] };

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
  };

  const clickTool = type => {
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
  };

  return (
    <>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        className="h-screen w-screen">
        <Sprite
          width={window.innerWidth}
          height={window.innerHeight}
          texture={PIXI.Texture.from(reef, {
            scaleMode: PIXI.SCALE_MODES.LINEAR,
          })}
        />
        <Container position={[50, 0]}>
          <Graphics x={0} y={10} draw={objBg} />
          {reloadedMockData.map((it, ind) => (
            <Container>
              <Sprite
                x={-15}
                y={-5 + 90 * ind}
                width={100}
                height={100}
                texture={new PIXI.Texture.from(it.img)}
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
        <Container position={[screenWidth / 2, 0]}>
          {tools.map(it => {
            return (
              <Container>
                <Graphics x={it.x} y={it.y} draw={toolBg} />
                <Sprite
                  interactive
                  buttonMode
                  x={it.x}
                  y={it.y}
                  width={100}
                  height={100}
                  texture={new PIXI.Texture.from(it.img)}
                  click={() => {
                    clickTool(it.type);
                  }}
                />
              </Container>
            );
          })}
        </Container>
      </Stage>
      <Bubbles />
    </>
  );
};

export default HideNSeek;
