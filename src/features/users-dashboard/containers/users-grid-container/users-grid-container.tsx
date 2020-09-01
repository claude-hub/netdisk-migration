// Modules
import React, { useEffect, Fragment, useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';

// Components
import UsersGrid, { UsersGridPropsI } from '../../components/users-grid';
import UsersGridFooter from '../../components/users-grid-footer';

// Containers
import UserDetailsModalContainer from '../user-details-modal-container';

// Selectors
import {
  selectUsersListLimit,
  selectUsersListIsFetching,
  selectUsersListSearchStr,
  selectFilteredUsersList,
} from '../../selectors/users-list.selectors';

// Actions
import { loadMoreUsersByNationalitiesSetting, clearUsersList } from '../../actions/users-list.actions';
import { showUserDetailsModal } from '../../actions/user-details-modals.actions';

// Typings
import { RootReducerStateT } from 'store/typings';

/**
 * Redux map state to props
 */
const mapStateToProps = (state: RootReducerStateT) => ({
  usersList: selectFilteredUsersList(state),
  usersLimit: selectUsersListLimit(state) || 1000,
  isUsersListFetching: selectUsersListIsFetching(state),
  usersListSearchStr: selectUsersListSearchStr(state),
});

const mapDispatchToProps = { loadMoreUsersByNationalitiesSetting, clearUsersList, showUserDetailsModal };

const connector = connect(mapStateToProps, mapDispatchToProps);

/**
 * Local typings
 */
type PropsFromRedux = ConnectedProps<typeof connector>;

export type UsersGridContainerPropsT = Omit<
  UsersGridPropsI,
  'usersList' | 'loadMoreItems' | 'itemsLimit' | 'showUserDetailsModal'
>;

type UsersGridContainerInternalPropsT = PropsFromRedux & UsersGridContainerPropsT;

/**
 * Users grid container. It fetches the initial list of users.
 */
const UsersGridContainer = ({
  loadMoreUsersByNationalitiesSetting,
  clearUsersList,
  showUserDetailsModal,
  isUsersListFetching,
  usersListSearchStr,
  usersList,
  usersLimit,
  ...rest
}: UsersGridContainerInternalPropsT) => {
  /**
   * Fetch users list on the component mount
   */
  useEffect(() => {
    loadMoreUsersByNationalitiesSetting();

    return () => {
      clearUsersList();
    };
  }, [loadMoreUsersByNationalitiesSetting, clearUsersList]);

  /**
   * Render users grid footer component
   */
  const footerComponent = useCallback(
    () => <UsersGridFooter isLoading={isUsersListFetching} isEndReached={usersList.length === usersLimit} />,
    [isUsersListFetching, usersList.length, usersLimit]
  );

  /**
   * Load more users. If there's a `searchStr` in the store,
   * we don't do anything
   */
  const loadMoreItems = useCallback(() => {
    if (usersListSearchStr) {
      return;
    }

    loadMoreUsersByNationalitiesSetting();
  }, [loadMoreUsersByNationalitiesSetting, usersListSearchStr]);

  return (
    <Fragment>
      <UsersGrid
        usersList={usersList}
        loadMoreItems={loadMoreItems}
        itemsLimit={usersLimit}
        showUserDetailsModal={showUserDetailsModal}
        footerComponent={footerComponent}
        {...rest}
      />

      <UserDetailsModalContainer />
    </Fragment>
  );
};

export default connector(UsersGridContainer);
