// Selectors
import { selectUsersSettingsNationalitiesValues } from './users-settings.selectors';

// Constants
import { UsersNationalitiesE } from '../constants/users-settings.constants';

describe('#users-settings.selectors.ts', () => {
  describe('#selectUsersSettingsNationalitiesValues', () => {
    const nationalities = [
      { label: 'CH', value: UsersNationalitiesE.CH },
      { label: 'ES', value: UsersNationalitiesE.ES },
      { label: 'GB', value: UsersNationalitiesE.GB },
    ];

    test('Returns a correct list of nationalities', () => {
      expect(selectUsersSettingsNationalitiesValues.resultFunc(nationalities)).toEqual([
        UsersNationalitiesE.CH,
        UsersNationalitiesE.ES,
        UsersNationalitiesE.GB,
      ]);
    });
  });
});
