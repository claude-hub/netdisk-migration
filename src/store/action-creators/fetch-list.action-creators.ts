// Modules
import { Selector } from 'reselect';
import { createAction } from '@reduxjs/toolkit';

// Constants
import { HttpMethodsE, ActionsTransportsE } from 'constants/api.constants';

// Utils
import { buildQueryString, ParamsI, QueryI } from 'utils/url-builder.utils';

// Typings
import { BodyI } from 'typings/api.typings';
import { CommonActionT, RootReducerStateT, ThunkActionT, SearchListPayloadI } from '../typings/common-store.typings';
import { FetchListStateI } from '../typings/fetch-list.typings';

/**
 * Returns a initial state for the `fetch-list` reducer
 */
export const createFetchListInitialState = <T>({
  limit = 1000,
  batchSize = 50,
  initialPage = 1,
}: {
  limit?: number;
  batchSize?: number;
  initialPage?: number;
}): FetchListStateI<T> => ({
  items: [],
  pagination: {
    page: null,
    initialPage,
    isLast: false,
    batchSize,
    limit,
  },
  searchStr: '',
  error: null,
  isFetched: false,
  isFetching: false,
});

/**
 * Creates an action for fetching lists
 */
export const createFetchListAction = ({
  actionName,
  url,
  method = HttpMethodsE.GET,
}: {
  actionName: string;
  url: string;
  method?: HttpMethodsE;
}) => <P>({
  batchSize,
  page,
  payload = {} as P,
  body,
  query: queryParams = {},
  params = {},
}: {
  batchSize: number;
  page: number;
  payload?: P;
  body?: BodyI;
  query?: QueryI;
  params?: ParamsI;
}): CommonActionT<P, ActionsTransportsE> => {
  const defaultQueryParams = { results: batchSize, page };

  const query = {
    ...defaultQueryParams,
    ...queryParams,
  };

  return {
    type: actionName,

    payload,

    transport: ActionsTransportsE.REQUEST,
    requestParams: {
      url: buildQueryString(url, { query, params }),
      method,
      body,
    },
  };
};

/**
 * Creates a `clear-list` action
 */
export const createClearListAction = (actionName: string) => createAction(actionName);

/**
 * Creates a `search-list` action
 */
export const createSearchListAction = (actionName: string) => createAction<SearchListPayloadI>(actionName);

/**
 * Create thunk action arguments interface
 */
interface CreateThunkActionI<S> {
  fetchListStateSelector: Selector<RootReducerStateT, FetchListStateI<S>>;
  fetchListAction: ReturnType<typeof createFetchListAction>;
}

/**
 * Creates a thunk action which handles the pagination
 * of the fetch list action
 */
export const createLoadMoreItemsThunkAction = <S>({
  fetchListAction,
  fetchListStateSelector,
}: CreateThunkActionI<S>) => <P>({
  payload,
  body,
  query,
  params,
}: {
  payload?: P;
  body?: BodyI;
  query?: QueryI;
  params?: ParamsI;
} = {}): ThunkActionT => (dispatch, getState) => {
  const state = getState();

  const { pagination, isFetching } = fetchListStateSelector(state);
  const { batchSize, page, isLast, initialPage } = pagination;

  const nextPage = page ? page + 1 : initialPage;

  !isLast &&
    !isFetching &&
    dispatch(
      fetchListAction({
        batchSize,
        page: nextPage,
        payload,
        body,
        query,
        params,
      })
    );
};
