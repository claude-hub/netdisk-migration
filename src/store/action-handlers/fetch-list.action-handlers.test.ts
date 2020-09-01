// Handlers
import {
  handleFetchListStart,
  handleFetchListSuccess,
  handleFetchListFailure,
  handleSearchList,
} from './fetch-list.action-handlers';

// Typings
import { FetchListStateI, FetchListPaginationStateI, FetchListSuccessPayloadT } from '../typings/fetch-list.typings';

/**
 * Partial fetch list state type that has all fields
 * optional.
 */
type PartialFetchListStateT<T> = Partial<Omit<FetchListStateI<T>, 'pagination'>> & {
  pagination?: Partial<FetchListPaginationStateI>;
};

/**
 * Partial payload action that has all fields optional.
 */
type CreateActionArgsT<P> = { type?: string; payload: P };

/**
 * List item interface to use in the `FetchListI`
 */
interface ListItemI {
  id: string;
}

describe('#fetch-list.action-handlers.ts', () => {
  const ACTION_TYPE = 'ACTION_TYPE';

  /**
   * Fetch list state creator.
   */
  const createState = <T>({
    items = [],
    pagination: { batchSize = 50, page = null, limit = 1000, isLast = false, initialPage = 1 } = {},
    error = null,
    isFetched = false,
    isFetching = false,
    searchStr = '',
  }: PartialFetchListStateT<T> = {}): FetchListStateI<T> => ({
    items,
    pagination: { batchSize, page, limit, isLast, initialPage },
    error,
    isFetched,
    isFetching,
    searchStr,
  });

  /**
   * General payload action creator.
   */
  const createAction = <P>({ type = ACTION_TYPE, payload }: CreateActionArgsT<P>) => ({
    type,
    payload,
  });

  describe('#handleFetchListStart', () => {
    test('Handles start of fetching the list correctly', () => {
      const state = createState();
      const result = handleFetchListStart(state);

      expect(result).toEqual({ ...state, isFetching: true });
    });
  });

  describe('#handleFetchListSuccess', () => {
    test('Handles successful fetching of the list correctly', () => {
      const state = createState<ListItemI>({ pagination: { batchSize: 2 }, isFetching: true });

      const results = [{ id: 'some-id-1' }, { id: 'some-id-2' }];
      const payload: FetchListSuccessPayloadT<ListItemI> = {
        data: { results, info: { seed: 'seed12345', results: 2, page: 0, version: '1.2' } },
      };
      const action = createAction({ payload });

      const result = handleFetchListSuccess(state, action);

      expect(result).toEqual({
        ...state,
        items: results,
        pagination: {
          ...state.pagination,
          page: 0,
          isLast: false,
        },
        isFetching: false,
        isFetched: true,
      });
    });

    test('Sets `isLast` field correctly', () => {
      const state = createState<ListItemI>({
        items: [{ id: 'some-id-1' }, { id: 'some-id-2' }],
        pagination: { batchSize: 2, limit: 4, page: 0 },
        isFetched: true,
        isFetching: true,
      });

      const results = [{ id: 'some-id-3' }, { id: 'some-id-4' }];
      const payload: FetchListSuccessPayloadT<ListItemI> = {
        data: { results, info: { seed: 'seed12345', results: 2, page: 1, version: '1.2' } },
      };
      const action = createAction({ payload });

      const result = handleFetchListSuccess(state, action);

      expect(result).toEqual({
        ...state,
        items: state.items.concat(results),
        pagination: {
          ...state.pagination,
          page: 1,
          isLast: true,
        },
        isFetching: false,
        isFetched: true,
      });
    });

    test("Doesn't set `isLast` field if there's no `limit`", () => {
      const state = createState<ListItemI>({
        items: [{ id: 'some-id-1' }, { id: 'some-id-2' }],
        pagination: { batchSize: 2, limit: null, page: 0 },
        isFetched: true,
        isFetching: true,
      });

      const results = [{ id: 'some-id-3' }, { id: 'some-id-4' }];
      const payload: FetchListSuccessPayloadT<ListItemI> = {
        data: { results, info: { seed: 'seed12345', results: 2, page: 1, version: '1.2' } },
      };
      const action = createAction({ payload });

      const result = handleFetchListSuccess(state, action);

      expect(result).toEqual({
        ...state,
        items: state.items.concat(results),
        pagination: {
          ...state.pagination,
          page: 1,
          isLast: false,
        },
        isFetching: false,
        isFetched: true,
      });
    });
  });

  describe('#handleFetchListFailure', () => {
    test('Handles start of fetching the list correctly', () => {
      const state = createState({ isFetching: true });

      const errorMsg = 'Something has happened  :(';
      const action = createAction({ payload: { errorMsg } });

      const result = handleFetchListFailure(state, action);

      expect(result).toEqual({ ...state, isFetching: false, isFetched: true, error: errorMsg });
    });
  });

  describe('#handleSearchList', () => {
    test('Handles searching of the list correctly', () => {
      const state = createState();

      const searchStr = 'Dr Watson';
      const action = createAction({ payload: { searchStr } });

      const result = handleSearchList(state, action);

      expect(result).toEqual({ ...state, searchStr });
    });
  });
});
