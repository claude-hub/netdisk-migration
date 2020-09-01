// Modules
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

// Components
import UserDetailsModal from '../../components/user-details-modal';

// Selectors
import { selectUserDetailsModalData } from '../../selectors/user-details-modals.selectors';

// Actions
import { hideUserDetailsModal } from '../../actions/user-details-modals.actions';

// Utils
import * as userGetters from '../../utils/user-getters.utils';

// Typings
import { RootReducerStateT } from 'store/typings';

/**
 * Redux map state to props
 */
const mapStateToProps = (state: RootReducerStateT) => {
  const userDetailsModalData = selectUserDetailsModalData(state);

  return {
    isUserDetailsModalShown: userDetailsModalData?.isShown,
    selectedUser: userDetailsModalData?.additionalData?.user,
  };
};

const mapDispatchToProps = { hideUserDetailsModal };

const connector = connect(mapStateToProps, mapDispatchToProps);

/**
 * Local typings
 */
type PropsFromRedux = ConnectedProps<typeof connector>;

type UserDetailsModalContainerPropsT = PropsFromRedux;

/**
 * Users grid container. It fetches the initial list of users.
 */
const UserDetailsModalContainer = ({
  isUserDetailsModalShown,
  selectedUser,
  hideUserDetailsModal,
}: UserDetailsModalContainerPropsT) => (
  <UserDetailsModal
    isShown={isUserDetailsModalShown}
    closeModal={hideUserDetailsModal}
    firstName={userGetters.getUserNameFirst(selectedUser)}
    lastName={userGetters.getUserNameLast(selectedUser)}
    thumbnailURL={userGetters.getUserPictureLarge(selectedUser)}
    username={userGetters.getUserUsername(selectedUser)}
    email={userGetters.getUserEmail(selectedUser)}
    locationStreetName={userGetters.getUserLocationStreetName(selectedUser)}
    locationStreetNumber={userGetters.getUserLocationStreetNumber(selectedUser)}
    locationCity={userGetters.getUserLocationCity(selectedUser)}
    locationState={userGetters.getUserLocationState(selectedUser)}
    locationPostcode={userGetters.getUserLocationPostcode(selectedUser)}
    phone={userGetters.getUserPhone(selectedUser)}
    cell={userGetters.getUserCell(selectedUser)}
  />
);

export default connector(UserDetailsModalContainer);
