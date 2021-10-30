import { useState, useEffect, useRef } from 'react';
import { Sprite, Stage, Container } from '@inlet/react-pixi';
import { Howl } from 'howler';
import BgSound from 'assets/music/menu.mp3';
import Fish from 'assets/images/fish.gif';
import Fishes from 'assets/images/fish-swim.gif';
import Fish2 from 'assets/images/fish-2.gif';
import MiniFish from 'assets/images/mini-fish.gif';
import GreenFish from 'assets/images/green-fish.gif';
import Map from 'components/Map';

const Home = () => {
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

  const reefs = [
    {
      id: '1',
      color: 'gray-300',
      title: 'Cabo Pulmo',
      desc: 'Península de Baja California y Pacífico Norte',
      path: 'oceano-pacifico',
    },
    {
      id: '2',
      color: 'gray-300',
      title: 'Parque nacional de arrecifes de Cozumel',
      desc: 'Península de Yucatán y Caribe Mexicano',
      path: 'mar-caribe',
    },
    {
      id: '3',
      color: 'gray-300',
      title: 'Sistema Arrecifal Veracruzano',
      desc: 'Planicie Costera y Golfo de México',
      path: 'golfo-de-mexico',
    },
    {
      id: '4',
      color: 'gray-300',
      title: 'Sistema Arrecifal Nayarit',
      desc: 'Planicie Costera y Golfo de México',
      path: 'golfo-de-mexico',
    },
  ];

  return (
    <div className="relative h-screen bg-water-gradient">
      <div className="flex justify-center pt-8">
        <div className="flex border-double border-8 border-yellow-400 p-8">
          <h2 className="text-6xl text-white font-atarian">
            Bienvenido Emmanuel
          </h2>
        </div>
      </div>
      <div className="flex justify-center pt-8">
        <Map reefs={reefs} />
      </div>
      <div className="absolute  right-1/3 bottom-1/3">
        <img src={Fish} alt="" className="w-24" />
      </div>
      <div className="absolute left-1/4 top-2/3">
        <img src={Fish2} alt="" className="w-24" />
      </div>
      <div className="fishes absolute -right-24 top-20">
        <img src={Fishes} alt="" className="w-24" />
      </div>
      <div className="fishes-reverted absolute -left-24 top-72">
        <img src={Fishes} alt="" className="fishes-reverted-image w-24" />
      </div>
      <div className="absolute fishes-reverted">
        <img src={MiniFish} alt="" className="fishes-reverted-image w-24" />
      </div>
      <div className="absolute top-1/4 left-2 fishes-reverted">
        <img src={MiniFish} alt="" className="fishes-reverted-image w-24" />
      </div>
      <div className="absolute top-44 left-2 fishes-reverted">
        <img src={MiniFish} alt="" className="fishes-reverted-image w-24" />
      </div>
      <div className="absolute bottom-36 right-2 fishes">
        <img src={GreenFish} alt="" className="fishes-reverted-image w-12" />
      </div>
      <div className="absolute bottom-24 right-8 fishes">
        <img src={GreenFish} alt="" className="fishes-reverted-image w-12" />
      </div>
      <div className="bubble bubble--1" />
      <div className="bubble bubble--2" />
      <div className="bubble bubble--3" />
      <div className="bubble bubble--4" />
      <div className="bubble bubble--5" />
      <div className="bubble bubble--6" />
      <div className="bubble bubble--7" />
      <div className="bubble bubble--8" />
      <div className="bubble bubble--9" />
      <div className="bubble bubble--10" />
      <div className="bubble bubble--11" />
      <div className="bubble bubble--12" />
    </div>
  );
};

export default Home;
