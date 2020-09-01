// Modules
import { combineReducers } from 'redux';

// Reducers by features
import { usersDashboardReducer as usersDashboard } from 'features/users-dashboard';

// Global reducers
import globalReducers from '../reducers';

/**
 * Generate reducers grouped by features
 */
const generateFeatureReducers = () =>
  combineReducers({
    usersDashboard,
  });

export default combineReducers({
  global: globalReducers,
  features: generateFeatureReducers(),
});
