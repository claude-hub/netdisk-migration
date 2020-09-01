// Modules
import React from 'react';
import { shallow } from 'enzyme';

// Components
import Input from 'components/input';

// Containers
import UsersSearchInput, { UsersSearchInputPropsI } from './users-search-input';

describe('#users-search-input.tsx', () => {
  const defaultOnChange = jest.fn();
  const defaultValue = 'some value';

  const createUsersSearchInput = ({
    onChange = defaultOnChange,
    value = defaultValue,
    metaMessage = null,
  }: Partial<UsersSearchInputPropsI> = {}) =>
    shallow(<UsersSearchInput onChange={onChange} value={value} metaMessage={metaMessage} />);

  test('Renders correctly', () => {
    const usersSearchInput = createUsersSearchInput();

    expect(usersSearchInput.find(Input).prop('placeholder')).toEqual('Search for the users...');
  });

  test('Passes `value` correctly', () => {
    const usersSearchInput = createUsersSearchInput();

    expect(usersSearchInput.find(Input).prop('value')).toEqual(defaultValue);
  });

  test('Passes `onChange` correctly', () => {
    const usersSearchInput = createUsersSearchInput();
    const evt = { target: { value: 'some - value' } };

    usersSearchInput.find(Input).simulate('change', evt);

    expect(defaultOnChange).toBeCalledWith(evt);
  });

  test('Shows meta message if it is passed', () => {
    const usersSearchInput = createUsersSearchInput();
    const metaMessage = 'some meta-message';

    expect(usersSearchInput.find('.meta-msg').text()).toEqual('');

    usersSearchInput.setProps({ metaMessage });

    expect(usersSearchInput.find('.meta-msg').text()).toEqual(metaMessage);
  });
});
