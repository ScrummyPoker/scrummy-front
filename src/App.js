import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import ChatRoom from './components/ChatRoom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:playerId/:lobbyCode" component={ChatRoom} />
      </Switch>
    </Router>
  );
}

export default App;
