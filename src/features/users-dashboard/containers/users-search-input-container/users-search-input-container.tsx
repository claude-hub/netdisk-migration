// Modules
import React, { useCallback, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { isEmpty } from 'ramda';

// Components
import UsersSearchInput from '../../components/users-search-input';

// Actions
import { searchUsersList } from '../../actions/users-list.actions';

// Selectors
import { selectUsersListSearchStr } from '../../selectors/users-list.selectors';

// Typings
import { RootReducerStateT } from 'store/typings';
import { InputChangeEventHandlerT } from 'typings/common.typings';

/**
 * Redux map state to props
 */
const mapStateToProps = (state: RootReducerStateT) => ({
  usersListSearchStr: selectUsersListSearchStr(state),
});

const mapDispatchToProps = { searchUsersList };

const connector = connect(mapStateToProps, mapDispatchToProps);

/**
 * Local typings
 */
type PropsFromRedux = ConnectedProps<typeof connector>;

type UsersSearchInputContainerT = PropsFromRedux;

/**
 * Users search input container. It is used for
 * searching for a user
 */
const UsersSearchInputContainer = ({ searchUsersList, usersListSearchStr }: UsersSearchInputContainerT) => {
  /**
   * Search for the users when the input changes
   */
  const handleOnChange = useCallback<InputChangeEventHandlerT>(
    evt => {
      const {
        target: { value },
      } = evt;

      searchUsersList({ searchStr: value });
    },
    [searchUsersList]
  );

  /**
   * Show input meta message if the input is not empty
   */
  const metaMessage = useMemo(
    () => (isEmpty(usersListSearchStr) ? null : "You can't load more users while the search input is filled"),
    [usersListSearchStr]
  );

  return <UsersSearchInput value={usersListSearchStr} onChange={handleOnChange} metaMessage={metaMessage} />;
};

export default connector(UsersSearchInputContainer);
