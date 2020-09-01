// Modules
import { createReducer } from '@reduxjs/toolkit';

// Constants
import { HttpActionsTypesE } from 'constants/api.constants';
import { FETCH_USERS_LIST, CLEAR_USERS_LIST, SEARCH_USERS_LIST } from '../constants/users-list.constants';

// Action creators
import { createFetchListInitialState } from 'store/action-creators';

// Action handlers
import {
  handleFetchListFailure,
  handleFetchListSuccess,
  handleFetchListStart,
  handleSearchList,
} from 'store/action-handlers';

// Utils
import { buildActionType } from 'store/utils/build-action-type.utils';

// Typings
import { UserI } from '../typings/user.typings';

const initialState = createFetchListInitialState<UserI>({ limit: 1000, batchSize: 50 });

const handlers = {
  [buildActionType(FETCH_USERS_LIST, HttpActionsTypesE.FETCH)]: handleFetchListStart,
  [buildActionType(FETCH_USERS_LIST, HttpActionsTypesE.SUCCESS)]: handleFetchListSuccess,
  [buildActionType(FETCH_USERS_LIST, HttpActionsTypesE.FAILURE)]: handleFetchListFailure,
  [SEARCH_USERS_LIST]: handleSearchList,
  [CLEAR_USERS_LIST]: () => initialState,
};

export default createReducer(initialState, handlers);
