import { useEffect } from 'react';
import { Howl } from 'howler';
import BgSound from 'assets/music/menu.mp3';
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
    <div className="flex h-screen bg-gray-800">
      <div className="m-auto">
        <Map reefs={reefs} />
      </div>
    </div>
  );
};

export default Home;
