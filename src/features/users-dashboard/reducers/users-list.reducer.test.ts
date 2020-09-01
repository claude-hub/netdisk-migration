// Reducers
import usersListReducer from './users-list.reducer';

// Constants
import { HttpActionsTypesE } from 'constants/api.constants';
import { FETCH_USERS_LIST, CLEAR_USERS_LIST, SEARCH_USERS_LIST } from '../constants/users-list.constants';

// Action handlers
import {
  handleFetchListFailure,
  handleFetchListSuccess,
  handleFetchListStart,
  handleSearchList,
} from 'store/action-handlers';

// Action creators
import { createFetchListInitialState } from 'store/action-creators';

// Actions
import { searchUsersList, clearUsersList } from '../actions/users-list.actions';

// Utils
import { buildActionType } from 'store/utils/build-action-type.utils';

// Typings
import { UserI } from '../typings/user.typings';

describe('#users-list.reducer.ts', () => {
  const initialState = createFetchListInitialState<UserI>({ limit: 1000, batchSize: 50 });

  const UNSUPPORTED_ACTION_TYPE = { type: 'UNSUPPORTED_ACTION_TYPE' };

  test('should return initial state if the state is not specified and the action type is not supported', () => {
    expect(usersListReducer(undefined, UNSUPPORTED_ACTION_TYPE)).toEqual(initialState);
  });

  test('should return initial state if the action type is not supported', () => {
    expect(usersListReducer(initialState, UNSUPPORTED_ACTION_TYPE)).toEqual(initialState);
  });

  describe('should return correct state for', () => {
    test(`=> action type: ${buildActionType(FETCH_USERS_LIST, HttpActionsTypesE.FETCH)}`, () => {
      const fetchAction = { type: buildActionType(FETCH_USERS_LIST, HttpActionsTypesE.FETCH) };

      const expectedState = handleFetchListStart(initialState);

      expect(usersListReducer(initialState, fetchAction)).toEqual(expectedState);
    });

    test(`=> action type: ${buildActionType(FETCH_USERS_LIST, HttpActionsTypesE.SUCCESS)}`, () => {
      const fetchSuccessAction = {
        type: buildActionType(FETCH_USERS_LIST, HttpActionsTypesE.SUCCESS),
        payload: {
          data: {
            results: ([{ id: 1 }, { id: 2 }] as unknown) as UserI[],
            info: { page: 0, seed: 'eee', results: 2, version: '1.2' },
          },
        },
      };

      const expectedState = handleFetchListSuccess(initialState, fetchSuccessAction);

      expect(usersListReducer(initialState, fetchSuccessAction)).toEqual(expectedState);
    });

    test(`=> action type: ${buildActionType(FETCH_USERS_LIST, HttpActionsTypesE.FAILURE)}`, () => {
      const fetchFailureAction = {
        type: buildActionType(FETCH_USERS_LIST, HttpActionsTypesE.FAILURE),
        payload: {
          errorMsg: 'Something has happened :C',
        },
      };

      const expectedState = handleFetchListFailure(initialState, fetchFailureAction);

      expect(usersListReducer(initialState, fetchFailureAction)).toEqual(expectedState);
    });

    test(`=> action type: ${CLEAR_USERS_LIST}`, () => {
      const clearAction = clearUsersList();

      expect(usersListReducer({ ...initialState, isFetching: true }, clearAction)).toEqual(initialState);
    });

    test(`=> action type: ${SEARCH_USERS_LIST}`, () => {
      const searchStr = 'search string';
      const searchAction = searchUsersList({ searchStr });

      const expectedState = handleSearchList(initialState, searchAction);

      expect(usersListReducer(initialState, searchAction)).toEqual(expectedState);
    });
  });
});
