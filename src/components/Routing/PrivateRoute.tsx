import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';

const PrivateRoute = ({
                        component: Component,
                        auth: {isAuthenticated, loading},
                        ...rest
                      }) => (
  <Route
    {...rest}
    render={props =>
      loading ? (
      <div></div>
      ) : isAuthenticated ? (
      <Component {...props} />
      ) : (
      <Redirect to='/'/>
      )
    }
  />
);

PrivateRoute.propTypes = {};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
