// Modules
import React from 'react';
import { mount } from 'enzyme';

// Constants
import { USER_DETAILS_MODAL_ID } from '../../constants/user-details-modals.constants';

// Containers
import UserDetailsModalContainer from './user-details-modal-container';

// Components
import UserDetailsModal from '../../components/user-details-modal';

// Utils
import { configureMockedStore } from 'utils/test-mocks.utils';

const mockStore = configureMockedStore();

/**
 * We need to mock `UserDetailsModal` in order
 * not to call `createPortal` inside of it
 */
jest.mock('../../components/user-details-modal', () => () => <div>mocked component</div>);

describe('#user-details-modal-container.tsx', () => {
  const user = {
    name: {
      first: 'Sherlock',
      last: 'Holmes',
    },
    location: {
      street: {
        name: 'Bakers',
        number: 29,
      },
      city: 'London',
      state: 'London',
      postcode: '00000',
    },
    phone: '1234567',
    cell: '7654321',
    picture: {
      large: 'https://randomuser.me/api/portraits/men/59.jpg',
    },
    email: 'sherlock.holmes@gmail.com',
  };

  const additionalData = { user };

  const defaultInitialState = {
    global: {
      modals: {
        [USER_DETAILS_MODAL_ID]: { isShown: true, additionalData },
      },
    },
  };

  const createUserDetailsModalContainer = <T extends object>(initialState: T = defaultInitialState as T) => {
    const store = mockStore(initialState);

    return mount(<UserDetailsModalContainer store={store} />);
  };

  test('Passes correct data to the `UserDetailsModal`', () => {
    const userDetailsModalContainer = createUserDetailsModalContainer();
    const userDetailsModal = userDetailsModalContainer.find(UserDetailsModal);

    expect(userDetailsModal.prop('isShown')).toEqual(true);

    expect(userDetailsModal.prop('firstName')).toEqual(user.name.first);
    expect(userDetailsModal.prop('lastName')).toEqual(user.name.last);
    expect(userDetailsModal.prop('thumbnailURL')).toEqual(user.picture.large);
    expect(userDetailsModal.prop('username')).toEqual('sherlock.holmes');
    expect(userDetailsModal.prop('email')).toEqual(user.email);

    expect(userDetailsModal.prop('locationStreetName')).toEqual(user.location.street.name);
    expect(userDetailsModal.prop('locationStreetNumber')).toEqual(user.location.street.number);
    expect(userDetailsModal.prop('locationCity')).toEqual(user.location.city);
    expect(userDetailsModal.prop('locationState')).toEqual(user.location.state);
    expect(userDetailsModal.prop('locationPostcode')).toEqual(user.location.postcode);

    expect(userDetailsModal.prop('phone')).toEqual(user.phone);
    expect(userDetailsModal.prop('cell')).toEqual(user.cell);

    expect(userDetailsModal.prop('closeModal')).toBeInstanceOf(Function);
  });
});
