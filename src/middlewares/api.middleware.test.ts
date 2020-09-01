// Utils
import { sendStoreApiRequest } from 'store/utils/store-api.utils';

// Constants
import { ActionsTransportsE, HttpMethodsE } from 'constants/api.constants';

// Middlewares
import apiMiddleware from './api.middleware';

jest.mock('store/utils/store-api.utils', () => ({
  sendStoreApiRequest: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('#api.middleware.ts', () => {
  const ACTION_NAME = 'ACTION_NAME';

  const dispatch = jest.fn();
  const next = jest.fn();

  test('Calls `next` function if the action is not of the request type', () => {
    const action = { type: ACTION_NAME };

    apiMiddleware({ dispatch })(next)(action);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });

  test('Sends a request if the action is of the request type', () => {
    const action = {
      type: ACTION_NAME,
      transport: ActionsTransportsE.REQUEST,
      requestParams: { url: '', method: HttpMethodsE.GET },
    };

    apiMiddleware({ dispatch })(next)(action);

    expect(sendStoreApiRequest).toHaveBeenCalledTimes(1);
    expect(sendStoreApiRequest).toHaveBeenCalledWith(action, dispatch);
  });
});
