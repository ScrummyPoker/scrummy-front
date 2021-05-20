import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import PrivateRoute from './PrivateRoute';
import { isLoggedIn } from './services/auth';
import Dashboard from './pages/dashboard';
import {
  ROUTE_AUTH_LOGIN,
  ROUTE_AUTH_REGISTER,
  ROUTE_DASHBOARD,
  ROUTE_LOBBY,
  ROUTE_HOME,
} from './utils/routes';
import LobbyPage from './pages/lobby';
import PublicRoute from './PublicRoute';
import HomePage from './pages/home';
import { createMemoryHistory } from 'history';

require('dotenv').config();
function App() {
  const history = createMemoryHistory();
  return (
    <Router history={history}>
      <Switch>
        <PublicRoute exact path={ROUTE_HOME} component={HomePage} />

        <PrivateRoute exact path={ROUTE_LOBBY} component={LobbyPage} />
        <PrivateRoute exact path={ROUTE_DASHBOARD} component={Dashboard} />

        <PublicRoute exact path={ROUTE_AUTH_LOGIN} component={LoginPage} />
        <PublicRoute
          exact
          path={ROUTE_AUTH_REGISTER}
          component={RegisterPage}
        />

        {/* <Route exact path="/:playerId/:lobbyCode" component={ChatRoom} /> */}
      </Switch>
    </Router>
  );
}

export default App;
