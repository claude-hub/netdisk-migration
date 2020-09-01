// Constants
import { HttpMethodsE, ActionsTransportsE } from 'constants/api.constants';

// Utils
import {
  createFetchListAction,
  createLoadMoreItemsThunkAction,
  createClearListAction,
  createSearchListAction,
} from './fetch-list.action-creators';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('#fetch-list.action-creators.ts', () => {
  describe('#createFetchListAction', () => {
    const ACTION_NAME = 'ACTION_NAME';

    const createListAction = ({
      actionName = ACTION_NAME,
      url = '/some-url',
      method = HttpMethodsE.GET,
    }: {
      actionName?: string;
      url?: string;
      method?: HttpMethodsE.GET;
    } = {}) => createFetchListAction({ actionName, url, method });

    test('Returns a function', () => {
      const fetchListAction = createListAction();

      expect(fetchListAction).toBeInstanceOf(Function);
    });

    test('Returned function returns a correct redux action', () => {
      const url = '/some-url/:userName';

      const page = 0;
      const batchSize = 10;
      const query = { search: 'bar' };
      const params = { userName: 'Albert' };
      const payload = { userId: 1 };
      const body = { bodyParam: 'param' };

      const fetchListAction = createListAction({ url });

      const action = fetchListAction({ page, batchSize, query, params, payload, body });

      expect(action).toEqual({
        type: ACTION_NAME,

        payload,

        transport: ActionsTransportsE.REQUEST,
        requestParams: {
          url: '/some-url/Albert?results=10&page=0&search=bar',
          method: HttpMethodsE.GET,
          body,
        },
      });
    });
  });

  describe('#createLoadMoreItemsThunkAction', () => {
    const fetchListAction = jest.fn();
    const fetchListStateSelector = jest.fn();

    const getState = jest.fn();
    const dispatch = jest.fn();

    test('Dispatches `fetchList` action with correct arguments and increments the `page` number', () => {
      const fetchListActionObj = { type: 'fetch-list' };

      fetchListAction.mockImplementation(() => fetchListActionObj);
      fetchListStateSelector.mockImplementation(() => ({ pagination: { batchSize: 50, page: 2, isLast: false } }));

      const loadMoreItemsThunkAction = createLoadMoreItemsThunkAction({ fetchListAction, fetchListStateSelector });
      loadMoreItemsThunkAction()(dispatch, getState, {});

      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith(fetchListActionObj);

      expect(fetchListAction).toBeCalledTimes(1);
      expect(fetchListAction).toBeCalledWith({ batchSize: 50, page: 3 });
    });

    test('Passes `initialPage` if `page` is null', () => {
      fetchListStateSelector.mockImplementation(() => ({
        pagination: { batchSize: 50, page: null, isLast: false, initialPage: 1 },
      }));

      const loadMoreItemsThunkAction = createLoadMoreItemsThunkAction({ fetchListAction, fetchListStateSelector });
      loadMoreItemsThunkAction()(dispatch, getState, {});

      expect(fetchListAction).toBeCalledTimes(1);
      expect(fetchListAction).toBeCalledWith({ batchSize: 50, page: 1 });
    });

    test("Doesn't call `fetchList` if it's the last page", () => {
      fetchListStateSelector.mockImplementation(() => ({ pagination: { batchSize: 50, page: 2, isLast: true } }));

      const loadMoreItemsThunkAction = createLoadMoreItemsThunkAction({ fetchListAction, fetchListStateSelector });
      loadMoreItemsThunkAction()(dispatch, getState, {});

      expect(fetchListAction).not.toBeCalled();
    });

    test("Doesn't call `fetchList` if the list is already fetching the data", () => {
      fetchListStateSelector.mockImplementation(() => ({
        pagination: { batchSize: 50, page: 2, isLast: false },
        isFetching: true,
      }));

      const loadMoreItemsThunkAction = createLoadMoreItemsThunkAction({ fetchListAction, fetchListStateSelector });
      loadMoreItemsThunkAction()(dispatch, getState, {});

      expect(fetchListAction).not.toBeCalled();
    });
  });

  test('#createClearListAction', () => {
    const ACTION_NAME = 'ACTION_NAME';

    const expectedAction = { type: ACTION_NAME };

    const searchAction = createClearListAction(ACTION_NAME);

    expect(searchAction).toBeInstanceOf(Function);
    expect(searchAction()).toEqual(expectedAction);
  });

  test('#createSearchListAction', () => {
    const ACTION_NAME = 'ACTION_NAME';
    const searchStr = 'search string';

    const expectedAction = { type: ACTION_NAME, payload: { searchStr } };

    const searchAction = createSearchListAction(ACTION_NAME);

    expect(searchAction).toBeInstanceOf(Function);
    expect(searchAction({ searchStr })).toEqual(expectedAction);
  });
});
