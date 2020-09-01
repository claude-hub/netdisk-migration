// Modules
import { createSelector } from 'reselect';

// Typings
import { RootReducerStateT } from 'store/typings';

// Utils
import { getValue } from 'utils/getters.utils';

/**
 * Selects users settings
 */
export const selectUsersSettings = (state: RootReducerStateT) => state.features.usersDashboard.usersSettings;

/**
 * Selects users settings nationalities
 */
export const selectUsersSettingsNationalities = createSelector(
  [selectUsersSettings],
  usersSettings => usersSettings.nationalities
);

/**
 * Selects users settings nationalities values
 */
export const selectUsersSettingsNationalitiesValues = createSelector(
  [selectUsersSettingsNationalities],
  nationalities => nationalities.map(nationality => getValue(nationality) as string)
);
