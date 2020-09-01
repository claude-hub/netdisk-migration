// Modules
import React from 'react';
import { mount } from 'enzyme';

// Components
import UsersSearchInput from '../../components/users-search-input';

// Containers
import UsersSearchInputContainer from './users-search-input-container';

// Actions
import { searchUsersList } from '../../actions/users-list.actions';

// Utils
import { configureMockedStore } from 'utils/test-mocks.utils';

const mockStore = configureMockedStore();

describe('#users-search-input-container.tsx', () => {
  const getDefaultInitialState = ({ searchStr = '' }: { searchStr?: string } = {}) => ({
    features: {
      usersDashboard: {
        usersList: {
          searchStr,
        },
      },
    },
  });

  const createUsersSearchInputContainer = <T extends object>(initialState: T = getDefaultInitialState() as T) => {
    const store = mockStore(initialState);
    const component = mount(<UsersSearchInputContainer store={store} />);

    return { store, component };
  };

  test('Passes correct value to the input', () => {
    const searchStr = 'this is a search string';
    const initialState = getDefaultInitialState({ searchStr });

    const { component } = createUsersSearchInputContainer(initialState);

    expect(component.find(UsersSearchInput).prop('value')).toEqual(searchStr);
  });

  test('Dispatches correct action when searching for the user', () => {
    const { component, store } = createUsersSearchInputContainer();

    const searchStr = "we're looking for Sherlock Holmes and Dr. Watson";

    store.clearActions();
    component
      .find(UsersSearchInput)
      .find('input')
      .simulate('change', { target: { value: searchStr } });

    const expectedActions = [searchUsersList({ searchStr })];

    expect(store.getActions()).toEqual(expectedActions);
  });

  describe('Passes correct `metaMessage`', () => {
    test('Passes `null` if the search is not active', () => {
      const { component } = createUsersSearchInputContainer();

      const usersSearchInput = component.find(UsersSearchInput);

      expect(usersSearchInput.prop('metaMessage')).toBeNull();
    });

    test('Passes `metaMessage` with a message if the search is active', () => {
      const searchStr = "we're looking for Sherlock Holmes and Dr. Watson";
      const initialState = getDefaultInitialState({ searchStr });

      const { component } = createUsersSearchInputContainer(initialState);

      const usersSearchInput = component.find(UsersSearchInput);

      expect(usersSearchInput.prop('metaMessage')).toEqual(
        "You can't load more users while the search input is filled"
      );
    });
  });
});
