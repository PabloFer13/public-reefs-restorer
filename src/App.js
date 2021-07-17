import 'react-web-tabs/dist/react-web-tabs.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from 'containers/Home';
import Level1 from 'containers/Level1';
import Level2 from 'containers/Level2';
import Level3 from 'containers/Level3';

import BunnyWithCounter from 'games/BunnyWithCounter';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/mar-caribe" component={Level1} />
      <Route exact path="/golfo-de-mexico" component={Level2} />
      <Route exact path="/oceano-pacifico" component={Level3} />
      <Route exact path="/bunny-with-counter" component={BunnyWithCounter} />
      <Redirect to="/" />
    </Switch>
  </Router>
);

export default App;
