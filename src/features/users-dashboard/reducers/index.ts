// Modules
import { combineReducers } from 'redux';

// Reducers
import usersListReducer from './users-list.reducer';
import usersSettingsReducer from './users-settings.reducer';

export default combineReducers({
  usersList: usersListReducer,
  usersSettings: usersSettingsReducer,
});
