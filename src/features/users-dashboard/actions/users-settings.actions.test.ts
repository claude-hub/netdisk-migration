// Constants
import { SET_USERS_NATIONALITIES_SETTING, UsersNationalitiesOptions } from '../constants/users-settings.constants';

// Actions
import { setUsersNationalitiesSetting } from './users-settings.actions';

describe('#users-settings.actions.ts', () => {
  describe('#setUsersNationalitiesSetting', () => {
    test('Returns a correct action', () => {
      const selectedNationalities = UsersNationalitiesOptions.slice(0, 1);

      const expectedAction = {
        type: SET_USERS_NATIONALITIES_SETTING,
        payload: {
          nationalities: selectedNationalities,
        },
      };

      expect(setUsersNationalitiesSetting({ nationalities: selectedNationalities })).toEqual(expectedAction);
    });
  });
});
