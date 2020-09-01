// Modules
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

// Components
import AppRoutes from './app-routes';

// Helpers
import configureState from './store/configure-state';

// Styles
import './style/main.scss';

/**
 * Local constants
 */
const store = configureState();

/**
 * Root app component
 */
const App = () => (
  <ReduxProvider store={store}>
    <AppRoutes />
  </ReduxProvider>
);

export default App;
