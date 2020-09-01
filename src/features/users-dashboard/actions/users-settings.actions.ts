// Modules
import { createAction } from '@reduxjs/toolkit';

// Constants
import { SET_USERS_NATIONALITIES_SETTING } from '../constants/users-settings.constants';

// Typings
import { SetUsersNationalitiesSettingPayloadI } from '../typings/users-settings.typings';

/**
 * Set users nationalities setting
 */
export const setUsersNationalitiesSetting = createAction<SetUsersNationalitiesSettingPayloadI>(
  SET_USERS_NATIONALITIES_SETTING
);
