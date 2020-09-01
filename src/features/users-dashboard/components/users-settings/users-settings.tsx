// Modules
import React from 'react';
import CSSModules from 'react-css-modules';

// Components
import MultiSelect from 'components/multi-select';

// Constants
import { UsersNationalitiesOptions } from '../../constants/users-settings.constants';

// Typings
import { UsersNationalitySettingT } from '../../typings/users-settings.typings';

// Styles
import styles from './users-settings.scss';

/**
 * Users settings props
 */
export interface UsersSettingsPropsI {
  selectedNationalities: UsersNationalitySettingT[];
  setNationalities: (options: UsersNationalitySettingT[]) => void;
}

/**
 * Users settings component
 */
const UsersSettings = ({ selectedNationalities, setNationalities }: UsersSettingsPropsI) => {
  return (
    <div styleName="users-nationalities">
      <h3>Please select nationalities, you would like to see:</h3>

      <MultiSelect
        selectedOptions={selectedNationalities}
        options={UsersNationalitiesOptions}
        onChange={setNationalities}
      />
    </div>
  );
};

export default CSSModules(UsersSettings, styles);
