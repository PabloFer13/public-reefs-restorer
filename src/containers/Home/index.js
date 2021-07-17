import VerticalTabs from 'components/Tabs/VerticalTabs';
import { Link } from 'react-router-dom';

const Home = () => {
  const tabs = [
    {
      id: Math.floor(100000 + Math.random() * 900000),
      path: 'mar-caribe',
      tab: 'Nivel 1',
      panel: (
        <figure>
          <img
            src="https://userscontent2.emaze.com/images/c37a3fc3-4c18-4318-9bff-17e0b9d3c5af/bffb28e65af5868bf0dd77cb49d92df0.png"
            alt="Sian Kaan"
          />
          <Link to="mar-caribe">
            <figcaption>Mar Caribe</figcaption>
          </Link>
        </figure>
      ),
    },
    {
      id: Math.floor(100000 + Math.random() * 900000),
      tab: 'Nivel 2',
      path: 'golfo-de-mexico',
      panel: (
        <figure>
          <img
            src="https://userscontent2.emaze.com/images/c37a3fc3-4c18-4318-9bff-17e0b9d3c5af/bffb28e65af5868bf0dd77cb49d92df0.png"
            alt="Sian Kaan"
          />
          <Link to="golfo-de-mexico">
            <figcaption>Golfo de México</figcaption>
          </Link>
        </figure>
      ),
    },
    {
      id: Math.floor(100000 + Math.random() * 900000),
      path: 'oceano-pacifico',
      tab: 'Nivel 3',
      panel: (
        <figure>
          <img
            src="https://userscontent2.emaze.com/images/c37a3fc3-4c18-4318-9bff-17e0b9d3c5af/bffb28e65af5868bf0dd77cb49d92df0.png"
            alt="Sian Kaan"
          />
          <Link to="oceano-pacifico">
            <figcaption>Oceano Pacífico</figcaption>
          </Link>
        </figure>
      ),
    },
  ];

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <VerticalTabs tabs={tabs} />
      </div>
    </div>
  );
};

export default Home;
