import React , { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Home from '../layout/Home';
import Profile from '../profile/Profile';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = props => {
  return (
  <Fragment>
    <Route exact path="/register" component={Register} />
    <Route exact path="/login" component={Login} />
    <section className="container">
      <Switch>
        <PrivateRoute exact path='/' component={Home} />
        <PrivateRoute exact path="/:username" component={Profile} />
      </Switch>
    </section>
  </Fragment>
  );
};

export default Routes;
