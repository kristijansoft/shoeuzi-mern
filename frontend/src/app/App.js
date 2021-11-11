import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { SnackbarProvider } from 'notistack';

import RenderRoutes from './router/route.util';
import routes from './router/routes';
import AppLayout from './AppLayout';
import MDTheme from './context/ThemeProvider';
import store from './store';
import { Provider } from 'react-redux';

const Main = () => {
  return (
    <MDTheme>
      <AppLayout>
        <RenderRoutes routes={routes} />
      </AppLayout>
    </MDTheme>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <Router>
          <Main />
        </Router>
      </SnackbarProvider>
    </Provider>
  );
};

export default App;
