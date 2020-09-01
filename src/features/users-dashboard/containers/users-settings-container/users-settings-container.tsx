// Modules
import React, { useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';

// Components
import UsersSettings from '../../components/users-settings';

// Selectors
import { selectUsersSettingsNationalities } from '../../selectors/users-settings.selectors';

// Actions
import { setUsersNationalitiesSetting } from '../../actions/users-settings.actions';

// Typings
import { RootReducerStateT } from 'store/typings';

/**
 * Redux map state to props
 */
const mapStateToProps = (state: RootReducerStateT) => ({
  selectedNationalities: selectUsersSettingsNationalities(state),
});

const mapDispatchToProps = { setUsersNationalitiesSetting };

const connector = connect(mapStateToProps, mapDispatchToProps);

/**
 * Local typings
 */
type PropsFromRedux = ConnectedProps<typeof connector>;

type UsersSettingsContainerT = PropsFromRedux;

/**
 * Users settings container. It selects users nationalities
 * that we should show to our end user.
 */
const UsersSettingsContainer = ({ selectedNationalities, setUsersNationalitiesSetting }: UsersSettingsContainerT) => {
  /**
   * Set users nationalities setting
   */
  const handleUsersNationalitiesChange = useCallback(
    nationalities => {
      setUsersNationalitiesSetting({ nationalities });
    },
    [setUsersNationalitiesSetting]
  );

  return (
    <UsersSettings setNationalities={handleUsersNationalitiesChange} selectedNationalities={selectedNationalities} />
  );
};

export default connector(UsersSettingsContainer);
