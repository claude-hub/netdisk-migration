// Reducers
import usersSettingsReducer from './users-settings.reducer';

// Actions
import { setUsersNationalitiesSetting } from '../actions/users-settings.actions';

// Constants
import { UsersNationalitiesOptions, SET_USERS_NATIONALITIES_SETTING } from '../constants/users-settings.constants';

describe('#users-settings.reducer.ts', () => {
  const initialState = {
    nationalities: UsersNationalitiesOptions,
  };

  const UNSUPPORTED_ACTION_TYPE = { type: 'UNSUPPORTED_ACTION_TYPE' };

  test('should return initial state if the state is not specified and the action type is not supported', () => {
    expect(usersSettingsReducer(undefined, UNSUPPORTED_ACTION_TYPE)).toEqual(initialState);
  });

  test('should return initial state if the action type is not supported', () => {
    expect(usersSettingsReducer(initialState, UNSUPPORTED_ACTION_TYPE)).toEqual(initialState);
  });

  describe('should return correct state for', () => {
    test(`=> action type: ${SET_USERS_NATIONALITIES_SETTING}`, () => {
      const nationalities = [UsersNationalitiesOptions[0], UsersNationalitiesOptions[2]];
      const setUsersNationalitiesSettingAction = setUsersNationalitiesSetting({ nationalities });

      expect(usersSettingsReducer(initialState, setUsersNationalitiesSettingAction)).toEqual({
        nationalities,
      });
    });
  });
});
