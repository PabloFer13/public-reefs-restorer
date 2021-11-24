import 'react-web-tabs/dist/react-web-tabs.css';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import store from 'store';
// import Home from 'containers/Home/index_pixi';
import Level from 'containers/Level';
// import Level1 from 'containers/Level1';
// import Level2 from 'containers/Level2';
// import Level3 from 'containers/Level3';

import MetalSlug from 'games/MetalSlug';
import SlidePuzzle from 'games/SlidePuzzle';
import Memory from 'games/Memory';
import Shooter from 'games/Shooter';
import HideNSeek from 'games/HideNSeek/index_tile';

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Level} />
        <Route exact path="/mar-caribe" component={Level} />
        <Route exact path="/shooter" component={Shooter} />
        <Route exact path="/hidenseek" component={HideNSeek} />
        <Route exact path="/metal-slug" component={MetalSlug} />
        <Route exact path="/slidepuzzle" component={SlidePuzzle} />
        <Route exact path="/memory" component={Memory} />
        <Redirect to="/" />
      </Switch>
    </Router>
  </Provider>
);

export default App;
