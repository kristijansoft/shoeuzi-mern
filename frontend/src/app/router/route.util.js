import React from 'react';
import { matchPath, Route, Switch, Redirect } from 'react-router-dom';
import _ from 'lodash';
import useAuth from 'app/hooks/useAuth';

const matched = (path, routes) => {
  let result = null;
  _.forEach(routes, (route) => {
    if (route.routes) {
      matched(path, route.routes);
    } else {
      const matchedRoute = matchPath(path, route);
      if (matchedRoute && matchedRoute.isExact) {
        result = route;
      }
    }
  });

  return result;
};

const RouteWithSubRoutes = (route) => (
  <Route
    path={route.path}
    exact={route.exact}
    render={(props) => {
      const Component = route.component;
      return <Component {...props} routes={route.routes} />;
    }}
  />
);

const RenderRoutes = ({ routes }) => (
  <Switch>
    {routes.map((route) =>
      route.auth == 'admin' ? (
        <AuthRoute key={route.key} {...route} />
      ) : (
        <RouteWithSubRoutes key={route.key} {...route} />
      )
    )}
  </Switch>
);

const AuthRoute = (route) => {
  const { currentUser } = useAuth();
  if (currentUser) {
    return <RouteWithSubRoutes {...route} />;
  } else {
    return <Redirect to="/login" />;
  }
};

export { matched };

export default RenderRoutes;
