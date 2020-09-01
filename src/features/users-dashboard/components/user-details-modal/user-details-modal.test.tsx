// Modules
import React from 'react';
import { shallow } from 'enzyme';

// Components
import Modal from 'components/modal';
import Button from 'components/button';
import LabelValue from '../label-value';
import UserDetailsModal from './user-details-modal';

describe('#user-details-modal.tsx', () => {
  const defaultCloseModal = jest.fn();
  const defaultFirstName = 'Sherlock';
  const defaultLastName = 'Holmes';
  const defaultThumbnailUrl = 'https://randomuser.me/api/portraits/men/59.jpg';
  const defaultUsername = 'sherlock.holmes';
  const defaultEmail = 'sherlock.holmes@gmail.com';
  const defaultLocationStreetName = 'Bakers st';
  const defaultLocationStreetNumber = 29;
  const defaultLocationCity = 'London';
  const defaultLocationState = 'London';
  const defaultLocationPostcode = 65000;
  const defaultPhone = '1234567';
  const defaultCell = '7654321';

  const createUserDetailsModal = ({
    isShown = true,
    firstName = defaultFirstName,
    lastName = defaultLastName,
    thumbnailURL = defaultThumbnailUrl,
    username = defaultUsername,
    email = defaultEmail,
    locationStreetName = defaultLocationStreetName,
    locationStreetNumber = defaultLocationStreetNumber,
    locationCity = defaultLocationCity,
    locationState = defaultLocationState,
    locationPostcode = defaultLocationPostcode,
    phone = defaultPhone,
    cell = defaultCell,
    closeModal = defaultCloseModal,
  }: {
    isShown?: boolean;
    firstName?: string;
    lastName?: string;
    thumbnailURL?: string;
    username?: string;
    email?: string;
    locationStreetName?: string;
    locationStreetNumber?: number;
    locationCity?: string;
    locationState?: string;
    locationPostcode?: number;
    phone?: string;
    cell?: string;
    closeModal?: () => void;
  } = {}) =>
    shallow(
      <UserDetailsModal
        isShown={isShown}
        firstName={firstName}
        lastName={lastName}
        thumbnailURL={thumbnailURL}
        username={username}
        email={email}
        locationStreetName={locationStreetName}
        locationStreetNumber={locationStreetNumber}
        locationCity={locationCity}
        locationState={locationState}
        locationPostcode={locationPostcode}
        phone={phone}
        cell={cell}
        closeModal={closeModal}
      />
    );

  test('Renders correctly', () => {
    const userDetailsModal = createUserDetailsModal();

    expect(userDetailsModal.find('.full-name').text()).toEqual(`${defaultFirstName} ${defaultLastName}`);
    expect(userDetailsModal.find('.thumbnail').prop('src')).toEqual(defaultThumbnailUrl);

    expect(userDetailsModal.find(LabelValue).length).toEqual(8);

    expect(userDetailsModal.find(LabelValue).at(0).prop('label')).toEqual('Username: ');
    expect(userDetailsModal.find(LabelValue).at(0).prop('value')).toEqual(defaultUsername);

    expect(userDetailsModal.find(LabelValue).at(1).prop('label')).toEqual('Email: ');
    expect(userDetailsModal.find(LabelValue).at(1).prop('value')).toEqual(
      <a href={`mailto: ${defaultEmail}`}>{defaultEmail}</a>
    );

    expect(userDetailsModal.find(LabelValue).at(2).prop('label')).toEqual('Street: ');
    expect(userDetailsModal.find(LabelValue).at(2).prop('value')).toEqual(
      `${defaultLocationStreetName} st. ${defaultLocationStreetNumber}`
    );

    expect(userDetailsModal.find(LabelValue).at(3).prop('label')).toEqual('City: ');
    expect(userDetailsModal.find(LabelValue).at(3).prop('value')).toEqual(defaultLocationCity);

    expect(userDetailsModal.find(LabelValue).at(4).prop('label')).toEqual('State: ');
    expect(userDetailsModal.find(LabelValue).at(4).prop('value')).toEqual(defaultLocationState);

    expect(userDetailsModal.find(LabelValue).at(5).prop('label')).toEqual('Postcode: ');
    expect(userDetailsModal.find(LabelValue).at(5).prop('value')).toEqual(defaultLocationPostcode);

    expect(userDetailsModal.find(LabelValue).at(6).prop('label')).toEqual('Phone: ');
    expect(userDetailsModal.find(LabelValue).at(6).prop('value')).toEqual(defaultPhone);

    expect(userDetailsModal.find(LabelValue).at(7).prop('label')).toEqual('Cell: ');
    expect(userDetailsModal.find(LabelValue).at(7).prop('value')).toEqual(defaultCell);

    expect(userDetailsModal.find(Button).prop('onClick')).toEqual(defaultCloseModal);
  });

  test('Passes `isShown` correctly', () => {
    const userDetailsModal = createUserDetailsModal();

    expect(userDetailsModal.find(Modal).prop('isShown')).toEqual(true);
  });

  test('Passes `onEscClick` correctly', () => {
    const userDetailsModal = createUserDetailsModal();

    expect(userDetailsModal.find(Modal).prop('onEscClick')).toEqual(defaultCloseModal);
  });
});
