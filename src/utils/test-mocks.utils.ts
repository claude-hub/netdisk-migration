// Modules
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

/**
 * Wrapper for `configureMockStore`, it adds
 * default middlewares to the mock store
 */
export const configureMockedStore = () => configureMockStore([thunk]);
