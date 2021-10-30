import Mexico from 'assets/images/mapa_mexico.png';
import Popover from 'components/Popover';

const Map = ({ reefs }) => {
  return (
    <div className="map absolute">
      <img src={Mexico} alt="" className="opacity-80 w-800" />
      {reefs.map(reef => (
        <Popover {...reef} />
      ))}
    </div>
  );
};

export default Map;
