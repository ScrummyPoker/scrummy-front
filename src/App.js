import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import ChatRoom from './components/ChatRoom';
import RegisterPage from './components/auth/register';
import LoginPage from './components/auth/login';
import PrivateRoute from './PrivateRoute';
import { isLoggedIn } from './services/auth';
import Dashboard from './components/dashboard';
import { ROUTE_AUTH_LOGIN, ROUTE_AUTH_REGISTER, ROUTE_DASHBOARD, ROUTE_LOBBY } from './utils/routes';
import LobbyPage from './components/lobby';

require('dotenv').config();

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute 
          exact 
          path={ROUTE_DASHBOARD} 
          component={Dashboard} />

        <Route exact path={ROUTE_AUTH_LOGIN} component={LoginPage} />
        <Route exact path={ROUTE_AUTH_REGISTER} component={RegisterPage} />
        <Route exact path={ROUTE_LOBBY} component={LobbyPage} />
        
        {/* <Route exact path="/:playerId/:lobbyCode" component={ChatRoom} /> */}
      </Switch>
    </Router>
  );
}

export default App;
