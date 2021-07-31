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

const ResourceItem = ({ name, image, alt }) => (
  <figure className="flex">
    <img width="25px" height="25px" src={image} alt={alt} />
    <p className="text-white">
      :<span className="ml-4">{name}</span>
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
      name: pearls,
      image: pearlImg,
      alt: 'pearl',
    },
    {
      name: wood,
      image: woodImg,
      alt: 'wood',
    },
    {
      name: rocks,
      image: rockImg,
      alt: 'rock',
    },
    {
      name: gold,
      image: pearlImg,
      alt: 'pearl',
    },
  ];

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-800 justify-around">
      <div className="flex justify-around">
        {resourcesMenu.map(resourceProps => (
          <ResourceItem {...resourceProps} />
        ))}
        <div className="">
          <button className="text-white" type="button" onClick={removeFilter}>
            RM Filter
          </button>
        </div>
      </div>
      <div className="mx-auto">
        <Stage options={OPTIONS} width={900} height={1000} filters={filters}>
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
      </div>
    </div>
  );
};

export default withApp(Level);
