import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './others/Home';
import ChatRoom from './others/ChatRoom';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/:username/:roomId" component={ChatRoom} />
    </Switch>
  </Router>
);

export default App;
