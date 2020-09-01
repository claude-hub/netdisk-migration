// Modules
import { createReducer, PayloadAction } from '@reduxjs/toolkit';

// Constants
import { SET_USERS_NATIONALITIES_SETTING, UsersNationalitiesOptions } from '../constants/users-settings.constants';

// Typings
import { SetUsersNationalitiesSettingPayloadI } from '../typings/users-settings.typings';

const initialState = {
  nationalities: UsersNationalitiesOptions,
};

type StateT = typeof initialState;

/**
 * Sets users nationalities settings
 */
const handleSetUsersNationalitiesSetting = (
  state: StateT,
  action: PayloadAction<SetUsersNationalitiesSettingPayloadI>
): StateT => ({
  ...state,
  nationalities: action.payload.nationalities,
});

const handlers = {
  [SET_USERS_NATIONALITIES_SETTING]: handleSetUsersNationalitiesSetting,
};

export default createReducer(initialState, handlers);
