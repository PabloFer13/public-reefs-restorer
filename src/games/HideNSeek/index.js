import { useState, useEffect, useRef } from 'react';
import { Sprite, Stage, Container, Text } from 'react-pixi-fiber';
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

const OPTIONS = {
  backgroundColor: 0x1099bb,
  style: {
    transform: 'scale 100.1',
  },
};

const blockers = { sand, rock, wood };
const blockersType = ['sand', 'rock', 'wood'];

const mockData = [
  { img: fish, x: 100, y: 100, type: 'object', found: false },
  { img: fish, x: 600, y: 100, type: 'object', found: false },
  {
    img: fish,
    x: 100,
    y: 450,
    type: 'object',
    found: false,
    over: { type: 'sand', found: false },
  },
  {
    img: fish,
    x: 600,
    y: 450,
    type: 'object',
    found: false,
    over: { type: 'rock', found: false },
  },
  {
    img: fish,
    x: 350,
    y: 275,
    type: 'object',
    found: false,
    over: { type: 'wood', found: false },
  },
];

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
  { x: 200, y: 500, img: guantes, type: 'guantes' },
  { x: 325, y: 500, img: linterna, type: 'linterna' },
  { x: 450, y: 500, img: red, type: 'red' },
];

const lightmapFilter = new SimpleLightmapFilter(
  new PIXI.Texture.from(lightmap),
  [9, 5, 75, 0.005]
);

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

function HideNSeek() {
  const [objs, setObjs] = useState([]);
  const [boardObjects, setBoardObjects] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [currentTool, setCurrentTool] = useState([]);
  const [found, setFound] = useState([]);
  const [timeLeft, setTimeLeft] = useState(-1);
  const [nightMode, setNightMode] = useState(false);
  const [filters, setFilters] = useState([]);
  const displacementRef = useRef(null);
  // const

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
      setTimeLeft(prevTime => prevTime - 1);
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
        options={OPTIONS}
        width={1}
        height={1}
        filters={
          // nightMode && !(currentTool === 'linterna') ? [lightmapFilter] : []
          filters
        }
        className="h-screen w-screen">
        <Sprite
          width={window.innerWidth}
          height={window.innerHeight}
          texture={PIXI.Texture.from(reef, {
            scaleMode: PIXI.SCALE_MODES.LINEAR,
          })}
        />
        <Sprite
          texture={PIXI.Texture.from(
            'https://cdna.artstation.com/p/assets/images/images/009/070/412/large/alisha-bannister-sarno-alishabs-clouds.jpg?1516950864'
          )}
          ref={displacementRef}
        />
        {reloadedMockData.map((it, ind) => (
          <Container>
            <Sprite
              x={-25}
              y={-25 + 90 * ind}
              width={100}
              height={100}
              texture={new PIXI.Texture.from(it.img)}
            />
            <Text
              position={`25,${50 + 90 * ind}`}
              style={{ fontSize: 18 }}
              text={`${found[ind]}/${it.coords.length}`}
            />
          </Container>
        ))}
        <Container>
          <Text
            position="390,25"
            style={{ fontSize: 22, fill: timeLeft > 30 ? 'black' : 'white' }}
            text={`${timeLeft}`}
          />
        </Container>
        {boardObjects.map((it, ind) => {
          return (
            <Sprite
              x={it.x}
              y={it.y}
              width={100}
              height={100}
              texture={new PIXI.Texture.from(it.img)}
              interactive
              buttonMode
              click={() => {
                clickItem(it.originalInd);
              }}
            />
          );
        })}
        {blocks.map((it, ind) => {
          return (
            <Sprite
              x={it.x}
              y={it.y}
              width={100}
              height={100}
              texture={new PIXI.Texture.from(it.img)}
              interactive
              buttonMode
              click={() => {
                clickBlock(ind);
              }}
            />
          );
        })}
        <Container backgroundColor="#fff">
          {tools.map(it => {
            return (
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
            );
          })}
        </Container>
      </Stage>
      <Bubbles />
    </>
  );
}

export default HideNSeek;
