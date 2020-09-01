// Modules
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

// Middlewares
import apiMiddleware from '../middlewares/api.middleware';

// Reducers
import reducer from './root.reducer';

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });

export default (initialState?: any) => {
  const middleware = [thunkMiddleware, apiMiddleware];

  return createStore(reducer, initialState, composeEnhancers(applyMiddleware(...middleware)));
};
