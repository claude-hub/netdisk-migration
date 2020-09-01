// Modules
import { PayloadAction } from '@reduxjs/toolkit';

// Typings
import { FetchListStateI, FetchListSuccessPayloadT } from '../typings/fetch-list.typings';
import { FetchFailurePayloadI, SearchListPayloadI } from '../typings/common-store.typings';

/**
 * Handles a start request state
 */
export const handleFetchListStart = <T>(state: FetchListStateI<T>): FetchListStateI<T> => ({
  ...state,
  isFetching: true,
});

/**
 * Handles a successful finish of the list fetching
 */
export const handleFetchListSuccess = <T>(
  state: FetchListStateI<T>,
  action: PayloadAction<FetchListSuccessPayloadT<T>>
): FetchListStateI<T> => {
  const { data } = action.payload;
  const { results, info } = data;

  const isLast = state.pagination.limit ? state.items.length + results.length >= state.pagination.limit : false;

  return {
    ...state,
    items: state.items.concat(results),
    pagination: {
      ...state.pagination,
      page: info.page,
      isLast,
    },
    isFetched: true,
    isFetching: false,
  };
};

/**
 * Handles a failed finish of the list fetching
 */
export const handleFetchListFailure = <T>(
  state: FetchListStateI<T>,
  action: PayloadAction<FetchFailurePayloadI>
): FetchListStateI<T> => ({
  ...state,
  error: action.payload.errorMsg,
  isFetched: true,
  isFetching: false,
});

/**
 * Handles searching of the list
 */
export const handleSearchList = <T>(
  state: FetchListStateI<T>,
  action: PayloadAction<SearchListPayloadI>
): FetchListStateI<T> => ({
  ...state,
  searchStr: action.payload.searchStr,
});
