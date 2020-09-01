// Selectors
import { selectFilteredUsersList } from './users-list.selectors';

// Typings
import { UserI } from '../typings/user.typings';

describe('#users-list.selectors.ts', () => {
  describe('#selectFilteredUsersList', () => {
    const usersList = ([
      { name: { first: 'Albert', last: 'Einstein' } },
      { name: { first: 'Sherlock', last: 'Holmes' } },
      { name: { first: 'Donald', last: 'Trump' } },
    ] as unknown) as UserI[];

    test("Filters the data by the user's `name.first` and `name.last` fields", () => {
      expect(selectFilteredUsersList.resultFunc(usersList, 'Sher')).toEqual([usersList[1]]);
      expect(selectFilteredUsersList.resultFunc(usersList, 'Holm')).toEqual([usersList[1]]);

      expect(selectFilteredUsersList.resultFunc(usersList, 'Albert')).toEqual([usersList[0]]);
      expect(selectFilteredUsersList.resultFunc(usersList, 'Einstein')).toEqual([usersList[0]]);
    });

    test('Returns the initial usersList if `searchStr` is empty', () => {
      expect(selectFilteredUsersList.resultFunc(usersList, '')).toEqual(usersList);
    });

    test('Filters the data case insensitively', () => {
      expect(selectFilteredUsersList.resultFunc(usersList, 'sHeR')).toEqual([usersList[1]]);

      expect(selectFilteredUsersList.resultFunc(usersList, 'alBErt')).toEqual([usersList[0]]);
    });
  });
});
