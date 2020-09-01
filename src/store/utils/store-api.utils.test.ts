// Utils
import { fetchAPI } from 'utils/api.utils';
import { sendStoreApiRequest } from './store-api.utils';

// Constants
import { ActionsTransportsE, HttpMethodsE, HttpActionsTypesE } from 'constants/api.constants';

// Utils
import { buildActionType } from './build-action-type.utils';

// Typings
import { FetchActionRequestParamsI } from '../typings/common-store.typings';

jest.mock('utils/api.utils', () => ({
  fetchAPI: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('#store-api.utils.ts', () => {
  const ACTION_NAME = 'ACTION_NAME';
  const defaultPayload = {};

  const url = '/get-cats';
  const method = HttpMethodsE.GET;
  const defaultRequestParams = { method, url };

  const successPayload = { id: 1, data: 'success' };
  const errorMsg = 'Something went wrong :C';

  const dispatch = jest.fn();

  /**
   * Creates a fetch action with default predefined
   * fields.
   */
  const createAction = <P>({
    type = ACTION_NAME,
    payload = defaultPayload as P,
    transport = ActionsTransportsE.REQUEST,
    requestParams = defaultRequestParams,
  }: {
    type?: string;
    payload?: P;
    transport?: ActionsTransportsE;
    requestParams?: FetchActionRequestParamsI;
  } = {}) => ({
    type,
    payload,
    transport,
    requestParams,
  });

  test('Dispatches correct action on success', async () => {
    (fetchAPI as jest.Mock).mockImplementation(() => ({ ok: true, json: () => Promise.resolve(successPayload) }));

    const action = createAction();

    await sendStoreApiRequest(action, dispatch);

    expect(fetchAPI).toHaveBeenCalledTimes(1);
    expect(fetchAPI).toHaveBeenCalledWith(url, { method });

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: buildActionType(ACTION_NAME, HttpActionsTypesE.FETCH),
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: buildActionType(ACTION_NAME, HttpActionsTypesE.SUCCESS),
      payload: { data: successPayload },
      initialActionData: action,
    });
  });

  test('Dispatches correct action on failure', async () => {
    (fetchAPI as jest.Mock).mockImplementation(() => ({ ok: false, statusText: errorMsg }));

    const action = createAction();

    await sendStoreApiRequest(action, dispatch);

    expect(fetchAPI).toHaveBeenCalledTimes(1);
    expect(fetchAPI).toHaveBeenCalledWith(url, { method });

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: buildActionType(ACTION_NAME, HttpActionsTypesE.FETCH),
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: buildActionType(ACTION_NAME, HttpActionsTypesE.FAILURE),
      payload: { errorMsg },
      initialActionData: action,
    });
  });

  test("Passes `body` to the fetchAPI if it's present", async () => {
    const body = { form: 'data' };

    const action = createAction({ requestParams: { ...defaultRequestParams, body } });

    await sendStoreApiRequest(action, dispatch);

    expect(fetchAPI).toHaveBeenCalledTimes(1);
    expect(fetchAPI).toHaveBeenCalledWith(url, { method, body: JSON.stringify(body) });
  });
});
