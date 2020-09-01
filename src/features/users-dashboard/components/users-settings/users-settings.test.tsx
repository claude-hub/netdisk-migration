// Modules
import React from 'react';
import { shallow } from 'enzyme';

// Components
import MultiSelect from 'components/multi-select';

// Constants
import { UsersNationalitiesOptions } from '../../constants/users-settings.constants';

// Containers
import UsersSettings, { UsersSettingsPropsI } from './users-settings';

describe('#users-search-input.tsx', () => {
  const defaultSetNationalities = jest.fn();
  const defaultSelectedNationalities = [UsersNationalitiesOptions[0]];

  const createUsersSettings = ({
    selectedNationalities = defaultSelectedNationalities,
    setNationalities = defaultSetNationalities,
  }: Partial<UsersSettingsPropsI> = {}) =>
    shallow(<UsersSettings selectedNationalities={selectedNationalities} setNationalities={setNationalities} />);

  test('Passes `setNationalities` correctly', () => {
    const usersSearchInput = createUsersSettings();

    expect(usersSearchInput.find(MultiSelect).prop('onChange')).toEqual(defaultSetNationalities);
  });

  test('Passes `selectedNationalities` correctly', () => {
    const usersSearchInput = createUsersSettings();

    expect(usersSearchInput.find(MultiSelect).prop('selectedOptions')).toEqual(defaultSelectedNationalities);
  });
});
