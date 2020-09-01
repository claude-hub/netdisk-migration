// Modules
import React from 'react';
import CSSModules from 'react-css-modules';

// Components
import Page from 'components/page';

// Containers
import UsersSearchInputContainer from '../../containers/users-search-input-container';
import UsersGridContainer from '../../containers/users-grid-container';

// Styles
import styles from './users-dashboard-page.scss';

/**
 * Users dashboard page component
 */
const UsersDashboardPage = () => {
  return (
    <Page styleName="common">
      <div styleName="search">
        <UsersSearchInputContainer />
      </div>

      <div styleName="content">
        <UsersGridContainer />
      </div>
    </Page>
  );
};

export default CSSModules(UsersDashboardPage, styles);
