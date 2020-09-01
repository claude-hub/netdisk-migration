// Modules
import React from 'react';
import { shallow } from 'enzyme';

// Components
import Button from 'components/button';
import LabelValue from '../label-value';
import UsersGridItem from './users-grid-item';

describe('#users-list-item.tsx', () => {
  const defaultOnShowMoreDetailsClick = jest.fn();
  const defaultThumbnailUrl = 'this is gonna be a thumbnail';
  const defaultFirstName = 'Albert';
  const defaultLastName = 'Einstein';
  const defaultUsername = 'albert';
  const defaultEmail = 'albert@corporationofgood.com';

  const createUsersGridItem = ({
    onShowMoreDetailsClick = defaultOnShowMoreDetailsClick,
    thumbnailURL = defaultThumbnailUrl,
    firstName = defaultFirstName,
    lastName = defaultLastName,
    username = defaultUsername,
    email = defaultEmail,
  }: {
    onShowMoreDetailsClick?: () => void;
    thumbnailURL?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
  } = {}) =>
    shallow(
      <UsersGridItem
        onShowMoreDetailsClick={onShowMoreDetailsClick}
        thumbnailURL={thumbnailURL}
        firstName={firstName}
        lastName={lastName}
        username={username}
        email={email}
      />
    );

  test('Renders correctly', () => {
    const usersGridItem = createUsersGridItem();

    const fullName = usersGridItem.find(LabelValue).at(0);
    const username = usersGridItem.find(LabelValue).at(1);
    const email = usersGridItem.find(LabelValue).at(2);

    expect(usersGridItem.find('.thumbnail').prop('src')).toEqual(defaultThumbnailUrl);

    expect(fullName.prop('label')).toEqual('Name: ');
    expect(fullName.prop('value')).toEqual(`${defaultFirstName} ${defaultLastName}`);

    expect(username.prop('label')).toEqual('Username: ');
    expect(username.prop('value')).toEqual(defaultUsername);

    expect(email.prop('label')).toEqual('Email: ');
    expect(email.prop('value')).toEqual(<a href={`mailto: ${defaultEmail}`}>{defaultEmail}</a>);

    expect(usersGridItem.find(Button).prop('onClick')).toEqual(defaultOnShowMoreDetailsClick);
  });
});
