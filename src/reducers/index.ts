// Modules
import { combineReducers } from 'redux';

// Reducers
import modalsReducer from './modals.reducer';

export default combineReducers({
  modals: modalsReducer,
});
