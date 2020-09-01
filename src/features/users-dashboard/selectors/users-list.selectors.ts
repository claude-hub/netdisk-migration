// Modules
import { createSelector } from 'reselect';

// Typings
import { RootReducerStateT } from 'store/typings';

// Utils
import { includesBy } from 'utils/string.utils';
import * as userUtils from '../utils/user-getters.utils';

/**
 * A wrapper for `includesBy` to check case insensitively
 */
const includesByLoweCase = (str1: string, str2: string) => includesBy(str1, str2, val => val.toLocaleUpperCase());

/**
 * Selects users list general data
 */
export const selectUsersListData = (state: RootReducerStateT) => state.features.usersDashboard.usersList;

/**
 * Selects users list items
 */
export const selectUsersListDataItems = createSelector([selectUsersListData], usersListData => usersListData.items);

/**
 * Selects users list limit
 */
export const selectUsersListLimit = createSelector(
  [selectUsersListData],
  usersListData => usersListData.pagination.limit
);

/**
 * Selects users list is fetching
 */
export const selectUsersListIsFetching = createSelector(
  [selectUsersListData],
  usersListData => usersListData.isFetching
);

/**
 * Selects users list is fetching
 */
export const selectUsersListSearchStr = createSelector([selectUsersListData], usersListData => usersListData.searchStr);

/**
 * Selects a filtered users list based on the `searchStr`
 */
export const selectFilteredUsersList = createSelector(
  [selectUsersListDataItems, selectUsersListSearchStr],
  (usersList, searchStr) =>
    usersList.filter(
      user =>
        includesByLoweCase(userUtils.getUserNameFirst(user), searchStr) ||
        includesByLoweCase(userUtils.getUserNameLast(user), searchStr)
    )
);
