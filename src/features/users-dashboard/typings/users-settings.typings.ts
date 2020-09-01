// Constants
import { UsersNationalitiesE } from '../constants/users-settings.constants';

// Typings
import { LabelValueI } from 'typings/data-structures.typings';

/**
 * Users nationality setting type
 */
export type UsersNationalitySettingT = LabelValueI<UsersNationalitiesE, string>;

/**
 * Set users nationalities setting action payload
 */
export interface SetUsersNationalitiesSettingPayloadI {
  nationalities: UsersNationalitySettingT[];
}
