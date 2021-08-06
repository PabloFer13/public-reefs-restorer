import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as PIXI from 'pixi.js';
import { Sprite, Stage, withApp } from 'react-pixi-fiber';
import { SimpleLightmapFilter } from '@pixi/filter-simple-lightmap';
// import { Howl } from 'howler';
import actions from 'actions';
import LevelMenu from 'components/Menu/LevelMenu';
// import WaveBackground from 'components/WaveBackground';
import pearlImg from 'assets/images/pearl.png';
import woodImg from 'assets/images/wood.png';
import rockImg from 'assets/images/rock.png';
import lightmap from 'assets/images/lightmap.png';
import reef from 'assets/images/reef.jpeg';
// import BgSound from 'assets/music/bg-sea-1.mp3';

const OPTIONS = {
  backgroundColor: 0x1099bb,
  style: {
    transform: 'scale 1.1',
  },
};

const lightmapFilter = new SimpleLightmapFilter(
  new PIXI.Texture.from(lightmap),
  [50, 0, 0, 0.015]
);

const ResourceItem = ({ amount, image, alt }) => (
  <figure className="flex py-1">
    <img src={image} alt={alt} className="h-6 w-6" />
    <p className="text-white font-bubble">
      :<span className="ml-4">{amount}</span>
    </p>
  </figure>
);

const Level = () => {
  // const bgMusic = new Howl({
  //   src: BgSound,
  //   autoplay: false,
  //   loop: true,
  // });

  // useEffect(() => {
  //   bgMusic.play();
  //   return () => {
  //     bgMusic.stop();
  //   };
  // }, []);

  const [filters, setFilters] = useState([lightmapFilter]);
  const displacementRef = useRef(null);
  const dispatch = useDispatch();
  const resources = useSelector(({ level: { resources } }) => resources);

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
    dispatch(actions.level.getUserResources());
    dispatch(actions.level.getLevelDetails());
  }, [dispatch]);

  const removeFilter = () => {
    setFilters(([x, ...prev]) => [...prev]);
  };

  const { gold, rocks, pearls, wood } = resources;
  const resourcesMenu = [
    {
      amount: pearls,
      image: pearlImg,
      alt: 'pearl',
    },
    {
      amount: wood,
      image: woodImg,
      alt: 'wood',
    },
    {
      amount: rocks,
      image: rockImg,
      alt: 'rock',
    },
    {
      amount: gold,
      image: pearlImg,
      alt: 'pearl',
    },
  ];

  return (
    <Stage
      options={OPTIONS}
      width={1}
      height={1}
      filters={filters}
      className="h-screen w-screen">
      <Sprite
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
      <LevelMenu position="0,0" />
    </Stage>
  );
};

export default withApp(Level);

//ignore. could be usefull for menu styling

/* <div className="h-screen bg-gray-800">
      <div className="">
        <div className="py-20 px-24">
          <div className="border-4 p-8 border-yellow-400">
            <p className="text-center text-white text-6xl font-bubble">
              Arrecife del Oceano Pacífico
            </p>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex mx-auto my-auto">
            <div className="grid justify-items-center">
              {resourcesMenu.map(resourceProps => (
                <ResourceItem {...resourceProps} />
              ))}
              <div className="">
                <button
                  className="text-white"
                  type="button"
                  onClick={removeFilter}>
                  RM Filter
                </button>
              </div>
            </div>
          </div>
          <div className=""></div>
        </div>
      </div>
    </div> */
