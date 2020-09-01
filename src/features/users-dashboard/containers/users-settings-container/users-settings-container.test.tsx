// Modules
import React from 'react';
import { mount } from 'enzyme';

// Components
import UsersSettings from '../../components/users-settings';

// Containers
import UsersSettingsContainer from './users-settings-container';

// Actions
import { setUsersNationalitiesSetting } from '../../actions/users-settings.actions';

// Typings
import { UsersNationalitySettingT } from '../../typings/users-settings.typings';

// Constants
import { UsersNationalitiesOptions } from '../../constants/users-settings.constants';

// Utils
import { configureMockedStore } from 'utils/test-mocks.utils';

const mockStore = configureMockedStore();

describe('#users-settings-container.tsx', () => {
  const defaultNationalities = [UsersNationalitiesOptions[0], UsersNationalitiesOptions[1]];

  const getDefaultInitialState = ({
    nationalities = defaultNationalities,
  }: { nationalities?: UsersNationalitySettingT[] } = {}) => ({
    features: {
      usersDashboard: {
        usersSettings: {
          nationalities,
        },
      },
    },
  });

  const createUsersSettingsContainer = <T extends object>(initialState: T = getDefaultInitialState() as T) => {
    const store = mockStore(initialState);
    const component = mount(<UsersSettingsContainer store={store} />);

    return { store, component };
  };

  test('Passes correct props to `UsersSettings` component', () => {
    const { component } = createUsersSettingsContainer();

    expect(component.find(UsersSettings).prop('selectedNationalities')).toEqual(defaultNationalities);
    expect(component.find(UsersSettings).prop('setNationalities')).toBeInstanceOf(Function);
  });

  test('Dispatches correct action when setting users nationalities', () => {
    const { component, store } = createUsersSettingsContainer();

    store.clearActions();

    const nationalities = [UsersNationalitiesOptions[2], UsersNationalitiesOptions[3]];

    component.find(UsersSettings).prop('setNationalities')(nationalities);

    const expectedActions = [setUsersNationalitiesSetting({ nationalities })];

    expect(store.getActions()).toEqual(expectedActions);
  });
});
