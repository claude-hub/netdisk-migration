// Constants
import { FETCH_USERS_LIST_URL } from 'constants/api-urls.constants';
import { FETCH_USERS_LIST, CLEAR_USERS_LIST, SEARCH_USERS_LIST } from '../constants/users-list.constants';
import { UsersQueryFieldsE } from '../constants/users-settings.constants';

// Action creators
import {
  createFetchListAction,
  createSearchListAction,
  createClearListAction,
  createLoadMoreItemsThunkAction,
} from 'store/action-creators';

// Selectors
import { selectUsersListData } from '../selectors/users-list.selectors';
import { selectUsersSettingsNationalitiesValues } from '../selectors/users-settings.selectors';

// Typings
import { ThunkActionT } from 'store/typings';

/**
 * Fetch users list action
 */
export const fetchUsersList = createFetchListAction({
  actionName: FETCH_USERS_LIST,
  url: FETCH_USERS_LIST_URL,
});

/**
 * Clear users list action
 */
export const clearUsersList = createClearListAction(CLEAR_USERS_LIST);

/**
 * Search users list action
 */
export const searchUsersList = createSearchListAction(SEARCH_USERS_LIST);

/**
 * Load more users thunk action
 */
export const loadMoreUsersThunkAction = createLoadMoreItemsThunkAction({
  fetchListAction: fetchUsersList,
  fetchListStateSelector: selectUsersListData,
});

/**
 * Load more users by `nationalities` setting
 */
export const loadMoreUsersByNationalitiesSetting = (): ThunkActionT => (dispatch, getState) => {
  const state = getState();

  const nationalities = selectUsersSettingsNationalitiesValues(state);
  const query = {
    [UsersQueryFieldsE.NATIONALITY]: nationalities,
  };

  dispatch(loadMoreUsersThunkAction({ query }));
};
