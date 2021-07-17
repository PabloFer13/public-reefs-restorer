import Mexico from 'assets/images/mexico_map.svg';
import Popover from 'components/Popover';

const Map = () => {
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
  ];

  return (
    <div className="map">
      <img src={Mexico} />
      {reefs.map(reef => (
        <Popover {...reef} />
      ))}
    </div>
  );
};

export default Map;
