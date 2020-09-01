// Modules
import React, { Fragment } from 'react';
import CSSModules from 'react-css-modules';
import { useLocation } from 'react-router-dom';
import { Location } from 'history';

// Components
import NavLink from '../nav-link';

// Constants
import { USERS_DASHBOARD_PAGE_URL, USER_SETTINGS_PAGE_URL } from 'constants/routing-urls.constants';

// Styles
import styles from './nav-bar.scss';

/**
 * Local helpers
 */
const isNavLinkActive = (location: Location, url: string) => location.pathname === url;

/**
 * Page navigation bar component.
 */
const NavBar = () => {
  /**
   * Initialize the location object
   */
  const location = useLocation();

  return (
    <Fragment>
      <NavLink
        styleName="nav-link"
        url={USERS_DASHBOARD_PAGE_URL}
        active={isNavLinkActive(location, USERS_DASHBOARD_PAGE_URL)}
      >
        Users Dashboard
      </NavLink>

      <NavLink
        styleName="nav-link"
        url={USER_SETTINGS_PAGE_URL}
        active={isNavLinkActive(location, USER_SETTINGS_PAGE_URL)}
      >
        User Settings
      </NavLink>
    </Fragment>
  );
};

export default CSSModules(NavBar, styles, { allowMultiple: true });
