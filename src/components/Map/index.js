import Mexico from 'assets/images/mexico_map.svg';
import Popover from 'components/Popover';

const Map = ({ reefs }) => {
  return (
    <div className="map absolute">
      <img src={Mexico} alt="" className="opacity-80" />
      {reefs.map(reef => (
        <Popover {...reef} />
      ))}
    </div>
  );
};

export default Map;
