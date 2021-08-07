import 'react-web-tabs/dist/react-web-tabs.css';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import store from 'store';
import Home from 'containers/Home';
import Level from 'containers/Level';
// import Level1 from 'containers/Level1';
// import Level2 from 'containers/Level2';
// import Level3 from 'containers/Level3';

import BunnyWithCounter from 'games/BunnyWithCounter';
import Memory from 'games/Memory';

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/mar-caribe" component={Level} />
        <Route exact path="/golfo-de-mexico" component={Level} />
        <Route exact path="/oceano-pacifico" component={Level} />
        <Route exact path="/bunny-with-counter" component={BunnyWithCounter} />
        <Route exact path="/memory" component={Memory} />
        <Redirect to="/" />
      </Switch>
    </Router>
  </Provider>
);

export default App;
