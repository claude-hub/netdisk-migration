// Modules
import React from 'react';
import { mount } from 'enzyme';

// Constants
import { ActionsTransportsE, HttpMethodsE } from 'constants/api.constants';
import { FETCH_USERS_LIST, CLEAR_USERS_LIST } from '../../constants/users-list.constants';
import { UsersNationalitiesOptions } from '../../constants/users-settings.constants';

// Components
import UsersGrid from '../../components/users-grid';

// Containers
import UserDetailsModalContainer from '../user-details-modal-container';

// Utils
import { configureMockedStore } from 'utils/test-mocks.utils';

// Containers
import UsersGridContainer, { UsersGridContainerPropsT } from './users-grid-container';

const mockStore = configureMockedStore();

jest.mock('../user-details-modal-container', () => () => <div>mocked user details modal container </div>);

describe('#users-grid-container.tsx', () => {
  const usersNationalities = [UsersNationalitiesOptions[0], UsersNationalitiesOptions[1]];
  const usersList = [{ name: { first: 'Albert', last: 'Einstein' } }, { name: { first: 'Sherlock', last: 'Holmes' } }];
  const usersLimit = 1000;

  const getInitialState = ({ searchStr = '' }: { searchStr?: string } = {}) => ({
    features: {
      usersDashboard: {
        usersList: {
          items: usersList,
          pagination: {
            batchSize: 50,
            page: 1,
            isLast: false,
            limit: usersLimit,
          },
          isFetched: false,
          isFetching: false,
          searchStr,
        },
        usersSettings: {
          nationalities: usersNationalities,
        },
      },
    },
  });

  const createUsersGridContainer = <T extends object | undefined>({
    initialState = getInitialState(),
    props = {},
  }: {
    initialState?: T;
    props?: UsersGridContainerPropsT;
  } = {}) => {
    const store = mockStore(initialState);

    const component = mount(<UsersGridContainer store={store} {...props} />);

    return { store, component };
  };

  test('Fetches users list on mount', () => {
    const { store } = createUsersGridContainer();

    const expectedActions = [
      {
        type: FETCH_USERS_LIST,
        payload: {},
        transport: ActionsTransportsE.REQUEST,
        requestParams: {
          url: 'undefined/api/?results=50&page=2&nat=ch%2Ces',
          method: HttpMethodsE.GET,
        },
      },
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Clears usersList on unmount', () => {
    const { store, component } = createUsersGridContainer();

    component.unmount();

    expect(store.getActions()[1]).toEqual({
      type: CLEAR_USERS_LIST,
    });
  });

  test('Passes correct props to the `UsersGrid` component', () => {
    const threshold = 50;
    const columnWidth = 200;
    const rowHeight = 100;
    const minColumnCount = 2;
    const maxColumnCount = 4;
    const footerComponent = () => <div>this is footer</div>;

    const { component } = createUsersGridContainer({
      props: { threshold, columnWidth, rowHeight, minColumnCount, maxColumnCount, footerComponent },
    });

    const usersGrid = component.find(UsersGrid);

    expect(usersGrid.prop('usersList')).toEqual(usersList);
    expect(usersGrid.prop('loadMoreItems')).toBeInstanceOf(Function);
    expect(usersGrid.prop('showUserDetailsModal')).toBeInstanceOf(Function);
    expect(usersGrid.prop('itemsLimit')).toEqual(usersLimit);

    expect(usersGrid.prop('threshold')).toEqual(threshold);
    expect(usersGrid.prop('columnWidth')).toEqual(columnWidth);
    expect(usersGrid.prop('rowHeight')).toEqual(rowHeight);
    expect(usersGrid.prop('minColumnCount')).toEqual(minColumnCount);
    expect(usersGrid.prop('maxColumnCount')).toEqual(maxColumnCount);
    expect(usersGrid.prop('footerComponent')).toEqual(footerComponent);
  });

  test('Mounts `UserDetailsModalContainer`', () => {
    const { component } = createUsersGridContainer();

    expect(component.find(UserDetailsModalContainer).exists()).toBe(true);
  });

  describe('Loads more users', () => {
    test('Loads more users correctly', () => {
      const expectedActions = [
        {
          type: FETCH_USERS_LIST,
          payload: {},
          transport: ActionsTransportsE.REQUEST,
          requestParams: {
            url: 'undefined/api/?results=50&page=2&nat=ch%2Ces',
            method: HttpMethodsE.GET,
          },
        },
      ];

      const { store, component } = createUsersGridContainer();

      store.clearActions();
      component.find(UsersGrid).prop('loadMoreItems')();

      expect(store.getActions()).toEqual(expectedActions);
    });

    test('Does not load more users if the search is active', () => {
      const searchStr = 'some search str';
      const initialState = getInitialState({ searchStr });

      const { store, component } = createUsersGridContainer({ initialState });

      store.clearActions();

      component.find(UsersGrid).prop('loadMoreItems')();

      expect(store.getActions()).toEqual([]);
    });
  });
});
